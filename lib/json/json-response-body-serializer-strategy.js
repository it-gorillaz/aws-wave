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

const InternalServerErrorException   = require('../exception/internal-server-error-exception');
const ResponseBodySerializerStrategy = require('../serializer/response-body-serializer-strategy');

/**
 * The JSON response body serializer strategy
 * 
 * @author tommelo
 */
class JsonResponseBodySerializerStrategy extends ResponseBodySerializerStrategy {

   /**
    * Serializes an object
    * 
    * @param  {Object} entity     The object to be serialized
    * @return {String} serialized The string representation of the object
    * @throws {InternalServerErrorException} error Throws an InternalServerErrorException if the serialization fails
    */
    serialize(entity) {        
        try {

            return JSON.stringify(entity);

        } catch (e) {
            console.error(e);            
            throw new InternalServerErrorException({ message: 'Unable to serialize the response body' }, e);
        }
    }

}

module.exports = JsonResponseBodySerializerStrategy;