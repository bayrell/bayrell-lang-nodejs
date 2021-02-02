"use strict;"
var use = require('bayrell').use;
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
Bayrell.Lang.OpCodes.OpHtmlTag = function(ctx)
{
	use("Bayrell.Lang.OpCodes.BaseOpCode").apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpHtmlTag.prototype = Object.create(use("Bayrell.Lang.OpCodes.BaseOpCode").prototype);
Bayrell.Lang.OpCodes.OpHtmlTag.prototype.constructor = Bayrell.Lang.OpCodes.OpHtmlTag;
Object.assign(Bayrell.Lang.OpCodes.OpHtmlTag.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.op = "op_html_tag";
		this.tag_name = "";
		this.op_code_name = null;
		this.attrs = null;
		this.spreads = null;
		this.items = null;
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.OpCodes.OpHtmlTag"))
		{
			this.op = o.op;
			this.tag_name = o.tag_name;
			this.op_code_name = o.op_code_name;
			this.attrs = o.attrs;
			this.spreads = o.spreads;
			this.items = o.items;
		}
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "op")this.op = v;
		else if (k == "tag_name")this.tag_name = v;
		else if (k == "op_code_name")this.op_code_name = v;
		else if (k == "attrs")this.attrs = v;
		else if (k == "spreads")this.spreads = v;
		else if (k == "items")this.items = v;
		else use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "tag_name")return this.tag_name;
		else if (k == "op_code_name")return this.op_code_name;
		else if (k == "attrs")return this.attrs;
		else if (k == "spreads")return this.spreads;
		else if (k == "items")return this.items;
		return use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.OpCodes.OpHtmlTag";
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpHtmlTag, use("Bayrell.Lang.OpCodes.BaseOpCode"));
Object.assign(Bayrell.Lang.OpCodes.OpHtmlTag,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpHtmlTag";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.OpCodes.OpHtmlTag",
			"name": "Bayrell.Lang.OpCodes.OpHtmlTag",
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
			a.push("tag_name");
			a.push("op_code_name");
			a.push("attrs");
			a.push("spreads");
			a.push("items");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		if (field_name == "op") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpHtmlTag",
			"name": field_name,
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "tag_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpHtmlTag",
			"name": field_name,
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "op_code_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpHtmlTag",
			"name": field_name,
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "attrs") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpHtmlTag",
			"name": field_name,
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpHtmlAttribute"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "spreads") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpHtmlTag",
			"name": field_name,
			"t": "Runtime.Collection",
			"s": ["primitive"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "items") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpHtmlTag",
			"name": field_name,
			"t": "Bayrell.Lang.OpCodes.OpHtmlItems",
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
});use.add(Bayrell.Lang.OpCodes.OpHtmlTag);
module.exports = Bayrell.Lang.OpCodes.OpHtmlTag;