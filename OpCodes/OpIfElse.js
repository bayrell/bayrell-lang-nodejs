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
var Map = require('bayrell-runtime-nodejs').Map;
var Vector = require('bayrell-runtime-nodejs').Vector;
var BaseOpCode = require('./BaseOpCode.js');
class OpIfElse extends BaseOpCode{
	getClassName(){return "BayrellLang.OpCodes.OpIfElse";}
	static getParentClassName(){return "BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_if_else";
		this.condition = null;
		this.if_true = null;
	}
	assignValue(variable_name, value){
		if (variable_name == "op") this.op = rtl.correct(value, "string", "op_if_else", "");
		else if (variable_name == "condition") this.condition = rtl.correct(value, "BaseOpCode", null, "");
		else if (variable_name == "if_true") this.if_true = rtl.correct(value, "Vector", null, "BaseOpCode");
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "condition") return this.condition;
		else if (variable_name == "if_true") return this.if_true;
		return super.takeValue(variable_name, default_value);
	}
	getVariablesNames(names){
		super.getVariablesNames(names);
		names.push("op");
		names.push("condition");
		names.push("if_true");
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellLang.OpCodes.OpIfElse";
	}
	/**
	 * Constructor
	 */
	constructor(condition, if_true){
		if (condition == undefined) condition=null;
		if (if_true == undefined) if_true=null;
		super();
		this.condition = condition;
		this.if_true = if_true;
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
}
module.exports = OpIfElse;