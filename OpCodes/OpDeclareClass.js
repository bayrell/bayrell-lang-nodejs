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
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype._init.call(this,ctx);
		this.op = "op_class";
		this.kind = "";
		this.name = "";
		this.extend_name = "";
		this.annotations = null;
		this.comments = null;
		this.template = null;
		this.flags = null;
		this.fn_create = null;
		this.fn_destroy = null;
		this.class_extends = null;
		this.class_implements = null;
		this.vars = null;
		this.functions = null;
		this.items = null;
		this.is_abstract = false;
		this.is_static = false;
		this.is_declare = false;
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.OpCodes.OpDeclareClass"))
		{
			this.op = o.op;
			this.kind = o.kind;
			this.name = o.name;
			this.extend_name = o.extend_name;
			this.annotations = o.annotations;
			this.comments = o.comments;
			this.template = o.template;
			this.flags = o.flags;
			this.fn_create = o.fn_create;
			this.fn_destroy = o.fn_destroy;
			this.class_extends = o.class_extends;
			this.class_implements = o.class_implements;
			this.vars = o.vars;
			this.functions = o.functions;
			this.items = o.items;
			this.is_abstract = o.is_abstract;
			this.is_static = o.is_static;
			this.is_declare = o.is_declare;
		}
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "op")this.op = v;
		else if (k == "kind")this.kind = v;
		else if (k == "name")this.name = v;
		else if (k == "extend_name")this.extend_name = v;
		else if (k == "annotations")this.annotations = v;
		else if (k == "comments")this.comments = v;
		else if (k == "template")this.template = v;
		else if (k == "flags")this.flags = v;
		else if (k == "fn_create")this.fn_create = v;
		else if (k == "fn_destroy")this.fn_destroy = v;
		else if (k == "class_extends")this.class_extends = v;
		else if (k == "class_implements")this.class_implements = v;
		else if (k == "vars")this.vars = v;
		else if (k == "functions")this.functions = v;
		else if (k == "items")this.items = v;
		else if (k == "is_abstract")this.is_abstract = v;
		else if (k == "is_static")this.is_static = v;
		else if (k == "is_declare")this.is_declare = v;
		else use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "kind")return this.kind;
		else if (k == "name")return this.name;
		else if (k == "extend_name")return this.extend_name;
		else if (k == "annotations")return this.annotations;
		else if (k == "comments")return this.comments;
		else if (k == "template")return this.template;
		else if (k == "flags")return this.flags;
		else if (k == "fn_create")return this.fn_create;
		else if (k == "fn_destroy")return this.fn_destroy;
		else if (k == "class_extends")return this.class_extends;
		else if (k == "class_implements")return this.class_implements;
		else if (k == "vars")return this.vars;
		else if (k == "functions")return this.functions;
		else if (k == "items")return this.items;
		else if (k == "is_abstract")return this.is_abstract;
		else if (k == "is_static")return this.is_static;
		else if (k == "is_declare")return this.is_declare;
		return use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.takeValue.call(this,ctx,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpDeclareClass, use("Bayrell.Lang.OpCodes.BaseOpCode"));
Object.assign(Bayrell.Lang.OpCodes.OpDeclareClass,
{
	KIND_CLASS: "class",
	KIND_STRUCT: "struct",
	KIND_INTERFACE: "interface",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
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
			a.push("is_abstract");
			a.push("is_static");
			a.push("is_declare");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		if (field_name == "KIND_CLASS") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "KIND_STRUCT") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "KIND_INTERFACE") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "kind") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "extend_name") return Dict.from({
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
		if (field_name == "template") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpTypeIdentifier"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "flags") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpFlags",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "fn_create") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpDeclareFunction",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "fn_destroy") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpDeclareFunction",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "class_extends") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpTypeIdentifier",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "class_implements") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpTypeIdentifier"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "vars") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpAssign"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "functions") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpDeclareFunction"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "items") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.BaseOpCode"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_abstract") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_static") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_declare") return Dict.from({
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
});use.add(Bayrell.Lang.OpCodes.OpDeclareClass);
module.exports = Bayrell.Lang.OpCodes.OpDeclareClass;