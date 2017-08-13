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

const Objects = require('../utils/objects');

/**
 * The RequestValidator class.
 * It defines a contract to be implemented by a request body validator.
 *
 * @author tommelo
 */
class RequestBodyValidator {

    /**
     * The class constructor
     */
    constructor() {
        Objects.constraint(this, RequestBodyValidator);
    }
    
    /**
     * Validates a request body
     * 
     * @param  {Object}        entity The object to be validated
     * @param  {Object}        schema The validation schema
     * @throws {HttpException} error  The http exception if the request body violates any constraint
     */
    validate(entity, schema) {
        throw new Error('validate() method must be implemented');
    }

}

module.exports = RequestBodyValidator;