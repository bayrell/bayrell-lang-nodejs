"use strict;"
var use = require('bay-lang').use;
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
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
Bayrell.Lang.LangES6.TranslatorES6 = function(ctx)
{
	use("Bayrell.Lang.CoreTranslator").apply(this, arguments);
};
Bayrell.Lang.LangES6.TranslatorES6.prototype = Object.create(use("Bayrell.Lang.CoreTranslator").prototype);
Bayrell.Lang.LangES6.TranslatorES6.prototype.constructor = Bayrell.Lang.LangES6.TranslatorES6;
Object.assign(Bayrell.Lang.LangES6.TranslatorES6.prototype,
{
	/**
	 * Returns true if emulate async await
	 */
	isEmulateAsyncAwait: function(ctx)
	{
		return this.enable_async_await && this.emulate_async_await;
	},
	/**
	 * Returns true if async await
	 */
	isAsyncAwait: function(ctx)
	{
		return this.enable_async_await && !this.emulate_async_await;
	},
	_init: function(ctx)
	{
		use("Bayrell.Lang.CoreTranslator").prototype._init.call(this,ctx);
		this.is_pipe = false;
		this.is_call = false;
		this.pipe_var_name = "";
		this.html_var_name = "";
		this.is_html = false;
		this.async_await = null;
		this.expression = null;
		this.html = null;
		this.operator = null;
		this.program = null;
		this.frontend = true;
		this.backend = false;
		this.use_module_name = false;
		this.use_strict = true;
		this.enable_async_await = true;
		this.emulate_async_await = false;
		this.enable_context = false;
		this.enable_check_types = false;
		this.enable_introspection = true;
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "is_pipe")return this.is_pipe;
		else if (k == "is_call")return this.is_call;
		else if (k == "pipe_var_name")return this.pipe_var_name;
		else if (k == "html_var_name")return this.html_var_name;
		else if (k == "is_html")return this.is_html;
		else if (k == "async_await")return this.async_await;
		else if (k == "expression")return this.expression;
		else if (k == "html")return this.html;
		else if (k == "operator")return this.operator;
		else if (k == "program")return this.program;
		else if (k == "frontend")return this.frontend;
		else if (k == "backend")return this.backend;
		else if (k == "use_module_name")return this.use_module_name;
		else if (k == "use_strict")return this.use_strict;
		else if (k == "enable_async_await")return this.enable_async_await;
		else if (k == "emulate_async_await")return this.emulate_async_await;
		else if (k == "enable_context")return this.enable_context;
		else if (k == "enable_check_types")return this.enable_check_types;
		else if (k == "enable_introspection")return this.enable_introspection;
		return use("Bayrell.Lang.CoreTranslator").prototype.takeValue.call(this,ctx,k,d);
	},
});
Object.assign(Bayrell.Lang.LangES6.TranslatorES6, use("Bayrell.Lang.CoreTranslator"));
Object.assign(Bayrell.Lang.LangES6.TranslatorES6,
{
	/**
	 * Reset translator
	 */
	reset: function(ctx, t)
	{
		var __v0 = use("Runtime.Dict");
		var __v1 = use("Bayrell.Lang.LangES6.TranslatorES6AsyncAwait");
		var __v2 = use("Bayrell.Lang.LangES6.TranslatorES6Expression");
		var __v3 = use("Bayrell.Lang.LangES6.TranslatorES6Html");
		var __v4 = use("Bayrell.Lang.LangES6.TranslatorES6Operator");
		var __v5 = use("Bayrell.Lang.LangES6.TranslatorES6Program");
		var __v6 = use("Runtime.Collection");
		var __v7 = use("Runtime.Collection");
		return t.copy(ctx, use("Runtime.Dict").from({"value":"","current_namespace_name":"","modules":new __v0(ctx),"async_await":new __v1(ctx),"expression":new __v2(ctx),"html":new __v3(ctx),"operator":new __v4(ctx),"program":new __v5(ctx),"save_vars":new __v6(ctx),"save_op_codes":new __v7(ctx),"save_op_code_inc":0,"preprocessor_flags":use("Runtime.Dict").from({"ES6":true,"JAVASCRIPT":true,"FRONTEND":t.frontend,"BACKEND":t.backend,"USE_MODULE_NAME":t.use_module_name,"USE_STRICT":t.use_strict,"ENABLE_ASYNC_AWAIT":t.enable_async_await,"EMULATE_ASYNC_AWAIT":t.emulate_async_await,"ENABLE_CONTEXT":t.enable_context,"ENABLE_CHECK_TYPES":t.enable_check_types})}));
	},
	/**
	 * Translate BaseOpCode
	 */
	translate: function(ctx, t, op_code)
	{
		t = this.reset(ctx, t);
		return t.program.constructor.translateProgram(ctx, t, op_code);
	},
	/**
	 * Output save op code content
	 */
	outputSaveOpCode: function(ctx, t, save_op_code_value)
	{
		if (save_op_code_value == undefined) save_op_code_value = 0;
		var content = "";
		for (var i = 0;i < t.save_op_codes.count(ctx);i++)
		{
			if (i < save_op_code_value)
			{
				continue;
			}
			var save = t.save_op_codes.item(ctx, i);
			var s = "";
			if (t.is_html)
			{
				s = (save.content == "") ? (t.s(ctx, "let " + use("Runtime.rtl").toStr(save.var_name) + use("Runtime.rtl").toStr(" = ") + use("Runtime.rtl").toStr(save.var_content) + use("Runtime.rtl").toStr(";"))) : (save.content);
			}
			else
			{
				s = (save.content == "") ? (t.s(ctx, "var " + use("Runtime.rtl").toStr(save.var_name) + use("Runtime.rtl").toStr(" = ") + use("Runtime.rtl").toStr(save.var_content) + use("Runtime.rtl").toStr(";"))) : (save.content);
			}
			content += use("Runtime.rtl").toStr(s);
		}
		return content;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangES6";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.CoreTranslator";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx)
	{
		var a = [];
		if (f==undefined) f=0;
		a.push("is_pipe");
		a.push("is_call");
		a.push("pipe_var_name");
		a.push("html_var_name");
		a.push("is_html");
		a.push("async_await");
		a.push("expression");
		a.push("html");
		a.push("operator");
		a.push("program");
		a.push("frontend");
		a.push("backend");
		a.push("use_module_name");
		a.push("use_strict");
		a.push("enable_async_await");
		a.push("emulate_async_await");
		a.push("enable_context");
		a.push("enable_check_types");
		a.push("enable_introspection");
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		if (field_name == "is_pipe") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_call") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pipe_var_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "html_var_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_html") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "async_await") return Dict.from({
			"t": "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expression") return Dict.from({
			"t": "Bayrell.Lang.LangES6.TranslatorES6Expression",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "html") return Dict.from({
			"t": "Bayrell.Lang.LangES6.TranslatorES6Html",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "operator") return Dict.from({
			"t": "Bayrell.Lang.LangES6.TranslatorES6Operator",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "program") return Dict.from({
			"t": "Bayrell.Lang.LangES6.TranslatorES6Program",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "frontend") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "backend") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "use_module_name") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "use_strict") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "enable_async_await") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "emulate_async_await") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "enable_context") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "enable_check_types") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "enable_introspection") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a=[
			"isEmulateAsyncAwait",
			"isAsyncAwait",
			"reset",
			"translate",
			"outputSaveOpCode",
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Bayrell.Lang.LangES6.TranslatorES6);
module.exports = Bayrell.Lang.LangES6.TranslatorES6;