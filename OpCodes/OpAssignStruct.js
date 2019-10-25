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
Bayrell.Lang.OpCodes.OpAssignStruct = function(__ctx)
{
	use("Bayrell.Lang.OpCodes.BaseOpCode").apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpAssignStruct.prototype = Object.create(use("Bayrell.Lang.OpCodes.BaseOpCode").prototype);
Bayrell.Lang.OpCodes.OpAssignStruct.prototype.constructor = Bayrell.Lang.OpCodes.OpAssignStruct;
Object.assign(Bayrell.Lang.OpCodes.OpAssignStruct.prototype,
{
	_init: function(__ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__var_name = "";
		if (a.indexOf("var_name") == -1) defProp(this, "var_name");
		this.__annotations = null;
		if (a.indexOf("annotations") == -1) defProp(this, "annotations");
		this.__comments = null;
		if (a.indexOf("comments") == -1) defProp(this, "comments");
		this.__names = null;
		if (a.indexOf("names") == -1) defProp(this, "names");
		this.__expression = null;
		if (a.indexOf("expression") == -1) defProp(this, "expression");
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.OpCodes.OpAssignStruct"))
		{
			this.__var_name = o.__var_name;
			this.__annotations = o.__annotations;
			this.__comments = o.__comments;
			this.__names = o.__names;
			this.__expression = o.__expression;
		}
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "var_name")this.__var_name = v;
		else if (k == "annotations")this.__annotations = v;
		else if (k == "comments")this.__comments = v;
		else if (k == "names")this.__names = v;
		else if (k == "expression")this.__expression = v;
		else use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "var_name")return this.__var_name;
		else if (k == "annotations")return this.__annotations;
		else if (k == "comments")return this.__comments;
		else if (k == "names")return this.__names;
		else if (k == "expression")return this.__expression;
		return use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Bayrell.Lang.OpCodes.OpAssignStruct";
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpAssignStruct, use("Bayrell.Lang.OpCodes.BaseOpCode"));
Object.assign(Bayrell.Lang.OpCodes.OpAssignStruct,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpAssignStruct";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.OpCodes.OpAssignStruct",
			"name": "Bayrell.Lang.OpCodes.OpAssignStruct",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("var_name");
			a.push("annotations");
			a.push("comments");
			a.push("names");
			a.push("expression");
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
});use.add(Bayrell.Lang.OpCodes.OpAssignStruct);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.OpCodes == undefined) module.exports.Bayrell.Lang.OpCodes = {};
module.exports.Bayrell.Lang.OpCodes.OpAssignStruct = Bayrell.Lang.OpCodes.OpAssignStruct;