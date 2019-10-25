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
if (typeof Bayrell.Lang.LangPHP == 'undefined') Bayrell.Lang.LangPHP = {};
Bayrell.Lang.LangPHP.TranslatorPHP = function(__ctx)
{
	use("Bayrell.Lang.CoreTranslator").apply(this, arguments);
};
Bayrell.Lang.LangPHP.TranslatorPHP.prototype = Object.create(use("Bayrell.Lang.CoreTranslator").prototype);
Bayrell.Lang.LangPHP.TranslatorPHP.prototype.constructor = Bayrell.Lang.LangPHP.TranslatorPHP;
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHP.prototype,
{
	_init: function(__ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__expression = null;
		if (a.indexOf("expression") == -1) defProp(this, "expression");
		this.__html = null;
		if (a.indexOf("html") == -1) defProp(this, "html");
		this.__operator = null;
		if (a.indexOf("operator") == -1) defProp(this, "operator");
		this.__program = null;
		if (a.indexOf("program") == -1) defProp(this, "program");
		use("Bayrell.Lang.CoreTranslator").prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.LangPHP.TranslatorPHP"))
		{
			this.__expression = o.__expression;
			this.__html = o.__html;
			this.__operator = o.__operator;
			this.__program = o.__program;
		}
		use("Bayrell.Lang.CoreTranslator").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "expression")this.__expression = v;
		else if (k == "html")this.__html = v;
		else if (k == "operator")this.__operator = v;
		else if (k == "program")this.__program = v;
		else use("Bayrell.Lang.CoreTranslator").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "expression")return this.__expression;
		else if (k == "html")return this.__html;
		else if (k == "operator")return this.__operator;
		else if (k == "program")return this.__program;
		return use("Bayrell.Lang.CoreTranslator").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHP";
	},
});
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHP, use("Bayrell.Lang.CoreTranslator"));
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHP,
{
	/**
	 * Reset translator
	 */
	reset: function(__ctx, t)
	{
		var __v0 = use("Runtime.Dict");
		var __v1 = use("Bayrell.Lang.LangPHP.TranslatorPHPExpression");
		var __v2 = use("Bayrell.Lang.LangPHP.TranslatorPHPHtml");
		var __v3 = use("Bayrell.Lang.LangPHP.TranslatorPHPOperator");
		var __v4 = use("Bayrell.Lang.LangPHP.TranslatorPHPProgram");
		var __v5 = use("Runtime.Collection");
		var __v6 = use("Runtime.Collection");
		return t.copy(__ctx, use("Runtime.Dict").from({"value":"","current_namespace_name":"","modules":new __v0(__ctx),"expression":new __v1(__ctx),"html":new __v2(__ctx),"operator":new __v3(__ctx),"program":new __v4(__ctx),"save_vars":new __v5(__ctx),"save_op_codes":new __v6(__ctx),"save_op_code_inc":0,"preprocessor_flags":use("Runtime.Dict").from({"PHP":true})}));
	},
	/**
	 * Translate BaseOpCode
	 */
	translate: function(__ctx, t, op_code)
	{
		t = this.reset(__ctx, t);
		return t.program.constructor.translateProgram(__ctx, t, op_code);
	},
	/**
	 * Inc save op code
	 */
	nextSaveOpCode: function(__ctx, t)
	{
		return "$__v" + use("Runtime.rtl").toStr(t.save_op_code_inc);
	},
	/**
	 * Output save op code content
	 */
	outputSaveOpCode: function(__ctx, t, save_op_code_value)
	{
		if (save_op_code_value == undefined) save_op_code_value = 0;
		var content = "";
		for (var i = 0;i < t.save_op_codes.count(__ctx);i++)
		{
			if (i < save_op_code_value)
			{
				continue;
			}
			var save = t.save_op_codes.item(__ctx, i);
			var s = (save.content == "") ? t.s(__ctx, save.var_name + use("Runtime.rtl").toStr(" = ") + use("Runtime.rtl").toStr(save.var_content) + use("Runtime.rtl").toStr(";")) : save.content;
			content += use("Runtime.rtl").toStr(s);
		}
		return content;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangPHP";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHP";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.CoreTranslator";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHP",
			"name": "Bayrell.Lang.LangPHP.TranslatorPHP",
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
			a.push("expression");
			a.push("html");
			a.push("operator");
			a.push("program");
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
});use.add(Bayrell.Lang.LangPHP.TranslatorPHP);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangPHP == undefined) module.exports.Bayrell.Lang.LangPHP = {};
module.exports.Bayrell.Lang.LangPHP.TranslatorPHP = Bayrell.Lang.LangPHP.TranslatorPHP;