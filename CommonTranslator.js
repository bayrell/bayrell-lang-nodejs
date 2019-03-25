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
var rs = require('bayrell-runtime-nodejs').rs;
var ContextObject = require('bayrell-runtime-nodejs').ContextObject;
var BaseOpCode = require('./OpCodes/BaseOpCode.js');
var OpAdd = require('./OpCodes/OpAdd.js');
var OpAnd = require('./OpCodes/OpAnd.js');
var OpAssign = require('./OpCodes/OpAssign.js');
var OpAssignDeclare = require('./OpCodes/OpAssignDeclare.js');
var OpBitAnd = require('./OpCodes/OpBitAnd.js');
var OpBitNot = require('./OpCodes/OpBitNot.js');
var OpBitOr = require('./OpCodes/OpBitOr.js');
var OpBitXor = require('./OpCodes/OpBitXor.js');
var OpBreak = require('./OpCodes/OpBreak.js');
var OpCall = require('./OpCodes/OpCall.js');
var OpCallAwait = require('./OpCodes/OpCallAwait.js');
var OpChilds = require('./OpCodes/OpChilds.js');
var OpClassDeclare = require('./OpCodes/OpClassDeclare.js');
var OpClassName = require('./OpCodes/OpClassName.js');
var OpClone = require('./OpCodes/OpClone.js');
var OpComment = require('./OpCodes/OpComment.js');
var OpCompare = require('./OpCodes/OpCompare.js');
var OpConcat = require('./OpCodes/OpConcat.js');
var OpContinue = require('./OpCodes/OpContinue.js');
var OpCopyStruct = require('./OpCodes/OpCopyStruct.js');
var OpDelete = require('./OpCodes/OpDelete.js');
var OpDiv = require('./OpCodes/OpDiv.js');
var OpDynamic = require('./OpCodes/OpDynamic.js');
var OpFlags = require('./OpCodes/OpFlags.js');
var OpFor = require('./OpCodes/OpFor.js');
var OpFunctionArrowDeclare = require('./OpCodes/OpFunctionArrowDeclare.js');
var OpFunctionDeclare = require('./OpCodes/OpFunctionDeclare.js');
var OpHexNumber = require('./OpCodes/OpHexNumber.js');
var OpHtmlAttribute = require('./OpCodes/OpHtmlAttribute.js');
var OpHtmlComment = require('./OpCodes/OpHtmlComment.js');
var OpHtmlEscape = require('./OpCodes/OpHtmlEscape.js');
var OpHtmlJson = require('./OpCodes/OpHtmlJson.js');
var OpHtmlRaw = require('./OpCodes/OpHtmlRaw.js');
var OpHtmlTag = require('./OpCodes/OpHtmlTag.js');
var OpHtmlText = require('./OpCodes/OpHtmlText.js');
var OpHtmlView = require('./OpCodes/OpHtmlView.js');
var OpIdentifier = require('./OpCodes/OpIdentifier.js');
var OpIf = require('./OpCodes/OpIf.js');
var OpIfElse = require('./OpCodes/OpIfElse.js');
var OpInterfaceDeclare = require('./OpCodes/OpInterfaceDeclare.js');
var OpMap = require('./OpCodes/OpMap.js');
var OpMethod = require('./OpCodes/OpMethod.js');
var OpMod = require('./OpCodes/OpMod.js');
var OpMult = require('./OpCodes/OpMult.js');
var OpNamespace = require('./OpCodes/OpNamespace.js');
var OpNew = require('./OpCodes/OpNew.js');
var OpNope = require('./OpCodes/OpNope.js');
var OpNot = require('./OpCodes/OpNot.js');
var OpNumber = require('./OpCodes/OpNumber.js');
var OpOr = require('./OpCodes/OpOr.js');
var OpPipe = require('./OpCodes/OpPipe.js');
var OpPostDec = require('./OpCodes/OpPostDec.js');
var OpPostInc = require('./OpCodes/OpPostInc.js');
var OpPow = require('./OpCodes/OpPow.js');
var OpPreDec = require('./OpCodes/OpPreDec.js');
var OpPreInc = require('./OpCodes/OpPreInc.js');
var OpPreprocessorSwitch = require('./OpCodes/OpPreprocessorSwitch.js');
var OpReturn = require('./OpCodes/OpReturn.js');
var OpShiftLeft = require('./OpCodes/OpShiftLeft.js');
var OpShiftRight = require('./OpCodes/OpShiftRight.js');
var OpStatic = require('./OpCodes/OpStatic.js');
var OpString = require('./OpCodes/OpString.js');
var OpStringItem = require('./OpCodes/OpStringItem.js');
var OpStructDeclare = require('./OpCodes/OpStructDeclare.js');
var OpSub = require('./OpCodes/OpSub.js');
var OpTemplateIdentifier = require('./OpCodes/OpTemplateIdentifier.js');
var OpTernary = require('./OpCodes/OpTernary.js');
var OpThrow = require('./OpCodes/OpThrow.js');
var OpTryCatch = require('./OpCodes/OpTryCatch.js');
var OpUse = require('./OpCodes/OpUse.js');
var OpVector = require('./OpCodes/OpVector.js');
var OpWhile = require('./OpCodes/OpWhile.js');
class CommonTranslator extends ContextObject{
	/**
	 * Constructor
	 */
	constructor(context){
		if (context == undefined) context=null;
		super(context);
	}
	/**
	 * Push new level
	 */
	pushOneLine(level){
		this.one_lines.push(level);
	}
	/**
	 * Pop level
	 */
	popOneLine(){
		return this.one_lines.pop();
	}
	/**
	 * Returns if is one line
	 */
	isOneLine(){
		return this.one_lines.get(this.one_lines.count() - 1, false);
	}
	/**
	 * Increment indent level
	 */
	levelInc(){
		if (!this.isOneLine()){
			this.indent_level++;
		}
	}
	/**
	 * Decrease indent level
	 */
	levelDec(){
		if (!this.isOneLine()){
			this.indent_level--;
		}
	}
	/**
	 * Begin operation
	 */
	beginOperation(push_one_line){
		if (push_one_line == undefined) push_one_line=true;
		var old_is_operation = this.is_operation;
		this.is_operation = true;
		this.current_opcode_level = 0;
		this.pushOneLine(push_one_line);
		return old_is_operation;
	}
	/**
	 * End operation
	 */
	endOperation(old_is_operation){
		if (old_is_operation == undefined) old_is_operation=false;
		this.popOneLine();
		this.is_operation = old_is_operation;
	}
	/**
	 * Set operation
	 */
	setOperation(is_operation){
		if (is_operation == undefined) is_operation=false;
		this.is_operation = is_operation;
	}
	/**
	 * Output operation
	 */
	op(op_code, op, opcode_level){
		var res = "";
		res += this.o(this.translateRun(op_code.value1), opcode_level);
		res += " "+rtl.toString(op)+" ";
		res += this.o(this.translateRun(op_code.value2), opcode_level);
		this.current_opcode_level = opcode_level;
		return res;
	}
	/**
	 * Output string
	 */
	s(s, force){
		if (force == undefined) force=false;
		if (s == "" && !force){
			return "";
		}
		if (this.isOneLine()){
			return s;
		}
		return rtl.toString(this.crlf)+rtl.toString(rs.str_repeat(this.indent, this.indent_level))+rtl.toString(s);
	}
	/**
	 * Output string witch brackets
	 */
	o(s, current_opcode_level){
		if (this.is_operation == false){
			return s;
		}
		if (current_opcode_level > this.current_opcode_level){
			return "("+rtl.toString(s)+")";
		}
		return s;
	}
	OpAdd(op_code){
		return "";
	}
	OpAnd(op_code){
		return "";
	}
	OpAssign(op_code){
		return "";
	}
	OpAssignDeclare(op_code){
		return "";
	}
	OpBitAnd(op_code){
		return "";
	}
	OpBitNot(op_code){
		return "";
	}
	OpBitOr(op_code){
		return "";
	}
	OpBitXor(op_code){
		return "";
	}
	OpBreak(op_code){
		return "";
	}
	OpCall(op_code){
		return "";
	}
	OpClassDeclare(op_code){
		return "";
	}
	OpClassName(op_code){
		return "";
	}
	OpClone(op_code){
		return "";
	}
	OpComment(op_code){
		return "";
	}
	OpCompare(op_code){
		return "";
	}
	OpConcat(op_code){
		return "";
	}
	OpContinue(op_code){
		return "";
	}
	OpCopyStruct(op_code){
		return "";
	}
	OpDelete(op_code){
		return "";
	}
	OpDiv(op_code){
		return "";
	}
	OpDynamic(op_code){
		return "";
	}
	OpFlags(op_code){
		return "";
	}
	OpFor(op_code){
		return "";
	}
	OpFunctionArrowDeclare(op_code){
		return "";
	}
	OpFunctionDeclare(op_code){
		return "";
	}
	OpHexNumber(op_code){
		return "";
	}
	OpIdentifier(op_code){
		return "";
	}
	OpIf(op_code){
		return "";
	}
	OpInterfaceDeclare(op_code){
		return "";
	}
	OpMethod(op_code){
		return "";
	}
	OpMod(op_code){
		return "";
	}
	OpMult(op_code){
		return "";
	}
	OpNamespace(op_code){
		return "";
	}
	OpNew(op_code){
		return "";
	}
	OpNope(op_code){
		return "";
	}
	OpNot(op_code){
		return "";
	}
	OpNumber(op_code){
		return "";
	}
	OpOr(op_code){
		return "";
	}
	OpPipe(op_code){
		return "";
	}
	OpPostDec(op_code){
		return "";
	}
	OpPostInc(op_code){
		return "";
	}
	OpPow(op_code){
		return "";
	}
	OpPreDec(op_code){
		return "";
	}
	OpPreInc(op_code){
		return "";
	}
	OpPreprocessorSwitch(op_code){
		return "";
	}
	OpReturn(op_code){
		return "";
	}
	OpShiftLeft(op_code){
		return "";
	}
	OpShiftRight(op_code){
		return "";
	}
	OpStatic(op_code){
		return "";
	}
	OpString(op_code){
		return "";
	}
	OpStringItem(op_code){
		return "";
	}
	OpStructDeclare(op_code){
		return "";
	}
	OpSub(op_code){
		return "";
	}
	OpTemplateIdentifier(op_code){
		return "";
	}
	OpTernary(op_code){
		return "";
	}
	OpThrow(op_code){
		return "";
	}
	OpTryCatch(op_code){
		return "";
	}
	OpUse(op_code){
		return "";
	}
	OpWhile(op_code){
		return "";
	}
	/* =========================== HTML OP Codes ========================== */
	OpHtmlEscape(op_code){
		return "";
	}
	OpHtmlJson(op_code){
		return "";
	}
	OpHtmlRaw(op_code){
		return "";
	}
	OpHtmlTag(op_code){
		return "";
	}
	OpHtmlText(op_code){
		return "";
	}
	OpHtmlView(op_code){
		return "";
	}
	/**
	 * Translate to language
	 * @param BaseOpCode op_code - Abstract syntax tree
	 * @returns string - The result
	 */
	translateChilds(childs){
		if (childs == null){
			return "";
		}
		var res = "";
		var code_str = "";
		var flag = true;
		for (var i = 0; i < childs.count(); i++){
			this.current_opcode_level = 0;
			code_str = this.translateRun(childs.item(i));
			if (code_str == ""){
				continue;
			}
			if (flag){
				res += code_str;
				flag = false;
			}
			else {
				res += this.s(code_str);
			}
		}
		return res;
	}
	/**
	 * Translate to language
	 * @param BaseOpCode op_code - Abstract syntax tree
	 * @returns string - The result
	 */
	translateItem(op_code){
		if (op_code instanceof OpNope){
			return this.translateChilds(op_code.childs);
		}
		else if (op_code instanceof OpInterfaceDeclare){
			return this.OpInterfaceDeclare(op_code);
		}
		else if (op_code instanceof OpStructDeclare){
			return this.OpStructDeclare(op_code);
		}
		else if (op_code instanceof OpAdd){
			return this.OpAdd(op_code);
		}
		else if (op_code instanceof OpAnd){
			return this.OpAnd(op_code);
		}
		else if (op_code instanceof OpAssign){
			return this.OpAssign(op_code);
		}
		else if (op_code instanceof OpAssignDeclare){
			return this.OpAssignDeclare(op_code);
		}
		else if (op_code instanceof OpBitAnd){
			return this.OpBitAnd(op_code);
		}
		else if (op_code instanceof OpBitNot){
			return this.OpBitNot(op_code);
		}
		else if (op_code instanceof OpBitOr){
			return this.OpBitOr(op_code);
		}
		else if (op_code instanceof OpBitXor){
			return this.OpBitXor(op_code);
		}
		else if (op_code instanceof OpBreak){
			return this.OpBreak(op_code);
		}
		else if (op_code instanceof OpCall){
			return this.OpCall(op_code);
		}
		else if (op_code instanceof OpClassDeclare){
			return this.OpClassDeclare(op_code);
		}
		else if (op_code instanceof OpClassName){
			return this.OpClassName(op_code);
		}
		else if (op_code instanceof OpClone){
			return this.OpClone(op_code);
		}
		else if (op_code instanceof OpComment){
			return this.OpComment(op_code);
		}
		else if (op_code instanceof OpCompare){
			return this.OpCompare(op_code);
		}
		else if (op_code instanceof OpConcat){
			return this.OpConcat(op_code);
		}
		else if (op_code instanceof OpContinue){
			return this.OpContinue(op_code);
		}
		else if (op_code instanceof OpCopyStruct){
			return this.OpCopyStruct(op_code);
		}
		else if (op_code instanceof OpDelete){
			return this.OpDelete(op_code);
		}
		else if (op_code instanceof OpDiv){
			return this.OpDiv(op_code);
		}
		else if (op_code instanceof OpDynamic){
			return this.OpDynamic(op_code);
		}
		else if (op_code instanceof OpFlags){
			return this.OpFlags(op_code);
		}
		else if (op_code instanceof OpFor){
			return this.OpFor(op_code);
		}
		else if (op_code instanceof OpFunctionArrowDeclare){
			return this.OpFunctionArrowDeclare(op_code);
		}
		else if (op_code instanceof OpFunctionDeclare){
			return this.OpFunctionDeclare(op_code);
		}
		else if (op_code instanceof OpHexNumber){
			return this.OpHexNumber(op_code);
		}
		else if (op_code instanceof OpIdentifier){
			return this.OpIdentifier(op_code);
		}
		else if (op_code instanceof OpMap){
			return this.OpMap(op_code);
		}
		else if (op_code instanceof OpMethod){
			return this.OpMethod(op_code);
		}
		else if (op_code instanceof OpIf){
			return this.OpIf(op_code);
		}
		else if (op_code instanceof OpMod){
			return this.OpMod(op_code);
		}
		else if (op_code instanceof OpMult){
			return this.OpMult(op_code);
		}
		else if (op_code instanceof OpNamespace){
			return this.OpNamespace(op_code);
		}
		else if (op_code instanceof OpNew){
			return this.OpNew(op_code);
		}
		else if (op_code instanceof OpNope){
			return this.OpNope(op_code);
		}
		else if (op_code instanceof OpNot){
			return this.OpNot(op_code);
		}
		else if (op_code instanceof OpNumber){
			return this.OpNumber(op_code);
		}
		else if (op_code instanceof OpOr){
			return this.OpOr(op_code);
		}
		else if (op_code instanceof OpPipe){
			return this.OpPipe(op_code);
		}
		else if (op_code instanceof OpPostDec){
			return this.OpPostDec(op_code);
		}
		else if (op_code instanceof OpPostInc){
			return this.OpPostInc(op_code);
		}
		else if (op_code instanceof OpPow){
			return this.OpPow(op_code);
		}
		else if (op_code instanceof OpPreDec){
			return this.OpPreDec(op_code);
		}
		else if (op_code instanceof OpPreInc){
			return this.OpPreInc(op_code);
		}
		else if (op_code instanceof OpPreprocessorSwitch){
			return this.OpPreprocessorSwitch(op_code);
		}
		else if (op_code instanceof OpReturn){
			return this.OpReturn(op_code);
		}
		else if (op_code instanceof OpShiftLeft){
			return this.OpShiftLeft(op_code);
		}
		else if (op_code instanceof OpShiftRight){
			return this.OpShiftRight(op_code);
		}
		else if (op_code instanceof OpStatic){
			return this.OpStatic(op_code);
		}
		else if (op_code instanceof OpString){
			return this.OpString(op_code);
		}
		else if (op_code instanceof OpStringItem){
			return this.OpStringItem(op_code);
		}
		else if (op_code instanceof OpSub){
			return this.OpSub(op_code);
		}
		else if (op_code instanceof OpTemplateIdentifier){
			return this.OpTemplateIdentifier(op_code);
		}
		else if (op_code instanceof OpTernary){
			return this.OpTernary(op_code);
		}
		else if (op_code instanceof OpThrow){
			return this.OpThrow(op_code);
		}
		else if (op_code instanceof OpTryCatch){
			return this.OpTryCatch(op_code);
		}
		else if (op_code instanceof OpUse){
			return this.OpUse(op_code);
		}
		else if (op_code instanceof OpVector){
			return this.OpVector(op_code);
		}
		else if (op_code instanceof OpWhile){
			return this.OpWhile(op_code);
		}
		else if (op_code instanceof OpHtmlEscape){
			return this.OpHtmlEscape(op_code);
		}
		else if (op_code instanceof OpHtmlJson){
			return this.OpHtmlJson(op_code);
		}
		else if (op_code instanceof OpHtmlRaw){
			return this.OpHtmlRaw(op_code);
		}
		else if (op_code instanceof OpHtmlTag){
			return this.OpHtmlTag(op_code);
		}
		else if (op_code instanceof OpHtmlText){
			return this.OpHtmlText(op_code);
		}
		else if (op_code instanceof OpHtmlView){
			return this.OpHtmlView(op_code);
		}
		return "";
	}
	/**
	 * Translate to language
	 * @param BaseOpCode op_code - Abstract syntax tree
	 * @returns string - The result
	 */
	translateRun(op_code){
		this.op_code_stack.push(op_code);
		var res = this.translateItem(op_code);
		this.op_code_stack.pop();
		return res;
	}
	/**
	 * Reset translator to default settings
	 */
	resetTranslator(){
		this.one_lines = new Vector();
		this.is_operation = false;
		this.current_opcode_level = 0;
		this.max_opcode_level = 100;
		this.indent_level = 0;
		this.op_code_stack = new Vector();
	}
	/**
	 * Translate to language
	 * @param BaseOpCode op_code - Abstract syntax tree
	 * @returns string - The result
	 */
	translate(op_code){
		this.resetTranslator();
		return this.translateRun(op_code);
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.CommonTranslator";}
	static getCurrentClassName(){return "BayrellLang.CommonTranslator";}
	static getParentClassName(){return "Runtime.ContextObject";}
	_init(){
		super._init();
		this.op_code_stack = null;
		this.one_lines = null;
		this.is_operation = false;
		this.current_opcode_level = 0;
		this.max_opcode_level = 100;
		this.indent_level = 0;
		this.indent = "\t";
		this.space = " ";
		this.crlf = "\n";
	}
}
module.exports = CommonTranslator;