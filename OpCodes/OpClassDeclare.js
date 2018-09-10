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
class OpClassDeclare extends BaseOpCode{
	getClassName(){return "BayrellLang.OpCodes.OpClassDeclare";}
	static getParentClassName(){return "BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_class";
		this.class_name = "";
		this.class_extends = "";
		this.class_implements = null;
		this.class_variables = null;
		this.childs = null;
		this.class_template = null;
		this.flags = null;
	}
	assignValue(variable_name, value){
		if (variable_name == "op") this.op = rtl.correct(value, "string", "op_class", "");
		else if (variable_name == "class_name") this.class_name = rtl.correct(value, "string", "", "");
		else if (variable_name == "class_extends") this.class_extends = rtl.correct(value, "BaseOpCode", "", "");
		else if (variable_name == "class_implements") this.class_implements = rtl.correct(value, "Vector", null, "string");
		else if (variable_name == "class_variables") this.class_variables = rtl.correct(value, "Vector", null, "OpAssignDeclare");
		else if (variable_name == "childs") this.childs = rtl.correct(value, "Vector", null, "BaseOpCode");
		else if (variable_name == "class_template") this.class_template = rtl.correct(value, "Vector", null, "BaseOpCode");
		else if (variable_name == "flags") this.flags = rtl.correct(value, "OpFlags", null, "");
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "class_name") return this.class_name;
		else if (variable_name == "class_extends") return this.class_extends;
		else if (variable_name == "class_implements") return this.class_implements;
		else if (variable_name == "class_variables") return this.class_variables;
		else if (variable_name == "childs") return this.childs;
		else if (variable_name == "class_template") return this.class_template;
		else if (variable_name == "flags") return this.flags;
		return super.takeValue(variable_name, default_value);
	}
	getVariablesNames(names){
		super.getVariablesNames(names);
		names.push("op");
		names.push("class_name");
		names.push("class_extends");
		names.push("class_implements");
		names.push("class_variables");
		names.push("childs");
		names.push("class_template");
		names.push("flags");
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellLang.OpCodes.OpClassDeclare";
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
		this.class_implements = new Vector();
		this.class_variables = new Vector();
		this.class_template = new Vector();
		this.childs = new Vector();
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
}
module.exports = OpClassDeclare;