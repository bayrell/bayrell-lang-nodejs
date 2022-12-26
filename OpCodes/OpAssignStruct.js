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
Bayrell.Lang.OpCodes.OpAssignStruct = function(ctx)
{
	use("Bayrell.Lang.OpCodes.BaseOpCode").apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpAssignStruct.prototype = Object.create(use("Bayrell.Lang.OpCodes.BaseOpCode").prototype);
Bayrell.Lang.OpCodes.OpAssignStruct.prototype.constructor = Bayrell.Lang.OpCodes.OpAssignStruct;
Object.assign(Bayrell.Lang.OpCodes.OpAssignStruct.prototype,
{
	_init: function(ctx)
	{
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype._init.call(this,ctx);
		this.var_name = "";
		this.annotations = null;
		this.comments = null;
		this.names = null;
		this.expression = null;
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.OpCodes.OpAssignStruct"))
		{
			this.var_name = o.var_name;
			this.annotations = o.annotations;
			this.comments = o.comments;
			this.names = o.names;
			this.expression = o.expression;
		}
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "var_name")this.var_name = v;
		else if (k == "annotations")this.annotations = v;
		else if (k == "comments")this.comments = v;
		else if (k == "names")this.names = v;
		else if (k == "expression")this.expression = v;
		else use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "var_name")return this.var_name;
		else if (k == "annotations")return this.annotations;
		else if (k == "comments")return this.comments;
		else if (k == "names")return this.names;
		else if (k == "expression")return this.expression;
		return use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.takeValue.call(this,ctx,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpAssignStruct, use("Bayrell.Lang.OpCodes.BaseOpCode"));
Object.assign(Bayrell.Lang.OpCodes.OpAssignStruct,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpAssignStruct";
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
			a.push("var_name");
			a.push("annotations");
			a.push("comments");
			a.push("names");
			a.push("expression");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		if (field_name == "var_name") return Dict.from({
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
		if (field_name == "names") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["var"],
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
});use.add(Bayrell.Lang.OpCodes.OpAssignStruct);
module.exports = Bayrell.Lang.OpCodes.OpAssignStruct;