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

const HttpException = require('./http-exception');
const HttpStatus    = require('http-status-codes');

/**
 * The GoneException class.
 * 
 * This is a concrete class of the the HttpException class.
 * It represents a gone http response.
 * 
 * @author tommelo
 */
class GoneException extends HttpException {

    /**
     * The class constructor
     * 
     * @param {Object} entity The object to be serialized as response body     
     * @param {Error}  cause  The error cause
     */
    constructor(entity, cause) {
        cause = cause || new Error('GoneException');
        super(entity, HttpStatus.GONE, cause);
    }

}

module.exports = GoneException;