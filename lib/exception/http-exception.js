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
 * The HttpException class.
 * This is the abstract base class for all the http exception classes.
 * 
 * All HttpException classes should have two attributes that are used 
 * to create a http response:
 * 
 * 1 - httpStatusCode - The http status code
 * 2 - entity         - The object that represents the response body
 *    
 * @author tommelo
 */
class HttpException extends Error {

    /**
     * The class constructor
     * 
     * @param {Object} entity         The object to be serialized as response body
     * @param {Number} httpStatusCode The http status code
     * @param {Error}  cause          The error cause
     */
    constructor(entity, httpStatusCode, cause) {        
        super(cause.message);
        
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        
        Objects.constraint(this, HttpException);
        
        this.entity = entity;
        this.httpStatusCode = httpStatusCode;
    }

    /**
     * Returns the entity that represents the response body
     * 
     * @return {Object} entity The entity
     */
    getEntity() {
        return this.entity;
    }

    /**
     * Returns the http status code
     * 
     * @return {Number} httpStatusCode The http status code
     */
    getHttpStatusCode() {
        return this.httpStatusCode;
    }

}

module.exports = HttpException;