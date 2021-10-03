/**
 * @fileoverview disable then function
 * @author leon
 */
"use strict"; //------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "disable then function",
      category: "Fill me in",
      recommended: false
    },
    fixable: null,
    // or "code" or "whitespace"
    schema: [// fill in your schema
    ]
  },
  create: function create(ctx) {
    return {
      'MemberExpression': function MemberExpression(node) {
        var _node$object, _node$property;

        if ((node === null || node === void 0 ? void 0 : (_node$object = node.object) === null || _node$object === void 0 ? void 0 : _node$object.type) === 'CallExpression' && (node === null || node === void 0 ? void 0 : (_node$property = node.property) === null || _node$property === void 0 ? void 0 : _node$property.name) === 'then') {
          ctx.report({
            node: node,
            message: 'use async await, not then'
          });
        }
      }
    };
  }
};