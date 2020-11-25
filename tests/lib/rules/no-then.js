/**
 * @fileoverview disable then function
 * @author leon
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-then"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-then", rule, {

    valid: [
        'fnc.then',
    ],

    invalid: [
        {
            code: `fnc().then()`,
            errors: [{ message: "use async await, not then" }]
        }
    ]
});
