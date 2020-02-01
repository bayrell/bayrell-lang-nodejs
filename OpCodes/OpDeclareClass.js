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
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpDeclareClass = function(ctx)
{
	use("Bayrell.Lang.OpCodes.BaseOpCode").apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpDeclareClass.prototype = Object.create(use("Bayrell.Lang.OpCodes.BaseOpCode").prototype);
Bayrell.Lang.OpCodes.OpDeclareClass.prototype.constructor = Bayrell.Lang.OpCodes.OpDeclareClass;
Object.assign(Bayrell.Lang.OpCodes.OpDeclareClass.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__op = "op_class";
		if (a.indexOf("op") == -1) defProp(this, "op");
		this.__kind = "";
		if (a.indexOf("kind") == -1) defProp(this, "kind");
		this.__name = "";
		if (a.indexOf("name") == -1) defProp(this, "name");
		this.__extend_name = "";
		if (a.indexOf("extend_name") == -1) defProp(this, "extend_name");
		this.__annotations = null;
		if (a.indexOf("annotations") == -1) defProp(this, "annotations");
		this.__comments = null;
		if (a.indexOf("comments") == -1) defProp(this, "comments");
		this.__template = null;
		if (a.indexOf("template") == -1) defProp(this, "template");
		this.__flags = null;
		if (a.indexOf("flags") == -1) defProp(this, "flags");
		this.__fn_create = null;
		if (a.indexOf("fn_create") == -1) defProp(this, "fn_create");
		this.__fn_destroy = null;
		if (a.indexOf("fn_destroy") == -1) defProp(this, "fn_destroy");
		this.__class_extends = null;
		if (a.indexOf("class_extends") == -1) defProp(this, "class_extends");
		this.__class_implements = null;
		if (a.indexOf("class_implements") == -1) defProp(this, "class_implements");
		this.__vars = null;
		if (a.indexOf("vars") == -1) defProp(this, "vars");
		this.__functions = null;
		if (a.indexOf("functions") == -1) defProp(this, "functions");
		this.__items = null;
		if (a.indexOf("items") == -1) defProp(this, "items");
		this.__is_static = false;
		if (a.indexOf("is_static") == -1) defProp(this, "is_static");
		this.__is_declare = false;
		if (a.indexOf("is_declare") == -1) defProp(this, "is_declare");
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.OpCodes.OpDeclareClass"))
		{
			this.__op = o.__op;
			this.__kind = o.__kind;
			this.__name = o.__name;
			this.__extend_name = o.__extend_name;
			this.__annotations = o.__annotations;
			this.__comments = o.__comments;
			this.__template = o.__template;
			this.__flags = o.__flags;
			this.__fn_create = o.__fn_create;
			this.__fn_destroy = o.__fn_destroy;
			this.__class_extends = o.__class_extends;
			this.__class_implements = o.__class_implements;
			this.__vars = o.__vars;
			this.__functions = o.__functions;
			this.__items = o.__items;
			this.__is_static = o.__is_static;
			this.__is_declare = o.__is_declare;
		}
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "op")this.__op = v;
		else if (k == "kind")this.__kind = v;
		else if (k == "name")this.__name = v;
		else if (k == "extend_name")this.__extend_name = v;
		else if (k == "annotations")this.__annotations = v;
		else if (k == "comments")this.__comments = v;
		else if (k == "template")this.__template = v;
		else if (k == "flags")this.__flags = v;
		else if (k == "fn_create")this.__fn_create = v;
		else if (k == "fn_destroy")this.__fn_destroy = v;
		else if (k == "class_extends")this.__class_extends = v;
		else if (k == "class_implements")this.__class_implements = v;
		else if (k == "vars")this.__vars = v;
		else if (k == "functions")this.__functions = v;
		else if (k == "items")this.__items = v;
		else if (k == "is_static")this.__is_static = v;
		else if (k == "is_declare")this.__is_declare = v;
		else use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.__op;
		else if (k == "kind")return this.__kind;
		else if (k == "name")return this.__name;
		else if (k == "extend_name")return this.__extend_name;
		else if (k == "annotations")return this.__annotations;
		else if (k == "comments")return this.__comments;
		else if (k == "template")return this.__template;
		else if (k == "flags")return this.__flags;
		else if (k == "fn_create")return this.__fn_create;
		else if (k == "fn_destroy")return this.__fn_destroy;
		else if (k == "class_extends")return this.__class_extends;
		else if (k == "class_implements")return this.__class_implements;
		else if (k == "vars")return this.__vars;
		else if (k == "functions")return this.__functions;
		else if (k == "items")return this.__items;
		else if (k == "is_static")return this.__is_static;
		else if (k == "is_declare")return this.__is_declare;
		return use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.OpCodes.OpDeclareClass";
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpDeclareClass, use("Bayrell.Lang.OpCodes.BaseOpCode"));
Object.assign(Bayrell.Lang.OpCodes.OpDeclareClass,
{
	KIND_CLASS: "class",
	KIND_STRUCT: "struct",
	KIND_INTERFACE: "interface",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpDeclareClass";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"name": "Bayrell.Lang.OpCodes.OpDeclareClass",
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
			a.push("op");
			a.push("kind");
			a.push("name");
			a.push("extend_name");
			a.push("annotations");
			a.push("comments");
			a.push("template");
			a.push("flags");
			a.push("fn_create");
			a.push("fn_destroy");
			a.push("class_extends");
			a.push("class_implements");
			a.push("vars");
			a.push("functions");
			a.push("items");
			a.push("is_static");
			a.push("is_declare");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		if (field_name == "KIND_CLASS") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "KIND_STRUCT") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "KIND_INTERFACE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "op") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "kind") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "extend_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "annotations") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "comments") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "template") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "flags") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "fn_create") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "fn_destroy") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "class_extends") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "class_implements") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "vars") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "functions") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "items") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_static") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_declare") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareClass",
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
});use.add(Bayrell.Lang.OpCodes.OpDeclareClass);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.OpCodes == undefined) module.exports.Bayrell.Lang.OpCodes = {};
module.exports.Bayrell.Lang.OpCodes.OpDeclareClass = Bayrell.Lang.OpCodes.OpDeclareClass;