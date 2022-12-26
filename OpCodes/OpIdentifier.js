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
Bayrell.Lang.OpCodes.OpIdentifier = function(ctx)
{
	use("Bayrell.Lang.OpCodes.BaseOpCode").apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpIdentifier.prototype = Object.create(use("Bayrell.Lang.OpCodes.BaseOpCode").prototype);
Bayrell.Lang.OpCodes.OpIdentifier.prototype.constructor = Bayrell.Lang.OpCodes.OpIdentifier;
Object.assign(Bayrell.Lang.OpCodes.OpIdentifier.prototype,
{
	_init: function(ctx)
	{
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype._init.call(this,ctx);
		this.op = "op_identifier";
		this.value = "";
		this.kind = "";
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.OpCodes.OpIdentifier"))
		{
			this.op = o.op;
			this.value = o.value;
			this.kind = o.kind;
		}
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "op")this.op = v;
		else if (k == "value")this.value = v;
		else if (k == "kind")this.kind = v;
		else use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "value")return this.value;
		else if (k == "kind")return this.kind;
		return use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.takeValue.call(this,ctx,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpIdentifier, use("Bayrell.Lang.OpCodes.BaseOpCode"));
Object.assign(Bayrell.Lang.OpCodes.OpIdentifier,
{
	KIND_PIPE: "pipe",
	KIND_VARIABLE: "var",
	KIND_SYS_TYPE: "sys",
	KIND_SYS_FUNCTION: "sys_fn",
	KIND_FUNCTION: "fn",
	KIND_CONTEXT: "ctx",
	KIND_CONSTANT: "const",
	KIND_CLASS: "class",
	KIND_CLASSREF: "classref",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpIdentifier";
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
			a.push("value");
			a.push("kind");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		if (field_name == "KIND_PIPE") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "KIND_VARIABLE") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "KIND_SYS_TYPE") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "KIND_SYS_FUNCTION") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "KIND_FUNCTION") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "KIND_CONTEXT") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "KIND_CONSTANT") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "KIND_CLASS") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "KIND_CLASSREF") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "kind") return Dict.from({
			"t": "string",
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
});use.add(Bayrell.Lang.OpCodes.OpIdentifier);
module.exports = Bayrell.Lang.OpCodes.OpIdentifier;