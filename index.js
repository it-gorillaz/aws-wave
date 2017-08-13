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

const Wave = {

    /**
     * Http Exceptions
     */
    HttpException               : require('./lib/exception/http-exception'),
    BadRequestException         : require('./lib/exception/bad-request-exception'),
    ConflictException           : require('./lib/exception/conflict-exception'),
    InternalServerErrorException: require('./lib/exception/internal-server-error-exception'),
    ResourceNotFoundException   : require('./lib/exception/resource-not-found-exception'),
    UnauthorizedException       : require('./lib/exception/unauthorized-exception'),
    UnprocessableEntityException: require('./lib/exception/unprocessable-entity-exception'),

    /**
     * Deserializers
     */
    DeserializerStrategy               : require('./lib/deserializer/deserializer-strategy'),
    RequestBodyDeserializerStrategy    : require('./lib/deserializer/request-body-deserializer-strategy'),
    JsonRequestBodyDeserializerStrategy: require('./lib/json/json-request-body-deserializer-strategy'),
    
    /**
     * Serializers
     */
    SerializerStrategy                : require('./lib/serializer/serializer-strategy'),
    ResponseBodySerializerStrategy    : require('./lib/serializer/response-body-serializer-strategy'),
    JsonResponseBodySerializerStrategy: require('./lib/json/json-response-body-serializer-strategy'),

    /**
     * Validator
     */
    RequestBodyValidator: require('./lib/validator/request-body-validator'),

    /**
     * Handler
     */
    AbstractRequestHandler: require('./lib/handler/abstract-request-handler')
}

module.exports = Wave;
