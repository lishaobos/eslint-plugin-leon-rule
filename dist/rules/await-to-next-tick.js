/**
 * @fileoverview use await this.$nextTick()
 * @author leon
 */
"use strict"; //------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "use await this.$nextTick()",
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
      'CallExpression': function CallExpression(node) {
        var _node$arguments, _node$callee, _node$callee$object, _node$callee2, _node$callee2$propert;

        if (node !== null && node !== void 0 && (_node$arguments = node.arguments) !== null && _node$arguments !== void 0 && _node$arguments.length && (node === null || node === void 0 ? void 0 : (_node$callee = node.callee) === null || _node$callee === void 0 ? void 0 : (_node$callee$object = _node$callee.object) === null || _node$callee$object === void 0 ? void 0 : _node$callee$object.type) === 'ThisExpression' && (node === null || node === void 0 ? void 0 : (_node$callee2 = node.callee) === null || _node$callee2 === void 0 ? void 0 : (_node$callee2$propert = _node$callee2.property) === null || _node$callee2$propert === void 0 ? void 0 : _node$callee2$propert.name) === '$nextTick') {
          ctx.report({
            node: node,
            message: 'use await this.$nextTick()'
          });
        }
      }
    };
  }
};