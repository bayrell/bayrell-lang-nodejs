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
Bayrell.Lang.ModuleDescription = function(ctx)
{
};
Object.assign(Bayrell.Lang.ModuleDescription.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.ModuleDescription"))
		{
		}
	},
	assignValue: function(ctx,k,v)
	{
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.ModuleDescription";
	},
});
Object.assign(Bayrell.Lang.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function(ctx)
	{
		return "Bayrell.Lang";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function(ctx)
	{
		return "0.9.3";
	},
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	requiredModules: function(ctx)
	{
		return use("Runtime.Dict").from({"Runtime":">=0.2 <1.0"});
	},
	/**
	 * Returns module files load order
	 * @return Collection<string>
	 */
	assets: function(ctx)
	{
		return use("Runtime.Collection").from(["Bayrell.Lang/Caret","Bayrell.Lang/CoreParser","Bayrell.Lang/CoreToken","Bayrell.Lang/CoreTranslator","Bayrell.Lang/LangConstant","Bayrell.Lang/LangUtils","Bayrell.Lang/SaveOpCode","Bayrell.Lang/ModuleDescription","Bayrell.Lang/Exceptions/ParserUnknownError","Bayrell.Lang/Exceptions/ParserError","Bayrell.Lang/Exceptions/ParserEOF","Bayrell.Lang/Exceptions/ParserExpected","Bayrell.Lang/LangBay/ParserBay","Bayrell.Lang/LangBay/ParserBayBase","Bayrell.Lang/LangBay/ParserBayExpression","Bayrell.Lang/LangBay/ParserBayOperator","Bayrell.Lang/LangBay/ParserBayPreprocessor","Bayrell.Lang/LangBay/ParserBayProgram","Bayrell.Lang/LangES6/TranslatorES6","Bayrell.Lang/LangES6/TranslatorES6Expression","Bayrell.Lang/LangES6/TranslatorES6Operator","Bayrell.Lang/LangES6/TranslatorES6Program","Bayrell.Lang/OpCodes/BaseOpCode","Bayrell.Lang/OpCodes/OpAnnotation","Bayrell.Lang/OpCodes/OpAssign","Bayrell.Lang/OpCodes/OpAssignValue","Bayrell.Lang/OpCodes/OpAttr","Bayrell.Lang/OpCodes/OpBreak","Bayrell.Lang/OpCodes/OpCall","Bayrell.Lang/OpCodes/OpClassOf","Bayrell.Lang/OpCodes/OpClassRef","Bayrell.Lang/OpCodes/OpCollection","Bayrell.Lang/OpCodes/OpComment","Bayrell.Lang/OpCodes/OpContinue","Bayrell.Lang/OpCodes/OpDeclareClass","Bayrell.Lang/OpCodes/OpDeclareFunction","Bayrell.Lang/OpCodes/OpDeclareFunctionArg","Bayrell.Lang/OpCodes/OpDict","Bayrell.Lang/OpCodes/OpDictPair","Bayrell.Lang/OpCodes/OpEntityName","Bayrell.Lang/OpCodes/OpFlags","Bayrell.Lang/OpCodes/OpFor","Bayrell.Lang/OpCodes/OpIdentifier","Bayrell.Lang/OpCodes/OpIf","Bayrell.Lang/OpCodes/OpIfElse","Bayrell.Lang/OpCodes/OpInc","Bayrell.Lang/OpCodes/OpItems","Bayrell.Lang/OpCodes/OpMath","Bayrell.Lang/OpCodes/OpMethod","Bayrell.Lang/OpCodes/OpModule","Bayrell.Lang/OpCodes/OpNamespace","Bayrell.Lang/OpCodes/OpNew","Bayrell.Lang/OpCodes/OpNumber","Bayrell.Lang/OpCodes/OpPreprocessorIfCode","Bayrell.Lang/OpCodes/OpPreprocessorIfDef","Bayrell.Lang/OpCodes/OpPreprocessorSwitch","Bayrell.Lang/OpCodes/OpReturn","Bayrell.Lang/OpCodes/OpString","Bayrell.Lang/OpCodes/OpTernary","Bayrell.Lang/OpCodes/OpThrow","Bayrell.Lang/OpCodes/OpTypeConvert","Bayrell.Lang/OpCodes/OpTypeIdentifier","Bayrell.Lang/OpCodes/OpUse","Bayrell.Lang/OpCodes/OpWhile"]);
	},
	getAssetsFiles: function(ctx)
	{
		return this.assets(ctx);
	},
	/**
	 * Returns enities
	 */
	entities: function(ctx)
	{
		return null;
	},
	/**
	 * Returns enities
	 */
	resources: function(ctx)
	{
		return null;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.ModuleDescription";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.ModuleDescription",
			"name": "Bayrell.Lang.ModuleDescription",
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
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
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
	__implements__:
	[
		use("Runtime.Interfaces.ModuleDescriptionInterface"),
		use("Runtime.Interfaces.AssetsInterface"),
	],
});use.add(Bayrell.Lang.ModuleDescription);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
module.exports.Bayrell.Lang.ModuleDescription = Bayrell.Lang.ModuleDescription;