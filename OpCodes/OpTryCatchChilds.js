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
class OpTryCatchChilds extends BaseOpCode{
	getClassName(){return "BayrellLang.OpCodes.OpTryCatchChilds";}
	static getParentClassName(){return "BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_try_catch_childs";
		this.op_type = null;
		this.op_ident = null;
		this.childs = null;
	}
	assignValue(variable_name, value){
		if (variable_name == "op") this.op = rtl.correct(value, "string", "op_try_catch_childs", "");
		else if (variable_name == "op_type") this.op_type = rtl.correct(value, "BaseOpCode", null, "");
		else if (variable_name == "op_ident") this.op_ident = rtl.correct(value, "BaseOpCode", null, "");
		else if (variable_name == "childs") this.childs = rtl.correct(value, "Vector", null, "BaseOpCode");
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "op_type") return this.op_type;
		else if (variable_name == "op_ident") return this.op_ident;
		else if (variable_name == "childs") return this.childs;
		return super.takeValue(variable_name, default_value);
	}
	getVariablesNames(names){
		super.getVariablesNames(names);
		names.push("op");
		names.push("op_type");
		names.push("op_ident");
		names.push("childs");
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellLang.OpCodes.OpTryCatchChilds";
	}
	/**
	 * Constructor
	 */
	constructor(op_type, op_ident, childs){
		if (op_type == undefined) op_type=null;
		if (op_ident == undefined) op_ident=null;
		if (childs == undefined) childs=null;
		super();
		this.op_type = op_type;
		this.op_ident = op_ident;
		this.childs = childs;
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
}
module.exports = OpTryCatchChilds;