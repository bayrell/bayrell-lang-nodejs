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
Bayrell.Lang.CoreParser = function(ctx)
{
	use("Runtime.BaseStruct").apply(this, arguments);
};
Bayrell.Lang.CoreParser.prototype = Object.create(use("Runtime.BaseStruct").prototype);
Bayrell.Lang.CoreParser.prototype.constructor = Bayrell.Lang.CoreParser;
Object.assign(Bayrell.Lang.CoreParser.prototype,
{
	/**
	 * Returns true if eof
	 */
	isEof: function(ctx)
	{
		return this.caret.pos >= this.content_sz;
	},
	_init: function(ctx)
	{
		this.tab_size = 4;
		this.file_name = "";
		this.content = null;
		this.content_sz = 0;
		this.caret = null;
		this.find_ident = true;
		use("Runtime.BaseStruct").prototype._init.call(this,ctx);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.CoreParser";
	},
});
Object.assign(Bayrell.Lang.CoreParser, use("Runtime.BaseStruct"));
Object.assign(Bayrell.Lang.CoreParser,
{
	/**
	 * Reset parser
	 */
	reset: function(ctx, parser)
	{
		var __v0 = use("Bayrell.Lang.Caret");
		return parser.copy(ctx, use("Runtime.Dict").from({"caret":new __v0(ctx, use("Runtime.Dict").from({})),"token":null}));
	},
	/**
	 * Set content
	 */
	setContent: function(ctx, parser, content)
	{
		var __v0 = use("Runtime.Reference");
		var __v1 = use("Runtime.rs");
		return parser.copy(ctx, use("Runtime.Dict").from({"content":new __v0(ctx, content),"content_sz":__v1.strlen(ctx, content)}));
	},
	/**
	 * Parse file and convert to BaseOpCode
	 */
	parse: function(ctx, parser, content)
	{
		parser = this.reset(ctx, parser);
		parser = this.setContent(ctx, parser, content);
		while (parser.caret.pos < parser.content_sz)
		{
			parser = parser.constructor.nextToken(ctx, parser);
		}
		return parser;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.CoreParser";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.CoreParser",
			"name": "Bayrell.Lang.CoreParser",
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
			a.push("tab_size");
			a.push("file_name");
			a.push("content");
			a.push("content_sz");
			a.push("caret");
			a.push("find_ident");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		if (field_name == "tab_size") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreParser",
			"name": field_name,
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "file_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreParser",
			"name": field_name,
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "content") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreParser",
			"name": field_name,
			"t": "Runtime.Reference",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "content_sz") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreParser",
			"name": field_name,
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "caret") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreParser",
			"name": field_name,
			"t": "Bayrell.Lang.Caret",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "find_ident") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreParser",
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
});use.add(Bayrell.Lang.CoreParser);
module.exports = Bayrell.Lang.CoreParser;