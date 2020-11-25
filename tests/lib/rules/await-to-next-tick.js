/**
 * @fileoverview use await this.$nextTick()
 * @author leon
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/await-to-next-tick"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("await-to-next-tick", rule, {

    valid: [
        'this.$nextTick()'
    ],

    invalid: [
        {
            code: `this.$nextTick( function () {
                console.log(123)
            })`,
            errors: [{  message: "use await this.$nextTick()" }]
        }
    ]
});
