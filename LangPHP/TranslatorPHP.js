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
var lib = require('bayrell-runtime-nodejs').lib;
var re = require('bayrell-runtime-nodejs').re;
var RuntimeUtils = require('bayrell-runtime-nodejs').RuntimeUtils;
var CommonTranslator = require('../CommonTranslator.js');
var BaseOpCode = require('../OpCodes/BaseOpCode.js');
var OpAdd = require('../OpCodes/OpAdd.js');
var OpAnd = require('../OpCodes/OpAnd.js');
var OpAssign = require('../OpCodes/OpAssign.js');
var OpAssignDeclare = require('../OpCodes/OpAssignDeclare.js');
var OpBitAnd = require('../OpCodes/OpBitAnd.js');
var OpBitNot = require('../OpCodes/OpBitNot.js');
var OpBitOr = require('../OpCodes/OpBitOr.js');
var OpBitXor = require('../OpCodes/OpBitXor.js');
var OpBreak = require('../OpCodes/OpBreak.js');
var OpCall = require('../OpCodes/OpCall.js');
var OpCallAwait = require('../OpCodes/OpCallAwait.js');
var OpChilds = require('../OpCodes/OpChilds.js');
var OpClassDeclare = require('../OpCodes/OpClassDeclare.js');
var OpClassName = require('../OpCodes/OpClassName.js');
var OpClone = require('../OpCodes/OpClone.js');
var OpComment = require('../OpCodes/OpComment.js');
var OpCompare = require('../OpCodes/OpCompare.js');
var OpConcat = require('../OpCodes/OpConcat.js');
var OpContinue = require('../OpCodes/OpContinue.js');
var OpCopyStruct = require('../OpCodes/OpCopyStruct.js');
var OpDelete = require('../OpCodes/OpDelete.js');
var OpDiv = require('../OpCodes/OpDiv.js');
var OpDynamic = require('../OpCodes/OpDynamic.js');
var OpFlags = require('../OpCodes/OpFlags.js');
var OpFor = require('../OpCodes/OpFor.js');
var OpFunctionArrowDeclare = require('../OpCodes/OpFunctionArrowDeclare.js');
var OpFunctionDeclare = require('../OpCodes/OpFunctionDeclare.js');
var OpHexNumber = require('../OpCodes/OpHexNumber.js');
var OpHtmlAttribute = require('../OpCodes/OpHtmlAttribute.js');
var OpHtmlComment = require('../OpCodes/OpHtmlComment.js');
var OpHtmlEscape = require('../OpCodes/OpHtmlEscape.js');
var OpHtmlJson = require('../OpCodes/OpHtmlJson.js');
var OpHtmlRaw = require('../OpCodes/OpHtmlRaw.js');
var OpHtmlTag = require('../OpCodes/OpHtmlTag.js');
var OpHtmlText = require('../OpCodes/OpHtmlText.js');
var OpHtmlView = require('../OpCodes/OpHtmlView.js');
var OpIdentifier = require('../OpCodes/OpIdentifier.js');
var OpIf = require('../OpCodes/OpIf.js');
var OpIfElse = require('../OpCodes/OpIfElse.js');
var OpInterfaceDeclare = require('../OpCodes/OpInterfaceDeclare.js');
var OpMod = require('../OpCodes/OpMod.js');
var OpMult = require('../OpCodes/OpMult.js');
var OpNamespace = require('../OpCodes/OpNamespace.js');
var OpNew = require('../OpCodes/OpNew.js');
var OpNope = require('../OpCodes/OpNope.js');
var OpNot = require('../OpCodes/OpNot.js');
var OpNumber = require('../OpCodes/OpNumber.js');
var OpOr = require('../OpCodes/OpOr.js');
var OpPipe = require('../OpCodes/OpPipe.js');
var OpPostDec = require('../OpCodes/OpPostDec.js');
var OpPostInc = require('../OpCodes/OpPostInc.js');
var OpPow = require('../OpCodes/OpPow.js');
var OpPreDec = require('../OpCodes/OpPreDec.js');
var OpPreInc = require('../OpCodes/OpPreInc.js');
var OpPreprocessorCase = require('../OpCodes/OpPreprocessorCase.js');
var OpPreprocessorSwitch = require('../OpCodes/OpPreprocessorSwitch.js');
var OpReturn = require('../OpCodes/OpReturn.js');
var OpShiftLeft = require('../OpCodes/OpShiftLeft.js');
var OpShiftRight = require('../OpCodes/OpShiftRight.js');
var OpStatic = require('../OpCodes/OpStatic.js');
var OpString = require('../OpCodes/OpString.js');
var OpStringItem = require('../OpCodes/OpStringItem.js');
var OpStructDeclare = require('../OpCodes/OpStructDeclare.js');
var OpSub = require('../OpCodes/OpSub.js');
var OpTemplateIdentifier = require('../OpCodes/OpTemplateIdentifier.js');
var OpTernary = require('../OpCodes/OpTernary.js');
var OpThrow = require('../OpCodes/OpThrow.js');
var OpTryCatch = require('../OpCodes/OpTryCatch.js');
var OpTryCatchChilds = require('../OpCodes/OpTryCatchChilds.js');
var OpUse = require('../OpCodes/OpUse.js');
var OpWhile = require('../OpCodes/OpWhile.js');
class TranslatorPHP extends CommonTranslator{
	/**
	 * Returns full class name
	 * @return string
	 */
	currentClassName(){
		return rtl.toString(this.current_namespace)+"."+rtl.toString(this.current_class_name);
	}
	/**
	 * Returns full class name
	 * @return string
	 */
	currentFunctionName(){
		var c = this.current_function_name.count();
		var last_function_name = this.current_function_name.get(c - 1);
		return rtl.toString(this.current_namespace)+"."+rtl.toString(this.current_class_name)+"::"+rtl.toString(last_function_name);
	}
	/**
	 * Returns UI struct class name
	 * @return string
	 */
	getUIStructClassName(){
		return this.ui_struct_class_name.last();
	}
	/**
	 * Get name
	 */
	getName(name){
		if (name == "parent"){
			return "parent";
		}
		else if (name == "self"){
			return "self::class";
		}
		else if (name == "static"){
			return "static::class";
		}
		else if (this.modules.has(name)){
			return name;
		}
		else if (this.is_static){
			return name;
		}
		else if (name == "null" || name == "false" || name == "true"){
			return name;
		}
		return "$"+rtl.toString(name);
	}
	/**
	 * Get module name
	 * @param string name
	 * @return string
	 */
	getModuleName(name){
		if (this.modules.has(name)){
			return this.modules.item(name);
		}
		return name;
	}
	/**
	 * Constructor
	 */
	constructor(context){
		if (context == undefined) context=null;
		super(context);
		this.modules = new Map();
	}
	/**
	 * Escape string
	 */
	escapeString(s){
		s = re.replace("\\\\", "\\\\", s);
		s = re.replace("\"", "\\\"", s);
		s = re.replace("\\$", "\\$", s);
		s = re.replace("\n", "\\n", s);
		s = re.replace("\r", "\\r", s);
		s = re.replace("\t", "\\t", s);
		return s;
	}
	/**
	 * Escape string
	 */
	convertString(s){
		return "\""+rtl.toString(this.escapeString(s))+"\"";
	}
	/**
	 * Comment
	 */
	OpComment(op_code){
		return "/*"+rtl.toString(op_code.value)+"*/";
	}
	/** =========================== Identifier ============================ */
	/**
	 * HexNumber
	 */
	OpHexNumber(op_code){
		this.current_opcode_level = this.max_opcode_level;
		return op_code.value;
	}
	/**
	 * Identifier
	 */
	OpIdentifier(op_code){
		this.current_opcode_level = this.max_opcode_level;
		var op_code_last = this.op_code_stack.last(null, -2);
		if (op_code_last instanceof OpStatic){
			if (op_code.value == "self"){
				return "self";
			}
			if (op_code.value == "static"){
				return "static";
			}
		}
		return this.getName(op_code.value);
	}
	/**
	 * Number
	 */
	OpNumber(op_code){
		this.current_opcode_level = this.max_opcode_level;
		return op_code.value;
	}
	/**
	 * String
	 */
	OpString(op_code){
		this.current_opcode_level = this.max_opcode_level;
		return this.convertString(op_code.value);
	}
	/**
	 * Array
	 */
	OpStringItem(op_code){
		return "mb_substr("+rtl.toString(this.translateRun(op_code.value1))+", "+rtl.toString(this.s(this.translateRun(op_code.value2)))+", 1)";
	}
	/** ======================== Dynamic or static ======================== */
	/**
	 * Dynamic load
	 */
	OpDynamic(op_code){
		var res = rtl.toString(this.o(this.translateRun(op_code.value), this.max_opcode_level))+"->"+rtl.toString(op_code.name);
		this.current_opcode_level = this.max_opcode_level;
		return res;
	}
	/**
	 * Static load
	 */
	OpStatic(op_code){
		var is_flag = false;
		var op_code_last = this.op_code_stack.last(null, -2);
		if (op_code.name == rs.strtoupper(op_code.name)){
			is_flag = true;
		}
		if (op_code_last instanceof OpCall){
			is_flag = true;
		}
		if (op_code.value instanceof OpIdentifier && op_code_last instanceof OpCall){
			if (op_code.value.value == "self"){
				return "(new \\Runtime\\Callback("+"self::class, "+rtl.toString(this.convertString(op_code.name))+"))";
			}
			else if (op_code.value.value == "static"){
				return "static::"+rtl.toString(op_code.name);
			}
			else if (op_code.value.value == "parent"){
				return "parent::"+rtl.toString(op_code.name);
			}
			else if (!this.modules.has(op_code.value.value)){
				return "(new \\Runtime\\Callback("+"$"+rtl.toString(op_code.value.value)+"->getClassName(), "+rtl.toString(this.convertString(op_code.name))+"))";
			}
		}
		if (is_flag){
			return rtl.toString(this.translateRun(op_code.value))+"::"+rtl.toString(op_code.name);
		}
		return rtl.toString(this.translateRun(op_code.value))+"::$"+rtl.toString(op_code.name);
	}
	/**
	 * Template Identifier
	 */
	OpTemplateIdentifier(op_code){
		return this.translateRun(op_code.t);
	}
	/** ============================ Operations ============================ */
	/**
	 * ADD
	 */
	OpAdd(op_code){
		return this.op(op_code, "+", 13);
	}
	/**
	 * AND
	 */
	OpAnd(op_code){
		return this.op(op_code, "&&", 6);
	}
	/**
	 * Bit AND
	 */
	OpBitAnd(op_code){
		return this.op(op_code, "&", 9);
	}
	/**
	 * Bit NOT
	 */
	OpBitNot(op_code){
		var res = "!"+rtl.toString(this.o(this.translateRun(op_code.value), 16));
		this.current_opcode_level = 16;
		return res;
	}
	/**
	 * Bit OR
	 */
	OpBitOr(op_code){
		return this.op(op_code, "|", 7);
	}
	/**
	 * Bit XOR
	 */
	OpBitXor(op_code){
		return this.op(op_code, "^", 8);
	}
	/**
	 * Concat strings
	 */
	OpConcat(op_code){
		var res = "";
		if (op_code.value1 instanceof OpConcat || op_code.value1 instanceof OpString){
			res += this.o(this.s(this.translateRun(op_code.value1)), 13);
		}
		else {
			res += rtl.toString(this.getName("rtl"))+"::toString("+rtl.toString(this.s(this.translateRun(op_code.value1)))+")";
		}
		res += this.s(" . ");
		if (op_code.value2 instanceof OpConcat || op_code.value2 instanceof OpString){
			res += this.o(this.s(this.translateRun(op_code.value2)), 13);
		}
		else {
			res += rtl.toString(this.getName("rtl"))+"::toString("+rtl.toString(this.s(this.translateRun(op_code.value2)))+")";
		}
		this.current_opcode_level = 13;
		return res;
	}
	/**
	 * Divide
	 */
	OpDiv(op_code){
		return this.op(op_code, "/", 14);
	}
	/**
	 * Module
	 */
	OpMod(op_code){
		return this.op(op_code, "%", 14);
	}
	/**
	 * Multiply
	 */
	OpMult(op_code){
		return this.op(op_code, "*", 14);
	}
	/**
	 * New
	 */
	OpNew(op_code){
		var s = "";
		/* Function name */
		s += "new "+rtl.toString(this.translateRun(op_code.value));
		/* Call arguments */
		this.current_opcode_level = this.max_opcode_level;
		var old_is_operation = this.is_operation;
		this.is_operation = true;
		s += "(";
		if (op_code.args != null){
			var ch = "";
			for (var i = 0; i < op_code.args.count(); i++){
				var op = op_code.args.item(i);
				s += rtl.toString(ch)+rtl.toString(this.s(this.translateRun(op)));
				ch = ", ";
			}
		}
		s += ")";
		this.is_operation = old_is_operation;
		this.current_opcode_level = 19;
		return s;
	}
	/**
	 * Not
	 */
	OpNot(op_code){
		var res = "!"+rtl.toString(this.o(this.translateRun(op_code.value), 16));
		this.current_opcode_level = 16;
		return res;
	}
	/**
	 * Or
	 */
	OpOr(op_code){
		return this.op(op_code, "||", 5);
	}
	/**
	 * Post decrement
	 */
	OpPostDec(op_code){
		var semicolon = (this.is_operation) ? ("") : (";");
		var res = rtl.toString(this.o(this.translateRun(op_code.value), 17))+"--";
		this.current_opcode_level = 17;
		if (!this.is_operation){
			res += ";";
		}
		return res;
	}
	/**
	 * Post increment
	 */
	OpPostInc(op_code){
		var semicolon = (this.is_operation) ? ("") : (";");
		var res = rtl.toString(this.o(this.translateRun(op_code.value), 17))+"++";
		this.current_opcode_level = 17;
		if (!this.is_operation){
			res += ";";
		}
		return res;
	}
	/**
	 * Pow
	 */
	OpPow(op_code){
		return this.op(op_code, "**", 15);
	}
	/**
	 * Pre decrement
	 */
	OpPreDec(op_code){
		var semicolon = (this.is_operation) ? ("") : (";");
		var res = "--"+rtl.toString(this.o(this.translateRun(op_code.value), 16));
		this.current_opcode_level = 16;
		if (!this.is_operation){
			res += ";";
		}
		return res;
	}
	/**
	 * Pre increment
	 */
	OpPreInc(op_code){
		var semicolon = (this.is_operation) ? ("") : (";");
		var res = "++"+rtl.toString(this.o(this.translateRun(op_code.value), 16));
		this.current_opcode_level = 16;
		if (!this.is_operation){
			res += ";";
		}
		return res;
	}
	/**
	 * Bit shift left
	 */
	OpShiftLeft(op_code){
		return this.op(op_code, "<<", 12);
	}
	/**
	 * Bit shift right
	 */
	OpShiftRight(op_code){
		return this.op(op_code, ">>", 12);
	}
	/**
	 * Sub
	 */
	OpSub(op_code){
		return this.op(op_code, "-", 13);
	}
	/**
	 * Operator call function
	 */
	OpCall(op_code){
		var s = "";
		this.pushOneLine(true);
		/* Function name */
		var f = true;
		if (op_code.value instanceof OpIdentifier){
			if (op_code.value.value == "parent"){
				if (this.current_function_name.get(0) == "constructor"){
					s += "parent::__construct";
				}
				else if (this.current_function_name.get(0) == "destructor"){
					s += "parent::__destruct";
				}
				else {
					s += "parent::"+rtl.toString(this.current_function_name.get(0));
				}
				f = false;
			}
		}
		if (f){
			var old_is_operation = this.is_operation;
			this.is_operation = true;
			s += this.translateRun(op_code.value);
			this.is_operation = old_is_operation;
		}
		this.current_opcode_level = this.max_opcode_level;
		var old_is_operation = this.is_operation;
		this.is_operation = true;
		s += "(";
		if (op_code.args != null){
			var ch = "";
			for (var i = 0; i < op_code.args.count(); i++){
				var op = op_code.args.item(i);
				s += rtl.toString(ch)+rtl.toString(this.s(this.translateRun(op)));
				ch = ", ";
			}
		}
		s += ")";
		this.is_operation = old_is_operation;
		/* semicolon */
		this.popOneLine();
		if (!this.is_operation){
			s += ";";
		}
		this.current_opcode_level = this.max_opcode_level;
		return s;
	}
	/**
	 * Operator call function
	 */
	OpCompare(op_code){
		this.current_opcode_level = 10;
		var condition = op_code.condition;
		if (condition == "implements"){
			condition = "instanceof";
		}
		return this.op(op_code, condition, 10);
	}
	/**
	 * Operator call function
	 */
	OpTernary(op_code){
		var semicolon = (this.is_operation) ? ("") : (";");
		var res = "("+rtl.toString(this.translateRun(op_code.condition))+") ? "+"("+rtl.toString(this.s(this.translateRun(op_code.if_true)))+") : "+"("+rtl.toString(this.s(this.translateRun(op_code.if_false)))+")";
		this.current_opcode_level = 4;
		return res;
	}
	/**
	 * Copy struct
	 */
	copyStruct(op_code, names){
		var old_is_operation = this.beginOperation();
		var res = "";
		if (op_code.item instanceof OpCopyStruct){
			names.push(op_code.name);
			var name = "$"+rtl.toString(rs.implode("->", names));
			res = rtl.toString(name)+"->copy( new Map([ "+rtl.toString(this.convertString(op_code.item.name))+" => "+rtl.toString(this.copyStruct(op_code.item, names))+" ])  )";
		}
		else {
			res = this.translateRun(op_code.item);
		}
		this.endOperation(old_is_operation);
		return res;
	}
	/**
	 * Copy struct
	 */
	OpCopyStruct(op_code){
		if (this.is_operation){
			return this.copyStruct(op_code, (new Vector()));
		}
		return "$"+rtl.toString(op_code.name)+" = "+rtl.toString(this.copyStruct(op_code, (new Vector())))+";";
	}
	/**
	 * Pipe
	 */
	OpPipe(op_code){
		var res = "";
		res = "RuntimeMaybe::of("+rtl.toString(this.translateItem(op_code.value))+")";
		if (op_code.items != null){
			for (var i = 0; i < op_code.items.count(); i++){
				var op_item = op_code.items.item(i);
				res += this.s("->map("+rtl.toString(this.translateItem(op_item))+")");
			}
		}
		if (op_code.is_return_value){
			res += this.s("->value()");
		}
		return res;
	}
	/** ========================== Vector and Map ========================= */
	/**
	 * Vector
	 */
	OpVector(op_code){
		var res = "";
		res += "(new "+rtl.toString(this.getName("Vector"))+"())";
		for (var i = 0; i < op_code.values.count(); i++){
			var item = op_code.values.item(i);
			this.current_opcode_level = this.max_opcode_level;
			res += this.s("->push("+rtl.toString(this.translateRun(item))+")");
		}
		this.current_opcode_level = this.max_opcode_level;
		return res;
	}
	/**
	 * Map
	 */
	OpMap(op_code){
		var res = "";
		var keys = op_code.values.keys();
		res += "(new "+rtl.toString(this.getName("Map"))+"())";
		for (var i = 0; i < keys.count(); i++){
			var key = keys.item(i);
			var item = op_code.values.item(key);
			this.current_opcode_level = this.max_opcode_level;
			res += this.s("->set("+rtl.toString(rs.json_encode(key))+", "+rtl.toString(this.translateRun(item))+")");
		}
		this.current_opcode_level = this.max_opcode_level;
		return res;
	}
	/**
	 * Method
	 */
	OpMethod(op_code){
		if (op_code.value instanceof OpDynamic){
			var name = op_code.value.name;
			var obj = this.translateRun(op_code.value.value);
			return "new \\Runtime\\Callback("+rtl.toString(obj)+", "+rtl.toString(this.convertString(name))+")";
		}
		else if (op_code.value instanceof OpStatic){
			var name = op_code.value.name;
			if (op_code.value.value instanceof OpIdentifier){
				if (op_code.value.value.value == "self"){
					return "(new \\Runtime\\Callback("+"self::class, "+rtl.toString(this.convertString(name))+"))";
				}
				else if (op_code.value.value.value == "static"){
					return "(new \\Runtime\\Callback("+"static::class, "+rtl.toString(this.convertString(name))+"))";
				}
				else if (op_code.value.value.value == "parent"){
					return this.translateRun(op_code.value);
				}
				else if (!this.modules.has(op_code.value.value.value)){
					return "(new \\Runtime\\Callback("+"$"+rtl.toString(op_code.value.value.value)+"->getClassName(), "+rtl.toString(this.convertString(name))+"))";
				}
			}
			var obj = this.translateRun(op_code.value.value);
			return "new \\Runtime\\Callback("+rtl.toString(obj)+"::class, "+rtl.toString(this.convertString(name))+")";
		}
		return this.translateRun(op_code.value);
	}
	/**
	 * Class name
	 */
	OpClassName(op_code){
		return this.convertString(this.modules.get(op_code.value, ""));
	}
	/** ============================ Operators ============================ */
	/**
	 * Assign
	 */
	OpAssign(op_code){
		var old_is_operation = this.beginOperation();
		/* one line */
		this.pushOneLine(true);
		var res = this.translateRun(op_code.ident);
		this.popOneLine();
		if (op_code.op_name == "="){
			res += " = ";
		}
		else if (op_code.op_name == "~="){
			res += " .= ";
		}
		else if (op_code.op_name == "+="){
			res += " += ";
		}
		else if (op_code.op_name == "-="){
			res += " -= ";
		}
		this.current_opcode_level = 0;
		this.levelInc();
		res += this.s(this.translateRun(op_code.value));
		this.levelDec();
		if (!old_is_operation){
			res += this.s(";");
		}
		this.endOperation(old_is_operation);
		return res;
	}
	/**
	 * Assign declare
	 */
	OpAssignDeclare(op_code, output_value){
		if (output_value == undefined) output_value=true;
		var res = "";
		var old_is_operation = this.beginOperation();
		var ch_var = "$";
		if (op_code.isFlag("const")){
			ch_var = "";
		}
		var var_prefix = "";
		if (this.is_struct && op_code.isFlag("public") && !op_code.isFlag("static") && !op_code.isFlag("const")){
			var_prefix = "__";
		}
		if (op_code.value == null || !output_value && !op_code.isFlag("static") && !op_code.isFlag("const")){
			this.pushOneLine(true);
			res = rtl.toString(ch_var)+rtl.toString(var_prefix)+rtl.toString(op_code.name);
			this.popOneLine();
		}
		else {
			this.pushOneLine(true);
			res = rtl.toString(ch_var)+rtl.toString(var_prefix)+rtl.toString(op_code.name)+" = ";
			this.popOneLine();
			this.current_opcode_level = 0;
			this.levelInc();
			res += this.s(this.translateRun(op_code.value));
			this.levelDec();
		}
		if (!old_is_operation){
			res += this.s(";");
		}
		this.endOperation(old_is_operation);
		return res;
	}
	/**
	 * Break
	 */
	OpBreak(op_code){
		return "break;";
	}
	/**
	 * Clone
	 */
	OpClone(op_code){
		var old_is_operation = this.beginOperation();
		/* result */
		var s = "rtl::_clone(";
		this.current_opcode_level = 0;
		s += this.s(this.translateRun(op_code.value));
		s += this.s(")");
		if (!old_is_operation){
			res += this.s(";");
		}
		this.endOperation(old_is_operation);
		return s;
	}
	/**
	 * Continue
	 */
	OpContinue(op_code){
		return "continue;";
	}
	/**
	 * Delete
	 */
	OpDelete(op_code){
		return "";
	}
	/**
	 * For
	 */
	OpFor(op_code){
		var s = "";
		/* Header */
		var old_is_operation = this.beginOperation();
		s += "for ("+rtl.toString(this.translateRun(op_code.loop_init))+"; "+rtl.toString(this.translateRun(op_code.loop_condition))+"; "+rtl.toString(this.translateRun(op_code.loop_inc))+"){";
		this.endOperation(old_is_operation);
		/* Childs */
		this.levelInc();
		for (var i = 0; i < op_code.childs.count(); i++){
			s += this.s(this.translateRun(op_code.childs.item(i)));
		}
		this.levelDec();
		s += this.s("}");
		return s;
	}
	/**
	 * If
	 */
	OpIf(op_code){
		var s = "";
		/* Condition */
		var old_is_operation = this.beginOperation();
		s += "if ("+rtl.toString(this.translateRun(op_code.condition))+"){";
		this.endOperation(old_is_operation);
		/* If true */
		this.levelInc();
		for (var i = 0; i < op_code.if_true.count(); i++){
			s += this.s(this.translateRun(op_code.if_true.item(i)));
		}
		this.levelDec();
		s += this.s("}");
		/* If else */
		for (var i = 0; i < op_code.if_else.count(); i++){
			var if_else = op_code.if_else.item(i);
			var old_is_operation = this.beginOperation();
			var res = "else if ("+rtl.toString(this.translateRun(if_else.condition))+"){";
			this.endOperation(old_is_operation);
			s += this.s(res);
			this.levelInc();
			for (var j = 0; j < if_else.if_true.count(); j++){
				s += this.s(this.translateRun(if_else.if_true.item(j)));
			}
			this.levelDec();
			s += this.s("}");
		}
		/* If false */
		if (op_code.if_false != null){
			s += this.s("else {");
			this.levelInc();
			for (var i = 0; i < op_code.if_false.count(); i++){
				s += this.s(this.translateRun(op_code.if_false.item(i)));
			}
			this.levelDec();
			s += this.s("}");
		}
		return s;
	}
	/**
	 * Return
	 */
	OpReturn(op_code){
		var old_is_operation = this.beginOperation();
		/* result */
		if (this.current_function_is_memorize){
			var s = "$__memorize_value = ";
		}
		else {
			var s = "return ";
		}
		this.current_opcode_level = 0;
		this.levelInc();
		s += this.s(this.translateRun(op_code.value));
		this.levelDec();
		s += this.s(";");
		this.endOperation(old_is_operation);
		if (this.current_function_is_memorize){
			s += this.s("rtl::_memorizeSave("+rtl.toString(this.convertString(this.currentFunctionName()))+", func_get_args(), $__memorize_value);");
			s += this.s("return $__memorize_value;");
			return s;
		}
		else {
			return s;
		}
	}
	/**
	 * Throw
	 */
	OpThrow(op_code){
		var old_is_operation = this.beginOperation();
		/* result */
		var s = "throw ";
		this.current_opcode_level = 0;
		s += this.s(this.translateRun(op_code.value));
		s += ";";
		this.endOperation(old_is_operation);
		return s;
	}
	/**
	 * Try Catch
	 */
	OpTryCatch(op_code){
		var s = "";
		s += "try{";
		this.levelInc();
		for (var i = 0; i < op_code.op_try.count(); i++){
			s += this.s(this.translateRun(op_code.op_try.item(i)));
		}
		this.levelDec();
		s += this.s("}");
		var try_catch_childs_sz = op_code.childs.count();
		var is_else = "";
		s += "catch(\\Exception $_the_exception){";
		for (var i = 0; i < try_catch_childs_sz; i++){
			var try_catch = op_code.childs.item(i);
			var old_is_operation = this.beginOperation();
			var tp = this.translateRun(try_catch.op_type);
			var name = this.translateRun(try_catch.op_ident);
			this.endOperation(old_is_operation);
			if (tp == "$var"){
				tp = "\\Exception";
			}
			this.levelInc();
			s += this.s(rtl.toString(is_else)+"if ($_the_exception instanceof "+rtl.toString(tp)+"){");
			this.levelInc();
			s += this.s(rtl.toString(name)+" = $_the_exception;");
			for (var j = 0; j < try_catch.childs.count(); j++){
				s += this.s(this.translateRun(try_catch.childs.item(j)));
			}
			this.levelDec();
			s += this.s("}");
			this.levelDec();
			is_else = "else";
		}
		if (try_catch_childs_sz > 0){
			this.levelInc();
			s += this.s("else { throw $_the_exception; }");
			this.levelDec();
		}
		s += this.s("}");
		return s;
	}
	/**
	 * While
	 */
	OpWhile(op_code){
		var s = "";
		/* Condition */
		var old_is_operation = this.beginOperation();
		s += "while ("+rtl.toString(this.translateRun(op_code.condition))+"){";
		this.endOperation(old_is_operation);
		/* Childs */
		this.levelInc();
		for (var i = 0; i < op_code.childs.count(); i++){
			s += this.s(this.translateRun(op_code.childs.item(i)));
		}
		this.levelDec();
		s += this.s("}");
		return s;
	}
	/** ======================== Namespace and use ======================== */
	/**
	 * Namespace
	 */
	OpNamespace(op_code){
		this.current_namespace = op_code.value;
		var arr = rs.explode(".", this.current_namespace);
		this.current_module_name = arr.item(0);
		this.modules.clear();
		var res = "namespace "+rtl.toString(rs.implode("\\", arr))+";";
		if (this.current_module_name != "Runtime"){
			res += this.s("use Runtime\\rs;");
			res += this.s("use Runtime\\rtl;");
			res += this.s("use Runtime\\Map;");
			res += this.s("use Runtime\\Vector;");
			res += this.s("use Runtime\\Dict;");
			res += this.s("use Runtime\\Collection;");
			res += this.s("use Runtime\\Annotations\\IntrospectionInfo;");
			res += this.s("use Runtime\\UIStruct;");
			this.modules.set("rs", "Runtime.rs");
			this.modules.set("rtl", "Runtime.rtl");
			this.modules.set("Map", "Runtime.Map");
			this.modules.set("Dict", "Runtime.Dict");
			this.modules.set("Vector", "Runtime.Vector");
			this.modules.set("Collection", "Runtime.Collection");
			this.modules.set("IntrospectionInfo", "Runtime.Annotations.IntrospectionInfo");
			this.modules.set("UIStruct", "Runtime.UIStruct");
		}
		return res;
	}
	/**
	 * Use
	 */
	OpUse(op_code){
		var lib_name = op_code.value;
		var arr = rs.explode(".", lib_name);
		var class_name = arr.getLastItem("");
		if (op_code.alias_name != ""){
			this.modules.set(op_code.alias_name, lib_name);
		}
		else if (class_name != ""){
			this.modules.set(class_name, lib_name);
		}
		var res = rs.implode("\\", arr);
		if (op_code.alias_name != ""){
			return "use "+rtl.toString(res)+" as "+rtl.toString(op_code.alias_name)+";";
		}
		return "use "+rtl.toString(res)+";";
	}
	/** ============================= Classes ============================= */
	/**
	 * Function declare
	 */
	OpFunctionDeclare(op_code){
		var use_vars = null;
		var res = "";
		var ch = "";
		var s = "";
		/* Skip if declare function */
		if (op_code.isFlag("declare")){
			return "";
		}
		if (op_code.isFlag("static")){
			res += "static function ";
			if (this.current_function_name.count() == 0){
				this.current_function_is_static = true;
			}
		}
		else {
			res += "function ";
			if (this.current_function_name.count() == 0){
				this.current_function_is_static = false;
			}
		}
		var old_current_function_is_memorize = this.current_function_is_memorize;
		this.current_function_is_memorize = false;
		if (op_code.isFlag("memorize") && op_code.isFlag("static") && !op_code.isFlag("async") && this.current_function_name.count() == 0){
			this.current_function_is_memorize = true;
		}
		if (op_code.name == "constructor"){
			res += "__construct";
		}
		else if (op_code.name == "destructor"){
			res += "__destruct";
		}
		else {
			res += op_code.name;
		}
		this.current_function_name.push(op_code.name);
		this.pushOneLine(true);
		res += "(";
		for (var i = 0; i < op_code.args.count(); i++){
			var variable = op_code.args.item(i);
			res += rtl.toString(ch)+"$"+rtl.toString(variable.name);
			if (variable.value != null){
				res += " = "+rtl.toString(this.translateRun(variable.value));
			}
			ch = ", ";
		}
		res += ")";
		var flag_use = false;
		if (this.current_function_name.count() == 2 && !this.current_function_is_static){
			if (use_vars == null){
				var use_vars = new Vector();
			}
		}
		if (use_vars != null){
			if (use_vars.count() > 0){
				flag_use = true;
			}
		}
		if (op_code.use_variables != null){
			if (op_code.use_variables.count() > 0){
				flag_use = true;
			}
		}
		if (flag_use){
			ch = "";
			res += " use (";
			if (use_vars != null){
				for (var i = 0; i < use_vars.count(); i++){
					res += rtl.toString(ch)+"&$"+rtl.toString(use_vars.item(i));
					ch = ", ";
				}
			}
			if (op_code.use_variables != null){
				for (var i = 0; i < op_code.use_variables.count(); i++){
					res += rtl.toString(ch)+"&$"+rtl.toString(op_code.use_variables.item(i));
					ch = ", ";
				}
			}
			res += ")";
		}
		this.popOneLine();
		if (this.is_interface){
			res += ";";
		}
		else {
			res += "{";
			this.setOperation(false);
			this.pushOneLine(false);
			this.levelInc();
			if (this.current_function_is_memorize){
				res += this.s("$__memorize_value = rtl::_memorizeValue("+rtl.toString(this.convertString(this.currentFunctionName()))+", func_get_args());");
				res += this.s("if ($__memorize_value != rtl::$_memorize_not_found) return $__memorize_value;");
			}
			if (op_code.childs != null){
				if (op_code.is_lambda){
					if (op_code.childs.count() > 0){
						var old_is_operation = this.beginOperation(true);
						var lambda_res = this.translateRun(op_code.childs.item(0));
						this.endOperation(old_is_operation);
						if (this.current_function_is_memorize){
							res += this.s("$__memorize_value = "+rtl.toString(lambda_res)+";");
							res += this.s("rtl::_memorizeSave("+rtl.toString(this.convertString(this.currentFunctionName()))+", func_get_args(), $__memorize_value);");
							res += this.s("return $__memorize_value;");
						}
						else {
							res += this.s("return "+rtl.toString(lambda_res)+";");
						}
					}
				}
				else {
					for (var i = 0; i < op_code.childs.count(); i++){
						res += this.s(this.translateRun(op_code.childs.item(i)));
					}
				}
			}
			else if (op_code.return_function != null){
				res += this.s("return "+rtl.toString(this.translateItem(op_code.return_function))+";");
			}
			this.levelDec();
			res += this.s("}");
			this.popOneLine();
		}
		this.current_function_name.pop();
		this.current_function_is_memorize = old_current_function_is_memorize;
		return res;
	}
	/**
	 * Class declare header
	 */
	OpClassDeclareHeader(op_code){
		var res = "";
		var old_is_operation = this.beginOperation();
		if (this.is_interface){
			res += "interface ";
		}
		else {
			res += "class ";
		}
		res += op_code.class_name;
		if (op_code.class_extends != ""){
			res += " extends "+rtl.toString(this.translateRun(op_code.class_extends));
		}
		if (op_code.class_implements != null && op_code.class_implements.count() > 0){
			res += " implements ";
			var ch = "";
			for (var i = 0; i < op_code.class_implements.count(); i++){
				var name = op_code.class_implements.item(i);
				res += rtl.toString(ch)+rtl.toString(this.getName(name));
				ch = ", ";
			}
		}
		res += "{";
		this.endOperation(old_is_operation);
		this.levelInc();
		return res;
	}
	/**
	 * Class declare variables
	 */
	OpClassDeclareVariables(op_code){
		var res = "";
		for (var i = 0; i < op_code.childs.count(); i++){
			var variable = op_code.childs.item(i);
			if (!(variable instanceof OpAssignDeclare)){
				continue;
			}
			var s = this.OpClassDeclareVariable(variable);
			if (s != ""){
				res += this.s(this.OpClassDeclareVariable(variable));
			}
		}
		return res;
	}
	/**
	 * Class declare variable
	 */
	OpClassDeclareVariable(op_code){
		if (op_code.flags != null){
			var old_is_operation = this.beginOperation();
			var s = "";
			if (op_code.isFlag("const")){
				s += "const ";
			}
			else {
				if (op_code.isFlag("static")){
					s += "static ";
				}
				if (op_code.isFlag("protected")){
					s += "protected ";
				}
				else if (this.is_struct && op_code.isFlag("public") && !op_code.isFlag("static")){
					s += "protected ";
				}
				else {
					s += "public ";
				}
			}
			s += this.OpAssignDeclare(op_code, false);
			s += ";";
			this.endOperation(old_is_operation);
			return s;
		}
		return "";
	}
	/**
	 * Returns declare type
	 * @return string
	 */
	getTypeValue(tp){
		var res = "";
		while (tp != null){
			if (tp instanceof OpIdentifier){
				if (res != ""){
					res = "."+rtl.toString(res);
				}
				res = rtl.toString(this.getModuleName(tp.value))+rtl.toString(res);
				tp = null;
			}
			else if (tp instanceof OpDynamic){
				if (res != ""){
					res = "."+rtl.toString(res);
				}
				res = rtl.toString(tp.name)+rtl.toString(res);
				tp = tp.value;
			}
			else if (tp instanceof OpTemplateIdentifier){
				tp = tp.t;
			}
			else {
				tp = null;
			}
		}
		return res;
	}
	/**
	 * Returns declare type
	 * @return string
	 */
	getAssignDeclareTypeValue(variable){
		return this.getTypeValue(variable.tp);
	}
	/**
	 * Returns declare type
	 * @return string
	 */
	getAssignDeclareTypeTemplate(variable){
		if (variable.tp instanceof OpTemplateIdentifier){
			if (variable.tp.childs != null){
				var code = variable.tp.childs.get(0);
				return this.getTypeValue(code);
			}
		}
		return "";
	}
	/**
	 * Class init functions
	 */
	OpClassInit(op_code){
		var childs = op_code.childs;
		var class_implements = op_code.class_implements;
		var class_extends = "";
		if (op_code.class_extends){
			var name = op_code.class_extends.value;
			if (this.modules.has(name)){
				class_extends = this.modules.item(name);
			}
			else {
				class_extends = name;
			}
		}
		var res = "";
		var has_assignable = false;
		var has_variables = false;
		var has_serializable = false;
		var has_cloneable = false;
		var has_methods_annotations = false;
		var has_fields_annotations = false;
		if (!this.is_interface){
			res += this.s("/* ======================= Class Init Functions ======================= */");
			res += this.s("public function getClassName(){"+"return "+rtl.toString(this.convertString(rtl.toString(this.current_namespace)+"."+rtl.toString(this.current_class_name)))+";}");
			res += this.s("public static function getCurrentNamespace(){"+"return "+rtl.toString(this.convertString(this.current_namespace))+";}");
			res += this.s("public static function getCurrentClassName(){"+"return "+rtl.toString(this.convertString(rtl.toString(this.current_namespace)+"."+rtl.toString(this.current_class_name)))+";}");
			res += this.s("public static function getParentClassName(){"+"return "+rtl.toString(this.convertString(class_extends))+";}");
		}
		if (this.is_struct){
			has_serializable = true;
			has_cloneable = true;
		}
		for (var i = 0; i < childs.count(); i++){
			var variable = childs.item(i);
			if (variable instanceof OpAssignDeclare){
				if (variable.isFlag("serializable")){
					has_serializable = true;
					has_cloneable = true;
				}
				if (variable.isFlag("cloneable")){
					has_cloneable = true;
				}
				if (variable.isFlag("assignable")){
					has_assignable = true;
				}
				if (!variable.isFlag("static") && !variable.isFlag("const")){
					has_variables = true;
				}
				if (variable.hasAnnotations()){
					has_fields_annotations = true;
				}
			}
			if (variable instanceof OpFunctionDeclare){
				if (variable.hasAnnotations()){
					has_fields_annotations = true;
					has_methods_annotations = true;
				}
			}
		}
		if (this.current_module_name != "Runtime" || this.current_class_name != "CoreObject"){
			if (has_variables){
				res += this.s("protected function _init(){");
				this.levelInc();
				if (class_extends != ""){
					res += this.s("parent::_init();");
				}
				if (childs != null){
					for (var i = 0; i < childs.count(); i++){
						var variable = childs.item(i);
						if (!(variable instanceof OpAssignDeclare)){
							continue;
						}
						if (variable.value == null){
							continue;
						}
						var var_prefix = "";
						if (this.is_struct && variable.isFlag("public") && !variable.isFlag("static")){
							var_prefix = "__";
						}
						var is_struct = this.is_struct && !variable.isFlag("static") && !variable.isFlag("const");
						if (is_struct){
							this.beginOperation();
							var s = "$this->"+rtl.toString(var_prefix)+rtl.toString(variable.name)+" = "+rtl.toString(this.translateRun(variable.value))+";";
							this.endOperation();
							res += this.s(s);
						}
						else if (!variable.isFlag("static") && !variable.isFlag("const")){
							this.beginOperation();
							var s = "$this->"+rtl.toString(variable.name)+" = "+rtl.toString(this.translateRun(variable.value))+";";
							this.endOperation();
							res += this.s(s);
						}
					}
				}
				this.levelDec();
				res += this.s("}");
			}
			if (has_cloneable || has_assignable){
				var s1 = "public";
				res += this.s(rtl.toString(s1)+" function assignObject($obj){");
				this.levelInc();
				res += this.s("if ($obj instanceof "+rtl.toString(this.getName(this.current_class_name))+"){");
				this.levelInc();
				for (var i = 0; i < childs.count(); i++){
					var variable = childs.item(i);
					if (!(variable instanceof OpAssignDeclare)){
						continue;
					}
					var var_prefix = "";
					if (this.is_struct && variable.isFlag("public") && !variable.isFlag("static")){
						var_prefix = "__";
					}
					var is_struct = this.is_struct && !variable.isFlag("static") && !variable.isFlag("const");
					if (variable.isFlag("public") && (variable.isFlag("cloneable") || variable.isFlag("serializable") || is_struct)){
						if (this.is_struct){
							res += this.s("$this->"+rtl.toString(var_prefix)+rtl.toString(variable.name)+" = "+"$obj->"+rtl.toString(var_prefix)+rtl.toString(variable.name)+";");
						}
						else {
							res += this.s("$this->"+rtl.toString(var_prefix)+rtl.toString(variable.name)+" = "+rtl.toString(this.getName("rtl"))+"::_clone("+"$obj->"+rtl.toString(var_prefix)+rtl.toString(variable.name)+");");
						}
					}
				}
				this.levelDec();
				res += this.s("}");
				res += this.s("parent::assignObject($obj);");
				this.levelDec();
				res += this.s("}");
			}
			if (has_serializable || has_assignable){
				var class_variables_serializable_count = 0;
				var s1 = "public";
				res += this.s(rtl.toString(s1)+" function assignValue($variable_name, $value, $sender = null){");
				this.levelInc();
				class_variables_serializable_count = 0;
				for (var i = 0; i < childs.count(); i++){
					var variable = childs.item(i);
					if (!(variable instanceof OpAssignDeclare)){
						continue;
					}
					var var_prefix = "";
					if (this.is_struct && variable.isFlag("public") && !variable.isFlag("static")){
						var_prefix = "__";
					}
					var is_struct = this.is_struct && !variable.isFlag("static") && !variable.isFlag("const");
					if (variable.isFlag("public") && (variable.isFlag("serializable") || variable.isFlag("assignable") || is_struct)){
						var type_value = this.getAssignDeclareTypeValue(variable);
						var type_template = this.getAssignDeclareTypeTemplate(variable);
						var def_val = "null";
						if (variable.value != null){
							def_val = this.translateRun(variable.value);
						}
						var s = "if ($variable_name == "+rtl.toString(this.convertString(variable.name))+")";
						s += "$this->"+rtl.toString(var_prefix)+rtl.toString(variable.name)+" = ";
						s += "rtl::convert($value,\""+rtl.toString(type_value)+"\","+rtl.toString(def_val)+",\""+rtl.toString(type_template)+"\");";
						if (class_variables_serializable_count == 0){
							res += this.s(s);
						}
						else {
							res += this.s("else "+rtl.toString(s));
						}
						class_variables_serializable_count++;
					}
				}
				if (class_variables_serializable_count == 0){
					res += this.s("parent::assignValue($variable_name, $value, $sender);");
				}
				else {
					res += this.s("else parent::assignValue($variable_name, $value, $sender);");
				}
				this.levelDec();
				res += this.s("}");
				res += this.s("public function takeValue($variable_name, $default_value = null){");
				this.levelInc();
				class_variables_serializable_count = 0;
				for (var i = 0; i < childs.count(); i++){
					var variable = childs.item(i);
					if (!(variable instanceof OpAssignDeclare)){
						continue;
					}
					var var_prefix = "";
					if (this.is_struct && variable.isFlag("public") && !variable.isFlag("static")){
						var_prefix = "__";
					}
					var is_struct = this.is_struct && !variable.isFlag("static") && !variable.isFlag("const");
					if (variable.isFlag("public") && (variable.isFlag("serializable") || variable.isFlag("assignable") || is_struct)){
						var take_value_s = "if ($variable_name == "+rtl.toString(this.convertString(variable.name))+") "+"return $this->"+rtl.toString(var_prefix)+rtl.toString(variable.name)+";";
						if (class_variables_serializable_count == 0){
							res += this.s(take_value_s);
						}
						else {
							res += this.s("else "+rtl.toString(take_value_s));
						}
						class_variables_serializable_count++;
					}
				}
				res += this.s("return parent::takeValue($variable_name, $default_value);");
				this.levelDec();
				res += this.s("}");
			}
			if (!this.is_interface){
				res += this.s("public static function getFieldsList($names, $flag=0){");
				this.levelInc();
				var vars = new Map();
				for (var i = 0; i < childs.count(); i++){
					var variable = childs.item(i);
					if (!(variable instanceof OpAssignDeclare)){
						continue;
					}
					if (!variable.isFlag("public")){
						continue;
					}
					var is_struct = this.is_struct && !variable.isFlag("static") && !variable.isFlag("const");
					var is_static = variable.isFlag("static");
					var is_serializable = variable.isFlag("serializable");
					var is_assignable = variable.isFlag("assignable");
					var has_annotation = variable.hasAnnotations();
					if (is_struct){
						is_serializable = true;
						is_assignable = true;
					}
					if (is_serializable){
						is_assignable = true;
					}
					var flag = 0;
					if (is_serializable){
						flag = flag | 1;
					}
					if (is_assignable){
						flag = flag | 2;
					}
					if (has_annotation){
						flag = flag | 4;
					}
					if (flag != 0){
						if (!vars.has(flag)){
							vars.set(flag, new Vector());
						}
						var v = vars.item(flag);
						v.push(variable.name);
					}
				}
				vars.each((flag, v) => {
					res += this.s("if (($flag | "+rtl.toString(flag)+")=="+rtl.toString(flag)+"){");
					this.levelInc();
					v.each((varname) => {
						res += this.s("$names->push("+rtl.toString(this.convertString(varname))+");");
					});
					this.levelDec();
					res += this.s("}");
				});
				this.levelDec();
				res += this.s("}");
				res += this.s("public static function getFieldInfoByName($field_name){");
				this.levelInc();
				for (var i = 0; i < childs.count(); i++){
					var variable = childs.item(i);
					if (!(variable instanceof OpAssignDeclare)){
						continue;
					}
					var is_struct = this.is_struct && !variable.isFlag("static") && !variable.isFlag("const");
					if (variable.isFlag("public") && variable.hasAnnotations()){
						res += this.s("if ($field_name == "+rtl.toString(this.convertString(variable.name))+"){");
						this.levelInc();
						res += this.s("return new "+rtl.toString(this.getName("IntrospectionInfo"))+"(");
						this.levelInc();
						res += this.s("(new "+rtl.toString(this.getName("Map"))+"())");
						res += this.s("->set(\"kind\", \"field\")");
						res += this.s("->set(\"class_name\", "+rtl.toString(this.convertString(this.currentClassName()))+")");
						res += this.s("->set(\"name\", "+rtl.toString(this.convertString(variable.name))+")");
						res += this.s("->set(\"annotations\", ");
						this.levelInc();
						res += this.s("(new "+rtl.toString(this.getName("Vector"))+"())");
						for (var j = 0; j < variable.annotations.count(); j++){
							var annotation = variable.annotations.item(j);
							this.pushOneLine(true);
							var s_kind = this.translateRun(annotation.kind);
							var s_options = this.translateRun(annotation.options);
							this.popOneLine();
							res += this.s("->push(new "+rtl.toString(s_kind)+"("+rtl.toString(s_options)+"))");
						}
						this.levelDec();
						res += this.s(")");
						this.levelDec();
						res += this.s(");");
						this.levelDec();
						res += this.s("}");
					}
				}
				res += this.s("return null;");
				this.levelDec();
				res += this.s("}");
				res += this.s("public static function getMethodsList($names){");
				this.levelInc();
				for (var i = 0; i < childs.count(); i++){
					var variable = childs.item(i);
					if (!(variable instanceof OpFunctionDeclare)){
						continue;
					}
					if (variable.isFlag("public") && variable.hasAnnotations()){
						res += this.s("$names->push("+rtl.toString(this.convertString(variable.name))+");");
					}
				}
				this.levelDec();
				res += this.s("}");
				res += this.s("public static function getMethodInfoByName($method_name){");
				this.levelInc();
				for (var i = 0; i < childs.count(); i++){
					var variable = childs.item(i);
					if (!(variable instanceof OpFunctionDeclare)){
						continue;
					}
					if (variable.isFlag("public") && variable.hasAnnotations()){
						res += this.s("if ($method_name == "+rtl.toString(this.convertString(variable.name))+"){");
						this.levelInc();
						res += this.s("return new "+rtl.toString(this.getName("IntrospectionInfo"))+"(");
						this.levelInc();
						res += this.s("(new "+rtl.toString(this.getName("Map"))+"())");
						res += this.s("->set(\"kind\", \"method\")");
						res += this.s("->set(\"class_name\", "+rtl.toString(this.convertString(this.currentClassName()))+")");
						res += this.s("->set(\"name\", "+rtl.toString(this.convertString(variable.name))+")");
						res += this.s("->set(\"annotations\", ");
						this.levelInc();
						res += this.s("(new "+rtl.toString(this.getName("Vector"))+"())");
						for (var j = 0; j < variable.annotations.count(); j++){
							var annotation = variable.annotations.item(j);
							this.pushOneLine(true);
							var s_kind = this.translateRun(annotation.kind);
							var s_options = this.translateRun(annotation.options);
							this.popOneLine();
							res += this.s("->push(new "+rtl.toString(s_kind)+"("+rtl.toString(s_options)+"))");
						}
						this.levelDec();
						res += this.s(")");
						this.levelDec();
						res += this.s(");");
						this.levelDec();
						res += this.s("}");
					}
				}
				res += this.s("return null;");
				this.levelDec();
				res += this.s("}");
			}
			if (this.is_struct){
				res += this.s("public function __get($key){ return $this->takeValue($key); }");
				res += this.s("public function __set($key, $value){"+"throw new \\Runtime\\Exceptions\\AssignStructValueError($key);"+"}");
			}
		}
		if (op_code.hasAnnotations()){
			res += this.s("public static function getClassInfo(){");
			this.levelInc();
			res += this.s("return new "+rtl.toString(this.getName("IntrospectionInfo"))+"(");
			this.levelInc();
			res += this.s("(new "+rtl.toString(this.getName("Map"))+"())");
			res += this.s("->set(\"kind\", \"class\")");
			res += this.s("->set(\"class_name\", "+rtl.toString(this.convertString(this.currentClassName()))+")");
			res += this.s("->set(\"annotations\", ");
			this.levelInc();
			res += this.s("(new "+rtl.toString(this.getName("Vector"))+"())");
			for (var j = 0; j < op_code.annotations.count(); j++){
				var annotation = op_code.annotations.item(j);
				this.pushOneLine(true);
				var s_kind = this.translateRun(annotation.kind);
				var s_options = this.translateRun(annotation.options);
				this.popOneLine();
				res += this.s("->push(new "+rtl.toString(s_kind)+"("+rtl.toString(s_options)+"))");
			}
			this.levelDec();
			res += this.s(")");
			this.levelDec();
			res += this.s(");");
			this.levelDec();
			res += this.s("}");
		}
		return res;
	}
	/**
	 * Class declare
	 */
	OpClassDeclare(op_code){
		var res = "";
		var s = "";
		/* Set current class name */
		this.current_class_name = op_code.class_name;
		this.modules.set(this.current_class_name, rtl.toString(this.current_namespace)+"."+rtl.toString(this.current_class_name));
		this.ui_struct_class_name.push(rtl.toString(this.current_namespace)+"."+rtl.toString(this.current_class_name));
		/*this.is_interface = false;*/
		/* Skip if declare class */
		if (op_code.isFlag("declare")){
			return "";
		}
		res += this.OpClassDeclareHeader(op_code);
		/* Variables */
		/*res ~= this.OpClassDeclareVariables(op_code);*/
		/* Class body */
		for (var i = 0; i < op_code.childs.count(); i++){
			var op_code2 = op_code.childs.item(i);
			if (op_code2 instanceof OpAssignDeclare){
				var s_assign_variable = this.OpClassDeclareVariable(op_code2);
				if (s_assign_variable){
					res += this.s(s_assign_variable);
				}
			}
			else if (op_code2 instanceof OpFunctionArrowDeclare){
				res += this.s(this.OpFunctionArrowDeclare(op_code2));
			}
			else if (op_code2 instanceof OpFunctionDeclare){
				res += this.s(this.OpFunctionDeclare(op_code2));
			}
			else if (op_code2 instanceof OpPreprocessorSwitch){
				res += this.s(this.OpPreprocessorSwitch(op_code2));
			}
			else if (op_code2 instanceof OpComment){
				res += this.s(this.OpComment(op_code2));
			}
		}
		/* Class Init */
		res += this.OpClassInit(op_code);
		/* Footer class */
		this.levelDec();
		res += this.s("}");
		this.ui_struct_class_name.pop();
		return res;
	}
	/**
	 * Interface declare
	 */
	OpInterfaceDeclare(op_code){
		this.is_interface = true;
		var res = this.OpClassDeclare(op_code);
		this.is_interface = false;
		return res;
	}
	/**
	 * Struct declare
	 */
	OpStructDeclare(op_code){
		this.is_struct = true;
		var res = this.OpClassDeclare(op_code);
		this.is_struct = false;
		return res;
	}
	/** ========================== HTML OP Codes ========================== */
	/**
	 * Check if name is component
	 * @param string name
	 * @return bool
	 */
	isComponent(name){
		var ch = rs.charAt(name, 0);
		return rs.strtoupper(ch) == ch && ch != "";
	}
	/**
	 * Html escape
	 */
	OpHtmlEscape(op_code){
		var value = this.translateRun(op_code.value);
		return "rs::htmlEscape("+rtl.toString(value)+")";
	}
	/**
	 * OpHtmlJson
	 */
	OpHtmlJson(op_code){
		return "rtl::json_encode("+rtl.toString(this.translateRun(op_code.value))+")";
		var res = "";
		res = "new UIStruct(new "+rtl.toString(this.getName("Map"))+"([";
		res += this.s("\"name\"=>\"span\",");
		res += this.s("\"props\"=>new "+rtl.toString(this.getName("Map"))+"(");
		res += this.s("\"rawHTML\"=>"+rtl.toString(value));
		res += this.s("])]))");
		return res;
	}
	/**
	 * OpHtmlRaw
	 */
	OpHtmlRaw(op_code){
		var value = this.translateRun(op_code.value);
		return this.translateRun(op_code.value);
		var res = "";
		res = "new UIStruct(new "+rtl.toString(this.getName("Map"))+"([";
		res += this.s("\"name\"=>\"span\",");
		res += this.s("\"props\"=>new "+rtl.toString(this.getName("Map"))+"(");
		res += this.s("\"rawHTML\"=>"+rtl.toString(value));
		res += this.s("])]))");
		return res;
	}
	/**
	 * Html Text
	 */
	OpHtmlText(op_code){
		return this.convertString(op_code.value);
	}
	/**
	 * Returns true if key is props
	 */
	isOpHtmlTagProps(key){
		if (key == "@key" || key == "@model" || key == "@value" || key == "@bind" || key == "@ref" || key == "@annotations"){
			return false;
		}
		return true;
	}
	/**
	 * Html tag
	 */
	OpHtmlTag(op_code){
		var is_component = false;
		var res = "";
		this.pushOneLine(false);
		/* isComponent */
		if (this.modules.has(op_code.tag_name)){
			res = "new UIStruct(new "+rtl.toString(this.getName("Map"))+"([";
			res += this.s("\"kind\"=>\"component\",");
			res += this.s("\"class_name\"=>static::getCurrentClassName(),");
			res += this.s("\"name\"=>"+rtl.toString(this.convertString(this.modules.item(op_code.tag_name)))+",");
			is_component = true;
		}
		else {
			res = "new UIStruct(new "+rtl.toString(this.getName("Map"))+"([";
			res += this.s("\"space\"=>"+rtl.toString(this.convertString(RuntimeUtils.getCssHash(this.getUIStructClassName())))+",");
			res += this.s("\"class_name\"=>static::getCurrentClassName(),");
			res += this.s("\"name\"=>"+rtl.toString(this.convertString(op_code.tag_name))+",");
		}
		var is_props = false;
		var is_spreads = op_code.spreads != null && op_code.spreads.count() > 0;
		if (op_code.attributes != null && op_code.attributes.count() > 0){
			op_code.attributes.each((item) => {
				var key = item.key;
				if (this.isOpHtmlTagProps(key)){
					is_props = true;
				}
				else if (key == "@key"){
					var value = this.translateRun(item.value);
					res += this.s("\"key\"=>"+rtl.toString(value)+",");
				}
				else if (key == "@ref"){
					var value = this.translateRun(item.value);
					res += this.s("\"reference\"=>"+rtl.toString(value)+",");
				}
				else if (key == "@control"){
					var value = this.translateRun(item.value);
					res += this.s("\"controller\"=>"+rtl.toString(value)+",");
				}
				else if (key == "@model"){
					var value = this.translateRun(item.value);
					res += this.s("\"model\"=>"+rtl.toString(value)+",");
				}
				else if (key == "@value"){
					var value = this.translateRun(item.value);
					res += this.s("\"value\"=>"+rtl.toString(value)+",");
				}
				else if (key == "@bind"){
					var value = this.translateRun(item.value);
					res += this.s("\"bind\"=> "+rtl.toString(value)+",");
				}
				else if (key == "@annotations"){
					var value = this.translateRun(item.value);
					res += this.s("\"annotations\"=> "+rtl.toString(value)+",");
				}
			});
		}
		if (is_props || is_spreads){
			res += this.s("\"props\"=>(new "+rtl.toString(this.getName("Map"))+"())");
			this.levelInc();
			if (is_props){
				op_code.attributes.each((item) => {
					if (this.isOpHtmlTagProps(item.key)){
						var old_operation = this.beginOperation(true);
						this.pushOneLine(true);
						var key = item.key;
						var value = this.translateRun(item.value);
						this.popOneLine();
						this.endOperation(old_operation);
						res += this.s("->set("+rtl.toString(this.convertString(key))+", "+rtl.toString(value)+")");
					}
				});
			}
			if (is_spreads){
				op_code.spreads.each((item) => {
					res += this.s("->addMap($"+rtl.toString(item)+")");
				});
			}
			this.levelDec();
			res += this.s(",");
		}
		if (op_code.is_plain){
			if (op_code.childs != null && op_code.childs.count() > 0){
				var value = op_code.childs.reduce((res, item) => {
					var value = "";
					if (item instanceof OpHtmlJson){
						value = "rtl::json_encode("+rtl.toString(this.translateRun(item.value))+")";
						value = "rtl::toString("+rtl.toString(value)+")";
					}
					else if (item instanceof OpHtmlRaw){
						value = this.translateRun(item.value);
						value = "rtl::toString("+rtl.toString(value)+")";
					}
					else if (item instanceof OpConcat || item instanceof OpString){
						value = this.translateRun(item);
					}
					else if (item instanceof OpHtmlEscape){
						value = this.translateRun(item);
						value = "rs::htmlEscape("+rtl.toString(value)+")";
					}
					else if (item instanceof OpHtmlText){
						value = this.convertString(item.value);
					}
					else {
						value = this.translateRun(item);
						value = "rtl::toString("+rtl.toString(value)+")";
					}
					if (res == ""){
						return value;
					}
					return rtl.toString(res)+"."+rtl.toString(value);
				}, "");
				var old_operation = this.beginOperation(true);
				this.pushOneLine(true);
				res += this.s("\"children\" => new "+rtl.toString(this.getName("Vector"))+"([");
				this.levelInc();
				res += this.s("rtl::normalizeUI("+rtl.toString(value)+")");
				this.levelDec();
				res += this.s("])");
				this.popOneLine();
				this.endOperation(old_operation);
			}
		}
		else {
			if (op_code.childs != null && op_code.childs.count() > 0){
				res += this.s("\"children\" => rtl::normalizeUIVector(new "+rtl.toString(this.getName("Vector"))+"(");
				this.levelInc();
				var childs_sz = op_code.childs.count();
				for (var i = 0; i < childs_sz; i++){
					var item = op_code.childs.item(i);
					if (item instanceof OpComment){
						continue;
					}
					res += this.s(rtl.toString(this.translateRun(item))+rtl.toString((i + 1 == childs_sz) ? ("") : (",")));
				}
				this.levelDec();
				res += this.s("))");
			}
		}
		res += this.s("]))");
		this.popOneLine();
		if (is_component){
		}
		return res;
	}
	/**
	 * Html tag
	 */
	OpHtmlView(op_code){
		var res = "rtl::normalizeUIVector(new Vector(";
		this.pushOneLine(false);
		var childs_sz = op_code.childs.count();
		for (var i = 0; i < childs_sz; i++){
			var item = op_code.childs.item(i);
			if (item instanceof OpComment){
				continue;
			}
			res += this.s(rtl.toString(this.translateRun(item))+rtl.toString((i + 1 == childs_sz) ? ("") : (",")));
		}
		this.popOneLine();
		res += this.s("))");
		return res;
	}
	/** =========================== Preprocessor ========================== */
	calcPreprocessorCondition(op_case){
		if (op_case.condition instanceof OpIdentifier){
			if (op_case.condition.value == "PHP"){
				return true;
			}
		}
		return false;
	}
	/**
	 * Interface declare
	 */
	OpPreprocessorSwitch(op_code){
		if (op_code.childs == null){
			return "";
		}
		var res = "";
		for (var i = 0; i < op_code.childs.count(); i++){
			var op_case = op_code.childs.item(i);
			if (this.calcPreprocessorCondition(op_case)){
				res += this.s(op_case.value);
			}
		}
		return res;
	}
	/**
	 * Reset translator to default settings
	 */
	resetTranslator(){
		super.resetTranslator();
		this.current_function_name = new Vector();
		this.ui_struct_class_name = new Vector();
	}
	/**
	 * Translate to language
	 * @param BaseOpCode op_code - Abstract syntax tree
	 * @returns string - The result
	 */
	translateOpCode(op_code){
		this.resetTranslator();
		var s = "<?php"+rtl.toString(this.crlf);
		s += this.translateRun(op_code);
		return s;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.LangPHP.TranslatorPHP";}
	static getCurrentNamespace(){return "BayrellLang.LangPHP";}
	static getCurrentClassName(){return "BayrellLang.LangPHP.TranslatorPHP";}
	static getParentClassName(){return "BayrellLang.CommonTranslator";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.ui_struct_class_name = null;
		this.modules = null;
		this.current_namespace = "";
		this.current_class_name = "";
		this.current_function_name = null;
		this.current_function_is_static = false;
		this.current_function_is_memorize = false;
		this.current_module_name = "";
		this.is_static = false;
		this.is_interface = false;
		this.is_struct = false;
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
module.exports = TranslatorPHP;