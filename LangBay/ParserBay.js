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
		this.vars = null;
		this.uses = null;
		this.current_namespace = null;
		this.current_class = null;
		this.current_namespace_name = "";
		this.current_class_name = "";
		this.current_class_kind = "";
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
		use("Bayrell.Lang.CoreParser").prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.LangBay.ParserBay"))
		{
			this.vars = o.vars;
			this.uses = o.uses;
			this.current_namespace = o.current_namespace;
			this.current_class = o.current_class;
			this.current_namespace_name = o.current_namespace_name;
			this.current_class_name = o.current_class_name;
			this.current_class_kind = o.current_class_kind;
			this.find_identifier = o.find_identifier;
			this.skip_comments = o.skip_comments;
			this.pipe_kind = o.pipe_kind;
			this.is_pipe = o.is_pipe;
			this.is_html = o.is_html;
			this.is_local_css = o.is_local_css;
			this.parser_base = o.parser_base;
			this.parser_expression = o.parser_expression;
			this.parser_html = o.parser_html;
			this.parser_operator = o.parser_operator;
			this.parser_preprocessor = o.parser_preprocessor;
			this.parser_program = o.parser_program;
		}
		use("Bayrell.Lang.CoreParser").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "vars")this.vars = v;
		else if (k == "uses")this.uses = v;
		else if (k == "current_namespace")this.current_namespace = v;
		else if (k == "current_class")this.current_class = v;
		else if (k == "current_namespace_name")this.current_namespace_name = v;
		else if (k == "current_class_name")this.current_class_name = v;
		else if (k == "current_class_kind")this.current_class_kind = v;
		else if (k == "find_identifier")this.find_identifier = v;
		else if (k == "skip_comments")this.skip_comments = v;
		else if (k == "pipe_kind")this.pipe_kind = v;
		else if (k == "is_pipe")this.is_pipe = v;
		else if (k == "is_html")this.is_html = v;
		else if (k == "is_local_css")this.is_local_css = v;
		else if (k == "parser_base")this.parser_base = v;
		else if (k == "parser_expression")this.parser_expression = v;
		else if (k == "parser_html")this.parser_html = v;
		else if (k == "parser_operator")this.parser_operator = v;
		else if (k == "parser_preprocessor")this.parser_preprocessor = v;
		else if (k == "parser_program")this.parser_program = v;
		else use("Bayrell.Lang.CoreParser").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "vars")return this.vars;
		else if (k == "uses")return this.uses;
		else if (k == "current_namespace")return this.current_namespace;
		else if (k == "current_class")return this.current_class;
		else if (k == "current_namespace_name")return this.current_namespace_name;
		else if (k == "current_class_name")return this.current_class_name;
		else if (k == "current_class_kind")return this.current_class_kind;
		else if (k == "find_identifier")return this.find_identifier;
		else if (k == "skip_comments")return this.skip_comments;
		else if (k == "pipe_kind")return this.pipe_kind;
		else if (k == "is_pipe")return this.is_pipe;
		else if (k == "is_html")return this.is_html;
		else if (k == "is_local_css")return this.is_local_css;
		else if (k == "parser_base")return this.parser_base;
		else if (k == "parser_expression")return this.parser_expression;
		else if (k == "parser_html")return this.parser_html;
		else if (k == "parser_operator")return this.parser_operator;
		else if (k == "parser_preprocessor")return this.parser_preprocessor;
		else if (k == "parser_program")return this.parser_program;
		return use("Bayrell.Lang.CoreParser").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.LangBay.ParserBay";
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
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getCurrentClassName: function()
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
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangBay.ParserBay",
			"name": "Bayrell.Lang.LangBay.ParserBay",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
		{
			a.push("vars");
			a.push("uses");
			a.push("current_namespace");
			a.push("current_class");
			a.push("current_namespace_name");
			a.push("current_class_name");
			a.push("current_class_kind");
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
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		if (field_name == "vars") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangBay.ParserBay",
			"t": "Runtime.Dict",
			"s": ["bool"],
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "uses") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangBay.ParserBay",
			"t": "Runtime.Dict",
			"s": ["string"],
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_namespace") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangBay.ParserBay",
			"t": "Bayrell.Lang.OpCodes.OpNamespace",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangBay.ParserBay",
			"t": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_namespace_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangBay.ParserBay",
			"t": "string",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangBay.ParserBay",
			"t": "string",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class_kind") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangBay.ParserBay",
			"t": "string",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "find_identifier") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangBay.ParserBay",
			"t": "bool",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "skip_comments") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangBay.ParserBay",
			"t": "bool",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pipe_kind") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangBay.ParserBay",
			"t": "string",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_pipe") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangBay.ParserBay",
			"t": "bool",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_html") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangBay.ParserBay",
			"t": "bool",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_local_css") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangBay.ParserBay",
			"t": "bool",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "parser_base") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangBay.ParserBay",
			"t": "Bayrell.Lang.LangBay.ParserBayBase",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "parser_expression") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangBay.ParserBay",
			"t": "Bayrell.Lang.LangBay.ParserBayExpression",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "parser_html") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangBay.ParserBay",
			"t": "Bayrell.Lang.LangBay.ParserBayHtml",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "parser_operator") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangBay.ParserBay",
			"t": "Bayrell.Lang.LangBay.ParserBayOperator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "parser_preprocessor") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangBay.ParserBay",
			"t": "Bayrell.Lang.LangBay.ParserBayPreprocessor",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "parser_program") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangBay.ParserBay",
			"t": "Bayrell.Lang.LangBay.ParserBayProgram",
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
});use.add(Bayrell.Lang.LangBay.ParserBay);
module.exports = Bayrell.Lang.LangBay.ParserBay;