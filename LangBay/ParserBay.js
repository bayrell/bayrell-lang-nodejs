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
if (typeof Bayrell.Lang.LangBay == 'undefined') Bayrell.Lang.LangBay = {};
Bayrell.Lang.LangBay.ParserBay = function(ctx)
{
	use("Bayrell.Lang.CoreParser").apply(this, arguments);
};
Bayrell.Lang.LangBay.ParserBay.prototype = Object.create(use("Bayrell.Lang.CoreParser").prototype);
Bayrell.Lang.LangBay.ParserBay.prototype.constructor = Bayrell.Lang.LangBay.ParserBay;
Object.assign(Bayrell.Lang.LangBay.ParserBay.prototype,
{
	_init: function(ctx)
	{
		use("Bayrell.Lang.CoreParser").prototype._init.call(this,ctx);
		this.vars = null;
		this.uses = null;
		this.current_namespace = null;
		this.current_class = null;
		this.current_namespace_name = "";
		this.current_class_name = "";
		this.current_class_kind = "";
		this.current_class_abstract = false;
		this.current_class_declare = false;
		this.find_identifier = true;
		this.skip_comments = true;
		this.pipe_kind = "";
		this.is_pipe = false;
		this.is_html = false;
		this.is_local_css = false;
		this.parser_base = null;
		this.parser_expression = null;
		this.parser_html = null;
		this.parser_operator = null;
		this.parser_preprocessor = null;
		this.parser_program = null;
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBay, use("Bayrell.Lang.CoreParser"));
Object.assign(Bayrell.Lang.LangBay.ParserBay,
{
	/**
	 * Reset parser
	 */
	reset: function(ctx, parser)
	{
		var __v0 = use("Runtime.Dict");
		var __v1 = use("Runtime.Dict");
		var __v2 = use("Bayrell.Lang.Caret");
		var __v3 = use("Bayrell.Lang.LangBay.ParserBayBase");
		var __v4 = use("Bayrell.Lang.LangBay.ParserBayExpression");
		var __v5 = use("Bayrell.Lang.LangBay.ParserBayHtml");
		var __v6 = use("Bayrell.Lang.LangBay.ParserBayOperator");
		var __v7 = use("Bayrell.Lang.LangBay.ParserBayPreprocessor");
		var __v8 = use("Bayrell.Lang.LangBay.ParserBayProgram");
		return parser.copy(ctx, use("Runtime.Dict").from({"vars":new __v0(ctx),"uses":new __v1(ctx),"caret":new __v2(ctx, use("Runtime.Dict").from({})),"token":null,"parser_base":new __v3(ctx),"parser_expression":new __v4(ctx),"parser_html":new __v5(ctx),"parser_operator":new __v6(ctx),"parser_preprocessor":new __v7(ctx),"parser_program":new __v8(ctx)}));
	},
	/**
	 * Parse file and convert to BaseOpCode
	 */
	parse: function(ctx, parser, content)
	{
		parser = this.reset(ctx, parser);
		parser = this.setContent(ctx, parser, content);
		return parser.parser_program.constructor.readProgram(ctx, parser);
	},
	/**
	 * Find module name
	 */
	findModuleName: function(ctx, parser, module_name)
	{
		if (module_name == "Collection")
		{
			return "Runtime.Collection";
		}
		else if (module_name == "Dict")
		{
			return "Runtime.Dict";
		}
		else if (module_name == "Map")
		{
			return "Runtime.Map";
		}
		else if (module_name == "Vector")
		{
			return "Runtime.Vector";
		}
		else if (module_name == "rs")
		{
			return "Runtime.rs";
		}
		else if (module_name == "rtl")
		{
			return "Runtime.rtl";
		}
		else if (module_name == "ArrayInterface")
		{
			return "";
		}
		else if (parser.uses.has(ctx, module_name))
		{
			return parser.uses.item(ctx, module_name);
		}
		return module_name;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBay";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.CoreParser";
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
		if ((f&2)==2)
		{
			a.push("vars");
			a.push("uses");
			a.push("current_namespace");
			a.push("current_class");
			a.push("current_namespace_name");
			a.push("current_class_name");
			a.push("current_class_kind");
			a.push("current_class_abstract");
			a.push("current_class_declare");
			a.push("find_identifier");
			a.push("skip_comments");
			a.push("pipe_kind");
			a.push("is_pipe");
			a.push("is_html");
			a.push("is_local_css");
			a.push("parser_base");
			a.push("parser_expression");
			a.push("parser_html");
			a.push("parser_operator");
			a.push("parser_preprocessor");
			a.push("parser_program");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		if (field_name == "vars") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["bool"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "uses") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_namespace") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpNamespace",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_namespace_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class_kind") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class_abstract") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class_declare") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "find_identifier") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "skip_comments") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pipe_kind") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_pipe") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_html") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_local_css") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "parser_base") return Dict.from({
			"t": "Bayrell.Lang.LangBay.ParserBayBase",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "parser_expression") return Dict.from({
			"t": "Bayrell.Lang.LangBay.ParserBayExpression",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "parser_html") return Dict.from({
			"t": "Bayrell.Lang.LangBay.ParserBayHtml",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "parser_operator") return Dict.from({
			"t": "Bayrell.Lang.LangBay.ParserBayOperator",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "parser_preprocessor") return Dict.from({
			"t": "Bayrell.Lang.LangBay.ParserBayPreprocessor",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "parser_program") return Dict.from({
			"t": "Bayrell.Lang.LangBay.ParserBayProgram",
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
			"reset",
			"parse",
			"findModuleName",
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Bayrell.Lang.LangBay.ParserBay);
module.exports = Bayrell.Lang.LangBay.ParserBay;