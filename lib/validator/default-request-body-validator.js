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

const Joi                          = require('joi');
const RequestBodyValidator         = require('./request-body-validator');
const UnprocessableEntityException = require('../exception/unprocessable-entity-exception');
const InternalServerErrorException = require('../exception/internal-server-error-exception');

/**
 * The default request validation class.
 * 
 * It uses Joi to perform an object validation.
 * An UnprocessableEntityException will be thrown if any constraint is violated.
 * 
 * @author tommelo
 */
class DefaultRequestBodyValidator extends RequestBodyValidator {

    /**
     * Validates a request body
     * 
     * @param  {Object} entity The object to be validated
     * @param  {Object} schema The validation schema     
     * @throws {UnprocessableEntityException} error If the request body violates any constraint
     * @throws {InternalServerErrorException} error If Joi.validade fails to execute
     */
    validate(entity, schema) {
        var result;

        try {

            result = Joi.validate(entity, schema);

        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({message: 'Unable to process the request'}, e);
        }       
        
        if (result.error){
            var error = {
                message: 'Unprocessable entity',
                errors: result.error.details
            };

            throw new UnprocessableEntityException(error, new Error('Unprocessable Entity'));
        }            
    } 

}

module.exports = DefaultRequestBodyValidator;