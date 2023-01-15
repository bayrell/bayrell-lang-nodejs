"use strict;"
var use = require('bay-lang').use;
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpDeclareFunction = function(ctx)
{
	use("Bayrell.Lang.OpCodes.BaseOpCode").apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpDeclareFunction.prototype = Object.create(use("Bayrell.Lang.OpCodes.BaseOpCode").prototype);
Bayrell.Lang.OpCodes.OpDeclareFunction.prototype.constructor = Bayrell.Lang.OpCodes.OpDeclareFunction;
Object.assign(Bayrell.Lang.OpCodes.OpDeclareFunction.prototype,
{
	/**
	 * Returns true if static function
	 */
	isStatic: function(ctx)
	{
		return this.flags != null && (this.flags.isFlag(ctx, "static") || this.flags.isFlag(ctx, "lambda") || this.flags.isFlag(ctx, "pure"));
	},
	/**
	 * Returns true if is flag
	 */
	isFlag: function(ctx, flag_name)
	{
		return this.flags != null && this.flags.isFlag(ctx, flag_name);
	},
	_init: function(ctx)
	{
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype._init.call(this,ctx);
		this.op = "op_function";
		this.name = "";
		this.annotations = null;
		this.comments = null;
		this.args = null;
		this.vars = null;
		this.result_type = null;
		this.expression = null;
		this.items = null;
		this.flags = null;
		this.is_context = true;
		this.is_html = false;
		this.is_html_default_args = false;
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "name")return this.name;
		else if (k == "annotations")return this.annotations;
		else if (k == "comments")return this.comments;
		else if (k == "args")return this.args;
		else if (k == "vars")return this.vars;
		else if (k == "result_type")return this.result_type;
		else if (k == "expression")return this.expression;
		else if (k == "items")return this.items;
		else if (k == "flags")return this.flags;
		else if (k == "is_context")return this.is_context;
		else if (k == "is_html")return this.is_html;
		else if (k == "is_html_default_args")return this.is_html_default_args;
		return use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.takeValue.call(this,ctx,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpDeclareFunction, use("Bayrell.Lang.OpCodes.BaseOpCode"));
Object.assign(Bayrell.Lang.OpCodes.OpDeclareFunction,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpDeclareFunction";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
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
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f&3)==3)
		{
			a.push("op");
			a.push("name");
			a.push("annotations");
			a.push("comments");
			a.push("args");
			a.push("vars");
			a.push("result_type");
			a.push("expression");
			a.push("items");
			a.push("flags");
			a.push("is_context");
			a.push("is_html");
			a.push("is_html_default_args");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "annotations") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpAnnotation"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "comments") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpComment"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "args") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpDeclareFunctionArg"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "vars") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "result_type") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expression") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "items") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "flags") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpFlags",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_context") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_html") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_html_default_args") return Dict.from({
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
});use.add(Bayrell.Lang.OpCodes.OpDeclareFunction);
module.exports = Bayrell.Lang.OpCodes.OpDeclareFunction;