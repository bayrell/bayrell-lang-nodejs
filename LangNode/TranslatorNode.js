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
if (typeof Bayrell.Lang.LangNode == 'undefined') Bayrell.Lang.LangNode = {};
Bayrell.Lang.LangNode.TranslatorNode = function(ctx)
{
	use("Bayrell.Lang.LangES6.TranslatorES6").apply(this, arguments);
};
Bayrell.Lang.LangNode.TranslatorNode.prototype = Object.create(use("Bayrell.Lang.LangES6.TranslatorES6").prototype);
Bayrell.Lang.LangNode.TranslatorNode.prototype.constructor = Bayrell.Lang.LangNode.TranslatorNode;
Object.assign(Bayrell.Lang.LangNode.TranslatorNode.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.async_await = null;
		this.expression = null;
		this.html = null;
		this.operator = null;
		this.program = null;
		this.use_module_name = true;
		this.enable_async_await = true;
		this.emulate_async_await = false;
		this.enable_introspection = false;
		use("Bayrell.Lang.LangES6.TranslatorES6").prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.LangNode.TranslatorNode"))
		{
			this.async_await = o.async_await;
			this.expression = o.expression;
			this.html = o.html;
			this.operator = o.operator;
			this.program = o.program;
			this.use_module_name = o.use_module_name;
			this.enable_async_await = o.enable_async_await;
			this.emulate_async_await = o.emulate_async_await;
			this.enable_introspection = o.enable_introspection;
		}
		use("Bayrell.Lang.LangES6.TranslatorES6").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "async_await")this.async_await = v;
		else if (k == "expression")this.expression = v;
		else if (k == "html")this.html = v;
		else if (k == "operator")this.operator = v;
		else if (k == "program")this.program = v;
		else if (k == "use_module_name")this.use_module_name = v;
		else if (k == "enable_async_await")this.enable_async_await = v;
		else if (k == "emulate_async_await")this.emulate_async_await = v;
		else if (k == "enable_introspection")this.enable_introspection = v;
		else use("Bayrell.Lang.LangES6.TranslatorES6").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "async_await")return this.async_await;
		else if (k == "expression")return this.expression;
		else if (k == "html")return this.html;
		else if (k == "operator")return this.operator;
		else if (k == "program")return this.program;
		else if (k == "use_module_name")return this.use_module_name;
		else if (k == "enable_async_await")return this.enable_async_await;
		else if (k == "emulate_async_await")return this.emulate_async_await;
		else if (k == "enable_introspection")return this.enable_introspection;
		return use("Bayrell.Lang.LangES6.TranslatorES6").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.LangNode.TranslatorNode";
	},
});
Object.assign(Bayrell.Lang.LangNode.TranslatorNode, use("Bayrell.Lang.LangES6.TranslatorES6"));
Object.assign(Bayrell.Lang.LangNode.TranslatorNode,
{
	/**
	 * Reset translator
	 */
	reset: function(ctx, t)
	{
		var __v0 = use("Runtime.Dict");
		var __v1 = use("Bayrell.Lang.LangES6.TranslatorES6AsyncAwait");
		var __v2 = use("Bayrell.Lang.LangNode.TranslatorNodeExpression");
		var __v3 = use("Bayrell.Lang.LangES6.TranslatorES6Html");
		var __v4 = use("Bayrell.Lang.LangES6.TranslatorES6Operator");
		var __v5 = use("Bayrell.Lang.LangNode.TranslatorNodeProgram");
		var __v6 = use("Runtime.Collection");
		var __v7 = use("Runtime.Collection");
		return t.copy(ctx, use("Runtime.Dict").from({"value":"","current_namespace_name":"","modules":new __v0(ctx),"async_await":new __v1(ctx),"expression":new __v2(ctx),"html":new __v3(ctx),"operator":new __v4(ctx),"program":new __v5(ctx),"save_vars":new __v6(ctx),"save_op_codes":new __v7(ctx),"save_op_code_inc":0,"preprocessor_flags":use("Runtime.Dict").from({"BACKEND":true,"NODEJS":true,"JAVASCRIPT":true})}));
	},
	/**
	 * Translate BaseOpCode
	 */
	translate: function(ctx, t, op_code)
	{
		t = this.reset(ctx, t);
		return t.program.constructor.translateProgram(ctx, t, op_code);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangNode";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangNode.TranslatorNode";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangNode.TranslatorNode",
			"name": "Bayrell.Lang.LangNode.TranslatorNode",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f&3)==3)
		{
			a.push("async_await");
			a.push("expression");
			a.push("html");
			a.push("operator");
			a.push("program");
			a.push("use_module_name");
			a.push("enable_async_await");
			a.push("emulate_async_await");
			a.push("enable_introspection");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		if (field_name == "async_await") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangNode.TranslatorNode",
			"name": field_name,
			"t": "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expression") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangNode.TranslatorNode",
			"name": field_name,
			"t": "Bayrell.Lang.LangES6.TranslatorES6Expression",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "html") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangNode.TranslatorNode",
			"name": field_name,
			"t": "Bayrell.Lang.LangES6.TranslatorES6Html",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "operator") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangNode.TranslatorNode",
			"name": field_name,
			"t": "Bayrell.Lang.LangES6.TranslatorES6Operator",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "program") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangNode.TranslatorNode",
			"name": field_name,
			"t": "Bayrell.Lang.LangES6.TranslatorES6Program",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "use_module_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangNode.TranslatorNode",
			"name": field_name,
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "enable_async_await") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangNode.TranslatorNode",
			"name": field_name,
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "emulate_async_await") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangNode.TranslatorNode",
			"name": field_name,
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "enable_introspection") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangNode.TranslatorNode",
			"name": field_name,
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx,f)
	{
		if (f==undefined) f=0;
		var a = [];
		if ((f&4)==4) a=[
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Bayrell.Lang.LangNode.TranslatorNode);
module.exports = Bayrell.Lang.LangNode.TranslatorNode;