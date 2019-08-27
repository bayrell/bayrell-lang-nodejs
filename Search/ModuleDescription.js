"use strict;"
/*!
 *  Bayrell Common Languages Transcompiler
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
var rtl = require('bayrell-runtime-nodejs').rtl;
var rs = require('bayrell-runtime-nodejs').rs;
var Map = require('bayrell-runtime-nodejs').Map;
var Dict = require('bayrell-runtime-nodejs').Dict;
var Vector = require('bayrell-runtime-nodejs').Vector;
var Collection = require('bayrell-runtime-nodejs').Collection;
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var UIStruct = require('bayrell-runtime-nodejs').UIStruct;
var RuntimeUtils = require('bayrell-runtime-nodejs').RuntimeUtils;
var LambdaChain = require('bayrell-runtime-nodejs').LambdaChain;
var Provider = require('bayrell-runtime-nodejs').Provider;
var ContextInterface = require('bayrell-runtime-nodejs').Interfaces.ContextInterface;
var ModuleDescriptionInterface = require('bayrell-runtime-nodejs').Interfaces.ModuleDescriptionInterface;
var ModuleSearchProvider = require('./ModuleSearchProvider.js');
class ModuleDescription{
	/**
	 * Returns module name
	 * @return string
	 */
	static getModuleName(){
		return "BayrellLang.Search";
	}
	/**
	 * Returns module name
	 * @return string
	 */
	static getModuleVersion(){
		return "0.1.0";
	}
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	static requiredModules(){
		return (new Map()).set("Runtime", "*");
	}
	/**
	 * Returns module files load order
	 * @return Collection<string>
	 */
	static getModuleFiles(){
		return (new Vector()).push("BayrellLang.Search.ModuleInfo").push("BayrellLang.Search.ModuleCacheDriver").push("BayrellLang.Search.ModuleSearchDriver");
	}
	/**
	 * Returns enities
	 */
	static entities(){
		return (new Vector()).push(new Provider((new Map()).set("name", "BayrellLang.Search.ModuleSearchProvider").set("value", "BayrellLang.Search.ModuleSearchProvider")));
	}
	/**
	 * Called then module registed in context
	 * @param ContextInterface context
	 */
	static onRegister(context){
	}
	/**
	 * Called then context read config
	 * @param ContextInterface context
	 * @param Map<mixed> config
	 */
	static onReadConfig(context, config){
	}
	/**
	 * Init context
	 * @param ContextInterface context
	 */
	static onInitContext(context){
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.Search.ModuleDescription";}
	static getCurrentNamespace(){return "BayrellLang.Search";}
	static getCurrentClassName(){return "BayrellLang.Search.ModuleDescription";}
	static getParentClassName(){return "";}
	_init(){
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(ModuleDescriptionInterface);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
	}
	static getFieldInfoByName(field_name){
		return null;
	}
	static getMethodsList(names){
	}
	static getMethodInfoByName(method_name){
		return null;
	}
}
ModuleDescription.__static_implements__ = [];
ModuleDescription.__static_implements__.push(ModuleDescriptionInterface)
module.exports = ModuleDescription;