"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
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
Bayrell.Lang.LangBay.ParserBay = function(__ctx)
{
	use("Bayrell.Lang.CoreParser").apply(this, arguments);
};
Bayrell.Lang.LangBay.ParserBay.prototype = Object.create(use("Bayrell.Lang.CoreParser").prototype);
Bayrell.Lang.LangBay.ParserBay.prototype.constructor = Bayrell.Lang.LangBay.ParserBay;
Object.assign(Bayrell.Lang.LangBay.ParserBay.prototype,
{
	_init: function(__ctx)
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
		this.parser_base = null;
		this.parser_expression = null;
		this.parser_html = null;
		this.parser_operator = null;
		this.parser_preprocessor = null;
		this.parser_program = null;
		use("Bayrell.Lang.CoreParser").prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
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
			this.parser_base = o.parser_base;
			this.parser_expression = o.parser_expression;
			this.parser_html = o.parser_html;
			this.parser_operator = o.parser_operator;
			this.parser_preprocessor = o.parser_preprocessor;
			this.parser_program = o.parser_program;
		}
		use("Bayrell.Lang.CoreParser").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
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
		else if (k == "parser_base")this.parser_base = v;
		else if (k == "parser_expression")this.parser_expression = v;
		else if (k == "parser_html")this.parser_html = v;
		else if (k == "parser_operator")this.parser_operator = v;
		else if (k == "parser_preprocessor")this.parser_preprocessor = v;
		else if (k == "parser_program")this.parser_program = v;
		else use("Bayrell.Lang.CoreParser").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
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
		else if (k == "parser_base")return this.parser_base;
		else if (k == "parser_expression")return this.parser_expression;
		else if (k == "parser_html")return this.parser_html;
		else if (k == "parser_operator")return this.parser_operator;
		else if (k == "parser_preprocessor")return this.parser_preprocessor;
		else if (k == "parser_program")return this.parser_program;
		return use("Bayrell.Lang.CoreParser").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
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
	reset: function(__ctx, parser)
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
		return parser.copy(__ctx, use("Runtime.Dict").from({"vars":new __v0(__ctx),"uses":new __v1(__ctx),"caret":new __v2(__ctx, use("Runtime.Dict").from({})),"token":null,"parser_base":new __v3(__ctx),"parser_expression":new __v4(__ctx),"parser_html":new __v5(__ctx),"parser_operator":new __v6(__ctx),"parser_preprocessor":new __v7(__ctx),"parser_program":new __v8(__ctx)}));
	},
	/**
	 * Parse file and convert to BaseOpCode
	 */
	parse: function(__ctx, parser, content)
	{
		parser = this.reset(__ctx, parser);
		parser = this.setContent(__ctx, parser, content);
		return parser.parser_program.constructor.readProgram(__ctx, parser);
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
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangBay.ParserBay",
			"name": "Bayrell.Lang.LangBay.ParserBay",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
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
			a.push("parser_base");
			a.push("parser_expression");
			a.push("parser_html");
			a.push("parser_operator");
			a.push("parser_preprocessor");
			a.push("parser_program");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(__ctx,field_name)
	{
		return null;
	},
	getMethodsList: function(__ctx)
	{
		var a = [
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(__ctx,field_name)
	{
		return null;
	},
});use.add(Bayrell.Lang.LangBay.ParserBay);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangBay == undefined) module.exports.Bayrell.Lang.LangBay = {};
module.exports.Bayrell.Lang.LangBay.ParserBay = Bayrell.Lang.LangBay.ParserBay;