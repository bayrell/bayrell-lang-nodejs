"use strict;"
var use = require('bay-lang').use;
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2020 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell.Lang.LangNode == 'undefined') Bayrell.Lang.LangNode = {};
Bayrell.Lang.LangNode.TranslatorNodeExpression = function(ctx)
{
	use("Bayrell.Lang.LangES6.TranslatorES6Expression").apply(this, arguments);
};
Bayrell.Lang.LangNode.TranslatorNodeExpression.prototype = Object.create(use("Bayrell.Lang.LangES6.TranslatorES6Expression").prototype);
Bayrell.Lang.LangNode.TranslatorNodeExpression.prototype.constructor = Bayrell.Lang.LangNode.TranslatorNodeExpression;
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeExpression.prototype,
{
});
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeExpression, use("Bayrell.Lang.LangES6.TranslatorES6Expression"));
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeExpression,
{
	/**
	 * OpIdentifier
	 */
	OpIdentifier: function(ctx, t, op_code)
	{
		if (op_code.value == "@")
		{
			return use("Runtime.Collection").from([t,"ctx"]);
		}
		if (op_code.value == "_")
		{
			return use("Runtime.Collection").from([t,"ctx.constructor.translate"]);
		}
		if (op_code.value == "log")
		{
			return use("Runtime.Collection").from([t,"console.log"]);
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		if (t.modules.has(ctx, op_code.value) || op_code.kind == __v0.KIND_SYS_TYPE)
		{
			var module_name = op_code.value;
			var new_module_name = this.findModuleName(ctx, t, module_name);
			if (module_name != new_module_name)
			{
				var res = t.constructor.addSaveOpCode(ctx, t, use("Runtime.Dict").from({"op_code":op_code,"var_content":this.useModuleName(ctx, t, module_name)}));
				t = Runtime.rtl.get(ctx, res, 0);
				var var_name = Runtime.rtl.get(ctx, res, 1);
				return use("Runtime.Collection").from([t,var_name]);
			}
		}
		return use("Runtime.Collection").from([t,op_code.value]);
	},
	/**
	 * OpTypeIdentifier
	 */
	OpTypeIdentifier: function(ctx, t, op_code)
	{
		var var_name = "";
		if (op_code.entity_name.names.count(ctx) > 0)
		{
			var module_name = op_code.entity_name.names.first(ctx);
			var new_module_name = this.findModuleName(ctx, t, module_name);
			if (module_name != new_module_name)
			{
				var res = t.constructor.addSaveOpCode(ctx, t, use("Runtime.Dict").from({"var_content":this.useModuleName(ctx, t, module_name)}));
				t = Runtime.rtl.get(ctx, res, 0);
				var_name = Runtime.rtl.get(ctx, res, 1);
			}
		}
		if (var_name == "")
		{
			var __v0 = use("Runtime.rs");
			var_name = __v0.join(ctx, ".", op_code.entity_name.names);
		}
		return use("Runtime.Collection").from([t,var_name]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangNode";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangNode.TranslatorNodeExpression";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Expression";
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
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Bayrell.Lang.LangNode.TranslatorNodeExpression);
module.exports = Bayrell.Lang.LangNode.TranslatorNodeExpression;