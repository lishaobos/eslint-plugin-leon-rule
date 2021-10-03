/**
 * @fileoverview disable then function
 * @author leon
 */
"use strict"; //------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
// 被普通调用

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var isCallExpression = function isCallExpression(node, cache) {
  return node.object.type === 'ThisExpression' && cache.includes(node.property.name) && node.parent.parent.type !== 'AwaitExpression';
}; // 调用函数的结果作为其他函数参数


var isArguments = function isArguments(node) {
  return node.parent.type === 'CallExpression' && ['ArrayExpression', 'CallExpression'].includes(node.parent.parent.type);
};

var validator = function validator(node, cache) {
  return isCallExpression(node, cache) && !isArguments(node);
};

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
    var cache = [];
    return {
      ExportDefaultDeclaration: function ExportDefaultDeclaration(node) {
        var _node$declaration;

        var properties = (node === null || node === void 0 ? void 0 : (_node$declaration = node.declaration) === null || _node$declaration === void 0 ? void 0 : _node$declaration.properties) || [];
        var methods = properties.find(function (_ref) {
          var name = _ref.key.name;
          return name === 'methods';
        });
        if (!methods) return;
        var asyncFncs = methods.value.properties.filter(function (_ref2) {
          var value = _ref2.value;
          return value === null || value === void 0 ? void 0 : value.async;
        }).map(function (_ref3) {
          var name = _ref3.key.name;
          return name;
        });
        cache.push.apply(cache, _toConsumableArray(asyncFncs));
      },
      MemberExpression: function MemberExpression(node) {
        if (!validator(node, cache)) return;
        ctx.report({
          node: node,
          message: 'await to async function' // fix: fixer => fixer.insertTextBefore(node, 'await ')

        });
      }
    };
  }
};