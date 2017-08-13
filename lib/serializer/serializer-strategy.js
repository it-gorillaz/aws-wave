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

const JsonResponseBodySerializerStrategy = require('../json/json-response-body-serializer-strategy');

/**
 * The SerializerStrategy.
 * 
 * It contains all the strategies to serialize a response body.
 * The current supported serializers are:
 * 
 * - JsonResponseBodySerializerStrategy for Content-Type: application/json
 * 
 * If a specific serializer is not registered in this enum the 
 * AbstractRequestHandler.resolveSerializerStrategy() should be overridden.
 * 
 * @author tommelo
 */
const SerializerStrategy = {

    /**
     * The response body serializer for application/json
     */
    APPLICATION_JSON: new JsonResponseBodySerializerStrategy(),


    /**
     * The response body serializer for application/json
     */
    'application/json': new JsonResponseBodySerializerStrategy(),


    /**
     * Returns the serializer strategy
     * 
     * @param  {String} contentType The content type
     * @return {ResponseBodySerializerStrategy} serializer The serializer strategy
     */
    strategy: (accept) => {
        return this[accept];
    }

};

module.exports = SerializerStrategy;


