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

/**
 * The ResponseEntity class.
 * It represents the http response structure that the AWS API Gateway expects when using integration proxy.
 *
 * For more information about integration proxy, see:
 * 
 * - http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-set-up-simple-proxy.html
 * - http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-set-up-simple-proxy.html
 * 
 * @author tommelo
 */
class ResponseEntity {

    /**
     * Inits this class with the Lambda callback pameter
     * 
     * @param {Function} callback The Lambda callback
     */
    static init(callback) {
        this.callback = callback;
    }
    
    /**
     * Sends a response to API Gateway with the given response body object,  
     * response headers and http status code. 
     *  
     * @param  {String}  body            The serialized response body
     * @param  {Object}  headers         The response headers
     * @param  {Number}  httpStatusCode  The http status code
     * @param  {Boolean} isBase64Encoded The base64 flag     
     * @return {Function} callback       The callback execution
     */
    static of(entity, headers, statusCode, isBase64Encoded) {
        return this.callback(null, {
            statusCode: statusCode,
            headers: headers,
            body: entity,
            isBase64Encoded: isBase64Encoded
        });
    }

}

module.exports = ResponseEntity;