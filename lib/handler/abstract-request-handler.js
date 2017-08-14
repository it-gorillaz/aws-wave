/**
 * MIT License
 * 
 * Copyright (c) 2017 ITGorillaz
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

const Objects                     = require('../utils/objects');
const HttpStatus                  = require('http-status-codes');
const HttpException               = require('../exception/http-exception');
const ResponseEntity              = require('../response/response-entity');
const SerializerStrategy          = require('../serializer/serializer-strategy');
const DeserializerStrategy        = require('../deserializer/deserializer-strategy');
const DefaultRequestBodyValidator = require('../validator/default-request-body-validator');

/**
 * The default content type. 
 * application/json is the default content type for this lambda funcion handler
 */
const DEFAULT_CONTENT_TYPE = 'application/json';

/**
 * The default request body deserializer strategy.
 * 
 * A JSON deserializer will be assumed if the request header
 * "contentType" is not registered in the DeserializerStrategy enum.
 */
const DEFAULT_REQUEST_BODY_DESERIALIZER = DeserializerStrategy.APPLICATION_JSON;

/**
 * The default response body serializer strategy.
 * 
 * A JSON serializer will be assumed if the request header
 * "accept" is not registered in the SerializerStrategy enum.
 */
const DEFAULT_RESPONSE_BODY_SERIALIZER = SerializerStrategy.APPLICATION_JSON;

/**
 * The default request validator.
 * A request validation will be performed if any schema is given by the inherited class
 */
const DEFAULT_REQUEST_BODY_VALIDATOR = new DefaultRequestBodyValidator();

/**
 * Inits the request attributes
 * 
 * @param {Object} event The Lambda call event
 */
const initRequestAttributes = (event) => {    
    this.path                  = event.path;
    this.headers               = event.headers; 
    this.resource              = event.resource;
    this.httpMethod            = event.httpMethod;       
    this.pathParameters        = event.pathParameters;
    this.stageVariables        = event.stageVariables;
    this.requestContext        = event.requestContext;
    this.rawRequestBody        = event.body;
    this.isBase64Encoded       = event.isBase64Encoded;
    this.queryStringParameters = event.queryStringParameters;
};

/**
 * Returns the raw body to be deserialized.
 * 
 * If the request method is GET the method will return
 * a JSON represetation of the query string parameters.
 * Any other method will return the raw body request.
 * 
 * @return {String} rawBody The raw body to be deserialized 
 */
const rawBodyOrQueryString = () => {
    return this.httpMethod === 'GET'
        ? JSON.stringify(this.queryStringParameters)
        : this.rawRequestBody;
};

/**
 * Checks if the request body should be deserialized.
 * 
 * If the http method is not GET and a schema has been specified
 * the raw request body should be deserialized.
 *  
 * @return {Boolean} deserializable true for deserializable, false otherwise
 */
const isRequestBodyDeserializable = () => {
    if (this.rawRequestBody && this.httpMethod != 'GET')
        return true;
    
    return false;
};


/**
 * The AbstractRequestHandler class.
 * This is the abstract base class that handles a lambda function call.  
 * 
 * The handling process consists in the following steps: 
 * 
 * - Init the request attributes (headers, path parameters, etc)
 * - Deserialize the request body
 * - Validate the request
 * - Serialize the response
 * 
 * @author tommelo 
 */
class AbstractRequestHandler {
    
    /**
     * The class constructor 
     * 
     * @param {Object} schema a Joi schema to be validated
     */
    constructor(schema) {
        Objects.constraint(this, AbstractRequestHandler);
        this.schema = schema;        

        this.path                  = null;        
        this.headers               = {};  
        this.resource              = null;
        this.httpMethod            = null;      
        this.pathParameters        = {};
        this.stageVariables        = {};
        this.requestContext        = {};
        this.rawRequestBody        = null;
        this.isBase64Encoded       = null;
        this.responseHeaders       = {};
        this.queryStringParameters = {};
    }

    /**
     * Handles a Lambda Function request
     * 
     * @param {Object}   event    The Lambda Function event
     * @param {Object}   context  The Lambda execution environment context object.
     * @param {Function} callback The Lambda Function callback
     */
    handleRequest(event, context, callback) {
        ResponseEntity.init(callback);
        initRequestAttributes.call(this, event);

        var contentType = this.getRequestHeader('Content-Type') || DEFAULT_CONTENT_TYPE;
        var accept      = this.getRequestHeader('Accept')       || DEFAULT_CONTENT_TYPE;

        var deserializer = this.resolveRequestBodyDeserializer(contentType);
        var serializer   = this.resolveResponseBodySerializer(accept);
        var validator    = this.resolveRequestBodyValidator();

        var httpStatusCode = HttpStatus.OK;

        var input;
        var output;

        try {

            this.before(event, context);
            
            if (isRequestBodyDeserializable.call(this)) {
                var body = rawBodyOrQueryString.call(this);
                input    = deserializer.deserialize(body);
            }

            if (this.schema) {
                validator.validate(input, this.schema);
            }

            var response = this.execute(input, context);
            if (response) {
                output = serializer.serialize(response);
            }

        } catch (e) {
            console.error(e);

            if (e instanceof HttpException) {                
                var entity     = e.getEntity();
                httpStatusCode = e.getHttpStatusCode();

                output = !entity
                    ? null
                    : serializer.serialize(entity);

            } else {
                output = { message: 'Unable to process the request' };
                httpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            }

        }        

        return ResponseEntity.of(
            output,
            this.responseHeaders,
            httpStatusCode,
            false
        );
    }

    /**
     * Returns the raw request body
     * 
     * @return {String} rawRequestBody The raw request body
     */
    getRawRequestBody() {
        return this.rawRequestBody;
    }

    /**
     * Returns the http method
     * 
     * @return {String} httpMethod The http method of the request
     */
    getHttpMethod() {
        return this.httpMethod;
    }

    /**
     * Returns the resource
     * 
     * @return {String} resource The resource
     */
    getResource() {
        return this.resource;
    }

    /**
     * Returns the path of the request
     * 
     * @return {String} path The path of the request
     */
    getPath() {
        return this.path;
    }

    /**
     * Returns all the request headers
     *  
     * @return {Object} headers All the request headers
     */
    getRequestHeaders() {
        return this.headers;
    }

    /**
     * Returns the value of the given header name
     * 
     * @param  {String}  key   The header name
     * @return {String}  value The header value
     */
    getRequestHeader(key) {
        return this.headers[key];
    }

    /**
     * Returns all the stage variables
     * 
     * @return {Object} stageVariables All the stage variables
     */
    getStageVariables() {
        return this.stageVariables;        
    }

    /**
     * Returns the value of the given stage variable name
     * 
     * @param  {String}  key   The stage variable name
     * @return {String}  value The stage variable value
     */
    getStageVariable(key) {
        return this.stageVariables[key];
    }
    
    /**
     * Returns all the path parameters
     * 
     * @return {Object} pathParameters All the path parameters
     */
    getPathParameters() {
        return this.pathParameters;
    }

    /**
     * Returns the value of the given path parameter name
     * 
     * @param  {String} key   The path parameter name
     * @return {String} value The path parameter value
     */
    getPathParameter(key) {
        return this.pathParameters[key];
    }

    /**
     * Returns all the query string parameters
     * 
     * @return {Object} queryStringParameters All the query string parameters
     */
    getQueryStringParameters() {
        return this.queryStringParameters;
    }

    /**
     * Returns the value of the given query string parameter name
     * 
     * @param  {String}  key   The query string parameter name
     * @return {String}  value The value of the query string parameter 
     */
    getQueryStringParameter(key) {
        return this.queryStringParameters[key];
    }

    /**
     * Returns the request context object
     * 
     * @return {Object} requestContext The request context object
     */
    getRequestContext() {
        return this.requestContext;
    }

    /**
     * Returns the request context parameter of the given key
     * 
     * @param  {String} key   The request context parameter key
     * @return {Object} value The request context parameter value
     */
    getRequestContextParameter(key) {
        return this.requestContext[key];
    }

    /**
     * Returns the response headers
     * 
     * @return {Object} responseHeaders The response headers
     */
    getResponseHeaders() {
        return this.responseHeaders;
    }

    /**
     * Adds a response header
     * 
     * @param key   The header name
     * @param value The header value
     */
    addResponseHeader(key, value) {
        this.responseHeaders[key] = value;
    }

    /**
     * Adds a cors response header
     * 
     * @param {String} allowed The cors value
     */
    cors(allowed) {
        this.addResponseHeader('Access-Control-Allow-Origin', allowed);
    }

    /**
     * Returns the request body deserializer strategy.
     * 
     * If no deserializer is found for the given content type
     * a default request body deserializer will be assumed.
     * 
     * @param  {String} contentType The content type
     * @return {RequestBodyDeserializerStrategy} strategy The deserializer strategy	 
     */
    resolveRequestBodyDeserializer(contentType) {
        var strategy = DeserializerStrategy.strategy(contentType);
        return !strategy
            ? DEFAULT_REQUEST_BODY_DESERIALIZER
            : strategy;
    }

    /**
     * Returns the response body serializer strategy.
     * 
     * If no serializer is found for the given "accept" header
     * a default response body serializer will be assumed.
     *  
     * @param  {String} accept The accept header value
     * @return {ResponseBodySerializerStrategy} strategy The Serializer strategy	 	 
     */
    resolveResponseBodySerializer(accept) {
        var strategy = SerializerStrategy.strategy(accept);
        return !strategy
            ? DEFAULT_RESPONSE_BODY_SERIALIZER
            : strategy;
    }

    /**
     * Returns the request body validator
     * 
     * @return {RequestBodyValidator} validator The request body validator
     */
    resolveRequestBodyValidator() {
        return DEFAULT_REQUEST_BODY_VALIDATOR;
    }


    /**
     * The before method will be called before the 
     * request body deserialization and validation process.
     * 
     * It can be used setup any configuration before the execution.
     * 
     * @param  {Object} event   The Lambda execution event
     * @param  {Object} context The Lambda execution context 
     * @throws {HttpException} error A HttpException if any error occur
     */
    before(event, context) {
        throw new Error('before() method must be implemented');
    }

    /**
     * The lambda execution handler method.
     * 
     * The execute method will be called after the 
     * request body deserialization and validation process.
     * 
     * @param  {Object} body    The request body input object
     * @param  {Object} context The Lambda execution context 
     * @return {Object} output  The response body output 
     * @throws {HttpException} error A HttpException if any error occur
     */
    execute(body, context) {
        throw new Error('execute() method must be implemented');
    }

}

module.exports = AbstractRequestHandler;