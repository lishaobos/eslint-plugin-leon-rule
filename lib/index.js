/**
 * @fileoverview leon custom rule
 * @author leon
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports = {
    rules: rulesrequireIndex(__dirname + "/rules"),
    configs: {
        recommended: {
            plugins: ["leon-rule"],
            rules: {
                'leon-rule/no-then': 2,
                'leon-rule/await-to-next-tick': 2,
            }
        }
    }
}



