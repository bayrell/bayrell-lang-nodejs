"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2020 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.bayrell.org/licenses/APACHE-LICENSE-2.0.html
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangBay == 'undefined') Bayrell.Lang.LangBay = {};
Bayrell.Lang.LangBay.ParserBayExpression = function(ctx)
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayExpression.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.LangBay.ParserBayExpression"))
		{
		}
	},
	assignValue: function(ctx,k,v)
	{
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.LangBay.ParserBayExpression";
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayExpression,
{
	/**
	 * Read bit not
	 */
	readBitNot: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var caret_start = token.caret_start.clone(ctx);
		if (token.content == "!")
		{
			var op_code = null;
			var res = parser.parser_base.constructor.readDynamic(ctx, look.clone(ctx));
			parser = Runtime.rtl.get(ctx, res, 0);
			op_code = Runtime.rtl.get(ctx, res, 1);
			var __v0 = use("Bayrell.Lang.OpCodes.OpMath");
			return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"value1":op_code,"math":"!","caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
		}
		return parser.parser_base.constructor.readDynamic(ctx, parser);
	},
	/**
	 * Read bit shift
	 */
	readBitShift: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitNot(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		var caret_start = op_code.caret_start.clone(ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		while (!token.eof && (token.content == ">>" || token.content == "<<"))
		{
			math = token.content;
			var res = this.readBitNot(ctx, look);
			look = Runtime.rtl.get(ctx, res, 0);
			look_value = Runtime.rtl.get(ctx, res, 1);
			var __v0 = use("Bayrell.Lang.OpCodes.OpMath");
			op_code = new __v0(ctx, use("Runtime.Dict").from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone(ctx)}));
			parser = look.clone(ctx);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
		}
		return use("Runtime.Collection").from([parser,op_code]);
	},
	/**
	 * Read bit and
	 */
	readBitAnd: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitShift(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		var caret_start = op_code.caret_start.clone(ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		while (!token.eof && token.content == "&")
		{
			math = token.content;
			var res = this.readBitShift(ctx, look);
			look = Runtime.rtl.get(ctx, res, 0);
			look_value = Runtime.rtl.get(ctx, res, 1);
			var __v0 = use("Bayrell.Lang.OpCodes.OpMath");
			op_code = new __v0(ctx, use("Runtime.Dict").from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone(ctx)}));
			parser = look.clone(ctx);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
		}
		return use("Runtime.Collection").from([parser,op_code]);
	},
	/**
	 * Read bit or
	 */
	readBitOr: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitAnd(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		var caret_start = op_code.caret_start.clone(ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		while (!token.eof && (token.content == "|" || token.content == "xor"))
		{
			math = token.content;
			var res = this.readBitAnd(ctx, look);
			look = Runtime.rtl.get(ctx, res, 0);
			look_value = Runtime.rtl.get(ctx, res, 1);
			var __v0 = use("Bayrell.Lang.OpCodes.OpMath");
			op_code = new __v0(ctx, use("Runtime.Dict").from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone(ctx)}));
			parser = look.clone(ctx);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
		}
		return use("Runtime.Collection").from([parser,op_code]);
	},
	/**
	 * Read factor
	 */
	readFactor: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitOr(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		var caret_start = op_code.caret_start.clone(ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		while (!token.eof && (token.content == "*" || token.content == "/" || token.content == "%" || token.content == "div" || token.content == "mod"))
		{
			math = token.content;
			var res = this.readBitOr(ctx, look);
			look = Runtime.rtl.get(ctx, res, 0);
			look_value = Runtime.rtl.get(ctx, res, 1);
			var __v0 = use("Bayrell.Lang.OpCodes.OpMath");
			op_code = new __v0(ctx, use("Runtime.Dict").from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone(ctx)}));
			parser = look.clone(ctx);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
		}
		return use("Runtime.Collection").from([parser,op_code]);
	},
	/**
	 * Read arithmetic
	 */
	readArithmetic: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readFactor(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		var caret_start = op_code.caret_start.clone(ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		while (!token.eof && (token.content == "+" || token.content == "-"))
		{
			math = token.content;
			var res = this.readFactor(ctx, look);
			look = Runtime.rtl.get(ctx, res, 0);
			look_value = Runtime.rtl.get(ctx, res, 1);
			var __v0 = use("Bayrell.Lang.OpCodes.OpMath");
			op_code = new __v0(ctx, use("Runtime.Dict").from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone(ctx)}));
			parser = look.clone(ctx);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
		}
		return use("Runtime.Collection").from([parser,op_code]);
	},
	/**
	 * Read concat
	 */
	readConcat: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readArithmetic(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		var caret_start = op_code.caret_start.clone(ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		while (!token.eof && token.content == "~")
		{
			math = token.content;
			var res = this.readArithmetic(ctx, look);
			look = Runtime.rtl.get(ctx, res, 0);
			look_value = Runtime.rtl.get(ctx, res, 1);
			var __v0 = use("Bayrell.Lang.OpCodes.OpMath");
			op_code = new __v0(ctx, use("Runtime.Dict").from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone(ctx)}));
			parser = look.clone(ctx);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
		}
		return use("Runtime.Collection").from([parser,op_code]);
	},
	/**
	 * Read compare
	 */
	readCompare: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readConcat(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		var caret_start = op_code.caret_start.clone(ctx);
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var content = token.content;
		if (content == "===" || content == "!==" || content == "==" || content == "!=" || content == ">=" || content == "<=" || content == ">" || content == "<")
		{
			var math = token.content;
			var res = this.readConcat(ctx, look);
			look = Runtime.rtl.get(ctx, res, 0);
			look_value = Runtime.rtl.get(ctx, res, 1);
			var __v0 = use("Bayrell.Lang.OpCodes.OpMath");
			op_code = new __v0(ctx, use("Runtime.Dict").from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}));
			parser = look.clone(ctx);
		}
		else if (content == "is" || content == "implements" || content == "instanceof")
		{
			var math = token.content;
			var res = parser.parser_base.constructor.readTypeIdentifier(ctx, look);
			look = Runtime.rtl.get(ctx, res, 0);
			look_value = Runtime.rtl.get(ctx, res, 1);
			var __v1 = use("Bayrell.Lang.OpCodes.OpMath");
			op_code = new __v1(ctx, use("Runtime.Dict").from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}));
			parser = look.clone(ctx);
		}
		return use("Runtime.Collection").from([parser,op_code]);
	},
	/**
	 * Read not
	 */
	readNot: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var caret_start = token.caret_start.clone(ctx);
		if (token.content == "not")
		{
			var op_code = null;
			var start = parser.clone(ctx);
			var res = this.readCompare(ctx, look.clone(ctx));
			parser = Runtime.rtl.get(ctx, res, 0);
			op_code = Runtime.rtl.get(ctx, res, 1);
			var __v0 = use("Bayrell.Lang.OpCodes.OpMath");
			return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"value1":op_code,"math":"not","caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
		}
		return this.readCompare(ctx, parser);
	},
	/**
	 * Read and
	 */
	readAnd: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readNot(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		var caret_start = op_code.caret_start.clone(ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		while (!token.eof && (token.content == "and" || token.content == "&&"))
		{
			math = token.content;
			var res = this.readNot(ctx, look);
			look = Runtime.rtl.get(ctx, res, 0);
			look_value = Runtime.rtl.get(ctx, res, 1);
			var __v0 = use("Bayrell.Lang.OpCodes.OpMath");
			op_code = new __v0(ctx, use("Runtime.Dict").from({"value1":op_code,"value2":look_value,"math":"and","caret_start":caret_start,"caret_end":look.caret.clone(ctx)}));
			parser = look.clone(ctx);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
		}
		return use("Runtime.Collection").from([parser,op_code]);
	},
	/**
	 * Read or
	 */
	readOr: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readAnd(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		var caret_start = op_code.caret_start.clone(ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		while (!token.eof && (token.content == "or" || token.content == "||"))
		{
			math = token.content;
			var res = this.readAnd(ctx, look);
			look = Runtime.rtl.get(ctx, res, 0);
			look_value = Runtime.rtl.get(ctx, res, 1);
			var __v0 = use("Bayrell.Lang.OpCodes.OpMath");
			op_code = new __v0(ctx, use("Runtime.Dict").from({"value1":op_code,"value2":look_value,"math":"or","caret_start":caret_start,"caret_end":look.caret.clone(ctx)}));
			parser = look.clone(ctx);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
		}
		return use("Runtime.Collection").from([parser,op_code]);
	},
	/**
	 * Read element
	 */
	readElement: function(ctx, parser)
	{
		/* Try to read function */
		if (parser.parser_operator.constructor.tryReadFunction(ctx, parser.clone(ctx), false))
		{
			return parser.parser_operator.constructor.readDeclareFunction(ctx, parser, false);
		}
		return this.readOr(ctx, parser);
	},
	/**
	 * Read ternary operation
	 */
	readTernary: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var condition = null;
		var if_true = null;
		var if_false = null;
		var res = this.readElement(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		var caret_start = op_code.caret_start.clone(ctx);
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content == "?")
		{
			condition = op_code;
			var res = this.readExpression(ctx, look);
			parser = Runtime.rtl.get(ctx, res, 0);
			if_true = Runtime.rtl.get(ctx, res, 1);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			if (token.content == ":")
			{
				var res = this.readExpression(ctx, look);
				parser = Runtime.rtl.get(ctx, res, 0);
				if_false = Runtime.rtl.get(ctx, res, 1);
			}
			var __v0 = use("Bayrell.Lang.OpCodes.OpTernary");
			op_code = new __v0(ctx, use("Runtime.Dict").from({"condition":condition,"if_true":if_true,"if_false":if_false,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}));
		}
		return use("Runtime.Collection").from([parser,op_code]);
	},
	/**
	 * Read pipe
	 */
	ExpressionPipe: function(ctx, parser)
	{
		var look = null;
		var look_token = null;
		var op_code = null;
		var is_next_attr = false;
		var save_is_pipe = parser.is_pipe;
		parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["is_pipe"]), false);
		var res = this.readTernary(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		var caret_start = op_code.caret_start;
		parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["is_pipe"]), save_is_pipe);
		var res = parser.parser_base.constructor.readToken(ctx, parser);
		look = Runtime.rtl.get(ctx, res, 0);
		look_token = Runtime.rtl.get(ctx, res, 1);
		if (look_token.content == "|>" || look_token.content == "->")
		{
			while (look_token.content == "->" || look_token.content == "|>" || look_token.content == ",")
			{
				parser = look;
				var value = null;
				var kind = "";
				var is_async = false;
				var is_monad = false;
				if (look_token.content == ",")
				{
					is_next_attr = true;
				}
				var res = parser.parser_base.constructor.readToken(ctx, parser);
				look = Runtime.rtl.get(ctx, res, 0);
				look_token = Runtime.rtl.get(ctx, res, 1);
				if (look_token.content == "await")
				{
					is_async = true;
					parser = look;
					var res = parser.parser_base.constructor.readToken(ctx, parser);
					look = Runtime.rtl.get(ctx, res, 0);
					look_token = Runtime.rtl.get(ctx, res, 1);
				}
				if (look_token.content == "monad")
				{
					is_monad = true;
					parser = look;
					var res = parser.parser_base.constructor.readToken(ctx, parser);
					look = Runtime.rtl.get(ctx, res, 0);
					look_token = Runtime.rtl.get(ctx, res, 1);
				}
				if (look_token.content == "attr")
				{
					parser = look;
					var res = this.readTernary(ctx, parser);
					parser = Runtime.rtl.get(ctx, res, 0);
					value = Runtime.rtl.get(ctx, res, 1);
					var __v0 = use("Bayrell.Lang.OpCodes.OpPipe");
					kind = __v0.KIND_ATTR;
				}
				else if (look_token.content == "\"" || look_token.content == "'")
				{
					var res = this.readTernary(ctx, parser);
					parser = Runtime.rtl.get(ctx, res, 0);
					value = Runtime.rtl.get(ctx, res, 1);
					var __v1 = use("Bayrell.Lang.OpCodes.OpPipe");
					kind = __v1.KIND_ATTR;
				}
				else if (look_token.content == "{")
				{
					parser = look;
					var res = this.readTernary(ctx, parser);
					parser = Runtime.rtl.get(ctx, res, 0);
					value = Runtime.rtl.get(ctx, res, 1);
					var __v2 = use("Bayrell.Lang.OpCodes.OpPipe");
					kind = __v2.KIND_ATTR;
					var res = parser.parser_base.constructor.matchToken(ctx, parser, "}");
					parser = Runtime.rtl.get(ctx, res, 0);
				}
				else if (is_next_attr)
				{
					var __v3 = use("Bayrell.Lang.Exceptions.ParserExpected");
					throw new __v3(ctx, "|>", parser.caret, parser.file_name)
				}
				else if (look_token.content == "default")
				{
					var arg1;
					var arg2;
					var __v4 = use("Bayrell.Lang.OpCodes.OpPipe");
					kind = __v4.KIND_MONAD;
					var __v12 = use("Bayrell.Lang.Exceptions.ParserError");
					try
					{
						var res = parser.parser_base.constructor.readIdentifier(ctx, look);
						parser = Runtime.rtl.get(ctx, res, 0);
						arg1 = Runtime.rtl.get(ctx, res, 1);
						var res = this.readTernary(ctx, parser);
						parser = Runtime.rtl.get(ctx, res, 0);
						arg2 = Runtime.rtl.get(ctx, res, 1);
						var __v5 = use("Bayrell.Lang.OpCodes.OpString");
						arg1 = new __v5(ctx, use("Runtime.Dict").from({"value":parser.constructor.findModuleName(ctx, parser, arg1.value),"caret_start":arg1.caret_start,"caret_end":arg1.caret_end}));
						var __v6 = use("Bayrell.Lang.OpCodes.OpCall");
						var __v7 = use("Bayrell.Lang.OpCodes.OpAttr");
						var __v8 = use("Bayrell.Lang.OpCodes.OpAttr");
						var __v9 = use("Bayrell.Lang.OpCodes.OpIdentifier");
						var __v10 = use("Bayrell.Lang.OpCodes.OpIdentifier");
						var __v11 = use("Bayrell.Lang.OpCodes.OpIdentifier");
						value = new __v6(ctx, use("Runtime.Dict").from({"args":use("Runtime.Collection").from([arg1,arg2]),"obj":new __v7(ctx, use("Runtime.Dict").from({"kind":__v8.KIND_STATIC,"obj":new __v9(ctx, use("Runtime.Dict").from({"kind":__v10.KIND_SYS_TYPE,"caret_start":caret_start,"caret_end":parser.caret,"value":"rtl"})),"value":new __v11(ctx, use("Runtime.Dict").from({"caret_start":caret_start,"caret_end":parser.caret,"value":"m_to"})),"caret_start":caret_start,"caret_end":parser.caret})),"caret_start":caret_start,"caret_end":parser.caret}));
					}
					catch (_ex)
					{
						if (_ex instanceof __v12)
						{
							var err = _ex;
							
							value = null;
						}
						else
						{
							throw _ex;
						}
					}
					if (value == null)
					{
						var res = this.readTernary(ctx, look);
						parser = Runtime.rtl.get(ctx, res, 0);
						arg2 = Runtime.rtl.get(ctx, res, 1);
						var __v5 = use("Bayrell.Lang.OpCodes.OpCall");
						var __v6 = use("Bayrell.Lang.OpCodes.OpAttr");
						var __v7 = use("Bayrell.Lang.OpCodes.OpAttr");
						var __v8 = use("Bayrell.Lang.OpCodes.OpIdentifier");
						var __v9 = use("Bayrell.Lang.OpCodes.OpIdentifier");
						var __v10 = use("Bayrell.Lang.OpCodes.OpIdentifier");
						value = new __v5(ctx, use("Runtime.Dict").from({"args":use("Runtime.Collection").from([arg2]),"obj":new __v6(ctx, use("Runtime.Dict").from({"kind":__v7.KIND_STATIC,"obj":new __v8(ctx, use("Runtime.Dict").from({"kind":__v9.KIND_SYS_TYPE,"caret_start":caret_start,"caret_end":parser.caret,"value":"rtl"})),"value":new __v10(ctx, use("Runtime.Dict").from({"caret_start":caret_start,"caret_end":parser.caret,"value":"m_def"})),"caret_start":caret_start,"caret_end":parser.caret})),"caret_start":caret_start,"caret_end":parser.caret}));
					}
				}
				else if (look_token.content == "method" || look_token.content == "." || look_token.content == ":" || look_token.content == "::")
				{
					parser = look;
					var __v5 = use("Bayrell.Lang.OpCodes.OpPipe");
					kind = __v5.KIND_CALL;
					/* Set pipe */
					var save_find_ident = parser.find_ident;
					parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["find_ident"]), false);
					parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["is_pipe"]), true);
					if (look_token.content == ".")
					{
						var __v6 = use("Bayrell.Lang.OpCodes.OpAttr");
						parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["pipe_kind"]), __v6.KIND_ATTR);
					}
					else
					{
						var __v7 = use("Bayrell.Lang.OpCodes.OpAttr");
						parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["pipe_kind"]), __v7.KIND_STATIC);
					}
					var res = parser.parser_base.constructor.readDynamic(ctx, parser);
					parser = Runtime.rtl.get(ctx, res, 0);
					value = Runtime.rtl.get(ctx, res, 1);
					/* Restore parser */
					parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["is_pipe"]), false);
					parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["find_ident"]), save_find_ident);
				}
				else
				{
					var __v6 = use("Bayrell.Lang.OpCodes.OpPipe");
					kind = __v6.KIND_CALL;
					var res = parser.parser_base.constructor.readDynamic(ctx, parser);
					parser = Runtime.rtl.get(ctx, res, 0);
					value = Runtime.rtl.get(ctx, res, 1);
				}
				var __v0 = use("Bayrell.Lang.OpCodes.OpPipe");
				op_code = new __v0(ctx, use("Runtime.Dict").from({"obj":op_code,"kind":kind,"value":value,"is_async":is_async,"is_monad":is_monad,"caret_start":caret_start,"caret_end":parser.caret}));
				var res = parser.parser_base.constructor.readToken(ctx, parser);
				look = Runtime.rtl.get(ctx, res, 0);
				look_token = Runtime.rtl.get(ctx, res, 1);
				is_next_attr = false;
			}
		}
		return use("Runtime.Collection").from([parser,op_code]);
	},
	/**
	 * Read expression
	 */
	readExpression: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content == "<")
		{
			return parser.parser_html.constructor.readHTML(ctx, parser);
		}
		else if (token.content == "@css")
		{
			return parser.parser_html.constructor.readCss(ctx, parser);
		}
		return this.ExpressionPipe(ctx, parser);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayExpression";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangBay.ParserBayExpression",
			"name": "Bayrell.Lang.LangBay.ParserBayExpression",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Bayrell.Lang.LangBay.ParserBayExpression);
module.exports = Bayrell.Lang.LangBay.ParserBayExpression;