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

const util = require('util');

/**
 * The arn format
 */
const ARN_FORMAT = 'arn:aws:execute-api:%s:%s:%s/%s/%s/%s';

/**
 * The Arn class utils
 * 
 * @author tommelo
 */
class Arn {

    /**
     * Parses an arn.
     * This method will return the arn information in the following structure:
     * 
     * {
     *   region: 'region',
     *   awsAccountId: 'aws-account-id',
     *   restApiId: 'rest-api-id',
     *   stage: 'stage',
     *   httpMethod: 'http method',
     *   resource: 'resource'
     * }
     * 
     * @param  {String} methodArn The arn
     * @return {Object} arnInfo The arn info object
     */
    static parse(methodArn) {
        var arnPartials = methodArn.split(":");
        
        var region = arnPartials[3];
        var awsAccountId = arnPartials[4];
        
        var apiGatewayArnPartials = arnPartials[5].split("/");
        var restApiId = apiGatewayArnPartials[0];
        var stage = apiGatewayArnPartials[1];
        var httpMethod = apiGatewayArnPartials[2];
        
        var resource = "";			
        for (var i = 3, len = apiGatewayArnPartials.length; i < len; i++) {
            resource = resource.concat("/");
            resource = resource.concat(apiGatewayArnPartials[i]);
        }
    
        return {
            region      : region,
            awsAccountId: awsAccountId,
            restApiId   : restApiId,
            stage       : stage,
            httpMethod  : httpMethod,
            resource    : resource
        };
    }


    /**
     * Formats an arn by the given arn object
     * 
     * @param {Object} arn The arn object
     */
    static format(arn) {
        return util.format(
            ARN_FORMAT, 
            arn.region,
            arn.awsAccountId,
            arn.restApiId,
            arn.stage,
            arn.httpMethod,
            arn.resource            
        );
    }
}

module.exports = Arn;