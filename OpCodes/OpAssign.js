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
Bayrell.Lang.OpCodes.OpAssign = function(ctx)
{
	use("Bayrell.Lang.OpCodes.BaseOpCode").apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpAssign.prototype = Object.create(use("Bayrell.Lang.OpCodes.BaseOpCode").prototype);
Bayrell.Lang.OpCodes.OpAssign.prototype.constructor = Bayrell.Lang.OpCodes.OpAssign;
Object.assign(Bayrell.Lang.OpCodes.OpAssign.prototype,
{
	_init: function(ctx)
	{
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype._init.call(this,ctx);
		this.kind = "";
		this.var_name = "";
		this.flags = null;
		this.pattern = null;
		this.annotations = null;
		this.comments = null;
		this.values = null;
		this.names = null;
		this.expression = null;
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "kind")return this.kind;
		else if (k == "var_name")return this.var_name;
		else if (k == "flags")return this.flags;
		else if (k == "pattern")return this.pattern;
		else if (k == "annotations")return this.annotations;
		else if (k == "comments")return this.comments;
		else if (k == "values")return this.values;
		else if (k == "names")return this.names;
		else if (k == "expression")return this.expression;
		return use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.takeValue.call(this,ctx,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpAssign, use("Bayrell.Lang.OpCodes.BaseOpCode"));
Object.assign(Bayrell.Lang.OpCodes.OpAssign,
{
	KIND_ASSIGN: "assign",
	KIND_DECLARE: "declare",
	KIND_STRUCT: "struct",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpAssign";
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
			a.push("kind");
			a.push("var_name");
			a.push("flags");
			a.push("pattern");
			a.push("annotations");
			a.push("comments");
			a.push("values");
			a.push("names");
			a.push("expression");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		if (field_name == "KIND_ASSIGN") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "KIND_DECLARE") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "KIND_STRUCT") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "kind") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "var_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "flags") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpFlags",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pattern") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpTypeIdentifier",
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
		if (field_name == "values") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpAssignValue"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "names") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expression") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
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
});use.add(Bayrell.Lang.OpCodes.OpAssign);
module.exports = Bayrell.Lang.OpCodes.OpAssign;