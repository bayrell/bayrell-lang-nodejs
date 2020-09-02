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
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpIfElse = function(ctx)
{
	use("Runtime.BaseStruct").apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpIfElse.prototype = Object.create(use("Runtime.BaseStruct").prototype);
Bayrell.Lang.OpCodes.OpIfElse.prototype.constructor = Bayrell.Lang.OpCodes.OpIfElse;
Object.assign(Bayrell.Lang.OpCodes.OpIfElse.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.condition = null;
		this.if_true = null;
		use("Runtime.BaseStruct").prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.OpCodes.OpIfElse"))
		{
			this.condition = o.condition;
			this.if_true = o.if_true;
		}
		use("Runtime.BaseStruct").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "condition")this.condition = v;
		else if (k == "if_true")this.if_true = v;
		else use("Runtime.BaseStruct").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "condition")return this.condition;
		else if (k == "if_true")return this.if_true;
		return use("Runtime.BaseStruct").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.OpCodes.OpIfElse";
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpIfElse, use("Runtime.BaseStruct"));
Object.assign(Bayrell.Lang.OpCodes.OpIfElse,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpIfElse";
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
			"class_name": "Bayrell.Lang.OpCodes.OpIfElse",
			"name": "Bayrell.Lang.OpCodes.OpIfElse",
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
			a.push("condition");
			a.push("if_true");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		if (field_name == "condition") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpIfElse",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "if_true") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpIfElse",
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
});use.add(Bayrell.Lang.OpCodes.OpIfElse);
module.exports = Bayrell.Lang.OpCodes.OpIfElse;