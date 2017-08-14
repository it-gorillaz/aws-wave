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
    HttpException                          : require('./lib/exception/http-exception'),
    BadGatewayException                    : require('./lib/exception/bad-gateway-exception'),
    BadRequestException                    : require('./lib/exception/bad-request-exception'),
    ConflictException                      : require('./lib/exception/conflict-exception'),
    ExpectationFailedException             : require('./lib/exception/expectation-failed-exception'),
    FailedDependencyException              : require('./lib/exception/failed-dependency-exception'),
    ForbiddenException                     : require('./lib/exception/forbidden-exception'),
    GatewayTimeoutException                : require('./lib/exception/gateway-timeout-exception'),
    GoneException                          : require('./lib/exception/gone-exception'),
    HTTPVersionNotSupportedException       : require('./lib/exception/http-version-not-supported-exception'),
    ImaTeapotException                     : require('./lib/exception/im-a-teapot-exception'),
    InsufficientStorageException           : require('./lib/exception/insufficient-storage-exception'),    
    InternalServerErrorException           : require('./lib/exception/internal-server-error-exception'),
    LengthRequiredException                : require('./lib/exception/length-required-exception'),
    LockedException                        : require('./lib/exception/locked-exception'),
    LoopDetectedException                  : require('./lib/exception/loop-detected-exception'),
    MethodNotAllowedException              : require('./lib/exception/method-not-allowed-exception'),
    MisdirectedRequestException            : require('./lib/exception/misdirected-request-exception'),
    NetworkAuthenticationRequiredException : require('./lib/exception/network-authentication-required-exception'),
    NotAcceptableException                 : require('./lib/exception/not-acceptable-exception'),
    NotExtendedException                   : require('./lib/exception/not-extended-exception'),
    NotImplementedException                : require('./lib/exception/not-implemented-exception'),
    PayloadTooLargeException               : require('./lib/exception/payload-too-large-exception'),
    PaymentRequiredException               : require('./lib/exception/payment-required-exception'),
    PreconditionFailedException            : require('./lib/exception/precondition-failed-exception'),
    PreconditionRequiredException          : require('./lib/exception/precondition-required-exception'),
    ProxyAuthenticationRequiredException   : require('./lib/exception/proxy-authentication-required-exception'),
    RequestHeaderFieldsTooLargeException   : require('./lib/exception/request-header-fields-too-large-exception'),
    RequestTimeoutException                : require('./lib/exception/request-timeout-exception'),
    RequestedRangeNotSatisfiableException  : require('./lib/exception/requested-range-not-satisfiable-exception'),    
    ResourceNotFoundException              : require('./lib/exception/resource-not-found-exception'),
    ServiceUnavailableException            : require('./lib/exception/service-unavailable-exception'),
    TooManyRequestsException               : require('./lib/exception/too-many-requests-exception'),    
    UnauthorizedException                  : require('./lib/exception/unauthorized-exception'),
    UnavailableForLegalReasonsException    : require('./lib/exception/unavailable-for-legal-reasons-exception'),
    UnprocessableEntityException           : require('./lib/exception/unprocessable-entity-exception'),
    UnsupportedMediaTypeException          : require('./lib/exception/unsupported-media-type-exception'),
    UpgradeRequiredException               : require('./lib/exception/upgrade-required-exception'),
    URITooLongException                    : require('./lib/exception/uri-too-long-exception'),
    VariantAlsoNegotiatesException         : require('./lib/exception/variant-also-negotiates-exception'),   

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
