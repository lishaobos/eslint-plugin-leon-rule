/**
 * @fileoverview disable then function
 * @author leon
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

// 被普通调用
const isCallExpression = (node, cache) => (
    node.object.type === 'ThisExpression' 
    && cache.includes(node.property.name)
    && node.parent.parent.type !== 'AwaitExpression'
)

// 调用函数的结果作为其他函数参数
const isArguments = node => (
    node.parent.type === 'CallExpression'
    && ['ArrayExpression', 'CallExpression'].includes(node.parent.parent.type)
)

const validator = (node, cache) => isCallExpression(node, cache) && !isArguments(node)

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
        const cache = []
        return {
            ExportDefaultDeclaration (node) {
                const properties = node?.declaration?.properties || []
                const methods = properties.find( ({ key: { name } }) => name === 'methods' )
                if (!methods) return
                const asyncFncs = methods.value.properties
                    .filter( ({ value }) => value?.async )
                    .map( ({ key: { name } }) => name )

                cache.push(...asyncFncs)
            },
            MemberExpression (node) {
                if (!validator(node, cache)) return
                ctx.report({
                    node,
                    message: 'await to async function',
                    // fix: fixer => fixer.insertTextBefore(node, 'await ')
                })
            }
        }
    }
};
