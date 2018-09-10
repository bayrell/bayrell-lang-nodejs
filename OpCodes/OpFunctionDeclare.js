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
var OpFlags = require('./OpFlags.js');
class OpFunctionDeclare extends BaseOpCode{
	getClassName(){return "BayrellLang.OpCodes.OpFunctionDeclare";}
	static getParentClassName(){return "BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_function";
		this.name = "";
		this.result_type = null;
		this.args = null;
		this.childs = null;
		this.use_variables = null;
		this.flags = null;
	}
	assignValue(variable_name, value){
		if (variable_name == "op") this.op = rtl.correct(value, "string", "op_function", "");
		else if (variable_name == "name") this.name = rtl.correct(value, "string", "", "");
		else if (variable_name == "result_type") this.result_type = rtl.correct(value, "BaseOpCode", null, "");
		else if (variable_name == "args") this.args = rtl.correct(value, "Vector", null, "OpAssignDeclare");
		else if (variable_name == "childs") this.childs = rtl.correct(value, "Vector", null, "BaseOpCode");
		else if (variable_name == "use_variables") this.use_variables = rtl.correct(value, "Vector", null, "string");
		else if (variable_name == "flags") this.flags = rtl.correct(value, "OpFlags", null, "");
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "name") return this.name;
		else if (variable_name == "result_type") return this.result_type;
		else if (variable_name == "args") return this.args;
		else if (variable_name == "childs") return this.childs;
		else if (variable_name == "use_variables") return this.use_variables;
		else if (variable_name == "flags") return this.flags;
		return super.takeValue(variable_name, default_value);
	}
	getVariablesNames(names){
		super.getVariablesNames(names);
		names.push("op");
		names.push("name");
		names.push("result_type");
		names.push("args");
		names.push("childs");
		names.push("use_variables");
		names.push("flags");
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellLang.OpCodes.OpFunctionDeclare";
	}
	/**
	 * Read is Flag
	 */
	isFlag(name){
		if (this.flags == null){
			return false;
		}
		if (!OpFlags.hasFlag(name)){
			return false;
		}
		return this.flags.takeValue(name);
	}
	/**
	 * Constructor
	 */
	constructor(){
		super();
		this.args = new Vector();
		this.use_variables = new Vector();
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
}
module.exports = OpFunctionDeclare;