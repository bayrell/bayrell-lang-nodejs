"use strict;"
var use = require('bay-lang').use;
/*!
 *  Bayrell Parser Library.
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
if (typeof Bayrell.Lang.Exceptions == 'undefined') Bayrell.Lang.Exceptions = {};
Bayrell.Lang.Exceptions.DeclaredClass = function(ctx, prev)
{
	if (prev == undefined) prev = null;
	use("Runtime.Exceptions.RuntimeException").call(this, ctx, "Declared class", -1, prev);
};
Bayrell.Lang.Exceptions.DeclaredClass.prototype = Object.create(use("Runtime.Exceptions.RuntimeException").prototype);
Bayrell.Lang.Exceptions.DeclaredClass.prototype.constructor = Bayrell.Lang.Exceptions.DeclaredClass;
Object.assign(Bayrell.Lang.Exceptions.DeclaredClass.prototype,
{
});
Object.assign(Bayrell.Lang.Exceptions.DeclaredClass, use("Runtime.Exceptions.RuntimeException"));
Object.assign(Bayrell.Lang.Exceptions.DeclaredClass,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.Exceptions";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.Exceptions.DeclaredClass";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
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
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		return null;
	},
	getMethodsList: function(ctx,f)
	{
		if (f==undefined) f=0;
		var a = [];
		if ((f&4)==4) a=[
			"constructor",
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Bayrell.Lang.Exceptions.DeclaredClass);
module.exports = Bayrell.Lang.Exceptions.DeclaredClass;