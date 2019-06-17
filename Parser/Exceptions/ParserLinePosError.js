"use strict;"
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
var rtl = require('bayrell-runtime-nodejs').rtl;
var rs = require('bayrell-runtime-nodejs').rs;
var Map = require('bayrell-runtime-nodejs').Map;
var Dict = require('bayrell-runtime-nodejs').Dict;
var Vector = require('bayrell-runtime-nodejs').Vector;
var Collection = require('bayrell-runtime-nodejs').Collection;
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var UIStruct = require('bayrell-runtime-nodejs').UIStruct;
var RuntimeUtils = require('bayrell-runtime-nodejs').RuntimeUtils;
var ParserError = require('./ParserError.js');
var ParserConstant = require('../ParserConstant.js');
class ParserLinePosError extends ParserError{
	constructor(s, line, col, file, code, context, prev){
		if (file == undefined) file="";
		if (prev == undefined) prev=null;
		if (context == null){
			context = RuntimeUtils.globalContext();
		}
		super(s, code, context, prev);
		this.line = line;
		this.pos = col;
		this.file = file;
		this.buildMessage();
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.Parser.Exceptions.ParserLinePosError";}
	static getCurrentNamespace(){return "BayrellLang.Parser.Exceptions";}
	static getCurrentClassName(){return "BayrellLang.Parser.Exceptions.ParserLinePosError";}
	static getParentClassName(){return "BayrellLang.Parser.Exceptions.ParserError";}
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
module.exports = ParserLinePosError;