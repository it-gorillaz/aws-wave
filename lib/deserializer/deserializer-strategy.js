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

const JsonRequestBodyDeserializerStrategy               = require('../json/json-request-body-deserializer-strategy');
const XWWWFormUrlEncodedRequestBodyDeserializerStrategy = require('../x-www-form-urlencoded/x-www-form-urlencoded-request-body-deserializer-strategy');
/**
 * The DeserializerStrategy.
 * 
 * It contains all the strategies to deserialize a request body.
 * The current supported content type deserializers are:
 * 
 * - JsonRequestBodyDeserializerStrategy for Content-Type: application/json
 *  
 * If a specific content type deserializer is not registered in this enum the 
 * AbstractRequestHandler.resolveDeserializerStrategy() should be overridden.
 * 
 * @author tommelo
 */
const DeserializerStrategy = {

    /**
     * The Request body deserializer for content type application/json
     */
    APPLICATION_JSON: new JsonRequestBodyDeserializerStrategy(),

    /**
     * The Request body deserializer for content type application/json
     */
    'application/json': new JsonRequestBodyDeserializerStrategy(),

    /**
     * The Request body deserializer for content type application/x-www-form-urlencoded
     */
    'application/x-www-form-urlencoded': new XWWWFormUrlEncodedRequestBodyDeserializerStrategy(),

    /**
     * Returns the deserializer strategy
     * 
     * @param contentType The content type
     * @return {RequestBodyDeserializerStrategy} deserializer The deserializer strategy
     */
    strategy: (contentType) => {
        return this[contentType];
    }

};

module.exports = DeserializerStrategy;


