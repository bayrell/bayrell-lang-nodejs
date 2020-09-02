"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Parser Library.
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
if (typeof Bayrell.Lang.Exceptions == 'undefined') Bayrell.Lang.Exceptions = {};
Bayrell.Lang.Exceptions.ParserUnknownError = function(ctx, s, code, context, prev)
{
	if (prev == undefined) prev = null;
	if (code == -1)
	{
		var __v0 = use("Bayrell.Lang.LangConstant");
		code = __v0.ERROR_PARSER;
	}
	use("Runtime.Exceptions.RuntimeException").call(this, ctx, s, code, context, prev);
};
Bayrell.Lang.Exceptions.ParserUnknownError.prototype = Object.create(use("Runtime.Exceptions.RuntimeException").prototype);
Bayrell.Lang.Exceptions.ParserUnknownError.prototype.constructor = Bayrell.Lang.Exceptions.ParserUnknownError;
Object.assign(Bayrell.Lang.Exceptions.ParserUnknownError.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.Exceptions.ParserUnknownError"))
		{
		}
		use("Runtime.Exceptions.RuntimeException").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		use("Runtime.Exceptions.RuntimeException").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return use("Runtime.Exceptions.RuntimeException").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.Exceptions.ParserUnknownError";
	},
});
Object.assign(Bayrell.Lang.Exceptions.ParserUnknownError, use("Runtime.Exceptions.RuntimeException"));
Object.assign(Bayrell.Lang.Exceptions.ParserUnknownError,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.Exceptions";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.Exceptions.ParserUnknownError";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.Exceptions.ParserUnknownError",
			"name": "Bayrell.Lang.Exceptions.ParserUnknownError",
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
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
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
});use.add(Bayrell.Lang.Exceptions.ParserUnknownError);
module.exports = Bayrell.Lang.Exceptions.ParserUnknownError;