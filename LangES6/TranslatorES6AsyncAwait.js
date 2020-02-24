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
if (typeof Bayrell.Lang.LangES6 == 'undefined') Bayrell.Lang.LangES6 = {};
Bayrell.Lang.LangES6.TranslatorES6AsyncAwait = function(ctx)
{
	use("Runtime.CoreStruct").apply(this, arguments);
};
Bayrell.Lang.LangES6.TranslatorES6AsyncAwait.prototype = Object.create(use("Runtime.CoreStruct").prototype);
Bayrell.Lang.LangES6.TranslatorES6AsyncAwait.prototype.constructor = Bayrell.Lang.LangES6.TranslatorES6AsyncAwait;
Object.assign(Bayrell.Lang.LangES6.TranslatorES6AsyncAwait.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		var __v0 = use("Runtime.Collection");
		this.async_stack = new __v0(ctx);
		this.pos = use("Runtime.Collection").from([0]);
		this.async_t = "__async_t";
		this.async_var = "__async_var";
		use("Runtime.CoreStruct").prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.LangES6.TranslatorES6AsyncAwait"))
		{
			this.async_stack = o.async_stack;
			this.pos = o.pos;
			this.async_t = o.async_t;
			this.async_var = o.async_var;
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "async_stack")this.async_stack = v;
		else if (k == "pos")this.pos = v;
		else if (k == "async_t")this.async_t = v;
		else if (k == "async_var")this.async_var = v;
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "async_stack")return this.async_stack;
		else if (k == "pos")return this.pos;
		else if (k == "async_t")return this.async_t;
		else if (k == "async_var")return this.async_var;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait";
	},
});
Object.assign(Bayrell.Lang.LangES6.TranslatorES6AsyncAwait, use("Runtime.CoreStruct"));
Object.assign(Bayrell.Lang.LangES6.TranslatorES6AsyncAwait,
{
	/**
	 * Returns current pos
	 */
	currentPos: function(ctx, t)
	{
		var __v0 = use("Runtime.rs");
		return t.expression.constructor.toString(ctx, __v0.join(ctx, ".", t.async_await.pos));
	},
	/**
	 * Returns current pos
	 */
	nextPos: function(ctx, t)
	{
		var pos = t.async_await.pos;
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "pos": pos.setIm(ctx, pos.count(ctx) - 1, pos.last(ctx) + 1) }) });
		var __v0 = use("Runtime.rs");
		var res = t.expression.constructor.toString(ctx, __v0.join(ctx, ".", t.async_await.pos));
		return use("Runtime.Collection").from([t,res]);
	},
	/**
	 * Returns push pos
	 */
	pushPos: function(ctx, t)
	{
		var pos = t.async_await.pos;
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "pos": pos.setIm(ctx, pos.count(ctx) - 1, pos.last(ctx) + 1).pushIm(ctx, 0) }) });
		var __v0 = use("Runtime.rs");
		var res = t.expression.constructor.toString(ctx, __v0.join(ctx, ".", t.async_await.pos));
		return use("Runtime.Collection").from([t,res]);
	},
	/**
	 * Returns inc pos
	 */
	levelIncPos: function(ctx, t)
	{
		var pos = t.async_await.pos;
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "pos": pos.setIm(ctx, pos.count(ctx) - 1, pos.last(ctx)).pushIm(ctx, 0) }) });
		var __v0 = use("Runtime.rs");
		var res = t.expression.constructor.toString(ctx, __v0.join(ctx, ".", t.async_await.pos));
		return use("Runtime.Collection").from([t,res]);
	},
	/**
	 * Returns pop pos
	 */
	popPos: function(ctx, t)
	{
		var pos = t.async_await.pos.removeLastIm(ctx);
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "pos": pos.setIm(ctx, pos.count(ctx) - 1, pos.last(ctx) + 1) }) });
		var __v0 = use("Runtime.rs");
		var res = t.expression.constructor.toString(ctx, __v0.join(ctx, ".", t.async_await.pos));
		return use("Runtime.Collection").from([t,res]);
	},
	/**
	 * OpCall
	 */
	OpCall: function(ctx, t, op_code, is_expression)
	{
		if (is_expression == undefined) is_expression = true;
		var s = "";
		var flag = false;
		if (s == "")
		{
			var res = t.expression.constructor.Dynamic(ctx, t, op_code.obj);
			t = res[0];
			s = res[1];
			if (s == "parent")
			{
				s = t.expression.constructor.useModuleName(ctx, t, t.current_class_extends_name);
				if (t.current_function.name != "constructor")
				{
					if (t.current_function.isStatic(ctx))
					{
						s += use("Runtime.rtl").toStr("." + use("Runtime.rtl").toStr(t.current_function.name));
					}
					else
					{
						s += use("Runtime.rtl").toStr(".prototype." + use("Runtime.rtl").toStr(t.current_function.name));
					}
				}
				s += use("Runtime.rtl").toStr(".call(this");
				flag = true;
			}
			else
			{
				s += use("Runtime.rtl").toStr("(");
			}
		}
		var content = s;
		if (t.current_function.is_context && op_code.is_context)
		{
			content += use("Runtime.rtl").toStr("ctx");
			flag = true;
		}
		for (var i = 0;i < op_code.args.count(ctx);i++)
		{
			var item = op_code.args.item(ctx, i);
			var res = t.expression.constructor.Expression(ctx, t, item);
			t = res[0];
			var s = res[1];
			content += use("Runtime.rtl").toStr(((flag) ? ", " : "") + use("Runtime.rtl").toStr(s));
			flag = true;
		}
		content += use("Runtime.rtl").toStr(")");
		var res = t.constructor.incSaveOpCode(ctx, t);
		t = res[0];
		var var_name = res[1];
		var res = this.nextPos(ctx, t);
		t = res[0];
		var next_pos = res[1];
		var async_t = t.async_await.async_t;
		content = t.s(ctx, "return " + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".jump(ctx, ") + use("Runtime.rtl").toStr(next_pos) + use("Runtime.rtl").toStr(")") + use("Runtime.rtl").toStr(".call(ctx, ") + use("Runtime.rtl").toStr(content) + use("Runtime.rtl").toStr(",") + use("Runtime.rtl").toStr(t.expression.constructor.toString(ctx, var_name)) + use("Runtime.rtl").toStr(");"));
		t = t.levelDec(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "}"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "else if (" + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".pos(ctx) == ") + use("Runtime.rtl").toStr(next_pos) + use("Runtime.rtl").toStr(")")));
		content += use("Runtime.rtl").toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		var res = t.constructor.addSaveOpCode(ctx, t, use("Runtime.Dict").from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = res[0];
		if (is_expression)
		{
			return use("Runtime.Collection").from([t,async_t + use("Runtime.rtl").toStr(".getVar(ctx, ") + use("Runtime.rtl").toStr(t.expression.constructor.toString(ctx, var_name)) + use("Runtime.rtl").toStr(")")]);
		}
		return use("Runtime.Collection").from([t,""]);
	},
	/**
	 * OpPipe
	 */
	OpPipe: function(ctx, t, op_code, is_expression)
	{
		if (is_expression == undefined) is_expression = true;
		var content = "";
		var var_name = "";
		var flag = false;
		var res = t.expression.constructor.Expression(ctx, t, op_code.obj);
		t = res[0];
		var_name = res[1];
		var __v0 = use("Bayrell.Lang.OpCodes.OpPipe");
		if (op_code.kind == __v0.KIND_METHOD)
		{
			content = var_name + use("Runtime.rtl").toStr(".constructor.") + use("Runtime.rtl").toStr(op_code.method_name.value);
		}
		else
		{
			var res = t.expression.constructor.OpTypeIdentifier(ctx, t, op_code.class_name);
			t = res[0];
			content = res[1] + use("Runtime.rtl").toStr(".") + use("Runtime.rtl").toStr(op_code.method_name.value);
		}
		var flag = false;
		content += use("Runtime.rtl").toStr("(");
		if (t.current_function.is_context && op_code.is_context)
		{
			content += use("Runtime.rtl").toStr("ctx");
			flag = true;
		}
		content += use("Runtime.rtl").toStr(((flag) ? ", " : "") + use("Runtime.rtl").toStr(var_name));
		flag = true;
		for (var i = 0;i < op_code.args.count(ctx);i++)
		{
			var item = op_code.args.item(ctx, i);
			var res = t.expression.constructor.Expression(ctx, t, item);
			t = res[0];
			var s1 = res[1];
			content += use("Runtime.rtl").toStr(((flag) ? ", " : "") + use("Runtime.rtl").toStr(s1));
			flag = true;
		}
		content += use("Runtime.rtl").toStr(")");
		var res = t.constructor.incSaveOpCode(ctx, t);
		t = res[0];
		var var_name = res[1];
		var res = this.nextPos(ctx, t);
		t = res[0];
		var next_pos = res[1];
		var async_t = t.async_await.async_t;
		content = t.s(ctx, "return " + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".jump(ctx, ") + use("Runtime.rtl").toStr(next_pos) + use("Runtime.rtl").toStr(")") + use("Runtime.rtl").toStr(".call(ctx, ") + use("Runtime.rtl").toStr(content) + use("Runtime.rtl").toStr(",") + use("Runtime.rtl").toStr(t.expression.constructor.toString(ctx, var_name)) + use("Runtime.rtl").toStr(");"));
		t = t.levelDec(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "}"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "else if (" + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".pos(ctx) == ") + use("Runtime.rtl").toStr(next_pos) + use("Runtime.rtl").toStr(")")));
		content += use("Runtime.rtl").toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		var res = t.constructor.addSaveOpCode(ctx, t, use("Runtime.Dict").from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = res[0];
		if (is_expression)
		{
			return use("Runtime.Collection").from([t,async_t + use("Runtime.rtl").toStr(".getVar(ctx, ") + use("Runtime.rtl").toStr(t.expression.constructor.toString(ctx, var_name)) + use("Runtime.rtl").toStr(")")]);
		}
		return use("Runtime.Collection").from([t,""]);
	},
	/**
	 * OpFor
	 */
	OpFor: function(ctx, t, op_code)
	{
		var save_t = null;
		var async_t = t.async_await.async_t;
		var async_var = t.async_await.async_var;
		var content = "";
		var res = this.pushPos(ctx, t);
		t = res[0];
		var start_pos = res[1];
		var res = this.popPos(ctx, t);
		save_t = res[0];
		var end_pos = res[1];
		var __v0 = use("Bayrell.Lang.LangES6.AsyncAwait");
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "async_stack": t.async_await.async_stack.pushIm(ctx, new __v0(ctx, use("Runtime.Dict").from({"start_pos":start_pos,"end_pos":end_pos}))) }) });
		content += use("Runtime.rtl").toStr(t.s(ctx, "return " + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".jump(ctx, ") + use("Runtime.rtl").toStr(start_pos) + use("Runtime.rtl").toStr(");")));
		t = t.levelDec(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "}"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "/* Start Loop */"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "else if (" + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".pos(ctx) == ") + use("Runtime.rtl").toStr(start_pos) + use("Runtime.rtl").toStr(")")));
		content += use("Runtime.rtl").toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		/* Loop Assign */
		var __v0 = use("Bayrell.Lang.OpCodes.OpAssign");
		if (op_code.expr1 instanceof __v0)
		{
			var res = t.constructor.saveOpCodeCall(ctx, t, t.operator.staticMethod("OpAssign"), use("Runtime.Collection").from([op_code.expr1]));
			t = res[0];
			var save = res[1];
			var value = res[2];
			if (save != "")
			{
				content += use("Runtime.rtl").toStr(save);
			}
			content += use("Runtime.rtl").toStr(value);
		}
		else
		{
			var res = t.constructor.saveOpCodeCall(ctx, t, t.expression.staticMethod("Expression"), use("Runtime.Collection").from([op_code.expr1]));
			t = res[0];
			var save = res[1];
			var value = res[2];
			if (save != "")
			{
				content += use("Runtime.rtl").toStr(save);
			}
			content += use("Runtime.rtl").toStr(value);
		}
		/* Loop Expression */
		var res = this.nextPos(ctx, t);
		t = res[0];
		var loop_expression = res[1];
		content += use("Runtime.rtl").toStr(t.s(ctx, "return " + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".jump(ctx, ") + use("Runtime.rtl").toStr(loop_expression) + use("Runtime.rtl").toStr(");")));
		t = t.levelDec(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "}"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "/* Loop Expression */"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "else if (" + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".pos(ctx) == ") + use("Runtime.rtl").toStr(loop_expression) + use("Runtime.rtl").toStr(")")));
		content += use("Runtime.rtl").toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		/* Call condition expression */
		var res = t.constructor.saveOpCodeCall(ctx, t, t.expression.staticMethod("Expression"), use("Runtime.Collection").from([op_code.expr2]));
		t = res[0];
		var save = res[1];
		var value = res[2];
		if (save != "")
		{
			content += use("Runtime.rtl").toStr(save);
		}
		/* Loop condition */
		content += use("Runtime.rtl").toStr(t.s(ctx, "var " + use("Runtime.rtl").toStr(async_var) + use("Runtime.rtl").toStr(" = ") + use("Runtime.rtl").toStr(value) + use("Runtime.rtl").toStr(";")));
		var res = this.nextPos(ctx, t);
		t = res[0];
		var start_loop = res[1];
		content += use("Runtime.rtl").toStr(t.s(ctx, "if (" + use("Runtime.rtl").toStr(async_var) + use("Runtime.rtl").toStr(")")));
		content += use("Runtime.rtl").toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "return " + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".jump(ctx, ") + use("Runtime.rtl").toStr(start_loop) + use("Runtime.rtl").toStr(");")));
		t = t.levelDec(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "}"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "return " + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".jump(ctx, ") + use("Runtime.rtl").toStr(end_pos) + use("Runtime.rtl").toStr(");")));
		/* Start Loop */
		t = t.levelDec(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "}"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "/* Loop */"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "else if (" + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".pos(ctx) == ") + use("Runtime.rtl").toStr(start_loop) + use("Runtime.rtl").toStr(")")));
		content += use("Runtime.rtl").toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		var res = t.expression.constructor.Expression(ctx, t, op_code.expr3);
		t = res[0];
		content += use("Runtime.rtl").toStr(t.s(ctx, res[1] + use("Runtime.rtl").toStr(";")));
		var res = t.operator.constructor.Operators(ctx, t, op_code.value);
		t = res[0];
		content += use("Runtime.rtl").toStr(res[1]);
		/* End Loop */
		content += use("Runtime.rtl").toStr(t.s(ctx, "return " + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".jump(ctx, ") + use("Runtime.rtl").toStr(loop_expression) + use("Runtime.rtl").toStr(");")));
		t = t.levelDec(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "}"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "/* End Loop */"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "else if (" + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".pos(ctx) == ") + use("Runtime.rtl").toStr(end_pos) + use("Runtime.rtl").toStr(")")));
		content += use("Runtime.rtl").toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "async_stack": t.async_await.async_stack.removeLastIm(ctx) }) });
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "pos": save_t.async_await.pos }) });
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpIfBlock
	 */
	OpIfBlock: function(ctx, t, condition, op_code, end_pos)
	{
		var content = "";
		var async_t = t.async_await.async_t;
		var async_var = t.async_await.async_var;
		/* Call condition expression */
		var res = t.constructor.saveOpCodeCall(ctx, t, t.expression.staticMethod("Expression"), use("Runtime.Collection").from([condition]));
		t = res[0];
		var save = res[1];
		var value = res[2];
		if (save != "")
		{
			content += use("Runtime.rtl").toStr(save);
		}
		var res = this.nextPos(ctx, t);
		t = res[0];
		var start_if = res[1];
		var res = this.nextPos(ctx, t);
		t = res[0];
		var next_if = res[1];
		/* If condition */
		content += use("Runtime.rtl").toStr(t.s(ctx, "var " + use("Runtime.rtl").toStr(async_var) + use("Runtime.rtl").toStr(" = ") + use("Runtime.rtl").toStr(value) + use("Runtime.rtl").toStr(";")));
		content += use("Runtime.rtl").toStr(t.s(ctx, "if (" + use("Runtime.rtl").toStr(async_var) + use("Runtime.rtl").toStr(")")));
		content += use("Runtime.rtl").toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "return " + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".jump(ctx, ") + use("Runtime.rtl").toStr(start_if) + use("Runtime.rtl").toStr(");")));
		t = t.levelDec(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "}"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "return " + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".jump(ctx, ") + use("Runtime.rtl").toStr(next_if) + use("Runtime.rtl").toStr(");")));
		/* Start Loop */
		t = t.levelDec(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "}"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "/* If true */"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "else if (" + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".pos(ctx) == ") + use("Runtime.rtl").toStr(start_if) + use("Runtime.rtl").toStr(")")));
		content += use("Runtime.rtl").toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		var res = t.operator.constructor.Operators(ctx, t, op_code);
		t = res[0];
		content += use("Runtime.rtl").toStr(res[1]);
		/* End if */
		content += use("Runtime.rtl").toStr(t.s(ctx, "return " + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".jump(ctx, ") + use("Runtime.rtl").toStr(end_pos) + use("Runtime.rtl").toStr(");")));
		t = t.levelDec(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "}"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "/* Next If */"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "else if (" + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".pos(ctx) == ") + use("Runtime.rtl").toStr(next_if) + use("Runtime.rtl").toStr(")")));
		content += use("Runtime.rtl").toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpIf
	 */
	OpIf: function(ctx, t, op_code)
	{
		var save_t = null;
		var async_t = t.async_await.async_t;
		var async_var = t.async_await.async_var;
		var content = "";
		var if_true_pos = "";
		var if_false_pos = "";
		var res = this.pushPos(ctx, t);
		t = res[0];
		var start_pos = res[1];
		var res = this.popPos(ctx, t);
		save_t = res[0];
		var end_pos = res[1];
		content += use("Runtime.rtl").toStr(t.s(ctx, "return " + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".jump(ctx, ") + use("Runtime.rtl").toStr(start_pos) + use("Runtime.rtl").toStr(");")));
		t = t.levelDec(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "}"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "/* Start if */"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "else if (" + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".pos(ctx) == ") + use("Runtime.rtl").toStr(start_pos) + use("Runtime.rtl").toStr(")")));
		content += use("Runtime.rtl").toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		/* If true */
		var res = this.OpIfBlock(ctx, t, op_code.condition, op_code.if_true, end_pos);
		t = res[0];
		content += use("Runtime.rtl").toStr(res[1]);
		/* If else */
		for (var i = 0;i < op_code.if_else.count(ctx);i++)
		{
			var if_else = op_code.if_else.item(ctx, i);
			var res = this.OpIfBlock(ctx, t, if_else.condition, if_else.if_true, end_pos);
			t = res[0];
			content += use("Runtime.rtl").toStr(res[1]);
		}
		/* Else */
		if (op_code.if_false)
		{
			content += use("Runtime.rtl").toStr(t.s(ctx, "/* If false */"));
			var res = t.operator.constructor.Operators(ctx, t, op_code.if_false);
			t = res[0];
			content += use("Runtime.rtl").toStr(res[1]);
		}
		/* End if */
		content += use("Runtime.rtl").toStr(t.s(ctx, "return " + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".jump(ctx, ") + use("Runtime.rtl").toStr(end_pos) + use("Runtime.rtl").toStr(");")));
		t = t.levelDec(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "}"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "/* End if */"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "else if (" + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".pos(ctx) == ") + use("Runtime.rtl").toStr(end_pos) + use("Runtime.rtl").toStr(")")));
		content += use("Runtime.rtl").toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "pos": save_t.async_await.pos }) });
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpReturn
	 */
	OpReturn: function(ctx, t, op_code)
	{
		var content = "";
		var s1 = "";
		if (op_code.expression)
		{
			var res = t.expression.constructor.Expression(ctx, t, op_code.expression);
			t = res[0];
			s1 = res[1];
		}
		else
		{
			s1 = "null";
		}
		var async_t = t.async_await.async_t;
		content = t.s(ctx, "return " + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".ret(ctx, ") + use("Runtime.rtl").toStr(s1) + use("Runtime.rtl").toStr(");"));
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpTryCatch
	 */
	OpTryCatch: function(ctx, t, op_code)
	{
		var save_t = null;
		var content = "";
		var async_t = t.async_await.async_t;
		var async_var = t.async_await.async_var;
		var res = this.nextPos(ctx, t);
		t = res[0];
		var start_pos = res[1];
		var res = this.nextPos(ctx, t);
		save_t = res[0];
		var end_pos = res[1];
		var __v0 = use("Bayrell.Lang.LangES6.AsyncAwait");
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "async_stack": t.async_await.async_stack.pushIm(ctx, new __v0(ctx, use("Runtime.Dict").from({"start_pos":start_pos,"end_pos":end_pos}))) }) });
		/* Start Try Catch */
		content += use("Runtime.rtl").toStr(t.s(ctx, "return " + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".jump(ctx, ") + use("Runtime.rtl").toStr(start_pos) + use("Runtime.rtl").toStr(");")));
		t = t.levelDec(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "}"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "/* Start Try */"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "else if (" + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".pos(ctx) == ") + use("Runtime.rtl").toStr(start_pos) + use("Runtime.rtl").toStr(")")));
		content += use("Runtime.rtl").toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		var res = this.levelIncPos(ctx, t);
		t = res[0];
		var start_catch = res[1];
		content += use("Runtime.rtl").toStr(t.s(ctx, async_t + use("Runtime.rtl").toStr(" = ") + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".catch_push(") + use("Runtime.rtl").toStr(start_catch) + use("Runtime.rtl").toStr(");")));
		var res = t.operator.constructor.Operators(ctx, t, op_code.op_try);
		t = res[0];
		content += use("Runtime.rtl").toStr(res[1]);
		/* Start Catch */
		content += use("Runtime.rtl").toStr(t.s(ctx, "return " + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".catch_pop().jump(ctx, ") + use("Runtime.rtl").toStr(end_pos) + use("Runtime.rtl").toStr(");")));
		t = t.levelDec(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "}"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "/* Start Catch */"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "else if (" + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".pos(ctx) == ") + use("Runtime.rtl").toStr(start_catch) + use("Runtime.rtl").toStr(")")));
		content += use("Runtime.rtl").toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		for (var i = 0;i < op_code.items.count(ctx);i++)
		{
			var s = "";
			var pattern = "";
			var item = op_code.items.item(ctx, i);
			var res = t.expression.constructor.OpTypeIdentifier(ctx, t, item.pattern);
			t = res[0];
			pattern += use("Runtime.rtl").toStr(res[1]);
			if (pattern != "var")
			{
				s = "if (_ex instanceof " + use("Runtime.rtl").toStr(pattern) + use("Runtime.rtl").toStr(")");
			}
			else
			{
				s = "if (true)";
			}
			s += use("Runtime.rtl").toStr(t.s(ctx, "{"));
			t = t.levelInc(ctx);
			s += use("Runtime.rtl").toStr((s != "") ? t.s(ctx, "var " + use("Runtime.rtl").toStr(item.name) + use("Runtime.rtl").toStr(" = _ex;")) : "var " + use("Runtime.rtl").toStr(item.name) + use("Runtime.rtl").toStr(" = _ex;"));
			var res = t.operator.constructor.Operators(ctx, t, item.value);
			t = res[0];
			s += use("Runtime.rtl").toStr(t.s(ctx, res[1]));
			t = t.levelDec(ctx);
			s += use("Runtime.rtl").toStr(t.s(ctx, "}"));
			if (i != 0)
			{
				s = "else " + use("Runtime.rtl").toStr(s);
			}
			content += use("Runtime.rtl").toStr(t.s(ctx, s));
		}
		content += use("Runtime.rtl").toStr(t.s(ctx, "else"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "throw _ex;"));
		t = t.levelDec(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "}"));
		/* End Try Catch */
		content += use("Runtime.rtl").toStr(t.s(ctx, "return " + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".jump(ctx, ") + use("Runtime.rtl").toStr(end_pos) + use("Runtime.rtl").toStr(");")));
		t = t.levelDec(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "}"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "/* End Catch */"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "else if (" + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".pos(ctx) == ") + use("Runtime.rtl").toStr(end_pos) + use("Runtime.rtl").toStr(")")));
		content += use("Runtime.rtl").toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "async_stack": t.async_await.async_stack.removeLastIm(ctx) }) });
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "pos": save_t.async_await.pos }) });
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpWhile
	 */
	OpWhile: function(ctx, t, op_code)
	{
		var save_t = null;
		var async_t = t.async_await.async_t;
		var async_var = t.async_await.async_var;
		var content = "";
		var res = this.pushPos(ctx, t);
		t = res[0];
		var start_pos = res[1];
		var res = this.popPos(ctx, t);
		save_t = res[0];
		var end_pos = res[1];
		var __v0 = use("Bayrell.Lang.LangES6.AsyncAwait");
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "async_stack": t.async_await.async_stack.pushIm(ctx, new __v0(ctx, use("Runtime.Dict").from({"start_pos":start_pos,"end_pos":end_pos}))) }) });
		content += use("Runtime.rtl").toStr(t.s(ctx, "return " + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".jump(ctx, ") + use("Runtime.rtl").toStr(start_pos) + use("Runtime.rtl").toStr(");")));
		t = t.levelDec(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "}"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "/* Start while */"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "else if (" + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".pos(ctx) == ") + use("Runtime.rtl").toStr(start_pos) + use("Runtime.rtl").toStr(")")));
		content += use("Runtime.rtl").toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		/* Call condition expression */
		var res = t.constructor.saveOpCodeCall(ctx, t, t.expression.staticMethod("Expression"), use("Runtime.Collection").from([op_code.condition]));
		t = res[0];
		var save = res[1];
		var value = res[2];
		if (save != "")
		{
			content += use("Runtime.rtl").toStr(save);
		}
		/* Loop condition */
		content += use("Runtime.rtl").toStr(t.s(ctx, "var " + use("Runtime.rtl").toStr(async_var) + use("Runtime.rtl").toStr(" = ") + use("Runtime.rtl").toStr(value) + use("Runtime.rtl").toStr(";")));
		var res = this.nextPos(ctx, t);
		t = res[0];
		var start_loop = res[1];
		content += use("Runtime.rtl").toStr(t.s(ctx, "if (" + use("Runtime.rtl").toStr(async_var) + use("Runtime.rtl").toStr(")")));
		content += use("Runtime.rtl").toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "return " + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".jump(ctx, ") + use("Runtime.rtl").toStr(start_loop) + use("Runtime.rtl").toStr(");")));
		t = t.levelDec(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "}"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "return " + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".jump(ctx, ") + use("Runtime.rtl").toStr(end_pos) + use("Runtime.rtl").toStr(");")));
		/* Start Loop */
		t = t.levelDec(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "}"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "/* Loop while */"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "else if (" + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".pos(ctx) == ") + use("Runtime.rtl").toStr(start_loop) + use("Runtime.rtl").toStr(")")));
		content += use("Runtime.rtl").toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		var res = t.operator.constructor.Operators(ctx, t, op_code.value);
		t = res[0];
		content += use("Runtime.rtl").toStr(res[1]);
		/* End Loop */
		content += use("Runtime.rtl").toStr(t.s(ctx, "return " + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".jump(ctx, ") + use("Runtime.rtl").toStr(start_pos) + use("Runtime.rtl").toStr(");")));
		t = t.levelDec(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "}"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "/* End while */"));
		content += use("Runtime.rtl").toStr(t.s(ctx, "else if (" + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".pos(ctx) == ") + use("Runtime.rtl").toStr(end_pos) + use("Runtime.rtl").toStr(")")));
		content += use("Runtime.rtl").toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "async_stack": t.async_await.async_stack.removeLastIm(ctx) }) });
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "pos": save_t.async_await.pos }) });
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpDeclareFunction Body
	 */
	OpDeclareFunctionBody: function(ctx, t, f)
	{
		var save_t = t;
		/* Save op codes */
		var save_vars = t.save_vars;
		var save_op_codes = t.save_op_codes;
		var save_op_code_inc = t.save_op_code_inc;
		t = t.constructor.clearSaveOpCode(ctx, t);
		var async_t = t.async_await.async_t;
		t = t.levelInc(ctx);
		var s1 = t.s(ctx, "return (" + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(") =>"));
		s1 += use("Runtime.rtl").toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		s1 += use("Runtime.rtl").toStr(t.s(ctx, "if (" + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".pos(ctx) == ") + use("Runtime.rtl").toStr(this.currentPos(ctx, t)) + use("Runtime.rtl").toStr(")")));
		s1 += use("Runtime.rtl").toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		if (f.value)
		{
			var res = t.operator.constructor.Operators(ctx, t, f.value);
			t = res[0];
			s1 += use("Runtime.rtl").toStr(res[1]);
		}
		else if (f.expression)
		{
			var res = t.expression.constructor.Expression(ctx, t, f.expression);
			t = res[0];
			var expr = res[1];
			s1 += use("Runtime.rtl").toStr(t.s(ctx, "return " + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".ret(ctx, ") + use("Runtime.rtl").toStr(expr) + use("Runtime.rtl").toStr(");")));
		}
		t = t.levelDec(ctx);
		s1 += use("Runtime.rtl").toStr(t.s(ctx, "}"));
		s1 += use("Runtime.rtl").toStr(t.s(ctx, "return " + use("Runtime.rtl").toStr(async_t) + use("Runtime.rtl").toStr(".ret_void(ctx);")));
		t = t.levelDec(ctx);
		s1 += use("Runtime.rtl").toStr(t.s(ctx, "};"));
		t = t.levelDec(ctx);
		/* Content */
		var content = "";
		content = t.s(ctx, "{");
		t = t.levelInc(ctx);
		if (t.save_vars.count(ctx) > 0)
		{
			var __v0 = use("Runtime.rs");
			content += use("Runtime.rtl").toStr(t.s(ctx, "var " + use("Runtime.rtl").toStr(__v0.join(ctx, ",", t.save_vars)) + use("Runtime.rtl").toStr(";")));
		}
		content += use("Runtime.rtl").toStr(s1);
		t = t.levelDec(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "}"));
		/* Restore save op codes */
		t = t.copy(ctx, { "save_vars": save_vars });
		t = t.copy(ctx, { "save_op_codes": save_op_codes });
		t = t.copy(ctx, { "save_op_code_inc": save_op_code_inc });
		return use("Runtime.Collection").from([save_t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangES6";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait",
			"name": "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("async_stack");
			a.push("pos");
			a.push("async_t");
			a.push("async_var");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		if (field_name == "async_stack") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pos") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "async_t") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "async_var") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
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
});use.add(Bayrell.Lang.LangES6.TranslatorES6AsyncAwait);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangES6 == undefined) module.exports.Bayrell.Lang.LangES6 = {};
module.exports.Bayrell.Lang.LangES6.TranslatorES6AsyncAwait = Bayrell.Lang.LangES6.TranslatorES6AsyncAwait;