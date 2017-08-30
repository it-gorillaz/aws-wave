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

const Arn          = require('../utils/arn');
const PolicyEffect = require('./policy-effect');

const ALL                     = '*'
const POLICY_DOCUMENT_VERSION = '2012-10-17';
const INVOKE_ACTION           = 'execute-api:Invoke';

/**
 * The AuthPolicyBuilder class.
 * It contains utility methods to generate IAM Policies
 * 
 * @author tommelo
 */
class AuthPolicyBuilder {

    /**
     * Creates an IAM Policy denying access
     * to all api gateway resources
     * 
     * @param {String} principalId The principal id
     * @returns {Object} policy An IAM Policy
     */
    static denyAll(principalId) {
        var arn = Arn.format({
            region      : ALL,
            awsAccountId: ALL,
            restApiId   : ALL,
            stage       : ALL,
            httpMethod  : ALL,
            resource    : ALL
        });        
        
        var statement = this.statement(PolicyEffect.DENY, arn);
        return this.policy(principalId, [statement]);
    } 

    /**
     * Creates an Policy Statement
     * 
     * @param {String} effect   The effect
     * @param {String} resource The resource
     * @returns {Object} statement The policy statement
     */
    static statement(effect, resource) {
        return {
            Action: INVOKE_ACTION,
            Effect: effect,
            Resource: resource
        };
    }

    /**
     * Creates an IAM Policy representation
     * 
     * @param {String} principalId The principalId
     * @param {Array}  statements  The policy statements
     * @returns {Object} policy The IAM Policy
     */
    static policy (principalId, statements) {
        return {
            principalId: principalId,
            policyDocument: {
                Version: POLICY_DOCUMENT_VERSION,
                Statement: statements
            }
        };
    }

}

module.exports = AuthPolicyBuilder;