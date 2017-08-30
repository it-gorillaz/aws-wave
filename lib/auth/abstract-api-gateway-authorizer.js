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

const Objects           = require('../utils/objects');
const Arn               = require('../utils/arn');
const HttpException     = require('../exception/http-exception');
const PolicyEffect      = require('./policy-effect');
const AuthPolicyBuilder = require('./auth-policy-builder');

/**
 * AbstractAPIGatewayAuthorizer is the abstract base class
 * that handles a custom authorization request from API Gateway.
 *  
 * Every class that inherits this class must return an
 * Policy Object (the representation of an IAM Policy)
 * allowing or denying access to API Gateway resources.
 *  
 * The initial request payload that this handler receives
 * from API Gateway comes in the following format:
 * 
 *  {
 *      "type": "TOKEN",
 *      "authorizationToken": "caller-supplied-token"
 *      "methodArn": "arn:aws:execute-api:regionId:accountId:apiId/stage/method/resourcePath"
 *  }
 *  
 * Note: 
 * Any HttpException will result in an IAM Policy that denies access to the requested resource.
 * Any other exception not handled will result in an IAM Policy that denies access to all API Gateway resources.
 * 
 * @author tommelo
 * @see http://docs.aws.amazon.com/apigateway/latest/developerguide/use-custom-authorizer.html
 */
class AbstractAPIGatewayAuthorizer {

    /**
     * The default constructor
     */
    constructor() {
        Objects.constraint(this, AbstractAPIGatewayAuthorizer);
    }

    /**
     * Handles a Lambda execution call
     * 
     * @param {Object}   event    The event
     * @param {Object}   context  The context
     * @param {Function} callback The callback
     */
    handleRequest(event, context, callback) {
        var request = null;

        try {

            this.before(event, context);

            var arn = Arn.parse(event.methodArn);
            request = {
                type              : event.type,
                authorizationToken: event.authorizationToken,
                methodArn         : event.methodArn,
                region            : arn.region,
                awsAccountId      : arn.awsAccountId,
                restApiId         : arn.restApiId,
                stage             : arn.stage,
                httpMethod        : arn.httpMethod,
                resource          : arn.resource
            };

            this.authorize(request, context, callback);

        } catch(e) {
            console.error(e);

            var policy = null;

            if (e instanceof HttpException) {                
                var statement = AuthPolicyBuilder.statement(PolicyEffect.DENY, request.resource);
                policy = AuthPolicyBuilder.policy(request.authorizationToken, [statement]);
            } else {
                policy = AuthPolicyBuilder.denyAll(request.authorizationToken);
            }

            callback(null, policy);
        }

    }

    /**
     * The before method.	 
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
     * Performs a custom API Gateway Authorization.
     * 
     * @param request The request for authorize
     * @param context The Lambda Context
     * @return authPolicy The auth policy (IAM Policy representation)
     * @throws HttpException exception The http exception
     */
    authorize(request, context, callback) {
        throw new Error('authorize() method must be implemented');
    }

}

module.exports = AbstractAPIGatewayAuthorizer;