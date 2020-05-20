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
Bayrell.Lang.LangBay.ParserBayOperator = function(ctx)
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayOperator.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.LangBay.ParserBayOperator"))
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
		return "Bayrell.Lang.LangBay.ParserBayOperator";
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayOperator,
{
	/**
	 * Read return
	 */
	readReturn: function(ctx, parser)
	{
		var token = null;
		var op_code = null;
		var look = null;
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "return");
		parser = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var caret_start = token.caret_start.clone(ctx);
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content != ";")
		{
			var res = parser.parser_expression.constructor.readExpression(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			op_code = Runtime.rtl.get(ctx, res, 1);
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpReturn");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"expression":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
	},
	/**
	 * Read delete
	 */
	readDelete: function(ctx, parser)
	{
		var token = null;
		var op_code = null;
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "delete");
		parser = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var caret_start = token.caret_start.clone(ctx);
		var res = parser.parser_base.constructor.readDynamic(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		var __v0 = use("Bayrell.Lang.OpCodes.OpDelete");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"op_code":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
	},
	/**
	 * Read throw
	 */
	readThrow: function(ctx, parser)
	{
		var token = null;
		var op_code = null;
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "throw");
		parser = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var caret_start = token.caret_start.clone(ctx);
		var res = parser.parser_expression.constructor.readExpression(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		var __v0 = use("Bayrell.Lang.OpCodes.OpThrow");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"expression":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
	},
	/**
	 * Read try
	 */
	readTry: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_try = null;
		var __v0 = use("Runtime.Vector");
		var items = new __v0(ctx);
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "try");
		parser = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var caret_start = token.caret_start.clone(ctx);
		/* Try */
		var res = this.readOperators(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		op_try = Runtime.rtl.get(ctx, res, 1);
		/* Catch */
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		while (!token.eof && token.content == "catch")
		{
			parser = look.clone(ctx);
			var op_catch = null;
			var var_op_code = null;
			var pattern = null;
			var item_caret_start = token.caret_start.clone(ctx);
			/* Read ident */
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "(");
			parser = Runtime.rtl.get(ctx, res, 0);
			var res = parser.parser_base.constructor.readTypeIdentifier(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			pattern = Runtime.rtl.get(ctx, res, 1);
			var res = parser.parser_base.constructor.readIdentifier(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			var_op_code = Runtime.rtl.get(ctx, res, 1);
			var var_name = var_op_code.value;
			var res = parser.parser_base.constructor.matchToken(ctx, parser, ")");
			parser = Runtime.rtl.get(ctx, res, 0);
			/* Save vars */
			var save_vars = parser.vars;
			parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["vars"]), parser.vars.setIm(ctx, var_name, true));
			/* Catch operators */
			var res = this.readOperators(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			op_catch = Runtime.rtl.get(ctx, res, 1);
			/* Restore vars */
			parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["vars"]), save_vars);
			var __v0 = use("Bayrell.Lang.OpCodes.OpTryCatchItem");
			var item = new __v0(ctx, use("Runtime.Dict").from({"name":var_name,"pattern":pattern,"value":op_catch,"caret_start":item_caret_start,"caret_end":parser.caret.clone(ctx)}));
			items.push(ctx, item);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpTryCatch");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"op_try":op_try,"items":items.toCollection(ctx),"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
	},
	/**
	 * Read then
	 */
	readThen: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content == "then")
		{
			return use("Runtime.Collection").from([look,token]);
		}
		return use("Runtime.Collection").from([parser,token]);
	},
	/**
	 * Read do
	 */
	readDo: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content == "do")
		{
			return use("Runtime.Collection").from([look,token]);
		}
		return use("Runtime.Collection").from([parser,token]);
	},
	/**
	 * Read if
	 */
	readIf: function(ctx, parser)
	{
		var look = null;
		var look2 = null;
		var token = null;
		var token2 = null;
		var if_condition = null;
		var if_true = null;
		var if_false = null;
		var __v0 = use("Runtime.Vector");
		var if_else = new __v0(ctx);
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "if");
		parser = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var caret_start = token.caret_start.clone(ctx);
		/* Read expression */
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "(");
		parser = Runtime.rtl.get(ctx, res, 0);
		var res = parser.parser_expression.constructor.readExpression(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		if_condition = Runtime.rtl.get(ctx, res, 1);
		var res = parser.parser_base.constructor.matchToken(ctx, parser, ")");
		parser = Runtime.rtl.get(ctx, res, 0);
		var res = this.readThen(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		/* If true */
		var res = this.readOperators(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		if_true = Runtime.rtl.get(ctx, res, 1);
		/* Else */
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		while (!token.eof && (token.content == "else" || token.content == "elseif"))
		{
			var res = parser.parser_base.constructor.readToken(ctx, look.clone(ctx));
			look2 = Runtime.rtl.get(ctx, res, 0);
			token2 = Runtime.rtl.get(ctx, res, 1);
			if (token2.content == "elseif" || token2.content == "if")
			{
				var ifelse_condition = null;
				var ifelse_block = null;
				if (token.content == "elseif")
				{
					parser = look.clone(ctx);
				}
				else if (token2.content == "if")
				{
					parser = look2.clone(ctx);
				}
				/* Read expression */
				var res = parser.parser_base.constructor.matchToken(ctx, parser, "(");
				parser = Runtime.rtl.get(ctx, res, 0);
				var res = parser.parser_expression.constructor.readExpression(ctx, parser);
				parser = Runtime.rtl.get(ctx, res, 0);
				ifelse_condition = Runtime.rtl.get(ctx, res, 1);
				var res = parser.parser_base.constructor.matchToken(ctx, parser, ")");
				parser = Runtime.rtl.get(ctx, res, 0);
				var res = this.readThen(ctx, parser);
				parser = Runtime.rtl.get(ctx, res, 0);
				var res = this.readOperators(ctx, parser);
				parser = Runtime.rtl.get(ctx, res, 0);
				ifelse_block = Runtime.rtl.get(ctx, res, 1);
				var __v0 = use("Bayrell.Lang.OpCodes.OpIfElse");
				if_else.push(ctx, new __v0(ctx, use("Runtime.Dict").from({"condition":ifelse_condition,"if_true":ifelse_block,"caret_start":token2.caret_start.clone(ctx),"caret_end":parser.caret.clone(ctx)})));
			}
			else
			{
				var res = this.readOperators(ctx, look.clone(ctx));
				parser = Runtime.rtl.get(ctx, res, 0);
				if_false = Runtime.rtl.get(ctx, res, 1);
				break;
			}
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpIf");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"condition":if_condition,"if_true":if_true,"if_false":if_false,"if_else":if_else.toCollection(ctx),"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
	},
	/**
	 * Read For
	 */
	readFor: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var expr1 = null;
		var expr2 = null;
		var expr3 = null;
		/* Save vars */
		var save_vars = parser.vars;
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "for");
		parser = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var caret_start = token.caret_start.clone(ctx);
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "(");
		parser = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var res = this.readAssign(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		expr1 = Runtime.rtl.get(ctx, res, 1);
		var res = parser.parser_base.constructor.matchToken(ctx, parser, ";");
		parser = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var res = parser.parser_expression.constructor.readExpression(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		expr2 = Runtime.rtl.get(ctx, res, 1);
		var res = parser.parser_base.constructor.matchToken(ctx, parser, ";");
		parser = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var res = this.readOperator(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		expr3 = Runtime.rtl.get(ctx, res, 1);
		var res = parser.parser_base.constructor.matchToken(ctx, parser, ")");
		parser = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var res = this.readOperators(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		/* Restore vars */
		parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["vars"]), save_vars);
		var __v0 = use("Bayrell.Lang.OpCodes.OpFor");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"expr1":expr1,"expr2":expr2,"expr3":expr3,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
	},
	/**
	 * Read While
	 */
	readWhile: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var condition = null;
		var op_code = null;
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "while");
		parser = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var caret_start = token.caret_start.clone(ctx);
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "(");
		parser = Runtime.rtl.get(ctx, res, 0);
		var res = parser.parser_expression.constructor.readExpression(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		condition = Runtime.rtl.get(ctx, res, 1);
		var res = parser.parser_base.constructor.matchToken(ctx, parser, ")");
		parser = Runtime.rtl.get(ctx, res, 0);
		var res = this.readDo(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var res = this.readOperators(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		var __v0 = use("Bayrell.Lang.OpCodes.OpWhile");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"condition":condition,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
	},
	/**
	 * Read assign
	 */
	readAssign: function(ctx, parser)
	{
		var start = parser.clone(ctx);
		var save = null;
		var look = null;
		var token = null;
		var pattern = null;
		var op_code = null;
		var reg_name = null;
		var expression = null;
		var names = null;
		var values = null;
		var __v0 = use("Bayrell.Lang.OpCodes.OpAssign");
		var kind = __v0.KIND_ASSIGN;
		var var_name = "";
		var res = parser.parser_base.constructor.readIdentifier(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		var caret_start = op_code.caret_start.clone(ctx);
		var_name = op_code.value;
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content == "<=")
		{
			var __v0 = use("Runtime.Vector");
			var arr = new __v0(ctx);
			while (!token.eof && token.content == "<=")
			{
				parser = look.clone(ctx);
				save = parser.clone(ctx);
				var res = parser.parser_base.constructor.readToken(ctx, parser);
				parser = Runtime.rtl.get(ctx, res, 0);
				token = Runtime.rtl.get(ctx, res, 1);
				var name = token.content;
				var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
				look = Runtime.rtl.get(ctx, res, 0);
				token = Runtime.rtl.get(ctx, res, 1);
				if (token.content != "<=")
				{
					parser = save.clone(ctx);
					break;
				}
				else
				{
					if (!parser.parser_base.constructor.isIdentifier(ctx, name))
					{
						var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
						throw new __v0(ctx, "Identifier", save.caret.clone(ctx), parser.file_name)
					}
					arr.push(ctx, name);
				}
			}
			names = arr.toCollection(ctx);
			var res = parser.parser_expression.constructor.readExpression(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			expression = Runtime.rtl.get(ctx, res, 1);
			var __v0 = use("Bayrell.Lang.OpCodes.OpAssignStruct");
			return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"caret_start":caret_start,"caret_end":parser.caret.clone(ctx),"expression":expression,"var_name":var_name,"names":names}))]);
		}
		if (token.content != "=" && token.content != "+=" && token.content != "-=" && token.content != "~=" && token.content != "." && token.content != "::" && token.content != "[")
		{
			var var_op_code = null;
			var __v0 = use("Bayrell.Lang.OpCodes.OpAssign");
			kind = __v0.KIND_DECLARE;
			var __v0 = use("Runtime.Vector");
			values = new __v0(ctx);
			parser = start.clone(ctx);
			var res = parser.parser_base.constructor.readTypeIdentifier(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			pattern = Runtime.rtl.get(ctx, res, 1);
			var res = parser.parser_base.constructor.readIdentifier(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			var_op_code = Runtime.rtl.get(ctx, res, 1);
			var_name = var_op_code.value;
			/* Read expression */
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			if (token.content == "=")
			{
				var res = parser.parser_expression.constructor.readExpression(ctx, look.clone(ctx));
				parser = Runtime.rtl.get(ctx, res, 0);
				expression = Runtime.rtl.get(ctx, res, 1);
			}
			else
			{
				expression = null;
			}
			parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["vars"]), parser.vars.setIm(ctx, var_name, true));
			var __v0 = use("Bayrell.Lang.OpCodes.OpAssignValue");
			values.push(ctx, new __v0(ctx, use("Runtime.Dict").from({"var_name":var_name,"expression":expression,"caret_start":var_op_code.caret_start.clone(ctx),"caret_end":parser.caret.clone(ctx)})));
			/* Look next token */
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			while (!token.eof && token.content == ",")
			{
				var res = parser.parser_base.constructor.readIdentifier(ctx, look.clone(ctx));
				parser = Runtime.rtl.get(ctx, res, 0);
				var_op_code = Runtime.rtl.get(ctx, res, 1);
				var_name = var_op_code.value;
				/* Read expression */
				var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
				look = Runtime.rtl.get(ctx, res, 0);
				token = Runtime.rtl.get(ctx, res, 1);
				if (token.content == "=")
				{
					var res = parser.parser_expression.constructor.readExpression(ctx, look.clone(ctx));
					parser = Runtime.rtl.get(ctx, res, 0);
					expression = Runtime.rtl.get(ctx, res, 1);
				}
				else
				{
					expression = null;
				}
				parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["vars"]), parser.vars.setIm(ctx, var_name, true));
				var __v0 = use("Bayrell.Lang.OpCodes.OpAssignValue");
				values.push(ctx, new __v0(ctx, use("Runtime.Dict").from({"var_name":var_name,"expression":expression,"caret_start":var_op_code.caret_start.clone(ctx),"caret_end":parser.caret.clone(ctx)})));
				var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
				look = Runtime.rtl.get(ctx, res, 0);
				token = Runtime.rtl.get(ctx, res, 1);
			}
			var_name = "";
			expression = null;
		}
		else
		{
			parser = start.clone(ctx);
			var __v0 = use("Bayrell.Lang.OpCodes.OpAssign");
			kind = __v0.KIND_ASSIGN;
			var op = "";
			var res = parser.parser_base.constructor.readDynamic(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			var op_code = Runtime.rtl.get(ctx, res, 1);
			var res = parser.parser_base.constructor.readToken(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			if (token.content == "=" || token.content == "+=" || token.content == "-=" || token.content == "~=")
			{
				op = token.content;
			}
			else
			{
				var __v0 = use("Bayrell.Lang.Exceptions.ParserError");
				throw new __v0(ctx, "Unknown operator " + use("Runtime.rtl").toStr(token.content), token.caret_start.clone(ctx), parser.file_name)
			}
			var res = parser.parser_expression.constructor.readExpression(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			expression = Runtime.rtl.get(ctx, res, 1);
			var __v0 = use("Bayrell.Lang.OpCodes.OpAssignValue");
			values = use("Runtime.Collection").from([new __v0(ctx, use("Runtime.Dict").from({"op_code":op_code,"expression":expression,"op":op}))]);
			var_name = "";
			expression = null;
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpAssign");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"pattern":pattern,"values":(values != null) ? (values.toCollection(ctx)) : (null),"caret_start":caret_start,"caret_end":parser.caret.clone(ctx),"expression":expression,"var_name":var_name,"names":names,"kind":kind}))]);
	},
	/**
	 * Read operator
	 */
	readInc: function(ctx, parser)
	{
		var look = null;
		var look1 = null;
		var look2 = null;
		var token = null;
		var token1 = null;
		var token2 = null;
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look1 = Runtime.rtl.get(ctx, res, 0);
		token1 = Runtime.rtl.get(ctx, res, 1);
		var caret_start = token1.caret_start.clone(ctx);
		var res = parser.parser_base.constructor.readToken(ctx, look1.clone(ctx));
		look2 = Runtime.rtl.get(ctx, res, 0);
		token2 = Runtime.rtl.get(ctx, res, 1);
		var look1_content = token1.content;
		var look2_content = token2.content;
		if ((look1_content == "++" || look1_content == "--") && parser.parser_base.constructor.isIdentifier(ctx, look2_content))
		{
			parser = look2.clone(ctx);
			var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			var op_code = new __v0(ctx, use("Runtime.Dict").from({"value":look2_content,"caret_start":token2.caret_start.clone(ctx),"caret_end":token2.caret_end.clone(ctx)}));
			var __v0 = use("Bayrell.Lang.OpCodes.OpInc");
			var __v1 = use("Bayrell.Lang.OpCodes.OpInc");
			var __v2 = use("Bayrell.Lang.OpCodes.OpInc");
			op_code = new __v0(ctx, use("Runtime.Dict").from({"kind":(look1_content == "++") ? (__v1.KIND_PRE_INC) : (__v2.KIND_PRE_DEC),"value":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}));
			return use("Runtime.Collection").from([parser,op_code]);
		}
		if ((look2_content == "++" || look2_content == "--") && parser.parser_base.constructor.isIdentifier(ctx, look1_content))
		{
			parser = look2.clone(ctx);
			var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			var op_code = new __v0(ctx, use("Runtime.Dict").from({"value":look1_content,"caret_start":token1.caret_start.clone(ctx),"caret_end":token1.caret_end.clone(ctx)}));
			var __v0 = use("Bayrell.Lang.OpCodes.OpInc");
			var __v1 = use("Bayrell.Lang.OpCodes.OpInc");
			var __v2 = use("Bayrell.Lang.OpCodes.OpInc");
			op_code = new __v0(ctx, use("Runtime.Dict").from({"kind":(look2_content == "++") ? (__v1.KIND_POST_INC) : (__v2.KIND_POST_DEC),"value":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}));
			return use("Runtime.Collection").from([parser,op_code]);
		}
		return use("Runtime.Collection").from([parser,null]);
	},
	/**
	 * Read call function
	 */
	readCallFunction: function(ctx, parser)
	{
		var op_code = null;
		var res = parser.parser_base.constructor.readDynamic(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		var __v0 = use("Bayrell.Lang.OpCodes.OpCall");
		var __v1 = use("Bayrell.Lang.OpCodes.OpPipe");
		if (op_code instanceof __v0 || op_code instanceof __v1)
		{
			return use("Runtime.Collection").from([parser,op_code]);
		}
		return use("Runtime.Collection").from([parser,null]);
	},
	/**
	 * Read operator
	 */
	readOperator: function(ctx, parser)
	{
		var look = null;
		var token = null;
		parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["skip_comments"]), false);
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var caret_start = token.caret_start.clone(ctx);
		parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["skip_comments"]), true);
		if (token.content == "/")
		{
			return parser.parser_base.constructor.readComment(ctx, parser);
		}
		else if (token.content == "#switch" || token.content == "#ifcode")
		{
			return parser.parser_preprocessor.constructor.readPreprocessor(ctx, parser);
		}
		else if (token.content == "#ifdef")
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpPreprocessorIfDef");
			return parser.parser_preprocessor.constructor.readPreprocessorIfDef(ctx, parser, __v0.KIND_OPERATOR);
		}
		else if (token.content == "break")
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpBreak");
			return use("Runtime.Collection").from([look,new __v0(ctx, use("Runtime.Dict").from({"caret_start":caret_start,"caret_end":look.caret}))]);
		}
		else if (token.content == "continue")
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpContinue");
			return use("Runtime.Collection").from([look,new __v0(ctx, use("Runtime.Dict").from({"caret_start":caret_start,"caret_end":look.caret.clone(ctx)}))]);
		}
		else if (token.content == "delete")
		{
			return this.readDelete(ctx, parser);
		}
		else if (token.content == "return")
		{
			return this.readReturn(ctx, parser);
		}
		else if (token.content == "throw")
		{
			return this.readThrow(ctx, parser);
		}
		else if (token.content == "try")
		{
			return this.readTry(ctx, parser);
		}
		else if (token.content == "if")
		{
			return this.readIf(ctx, parser);
		}
		else if (token.content == "for")
		{
			return this.readFor(ctx, parser);
		}
		else if (token.content == "while")
		{
			return this.readWhile(ctx, parser);
		}
		var op_code = null;
		/* Read op inc */
		var res = this.readInc(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		if (op_code != null)
		{
			return res;
		}
		/* Read op call function */
		var res = this.readCallFunction(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		if (op_code != null)
		{
			return res;
		}
		var save_parser = parser;
		/* Try to read pipe */
		var res = parser.parser_base.constructor.readIdentifier(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		var caret_start = op_code.caret_start.clone(ctx);
		var var_name = op_code.value;
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content == "->")
		{
			return parser.parser_expression.constructor.ExpressionPipe(ctx, save_parser);
		}
		parser = save_parser;
		return this.readAssign(ctx, parser);
	},
	/**
	 * Read operators
	 */
	readOpItems: function(ctx, parser, end_tag)
	{
		if (end_tag == undefined) end_tag = "}";
		var look = null;
		var token = null;
		var op_code = null;
		var __v0 = use("Runtime.Vector");
		var arr = new __v0(ctx);
		var caret_start = parser.caret;
		parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["skip_comments"]), false);
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["skip_comments"]), true);
		while (!token.eof && token.content != end_tag)
		{
			var parser_value = null;
			var res = this.readOperator(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			parser_value = Runtime.rtl.get(ctx, res, 1);
			if (parser_value != null)
			{
				arr.push(ctx, parser_value);
			}
			parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["skip_comments"]), false);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["skip_comments"]), true);
			if (token.content == ";")
			{
				parser = look.clone(ctx);
				parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["skip_comments"]), false);
				var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
				look = Runtime.rtl.get(ctx, res, 0);
				token = Runtime.rtl.get(ctx, res, 1);
				parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["skip_comments"]), true);
			}
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpItems");
		op_code = new __v0(ctx, use("Runtime.Dict").from({"items":arr.toCollection(ctx),"caret_start":caret_start,"caret_end":parser.caret}));
		return use("Runtime.Collection").from([parser,op_code]);
	},
	/**
	 * Read operators
	 */
	readOperators: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		/* Save vars */
		var save_vars = parser.vars;
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var caret_start = token.caret_start.clone(ctx);
		if (token.content == "{")
		{
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "{");
			parser = Runtime.rtl.get(ctx, res, 0);
			var res = this.readOpItems(ctx, parser, "}");
			parser = Runtime.rtl.get(ctx, res, 0);
			op_code = Runtime.rtl.get(ctx, res, 1);
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "}");
			parser = Runtime.rtl.get(ctx, res, 0);
		}
		else
		{
			var res = this.readOperator(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			op_code = Runtime.rtl.get(ctx, res, 1);
			var res = parser.parser_base.constructor.matchToken(ctx, parser, ";");
			parser = Runtime.rtl.get(ctx, res, 0);
		}
		/* Restore vars */
		parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["vars"]), save_vars);
		return use("Runtime.Collection").from([parser,op_code]);
	},
	/**
	 * Read flags
	 */
	readFlags: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var __v0 = use("Runtime.Map");
		var values = new __v0(ctx);
		var __v0 = use("Bayrell.Lang.OpCodes.OpFlags");
		var current_flags = __v0.getFlags(ctx);
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		while (!token.eof && current_flags.indexOf(ctx, token.content) >= 0)
		{
			var flag = token.content;
			values.set(ctx, "p_" + use("Runtime.rtl").toStr(flag), true);
			parser = look.clone(ctx);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpFlags");
		return use("Runtime.Collection").from([parser,new __v0(ctx, values)]);
	},
	/**
	 * Read function args
	 */
	readDeclareFunctionArgs: function(ctx, parser, find_ident)
	{
		if (find_ident == undefined) find_ident = true;
		var look = null;
		var token = null;
		var __v0 = use("Runtime.Vector");
		var items = new __v0(ctx);
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "(");
		parser = Runtime.rtl.get(ctx, res, 0);
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		while (!token.eof && token.content != ")")
		{
			var arg_value = null;
			var arg_pattern = null;
			var arg_expression = null;
			var arg_start = parser;
			/* Arg type */
			var res = parser.parser_base.constructor.readTypeIdentifier(ctx, parser, find_ident);
			parser = Runtime.rtl.get(ctx, res, 0);
			arg_pattern = Runtime.rtl.get(ctx, res, 1);
			/* Arg name */
			var res = parser.parser_base.constructor.readIdentifier(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			arg_value = Runtime.rtl.get(ctx, res, 1);
			var arg_name = arg_value.value;
			/* Arg expression */
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			if (token.content == "=")
			{
				parser = look.clone(ctx);
				var save_vars = parser.vars;
				var __v0 = use("Runtime.Dict");
				parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["vars"]), new __v0(ctx));
				var res = parser.parser_expression.constructor.readExpression(ctx, parser);
				parser = Runtime.rtl.get(ctx, res, 0);
				arg_expression = Runtime.rtl.get(ctx, res, 1);
				parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["vars"]), save_vars);
			}
			/* Register variable in parser */
			parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["vars"]), parser.vars.setIm(ctx, arg_name, true));
			var __v0 = use("Bayrell.Lang.OpCodes.OpDeclareFunctionArg");
			items.push(ctx, new __v0(ctx, use("Runtime.Dict").from({"pattern":arg_pattern,"name":arg_name,"expression":arg_expression,"caret_start":arg_pattern.caret_start.clone(ctx),"caret_end":parser.caret.clone(ctx)})));
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			if (token.content == ",")
			{
				parser = look.clone(ctx);
				var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
				look = Runtime.rtl.get(ctx, res, 0);
				token = Runtime.rtl.get(ctx, res, 1);
			}
		}
		var res = parser.parser_base.constructor.matchToken(ctx, parser, ")");
		parser = Runtime.rtl.get(ctx, res, 0);
		return use("Runtime.Collection").from([parser,items.toCollection(ctx)]);
	},
	/**
	 * Read function variables
	 */
	readDeclareFunctionUse: function(ctx, parser, vars, find_ident)
	{
		if (vars == undefined) vars = null;
		if (find_ident == undefined) find_ident = true;
		var look = null;
		var token = null;
		var __v0 = use("Runtime.Vector");
		var items = new __v0(ctx);
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content == "use")
		{
			parser = look.clone(ctx);
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "(");
			parser = Runtime.rtl.get(ctx, res, 0);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			while (!token.eof && token.content != ")")
			{
				var ident = null;
				var res = parser.parser_base.constructor.readIdentifier(ctx, parser);
				parser = Runtime.rtl.get(ctx, res, 0);
				ident = Runtime.rtl.get(ctx, res, 1);
				var name = ident.value;
				if (vars != null && find_ident)
				{
					if (!vars.has(ctx, name))
					{
						var __v0 = use("Bayrell.Lang.Exceptions.ParserError");
						throw new __v0(ctx, "Unknown identifier '" + use("Runtime.rtl").toStr(name) + use("Runtime.rtl").toStr("'"), ident.caret_start.clone(ctx), parser.file_name)
					}
				}
				items.push(ctx, name);
				var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
				look = Runtime.rtl.get(ctx, res, 0);
				token = Runtime.rtl.get(ctx, res, 1);
				if (token.content == ",")
				{
					parser = look.clone(ctx);
					var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
					look = Runtime.rtl.get(ctx, res, 0);
					token = Runtime.rtl.get(ctx, res, 1);
				}
			}
			var res = parser.parser_base.constructor.matchToken(ctx, parser, ")");
			parser = Runtime.rtl.get(ctx, res, 0);
		}
		return use("Runtime.Collection").from([parser,items.toCollection(ctx)]);
	},
	/**
	 * Read function
	 */
	readDeclareFunction: function(ctx, parser, has_name)
	{
		if (has_name == undefined) has_name = true;
		var look = null;
		var parser_value = null;
		var op_code = null;
		var token = null;
		var flags = null;
		/* Clear vars */
		var save_vars = parser.vars;
		var __v0 = use("Runtime.Dict");
		parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["vars"]), new __v0(ctx));
		var res = parser.parser_base.constructor.readToken(ctx, parser);
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content == "async")
		{
			parser = look;
			var __v0 = use("Bayrell.Lang.OpCodes.OpFlags");
			flags = new __v0(ctx, use("Runtime.Dict").from({"p_async":true}));
		}
		var res = parser.parser_base.constructor.readTypeIdentifier(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		parser_value = Runtime.rtl.get(ctx, res, 1);
		var caret_start = parser_value.caret_start.clone(ctx);
		var result_type = parser_value;
		var expression = null;
		var is_context = true;
		var name = "";
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content == "@")
		{
			is_context = false;
			parser = look;
		}
		if (has_name)
		{
			var res = parser.parser_base.constructor.readIdentifier(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			parser_value = Runtime.rtl.get(ctx, res, 1);
			var name = parser_value.value;
		}
		/* Read function arguments */
		var args = null;
		var res = this.readDeclareFunctionArgs(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		args = Runtime.rtl.get(ctx, res, 1);
		/* Read function variables */
		var vars = null;
		var res = this.readDeclareFunctionUse(ctx, parser, save_vars);
		parser = Runtime.rtl.get(ctx, res, 0);
		vars = Runtime.rtl.get(ctx, res, 1);
		/* Add variables */
		vars.each(ctx, (ctx, name) => 
		{
			parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["vars"]), parser.vars.setIm(ctx, name, true));
		});
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content == "=>")
		{
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "=>");
			parser = Runtime.rtl.get(ctx, res, 0);
			var res = parser.parser_expression.constructor.readExpression(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			expression = Runtime.rtl.get(ctx, res, 1);
			op_code = null;
		}
		else if (token.content == "{")
		{
			var save = parser.clone(ctx);
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "{");
			parser = Runtime.rtl.get(ctx, res, 0);
			var res = this.readOperators(ctx, save);
			parser = Runtime.rtl.get(ctx, res, 0);
			op_code = Runtime.rtl.get(ctx, res, 1);
		}
		else if (token.content == ";")
		{
			var res = parser.parser_base.constructor.matchToken(ctx, parser, ";");
			parser = Runtime.rtl.get(ctx, res, 0);
			expression = null;
			op_code = null;
		}
		/* Restore vars */
		parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["vars"]), save_vars);
		var __v0 = use("Bayrell.Lang.OpCodes.OpDeclareFunction");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"args":args,"vars":vars,"flags":flags,"name":name,"is_context":is_context,"result_type":result_type,"expression":expression,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
	},
	/**
	 * Returns true if next is function
	 */
	tryReadFunction: function(ctx, parser, has_name, flags)
	{
		if (has_name == undefined) has_name = true;
		if (flags == undefined) flags = null;
		var look = null;
		var parser_value = null;
		var token = null;
		/* Clear vars */
		var save_vars = parser.vars;
		var __v0 = use("Runtime.Dict");
		parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["vars"]), new __v0(ctx));
		parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["find_ident"]), false);
		var res = false;
		var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
		try
		{
			var res = parser.parser_base.constructor.readToken(ctx, parser);
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			if (token.content == "async")
			{
				parser = look;
			}
			var res = parser.parser_base.constructor.readTypeIdentifier(ctx, parser, false);
			parser = Runtime.rtl.get(ctx, res, 0);
			parser_value = Runtime.rtl.get(ctx, res, 1);
			var caret_start = parser_value.caret_start.clone(ctx);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			if (token.content == "@")
			{
				parser = look;
			}
			if (has_name)
			{
				var res = parser.parser_base.constructor.readIdentifier(ctx, parser);
				parser = Runtime.rtl.get(ctx, res, 0);
			}
			var res = this.readDeclareFunctionArgs(ctx, parser, false);
			parser = Runtime.rtl.get(ctx, res, 0);
			var res = this.readDeclareFunctionUse(ctx, parser, null, false);
			parser = Runtime.rtl.get(ctx, res, 0);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			if (flags != null && flags.p_declare || parser.current_class_kind == "interface")
			{
				if (token.content != ";")
				{
					var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
					throw new __v0(ctx, "Function", caret_start, parser.file_name)
				}
			}
			else if (token.content != "=>" && token.content != "{")
			{
				var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
				throw new __v0(ctx, "Function", caret_start, parser.file_name)
			}
			res = true;
		}
		catch (_ex)
		{
			if (_ex instanceof __v0)
			{
				var e = _ex;
				
				res = false;
			}
			else
			{
				throw _ex;
			}
		}
		/* Restore vars */
		parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["vars"]), save_vars);
		parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["find_ident"]), true);
		return res;
	},
	/**
	 * Read annotation
	 */
	readAnnotation: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var name = null;
		var params = null;
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "@");
		parser = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var caret_start = token.caret_start.clone(ctx);
		var res = parser.parser_base.constructor.readTypeIdentifier(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		name = Runtime.rtl.get(ctx, res, 1);
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content == "{")
		{
			var res = parser.parser_base.constructor.readDict(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			params = Runtime.rtl.get(ctx, res, 1);
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpAnnotation");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"name":name,"params":params}))]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayOperator";
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
			"class_name": "Bayrell.Lang.LangBay.ParserBayOperator",
			"name": "Bayrell.Lang.LangBay.ParserBayOperator",
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
});use.add(Bayrell.Lang.LangBay.ParserBayOperator);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangBay == undefined) module.exports.Bayrell.Lang.LangBay = {};
module.exports.Bayrell.Lang.LangBay.ParserBayOperator = Bayrell.Lang.LangBay.ParserBayOperator;