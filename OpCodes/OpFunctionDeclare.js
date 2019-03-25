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
var Dict = require('bayrell-runtime-nodejs').Dict;
var Vector = require('bayrell-runtime-nodejs').Vector;
var Collection = require('bayrell-runtime-nodejs').Collection;
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var BaseOpCode = require('./BaseOpCode.js');
var OpAnnotation = require('./OpAnnotation.js');
var OpFlags = require('./OpFlags.js');
class OpFunctionDeclare extends BaseOpCode{
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
	 * Has Annotations
	 */
	hasAnnotations(){
		return this.annotations != null && this.annotations.count() > 0;
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
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.OpCodes.OpFunctionDeclare";}
	static getCurrentClassName(){return "BayrellLang.OpCodes.OpFunctionDeclare";}
	static getParentClassName(){return "BayrellLang.OpCodes.BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_function";
		this.name = "";
		this.is_lambda = false;
		this.result_type = null;
		this.args = null;
		this.childs = null;
		this.use_variables = null;
		this.flags = null;
		this.annotations = null;
		this.return_function = null;
	}
	assignObject(obj){
		if (obj instanceof OpFunctionDeclare){
			this.op = rtl._clone(obj.op);
			this.name = rtl._clone(obj.name);
			this.is_lambda = rtl._clone(obj.is_lambda);
			this.result_type = rtl._clone(obj.result_type);
			this.args = rtl._clone(obj.args);
			this.childs = rtl._clone(obj.childs);
			this.use_variables = rtl._clone(obj.use_variables);
			this.flags = rtl._clone(obj.flags);
			this.annotations = rtl._clone(obj.annotations);
			this.return_function = rtl._clone(obj.return_function);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "op")this.op = rtl.convert(value,"string","op_function","");
		else if (variable_name == "name")this.name = rtl.convert(value,"string","","");
		else if (variable_name == "is_lambda")this.is_lambda = rtl.convert(value,"bool",false,"");
		else if (variable_name == "result_type")this.result_type = rtl.convert(value,"BayrellLang.OpCodes.BaseOpCode",null,"");
		else if (variable_name == "args")this.args = rtl.convert(value,"Vector",null,"OpAssignDeclare");
		else if (variable_name == "childs")this.childs = rtl.convert(value,"Vector",null,"BayrellLang.OpCodes.BaseOpCode");
		else if (variable_name == "use_variables")this.use_variables = rtl.convert(value,"Vector",null,"string");
		else if (variable_name == "flags")this.flags = rtl.convert(value,"BayrellLang.OpCodes.OpFlags",null,"");
		else if (variable_name == "annotations")this.annotations = rtl.convert(value,"Vector",null,"BayrellLang.OpCodes.OpAnnotation");
		else if (variable_name == "return_function")this.return_function = rtl.convert(value,"BayrellLang.OpCodes.OpFunctionDeclare",null,"");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "name") return this.name;
		else if (variable_name == "is_lambda") return this.is_lambda;
		else if (variable_name == "result_type") return this.result_type;
		else if (variable_name == "args") return this.args;
		else if (variable_name == "childs") return this.childs;
		else if (variable_name == "use_variables") return this.use_variables;
		else if (variable_name == "flags") return this.flags;
		else if (variable_name == "annotations") return this.annotations;
		else if (variable_name == "return_function") return this.return_function;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("op");
			names.push("name");
			names.push("is_lambda");
			names.push("result_type");
			names.push("args");
			names.push("childs");
			names.push("use_variables");
			names.push("flags");
			names.push("annotations");
			names.push("return_function");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = OpFunctionDeclare;