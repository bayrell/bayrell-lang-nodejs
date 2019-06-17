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
var CoreObject = require('bayrell-runtime-nodejs').CoreObject;
var ContextObject = require('bayrell-runtime-nodejs').ContextObject;
var ContextInterface = require('bayrell-runtime-nodejs').Interfaces.ContextInterface;
var FactoryInterface = require('bayrell-runtime-nodejs').Interfaces.FactoryInterface;
var ParserBay = require('./ParserBay.js');
class ParserBayFactory extends ContextObject{
	/**
	 * Returns new Instance
	 */
	newInstance(context, params){
		if (context == undefined) context=null;
		if (params == undefined) params=null;
		return new ParserBay(context);
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.LangBay.ParserBayFactory";}
	static getCurrentNamespace(){return "BayrellLang.LangBay";}
	static getCurrentClassName(){return "BayrellLang.LangBay.ParserBayFactory";}
	static getParentClassName(){return "Runtime.ContextObject";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(FactoryInterface);
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
ParserBayFactory.__static_implements__ = [];
ParserBayFactory.__static_implements__.push(FactoryInterface)
module.exports = ParserBayFactory;