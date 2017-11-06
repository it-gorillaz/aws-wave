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

const qs                              = require('qs');
const BadRequestException             = require('../exception/bad-request-exception');
const RequestBodyDeserializerStrategy = require('../deserializer/request-body-deserializer-strategy');

/**
 * The JSON request body deserializer strategy
 * 
 * @author tommelo
 */
class XWWWFormUrlEncodedRequestBodyDeserializerStrategy extends RequestBodyDeserializerStrategy {

    /**
     * Deserializes a raw request body
     * 
     * @param  {String} body   The raw request body     
     * @return {Object} entity The deserialized object     
     * @throws {BadRequestException} error Throws a BadRequestException if the deserealization fails.
     */
    deserialize(body) {        
        try {

            return qs.parse(body);

        } catch (e) {
            console.error(e);
            throw new BadRequestException({ message: 'Invalid JSON Object' }, e);
        }
    }

}

module.exports = XWWWFormUrlEncodedRequestBodyDeserializerStrategy;