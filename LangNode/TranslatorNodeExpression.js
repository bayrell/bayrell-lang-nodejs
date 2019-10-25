"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell.Lang.LangNode == 'undefined') Bayrell.Lang.LangNode = {};
Bayrell.Lang.LangNode.TranslatorNodeExpression = function(__ctx)
{
	use("Bayrell.Lang.LangES6.TranslatorES6Expression").apply(this, arguments);
};
Bayrell.Lang.LangNode.TranslatorNodeExpression.prototype = Object.create(use("Bayrell.Lang.LangES6.TranslatorES6Expression").prototype);
Bayrell.Lang.LangNode.TranslatorNodeExpression.prototype.constructor = Bayrell.Lang.LangNode.TranslatorNodeExpression;
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeExpression.prototype,
{
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.LangNode.TranslatorNodeExpression"))
		{
		}
		use("Bayrell.Lang.LangES6.TranslatorES6Expression").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		use("Bayrell.Lang.LangES6.TranslatorES6Expression").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		return use("Bayrell.Lang.LangES6.TranslatorES6Expression").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Bayrell.Lang.LangNode.TranslatorNodeExpression";
	},
});
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeExpression, use("Bayrell.Lang.LangES6.TranslatorES6Expression"));
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeExpression,
{
	/**
	 * Returns string
	 */
	rtlToStr: function(__ctx, t, s)
	{
		return "use(\"Runtime.rtl\").toStr(" + use("Runtime.rtl").toStr(s) + use("Runtime.rtl").toStr(")");
	},
	/**
	 * Use module name
	 */
	useModuleName: function(__ctx, t, module_name)
	{
		module_name = this.findModuleName(__ctx, t, module_name);
		return "use(" + use("Runtime.rtl").toStr(this.toString(__ctx, module_name)) + use("Runtime.rtl").toStr(")");
	},
	/**
	 * OpIdentifier
	 */
	OpIdentifier: function(__ctx, t, op_code)
	{
		var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		var __v1 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		var __v2 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		if (op_code.kind == __v0.KIND_CONTEXT && op_code.value == "@")
		{
			return use("Runtime.Collection").from([t,"__ctx"]);
		}
		else if (op_code.kind == __v1.KIND_CONTEXT && op_code.value == "_")
		{
			return use("Runtime.Collection").from([t,"__ctx.translate"]);
		}
		else if (t.modules.has(__ctx, op_code.value) || op_code.kind == __v2.KIND_SYS_TYPE)
		{
			var module_name = op_code.value;
			var new_module_name = this.findModuleName(__ctx, t, module_name);
			if (module_name != new_module_name)
			{
				var res = t.constructor.addSaveOpCode(__ctx, t, use("Runtime.Dict").from({"op_code":op_code,"var_content":this.useModuleName(__ctx, t, module_name)}));
				t = res[0];
				var var_name = res[1];
				return use("Runtime.Collection").from([t,var_name]);
			}
		}
		return use("Runtime.Collection").from([t,op_code.value]);
	},
	/**
	 * OpTypeIdentifier
	 */
	OpTypeIdentifier: function(__ctx, t, op_code)
	{
		var var_name = "";
		if (op_code.entity_name.names.count(__ctx) > 0)
		{
			var module_name = op_code.entity_name.names.first(__ctx);
			var new_module_name = this.findModuleName(__ctx, t, module_name);
			if (module_name != new_module_name)
			{
				var res = t.constructor.addSaveOpCode(__ctx, t, use("Runtime.Dict").from({"var_content":this.useModuleName(__ctx, t, module_name)}));
				t = res[0];
				var_name = res[1];
			}
		}
		if (var_name == "")
		{
			var __v0 = use("Runtime.rs");
			var_name = __v0.join(__ctx, ".", op_code.entity_name.names);
		}
		return use("Runtime.Collection").from([t,var_name]);
	},
	/**
	 * OpCollection
	 */
	OpCollection: function(__ctx, t, op_code)
	{
		var content = "";
		var values = op_code.values.map(__ctx, (__ctx, op_code) => 
		{
			var res = this.Expression(__ctx, t, op_code);
			t = res[0];
			var s = res[1];
			return s;
		});
		var __v0 = use("Runtime.rs");
		content = this.useModuleName(__ctx, t, "Runtime.Collection") + use("Runtime.rtl").toStr(".from([") + use("Runtime.rtl").toStr(__v0.join(__ctx, ",", values)) + use("Runtime.rtl").toStr("])");
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpDict
	 */
	OpDict: function(__ctx, t, op_code)
	{
		var content = "";
		var values = op_code.values.transition(__ctx, (__ctx, op_code, key) => 
		{
			var res = this.Expression(__ctx, t, op_code);
			t = res[0];
			var s = res[1];
			return this.toString(__ctx, key) + use("Runtime.rtl").toStr(":") + use("Runtime.rtl").toStr(s);
		});
		var __v0 = use("Runtime.rs");
		content = this.useModuleName(__ctx, t, "Runtime.Dict") + use("Runtime.rtl").toStr(".from({") + use("Runtime.rtl").toStr(__v0.join(__ctx, ",", values)) + use("Runtime.rtl").toStr("})");
		return use("Runtime.Collection").from([t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangNode";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangNode.TranslatorNodeExpression";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Expression";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangNode.TranslatorNodeExpression",
			"name": "Bayrell.Lang.LangNode.TranslatorNodeExpression",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
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
});use.add(Bayrell.Lang.LangNode.TranslatorNodeExpression);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangNode == undefined) module.exports.Bayrell.Lang.LangNode = {};
module.exports.Bayrell.Lang.LangNode.TranslatorNodeExpression = Bayrell.Lang.LangNode.TranslatorNodeExpression;