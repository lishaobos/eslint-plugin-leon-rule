/**
 * @fileoverview disable then function
 * @author leon
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "disable then function",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create (ctx) {
        return {
            'MemberExpression' (node) {
                if (node?.object?.type === 'CallExpression' && node?.property?.name === 'then') {
                    ctx.report({
                        node,
                        message: 'use async await, not then'
                    })
                }
            }
        }
    }
};
