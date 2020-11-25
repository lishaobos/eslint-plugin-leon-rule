/**
 * @fileoverview use await this.$nextTick()
 * @author leon
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "use await this.$nextTick()",
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
            'CallExpression' (node) {
                if (
                    node?.arguments?.length && 
                    node?.callee?.object?.type === 'ThisExpression' && 
                    node?.callee?.property?.name === '$nextTick'
                    ){
                        ctx.report({
                            node,
                            message: 'use await this.$nextTick()'
                        })
                }
            }
        }
    }
};
