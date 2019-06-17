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
var BaseOpCode = require('./BaseOpCode.js');
class OpTernary extends BaseOpCode{
	/**
	 * Constructor
	 */
	constructor(condition, if_true, if_false){
		if (condition == undefined) condition=null;
		if (if_true == undefined) if_true=null;
		if (if_false == undefined) if_false=null;
		super();
		this.condition = condition;
		this.if_true = if_true;
		this.if_false = if_false;
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.OpCodes.OpTernary";}
	static getCurrentNamespace(){return "BayrellLang.OpCodes";}
	static getCurrentClassName(){return "BayrellLang.OpCodes.OpTernary";}
	static getParentClassName(){return "BayrellLang.OpCodes.BaseOpCode";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.op = "op_ternary";
		this.condition = null;
		this.if_true = null;
		this.if_false = null;
	}
	assignObject(obj){
		if (obj instanceof OpTernary){
			this.op = rtl._clone(obj.op);
			this.condition = rtl._clone(obj.condition);
			this.if_true = rtl._clone(obj.if_true);
			this.if_false = rtl._clone(obj.if_false);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "op")this.op = rtl.convert(value,"string","op_ternary","");
		else if (variable_name == "condition")this.condition = rtl.convert(value,"BayrellLang.OpCodes.BaseOpCode",null,"");
		else if (variable_name == "if_true")this.if_true = rtl.convert(value,"BayrellLang.OpCodes.BaseOpCode",null,"");
		else if (variable_name == "if_false")this.if_false = rtl.convert(value,"BayrellLang.OpCodes.BaseOpCode",null,"");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "condition") return this.condition;
		else if (variable_name == "if_true") return this.if_true;
		else if (variable_name == "if_false") return this.if_false;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("op");
			names.push("condition");
			names.push("if_true");
			names.push("if_false");
		}
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
module.exports = OpTernary;