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
Bayrell.Lang.OpCodes.OpAssignValue = function(ctx)
{
	use("Bayrell.Lang.OpCodes.BaseOpCode").apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpAssignValue.prototype = Object.create(use("Bayrell.Lang.OpCodes.BaseOpCode").prototype);
Bayrell.Lang.OpCodes.OpAssignValue.prototype.constructor = Bayrell.Lang.OpCodes.OpAssignValue;
Object.assign(Bayrell.Lang.OpCodes.OpAssignValue.prototype,
{
	_init: function(ctx)
	{
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype._init.call(this,ctx);
		this.op = "";
		this.var_name = "";
		this.op_code = null;
		this.expression = null;
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.OpCodes.OpAssignValue"))
		{
			this.op = o.op;
			this.var_name = o.var_name;
			this.op_code = o.op_code;
			this.expression = o.expression;
		}
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "op")this.op = v;
		else if (k == "var_name")this.var_name = v;
		else if (k == "op_code")this.op_code = v;
		else if (k == "expression")this.expression = v;
		else use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "var_name")return this.var_name;
		else if (k == "op_code")return this.op_code;
		else if (k == "expression")return this.expression;
		return use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.takeValue.call(this,ctx,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpAssignValue, use("Bayrell.Lang.OpCodes.BaseOpCode"));
Object.assign(Bayrell.Lang.OpCodes.OpAssignValue,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpAssignValue";
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
			a.push("var_name");
			a.push("op_code");
			a.push("expression");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "var_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "op_code") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
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
});use.add(Bayrell.Lang.OpCodes.OpAssignValue);
module.exports = Bayrell.Lang.OpCodes.OpAssignValue;