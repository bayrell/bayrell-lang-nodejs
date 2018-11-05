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
var rs = require('bayrell-runtime-nodejs').rs;
var CommonParser = require('../CommonParser.js');
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
var OpDelete = require('../OpCodes/OpDelete.js');
var OpDiv = require('../OpCodes/OpDiv.js');
var OpDynamic = require('../OpCodes/OpDynamic.js');
var OpFlags = require('../OpCodes/OpFlags.js');
var OpFor = require('../OpCodes/OpFor.js');
var OpFunctionArrowDeclare = require('../OpCodes/OpFunctionArrowDeclare.js');
var OpFunctionDeclare = require('../OpCodes/OpFunctionDeclare.js');
var OpHexNumber = require('../OpCodes/OpHexNumber.js');
var OpIdentifier = require('../OpCodes/OpIdentifier.js');
var OpIf = require('../OpCodes/OpIf.js');
var OpIfElse = require('../OpCodes/OpIfElse.js');
var OpInterfaceDeclare = require('../OpCodes/OpInterfaceDeclare.js');
var OpMap = require('../OpCodes/OpMap.js');
var OpMethod = require('../OpCodes/OpMethod.js');
var OpMod = require('../OpCodes/OpMod.js');
var OpMult = require('../OpCodes/OpMult.js');
var OpNamespace = require('../OpCodes/OpNamespace.js');
var OpNew = require('../OpCodes/OpNew.js');
var OpNope = require('../OpCodes/OpNope.js');
var OpNot = require('../OpCodes/OpNot.js');
var OpNumber = require('../OpCodes/OpNumber.js');
var OpOr = require('../OpCodes/OpOr.js');
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
var OpSub = require('../OpCodes/OpSub.js');
var OpTemplateIdentifier = require('../OpCodes/OpTemplateIdentifier.js');
var OpTernary = require('../OpCodes/OpTernary.js');
var OpThrow = require('../OpCodes/OpThrow.js');
var OpTryCatch = require('../OpCodes/OpTryCatch.js');
var OpTryCatchChilds = require('../OpCodes/OpTryCatchChilds.js');
var OpUse = require('../OpCodes/OpUse.js');
var OpVector = require('../OpCodes/OpVector.js');
var OpWhile = require('../OpCodes/OpWhile.js');
var ParserBayToken = require('./ParserBayToken.js');
var ParserBayNameToken = require('./ParserBayNameToken.js');
var HexNumberExpected = require('../Exceptions/HexNumberExpected.js');
var TwiceDeclareElseError = require('../Exceptions/TwiceDeclareElseError.js');
var ParserError = require('bayrell-parser-nodejs').Exceptions.ParserError;
class ParserBay extends CommonParser{
	getClassName(){return "BayrellLang.LangBay.ParserBay";}
	static getParentClassName(){return "CommonParser";}
	_init(){
		super._init();
		this.current_namespace = "";
		this.current_class_name = "";
		this.is_interface = false;
		this.modules = null;
	}
	/**
	 * Tokens Fabric
	 * @return BayrellParserToken
	 */
	createToken(){
		return new ParserBayToken(this.context(), this);
	}
	/**
	 * Get module name
	 */
	getModuleName(name){
		if (this.modules.has(name)){
			return this.modules.item(name);
		}
		return name;
	}
	/**
	 * Read double value and
	 * @return BaseOpCode
	 */
	readFixed(){
		var res = "";
		/* Try to read HEX Number */
		this.pushToken();
		try{
			res = this.matchHexNumber();
		}catch(_the_exception){
			if (_the_exception instanceof Error){
				var ex = _the_exception;
				if (ex instanceof HexNumberExpected){
					throw ex;
				}
				else if (ex instanceof ParserError){
					res = null;
				}
				else {
					throw ex;
				}
			}
			else { throw _the_exception; }
		}
		if (res != null){
			this.popToken();
			return new OpHexNumber(res);
		}
		else {
			this.popRollbackToken();
		}
		this.pushToken();
		try{
			res = this.matchDouble();
		}catch(_the_exception){
			if (_the_exception instanceof Error){
				var ex = _the_exception;
				if (ex instanceof ParserError){
					res = null;
				}
				else {
					throw ex;
				}
			}
			else { throw _the_exception; }
		}
		if (res != null){
			this.popToken();
			return new OpNumber(res);
		}
		else {
			this.popRollbackToken();
		}
		if (this.lookNextTokenType() == ParserBayToken.TOKEN_STRING){
			return new OpString(this.readAnyNextToken().token);
		}
		return null;
	}
	/**
	 * Read name
	 */
	readIdentifierName(){
		var res = this.lookNextToken();
		var s = rs.charAt(res, 0);
		if (!this.isLetterChar(s) && s != "_"){
			throw this.parserError(this.translate("ERROR_PARSER_FIRST_CHAR_MUST_BE_LETTER"));
		}
		this.readNextToken();
		return res;
	}
	/**
	 * Read name
	 */
	readDynamicName(){
		/* Create new token */
		var next_token = new ParserBayNameToken(this.context(), this);
		this.pushToken(next_token);
		/* Get name */
		var name = next_token.token;
		/* Assign next token */
		this.popRollbackToken();
		this.assignCurrentToken(next_token);
		return name;
	}
	/**
	 * Read Identifier
	 * @return OpIdentifier
	 */
	readIdentifier(){
		var res = this.readIdentifierName();
		return new OpIdentifier(res);
	}
	/**
	 * Read call args
	 * @return BaseOpCode
	 */
	readCallArgs(){
		var v = new Vector();
		var op_code = this.readExpression();
		v.push(op_code);
		while (this.findNextToken(",")){
			this.matchNextToken(",");
			op_code = this.readExpression();
			v.push(op_code);
		}
		return v;
	}
	/**
	 * Read call body
	 * @return BaseOpCode
	 */
	readCallBody(){
		var v = null;
		this.matchNextToken("(");
		if (!this.findNextToken(")")){
			v = this.readCallArgs();
		}
		this.matchNextToken(")");
		return v;
	}
	/**
	 * Read new or await function
	 */
	readGroupExpression(){
		if (this.findNextToken("(")){
			this.matchNextToken("(");
			var op_code = this.readExpression();
			this.matchNextToken(")");
			return op_code;
		}
		return this.readIdentifier();
	}
	/**
	 * Read new instance
	 * @return BaseOpCode
	 */
	readNewInstance(){
		this.matchNextToken("new");
		var ident = this.readTemplateIdentifier();
		var v = this.readCallBody();
		return new OpNew(ident, v);
	}
	/**
	 * Read call await
	 * @return BaseOpCode
	 */
	readCallAwait(){
		this.matchNextToken("await");
		var obj = this.readCallDynamic(true, true, true, false);
		var v = this.readCallBody();
		obj = new OpCall(obj, v);
		obj.is_await = true;
		return obj;
	}
	/**
	 * Read clone
	 * @return BaseOpCode
	 */
	readClone(){
		this.matchNextToken("clone");
		var value = this.readExpression();
		return new OpClone(value);
	}
	/**
	 * Read method
	 * @return BaseOpCode
	 */
	readMethod(){
		this.matchNextToken("method");
		var value = this.readCallDynamic(true, false, true, false);
		return new OpMethod(value);
	}
	/**
	 * Read get class name
	 */
	readClassName(){
		if (this.findNextToken("class")){
			this.matchNextToken("class");
			this.matchNextToken("of");
			var value = this.readIdentifierName();
			return new OpClassName(value);
		}
		if (this.findNextToken("classof")){
			this.matchNextToken("classof");
			var value = this.readIdentifierName();
			return new OpClassName(value);
		}
		return null;
	}
	/**
	 * Read call dynamic
	 * @return BaseOpCode
	 */
	readCallDynamic(allow_dynamic, allow_bracket, allow_static, allow_call){
		if (allow_dynamic == undefined) allow_dynamic=true;
		if (allow_bracket == undefined) allow_bracket=true;
		if (allow_static == undefined) allow_static=true;
		if (allow_call == undefined) allow_call=true;
		var name = "";
		var can_static = true;
		var obj = this.readGroupExpression();
		var ident = null;
		while (this.findNextToken(".") && allow_dynamic || this.findNextToken("[") && allow_bracket || this.findNextToken("::") && allow_static || this.findNextToken("(") && allow_call){
			if (this.findNextToken(".") && allow_dynamic){
				this.matchNextToken(".");
				name = this.readIdentifierName();
				obj = new OpDynamic(obj, name);
			}
			else if (this.findNextToken("[") && allow_bracket){
				this.matchNextToken("[");
				ident = this.readExpression();
				this.matchNextToken("]");
				obj = new OpStringItem(obj, ident);
			}
			else if (this.findNextToken("::") && allow_static){
				if (!can_static){
					throw this.parserError(this.translate("ERROR_PARSER_STATIC_METHOD_IS_NOT_ALOWED_HERE"));
				}
				this.matchNextToken("::");
				name = this.readIdentifierName();
				obj = new OpStatic(obj, name);
				can_static = false;
			}
			else if (this.findNextToken("(") && allow_call){
				var v = this.readCallBody();
				obj = new OpCall(obj, v);
				can_static = false;
			}
		}
		return obj;
	}
	/**
	 * Read type identifier
	 * @return BaseOpCode
	 */
	readTemplateIdentifier(){
		var op_code1 = this.readCallDynamic(true, false, false, false);
		if (!this.findNextToken("<")){
			return op_code1;
		}
		var v = new Vector();
		this.matchNextToken("<");
		while (true){
			var op_code2 = this.readCallDynamic(true, false, false, false);
			v.push(op_code2);
			if (this.findNextToken(",")){
				this.matchNextToken(",");
				continue;
			}
			break;
		}
		this.matchNextToken(">");
		return new OpTemplateIdentifier(op_code1, v);
	}
	/**
	 * Read element
	 * @return BaseOpCode
	 */
	readVector(){
		var res = new OpVector();
		this.matchNextToken("[");
		while (!this.findNextToken("]")){
			res.values.push(this.readExpression());
			if (this.findNextToken(",")){
				this.matchNextToken(",");
			}
		}
		this.matchNextToken("]");
		return res;
	}
	/**
	 * Read element
	 * @return BaseOpCode
	 */
	readMap(){
		var res = new OpMap();
		this.matchNextToken("{");
		while (!this.findNextToken("}")){
			if (this.lookNextTokenType() != ParserBayToken.TOKEN_STRING){
				throw this.parserExpected("string");
			}
			var key = this.readAnyNextToken().token;
			this.matchNextToken(":");
			var value = this.readExpression();
			res.values.set(key, value);
			if (this.findNextToken(",")){
				this.matchNextToken(",");
			}
		}
		this.matchNextToken("}");
		return res;
	}
	/**
	 * Read element
	 * @return BaseOpCode
	 */
	readExpressionElement(){
		if (this.findNextToken("new")){
			return this.readNewInstance();
		}
		else if (this.findNextToken("clone")){
			return this.readClone();
		}
		else if (this.findNextToken("class")){
			return this.readClassName();
		}
		else if (this.findNextToken("classof")){
			return this.readClassName();
		}
		else if (this.findNextToken("method")){
			return this.readMethod();
		}
		else if (this.findNextToken("[")){
			return this.readVector();
		}
		else if (this.findNextToken("{")){
			return this.readMap();
		}
		var op_code = this.readFixed();
		if (op_code != null){
			return op_code;
		}
		return this.readCallDynamic(true, true, true, true);
	}
	/**
	 * Read postfix
	 * @return BaseOpCode
	 */
	readExpressionPostfix(){
		var op_code = this.readExpressionElement();
		if (this.findNextToken("++")){
			this.matchNextToken("++");
			return new OpPostInc(op_code);
		}
		else if (this.findNextToken("--")){
			this.matchNextToken("--");
			return new OpPostDec(op_code);
		}
		return op_code;
	}
	/**
	 * Read prefix
	 * @return BaseOpCode
	 */
	readExpressionPrefix(){
		if (this.findNextToken("++")){
			this.matchNextToken("++");
			return new OpPreInc(this.readExpressionPostfix());
		}
		else if (this.findNextToken("--")){
			this.matchNextToken("--");
			return new OpPreDec(this.readExpressionPostfix());
		}
		return this.readExpressionPostfix();
	}
	/**
	 * Read bit NOT
	 * @return BaseOpCode
	 */
	readExpressionBitNot(){
		if (this.findNextToken("!")){
			this.matchNextToken("!");
			return new OpBitNot(this.readExpressionPrefix());
		}
		return this.readExpressionPrefix();
	}
	/**
	 * Read pow
	 * @return BaseOpCode
	 */
	readExpressionPow(){
		var op_code = this.readExpressionBitNot();
		while (this.findNextToken("**")){
			this.matchNextToken("**");
			op_code = new OpPow(op_code, this.readExpressionBitNot());
		}
		return op_code;
	}
	/**
	 * Read arithmetic multiply and divide
	 * @return BaseOpCode
	 */
	readExpressionFactor(){
		/* Read first opcode */
		var op_code = this.readExpressionPow();
		while (this.findNextToken("*") || this.findNextToken("/") || this.findNextToken("%")){
			if (this.findNextToken("*")){
				this.matchNextToken("*");
				op_code = new OpMult(op_code, this.readExpressionPow());
			}
			else if (this.findNextToken("/")){
				this.matchNextToken("/");
				op_code = new OpDiv(op_code, this.readExpressionPow());
			}
			else if (this.findNextToken("%")){
				this.matchNextToken("%");
				op_code = new OpMod(op_code, this.readExpressionPow());
			}
			else {
				throw this.nextTokenExpected("\"*\", \"/\" or \"%\"");
			}
		}
		return op_code;
	}
	/**
	 * Read arithmetic expression
	 * @return BaseOpCode
	 */
	readExpressionArithmetic(){
		/* Read first opcode */
		var op_code = this.readExpressionFactor();
		while (this.findNextToken("+") || this.findNextToken("-")){
			if (this.findNextToken("+")){
				this.matchNextToken("+");
				op_code = new OpAdd(op_code, this.readExpressionFactor());
			}
			else if (this.findNextToken("-")){
				this.matchNextToken("-");
				op_code = new OpSub(op_code, this.readExpressionFactor());
			}
			else {
				throw this.nextTokenExpected("\"+\" or \"-\"");
			}
		}
		return op_code;
	}
	/**
	 * Read shift
	 * @return BaseOpCode
	 */
	readExpressionShift(){
		/* Read first opcode */
		var op_code = this.readExpressionArithmetic();
		while (this.findNextToken("<<") || this.findNextToken(">>")){
			if (this.findNextToken("<<")){
				this.matchNextToken("<<");
				op_code = new OpShiftLeft(op_code, this.readExpressionArithmetic());
			}
			else if (this.findNextToken(">>")){
				this.matchNextToken(">>");
				op_code = new OpShiftRight(op_code, this.readExpressionArithmetic());
			}
			else {
				throw this.nextTokenExpected("\"<<\" or \">>\"");
			}
		}
		return op_code;
	}
	/**
	 * Read concat string
	 * @return BaseOpCode
	 */
	readExpressionConcat(){
		/* Read first opcode */
		var op_code = this.readExpressionShift();
		while (this.findNextToken("~")){
			this.matchNextToken("~");
			op_code = new OpConcat(op_code, this.readExpressionShift());
		}
		return op_code;
	}
	/**
	 * Read compare
	 * @return BaseOpCode
	 */
	readExpressionCompare1(){
		/* Read first opcode */
		var op_code = this.readExpressionConcat();
		while (this.findNextToken("<") || this.findNextToken("<=") || this.findNextToken(">") || this.findNextToken(">=") || this.findNextToken("in") || this.findNextToken("instanceof") || this.findNextToken("implements")){
			var cond = this.readNextToken().token;
			op_code = new OpCompare(cond, op_code, this.readExpressionConcat());
		}
		return op_code;
	}
	/**
	 * Read compare
	 * @return BaseOpCode
	 */
	readExpressionCompare2(){
		/* Read first opcode */
		var op_code = this.readExpressionCompare1();
		while (this.findNextToken("==") || this.findNextToken("===") || this.findNextToken("!=") || this.findNextToken("!==")){
			var cond = this.readNextToken().token;
			op_code = new OpCompare(cond, op_code, this.readExpressionCompare1());
		}
		return op_code;
	}
	/**
	 * Read bit AND
	 * @return BaseOpCode
	 */
	readExpressionBitAnd(){
		/* Read first opcode */
		var op_code = this.readExpressionCompare2();
		while (this.findNextToken("&")){
			this.matchNextToken("&");
			op_code = new OpBitAnd(op_code, this.readExpressionCompare2());
		}
		return op_code;
	}
	/**
	 * Read bit XOR
	 * @return BaseOpCode
	 */
	readExpressionBitXor(){
		/* Read first opcode */
		var op_code = this.readExpressionBitAnd();
		while (this.findNextToken("^")){
			this.matchNextToken("^");
			op_code = new OpBitXor(op_code, this.readExpressionBitAnd());
		}
		return op_code;
	}
	/**
	 * Read bit OR
	 * @return BaseOpCode
	 */
	readExpressionBitOr(){
		/* Read first opcode */
		var op_code = this.readExpressionBitXor();
		while (this.findNextToken("|")){
			this.matchNextToken("|");
			op_code = new OpBitOr(op_code, this.readExpressionBitXor());
		}
		return op_code;
	}
	/**
	 * Read NOT
	 * @return BaseOpCode
	 */
	readExpressionNot(){
		if (this.findNextToken("not")){
			this.matchNextToken("not");
			return new OpNot(this.readExpressionBitOr());
		}
		return this.readExpressionBitOr();
	}
	/**
	 * Read AND
	 * @return BaseOpCode
	 */
	readExpressionAnd(){
		/* Read first opcode */
		var op_code = this.readExpressionNot();
		while (this.findNextToken("and")){
			this.matchNextToken("and");
			op_code = new OpAnd(op_code, this.readExpressionNot());
		}
		return op_code;
	}
	/**
	 * Read OR
	 * @return BaseOpCode
	 */
	readExpressionOr(){
		/* Read first opcode */
		var op_code = this.readExpressionAnd();
		while (this.findNextToken("or")){
			this.matchNextToken("or");
			op_code = new OpOr(op_code, this.readExpressionAnd());
		}
		return op_code;
	}
	/**
	 * Read ternary operator
	 * @return BaseOpCode
	 */
	readExpressionTernary(){
		/* Read first opcode */
		var op_code = this.readExpressionOr();
		if (this.findNextToken("?")){
			this.matchNextToken("?");
			var if_true = this.readExpressionOr();
			this.matchNextToken(":");
			var if_false = this.readExpressionOr();
			return new OpTernary(op_code, if_true, if_false);
		}
		return op_code;
	}
	/**
	 * Read expression
	 * @return BaseOpCode
	 */
	readExpression(){
		this.pushToken();
		var res = null;
		res = this.readDeclareArrowFunction(false);
		if (res != null){
			this.popToken();
			return res;
		}
		this.popRollbackToken();
		var old_skip_comments = this.skip_comments;
		this.skip_comments = true;
		res = this.readExpressionTernary();
		this.skip_comments = old_skip_comments;
		return res;
	}
	/**
	 * Read operator assign
	 * @return BaseOpCode
	 */
	readOperatorAssign(){
		var op_type = null;
		var op_ident = null;
		var op_ident_name = "";
		var op_exp = null;
		var success = false;
		var v = (new Vector()).push("=").push("~=").push("+=").push("-=");
		/* Read assign */
		success = false;
		this.pushToken();
		try{
			op_ident = this.readCallDynamic(true, true, true, false);
			if (this.findNextTokenVector(v) != -1){
				success = true;
			}
		}catch(_the_exception){
			if (_the_exception instanceof Error){
				var ex = _the_exception;
				if (ex instanceof ParserError){
					success = false;
				}
				else {
					throw ex;
				}
			}
			else { throw _the_exception; }
		}
		if (success){
			this.popToken();
			var pos = this.findNextTokenVector(v);
			var op_name = v.item(pos);
			this.matchNextToken(op_name);
			if (this.findNextToken("await")){
				op_exp = this.readCallAwait();
			}
			else {
				op_exp = this.readExpression();
			}
			return new OpAssign(op_ident, op_exp, op_name);
		}
		this.popRollbackToken();
		/* Read declare */
		this.pushToken();
		try{
			op_type = this.readTemplateIdentifier();
			op_ident_name = this.readIdentifierName();
			success = true;
		}catch(_the_exception){
			if (_the_exception instanceof Error){
				var ex = _the_exception;
				if (ex instanceof ParserError){
					success = false;
				}
				else {
					throw ex;
				}
			}
			else { throw _the_exception; }
		}
		if (success){
			this.popToken();
			if (this.findNextToken("=")){
				this.matchNextToken("=");
				if (this.findNextToken("await")){
					op_exp = this.readCallAwait();
				}
				else {
					op_exp = this.readExpression();
				}
			}
			return new OpAssignDeclare(op_type, op_ident_name, op_exp);
		}
		this.popRollbackToken();
		return null;
	}
	/**
	 * Read operator if
	 * @return BaseOpCode
	 */
	readOperatorIf(){
		var old_skip_comments = this.skip_comments;
		this.skip_comments = true;
		var condition = null;
		var if_true = null;
		var if_false = null;
		var if_else = new Vector();
		/* Read condition */
		this.matchNextToken("if");
		this.matchNextToken("(");
		condition = this.readExpression();
		this.matchNextToken(")");
		/* Read if true operators block */
		if (this.lookNextToken() == "{"){
			this.matchNextToken("{");
			if_true = this.readOperatorsBlock();
			this.matchNextToken("}");
		}
		else {
			if_true = new Vector();
			if_true.push(this.readOperator());
		}
		while (this.findNextToken("elseif") || this.findNextToken("else")){
			if (this.findNextToken("else")){
				this.matchNextToken("else");
				if (this.findNextToken("if")){
					var op_if_else = new OpIfElse();
					this.matchNextToken("if");
					this.matchNextToken("(");
					op_if_else.condition = this.readExpression();
					this.matchNextToken(")");
					if (this.lookNextToken() == "{"){
						this.matchNextToken("{");
						op_if_else.if_true = this.readOperatorsBlock();
						this.matchNextToken("}");
					}
					else {
						op_if_else.if_true = new Vector();
						op_if_else.if_true.push(this.readOperator());
					}
					if_else.push(op_if_else);
				}
				else {
					if (this.lookNextToken() == "{"){
						this.matchNextToken("{");
						if_false = this.readOperatorsBlock();
						this.matchNextToken("}");
					}
					else {
						if_false = new Vector();
						if_false.push(this.readOperator());
					}
					break;
				}
			}
			else if (this.findNextToken("elseif")){
				var op_if_else = new OpIfElse();
				this.matchNextToken("elseif");
				this.matchNextToken("(");
				op_if_else.condition = this.readExpression();
				this.matchNextToken(")");
				if (this.lookNextToken() == "{"){
					this.matchNextToken("{");
					op_if_else.if_true = this.readOperatorsBlock();
					this.matchNextToken("}");
					if_else.push(op_if_else);
				}
				else {
					op_if_else.if_true = new Vector();
					op_if_else.if_true.push(this.readOperator());
				}
			}
		}
		this.skip_comments = old_skip_comments;
		return new OpIf(condition, if_true, if_false, if_else);
	}
	/**
	 * Read operator while
	 * @return BaseOpCode
	 */
	readOperatorWhile(){
		var condition = null;
		var childs = null;
		/* Read condition */
		this.matchNextToken("while");
		this.matchNextToken("(");
		condition = this.readExpression();
		this.matchNextToken(")");
		/* Read operators block */
		this.matchNextToken("{");
		childs = this.readOperatorsBlock();
		this.matchNextToken("}");
		return new OpWhile(condition, childs);
	}
	/**
	 * Read operator for
	 * @return BaseOpCode
	 */
	readOperatorFor(){
		var loop_condition = null;
		var loop_init = null;
		var loop_inc = null;
		var childs = null;
		/* Read loop header */
		this.matchNextToken("for");
		this.matchNextToken("(");
		loop_init = this.readOperatorAssign();
		this.matchNextToken(";");
		loop_condition = this.readExpression();
		this.matchNextToken(";");
		loop_inc = this.readExpression();
		this.matchNextToken(")");
		/* Read operators block */
		this.matchNextToken("{");
		childs = this.readOperatorsBlock();
		this.matchNextToken("}");
		return new OpFor(loop_condition, loop_init, loop_inc, childs);
	}
	/**
	 * Read operator try
	 * @return BaseOpCode
	 */
	readOperatorTry(){
		var op_try = null;
		var op_catch = new Vector();
		/* Read try block */
		this.matchNextToken("try");
		this.matchNextToken("{");
		op_try = this.readOperatorsBlock();
		this.matchNextToken("}");
		/* Read catch */
		while (this.findNextToken("catch")){
			var try_catch_child = new OpTryCatchChilds();
			this.matchNextToken("catch");
			this.matchNextToken("(");
			try_catch_child.op_type = this.readTemplateIdentifier();
			try_catch_child.op_ident = this.readIdentifier();
			this.matchNextToken(")");
			this.matchNextToken("{");
			try_catch_child.childs = this.readOperatorsBlock();
			this.matchNextToken("}");
			op_catch.push(try_catch_child);
		}
		return new OpTryCatch(op_try, op_catch);
	}
	/**
	 * Read operator return
	 * @return BaseOpCode
	 */
	readOperatorReturn(){
		this.matchNextToken("return");
		var value = null;
		if (!this.findNextToken(";")){
			value = this.readExpression();
		}
		this.matchNextToken(";");
		return new OpReturn(value);
	}
	/**
	 * Read operator throw
	 * @return BaseOpCode
	 */
	readOperatorThrow(){
		this.matchNextToken("throw");
		var value = this.readExpression();
		this.matchNextToken(";");
		return new OpThrow(value);
	}
	/**
	 * Read operator delete
	 * @return BaseOpCode
	 */
	readOperatorDelete(){
		this.matchNextToken("delete");
		var value = this.readCallDynamic(true, true, false, false);
		this.matchNextToken(";");
		return new OpDelete(value);
	}
	/**
	 * Read postfix
	 * @return BaseOpCode
	 */
	readOperatorPostfix(){
		this.pushToken();
		try{
			var op_code = this.readExpressionElement();
		}catch(_the_exception){
			if (_the_exception instanceof ParserError){
				var ex = _the_exception;
				this.popRollbackToken();
				return null;
			}
			else { throw _the_exception; }
		}
		if (this.findNextToken("++")){
			this.matchNextToken("++");
			this.popToken();
			return new OpPostInc(op_code);
		}
		else if (this.findNextToken("--")){
			this.matchNextToken("--");
			this.popToken();
			return new OpPostDec(op_code);
		}
		this.popRollbackToken();
		return null;
	}
	/**
	 * Read prefix
	 * @return BaseOpCode
	 */
	readOperatorPrefix(){
		if (this.findNextToken("++")){
			this.matchNextToken("++");
			return new OpPreInc(this.readExpressionPostfix());
		}
		else if (this.findNextToken("--")){
			this.matchNextToken("--");
			return new OpPreDec(this.readExpressionPostfix());
		}
		return null;
	}
	/**
	 * Read operator 
	 * @return BaseOpCode
	 */
	readOperator(){
		var res = null;
		if (this.findNextToken(";")){
			this.matchNextToken(";");
			return null;
		}
		else if (this.lookNextTokenType() == ParserBayToken.TOKEN_COMMENT){
			return new OpComment(this.readAnyNextToken().token);
		}
		else if (this.findNextToken("await")){
			res = this.readCallAwait();
			this.matchNextToken(";");
			return res;
		}
		else if (this.findNextToken("if")){
			return this.readOperatorIf();
		}
		else if (this.findNextToken("while")){
			return this.readOperatorWhile();
		}
		else if (this.findNextToken("for")){
			return this.readOperatorFor();
		}
		else if (this.findNextToken("try")){
			return this.readOperatorTry();
		}
		else if (this.findNextToken("return")){
			return this.readOperatorReturn();
		}
		else if (this.findNextToken("throw")){
			return this.readOperatorThrow();
		}
		else if (this.findNextToken("delete")){
			return this.readOperatorDelete();
		}
		else if (this.findNextToken("break")){
			this.matchNextToken("break");
			this.matchNextToken(";");
			return new OpBreak();
		}
		else if (this.findNextToken("continue")){
			this.matchNextToken("continue");
			this.matchNextToken(";");
			return new OpContinue();
		}
		else if (this.findNextTokenPreprocessor()){
			return this.readPreprocessor();
		}
		res = this.readOperatorAssign();
		if (res){
			this.matchNextToken(";");
			return res;
		}
		res = this.readOperatorPrefix();
		if (res){
			this.matchNextToken(";");
			return res;
		}
		res = this.readOperatorPostfix();
		if (res){
			this.matchNextToken(";");
			return res;
		}
		res = this.readExpressionElement();
		this.matchNextToken(";");
		return res;
		/*return this.readCallDynamic(true, true, true, true);*/
	}
	/**
	 * Read operator block
	 * @return BaseOpCode
	 */
	readOperatorsBlock(){
		var res = new Vector();
		var match_bracket = false;
		if (this.findNextToken("{")){
			this.matchNextToken("{");
			match_bracket = true;
		}
		var op_code = null;
		while (!this.findNextToken("}") && !this.isEOF()){
			op_code = this.readOperator();
			if (op_code != null){
				res.push(op_code);
			}
		}
		if (match_bracket){
			this.matchNextToken("}");
		}
		return res;
	}
	/**
	 * Read operator namespace
	 * @return BaseOpCode
	 */
	readOperatorNamespace(){
		this.matchNextToken("namespace");
		var name = this.readDynamicName();
		this.current_namespace = name;
		this.matchNextToken(";");
		return new OpNamespace(name);
	}
	/**
	 * Read operator namespace
	 * @return BaseOpCode
	 */
	readOperatorUse(){
		this.matchNextToken("use");
		var name = this.readDynamicName();
		var alias_name = "";
		if (this.findNextToken("as")){
			this.matchNextToken("as");
			alias_name = this.readIdentifierName();
		}
		this.matchNextToken(";");
		if (alias_name != ""){
			this.modules.set(alias_name, name);
		}
		else {
			var arr = rs.explode(".", name);
			var last_name = arr.pop();
			this.modules.set(last_name, name);
		}
		return new OpUse(name, alias_name);
	}
	/**
	 * Read flags
	 * @return OpFlags
	 */
	readFlags(){
		var flags = null;
		var flags_vector = OpFlags.getFlags();
		if (this.findNextTokenVector(flags_vector) != -1){
			flags = new OpFlags();
			while (this.findNextTokenVector(flags_vector) != -1){
				if (!flags.assignFlag(this.lookNextToken())){
					throw this.parserError("Unknown flag '"+rtl.toString(this.lookNextToken())+"'");
				}
				this.readNextToken();
			}
		}
		if (flags_vector != null){
		}
		return flags;
	}
	/**
	 * Read declare class arguments
	 * @return BaseOpCode
	 */
	readFunctionsArguments(){
		var args = new Vector();
		this.matchNextToken("(");
		while (!this.findNextToken(")") && !this.isEOF()){
			var op_code = this.readOperatorAssign();
			if (op_code instanceof OpAssign){
				throw this.parserError("Assign are not alowed here");
			}
			else if (op_code instanceof OpAssignDeclare){
				args.push(op_code);
			}
			if (this.findNextToken(",")){
				this.matchNextToken(",");
				continue;
			}
			break;
		}
		this.matchNextToken(")");
		return args;
	}
	/**
	 * Read declare class arrow function
	 * @return BaseOpCode
	 */
	readDeclareArrowFunction(read_name, is_declare_function){
		if (read_name == undefined) read_name=true;
		if (is_declare_function == undefined) is_declare_function=false;
		var op_code = null;
		/* Read arrow function */
		if (this.findNextToken("func")){
			this.matchNextToken("func");
			op_code = new OpFunctionArrowDeclare();
			if (read_name){
				op_code.name = this.readIdentifierName();
			}
			op_code.args = this.readFunctionsArguments();
			this.matchNextToken("=>");
			op_code.return_function = this.readDeclareFunction(false, false);
			return op_code;
		}
		op_code = this.readDeclareFunction(read_name, is_declare_function);
		return op_code;
	}
	/**
	 * Read declare class function
	 * @return BaseOpCode
	 */
	readDeclareFunction(read_name, is_declare_function){
		if (read_name == undefined) read_name=true;
		if (is_declare_function == undefined) is_declare_function=false;
		var res = new OpFunctionDeclare();
		this.pushToken();
		try{
			res.result_type = this.readTemplateIdentifier();
		}catch(_the_exception){
			if (_the_exception instanceof ParserError){
				var ex = _the_exception;
				this.popRollbackToken();
				return null;
			}
			else { throw _the_exception; }
		}
		if (read_name){
			res.name = this.readIdentifierName();
		}
		if (this.lookNextToken() != "("){
			this.popRollbackToken();
			return null;
		}
		try{
			res.args = this.readFunctionsArguments();
		}catch(_the_exception){
			if (_the_exception instanceof ParserError){
				var ex = _the_exception;
				this.popRollbackToken();
				return null;
			}
			else { throw _the_exception; }
		}
		/* Read use variables*/
		if (this.lookNextToken() == "use"){
			this.matchNextToken("use");
			this.matchNextToken("(");
			while (this.lookNextToken() != ")" && !this.isEOF()){
				var name = this.readIdentifierName();
				res.use_variables.push(name);
				if (this.lookNextToken() == ","){
					this.matchNextToken(",");
				}
				else {
					break;
				}
			}
			this.matchNextToken(")");
		}
		if (is_declare_function){
			this.matchNextToken(";");
		}
		else {
			if (this.lookNextToken() != "{"){
				this.popRollbackToken();
				return null;
			}
			this.matchNextToken("{");
			res.childs = this.readOperatorsBlock();
			this.matchNextToken("}");
		}
		this.popToken();
		return res;
	}
	/**
	 * Read class body
	 */
	readClassBody(res){
		if (this.findNextToken(";")){
			this.matchNextToken(";");
			return ;
		}
		var flags = null;
		var op_code = null;
		if (this.findNextTokenPreprocessor()){
			op_code = this.readPreprocessor();
			res.childs.push(op_code);
			return ;
		}
		else if (this.lookNextTokenType() == ParserBayToken.TOKEN_COMMENT){
			op_code = new OpComment(this.readAnyNextToken().token);
			res.childs.push(op_code);
			return ;
		}
		flags = this.readFlags();
		this.readClassBodyContent(res, flags);
	}
	/**
	 * Read class body content
	 */
	readClassBodyContent(res, flags){
		var op_code = null;
		var is_declare_function = false;
		if (flags != null && flags.p_declare || this.is_interface){
			is_declare_function = true;
		}
		op_code = this.readDeclareArrowFunction(true, is_declare_function);
		if (op_code){
			op_code.flags = flags;
			res.childs.push(op_code);
			return ;
		}
		op_code = this.readOperatorAssign();
		if (op_code instanceof OpAssign){
			throw this.parserError("Assign are not alowed here");
		}
		else if (op_code instanceof OpAssignDeclare){
			op_code.flags = flags;
			res.class_variables.push(op_code);
			this.matchNextToken(";");
			return ;
		}
		throw this.parserError("Unknown operator");
	}
	/**
	 * Read class header
	 * @return BaseOpCode
	 */
	readClassHead(res){
		res.class_name = this.readIdentifierName();
		this.current_class_name = res.class_name;
		if (this.findNextToken("<")){
			this.matchNextToken("<");
			while (true){
				var op_code2 = this.readCallDynamic(true, false, false, false);
				res.class_template.push(op_code2);
				if (this.findNextToken(",")){
					this.matchNextToken(",");
					continue;
				}
				break;
			}
			this.matchNextToken(">");
		}
		if (this.findNextToken("extends")){
			this.matchNextToken("extends");
			res.class_extends = this.readIdentifier();
			if (this.findNextToken("<")){
				this.matchNextToken("<");
				while (true){
					this.readCallDynamic(true, false, false, false);
					if (this.findNextToken(",")){
						this.matchNextToken(",");
						continue;
					}
					break;
				}
				this.matchNextToken(">");
			}
		}
		if (this.findNextToken("implements")){
			this.matchNextToken("implements");
			while (!this.findNextToken("{") && !this.isEOF()){
				res.class_implements.push(this.readDynamicName());
				if (this.findNextToken(",")){
					this.matchNextToken(",");
					continue;
				}
				break;
			}
		}
		this.matchNextToken("{");
		while (!this.findNextToken("}") && !this.isEOF()){
			this.readClassBody(res);
		}
		this.matchNextToken("}");
	}
	/**
	 * Read operator namespace
	 * @return BaseOpCode
	 */
	readDeclareClass(class_flags){
		var res = new OpClassDeclare();
		this.matchNextToken("class");
		this.readClassHead(res);
		res.flags = class_flags;
		return res;
	}
	/**
	 * Read operator namespace
	 * @return BaseOpCode
	 */
	readDeclareInterface(class_flags){
		var res = new OpInterfaceDeclare();
		this.matchNextToken("interface");
		this.is_interface = true;
		this.readClassHead(res);
		this.is_interface = false;
		res.flags = class_flags;
		return res;
	}
	/**
	 * Prepocessor
	 */
	findNextTokenPreprocessor(){
		var token = this.lookNextToken();
		if (this.lookNextTokenType() == ParserBayToken.TOKEN_BASE && (token == "#switch" || token == "#ifcode")){
			return true;
		}
		return false;
	}
	/**
	 * Read prepocessors block
	 */
	readPreprocessor(){
		if (this.findNextToken("#switch")){
			var childs = new Vector();
			var comment;
			var pos;
			this.matchNextToken("#switch");
			var v = (new Vector()).push("#case").push("#endswitch");
			while (this.findNextToken("#case")){
				this.matchNextToken("#case");
				this.matchNextToken("ifcode");
				var op_case = new OpPreprocessorCase();
				op_case.condition = this.readExpression();
				if (!this.findNextToken("then")){
					throw this.nextTokenExpected("then");
				}
				op_case.value = rs.trim(this.next_token.readUntilVector(v));
				childs.push(op_case);
				this.readAnyNextToken();
				pos = this.findNextTokenVector(v);
				if (pos == -1){
					throw this.parserError("Unknown preprocessor token "+rtl.toString(this.lookNextToken()));
				}
			}
			this.matchNextToken("#endswitch");
			return new OpPreprocessorSwitch(childs);
		}
		else if (this.findNextToken("#ifcode")){
			this.matchNextToken("#endifcode");
		}
		else {
			throw this.parserError("Unknown preprocessor token "+rtl.toString(this.lookNextToken()));
		}
	}
	/**
	 * Read program
	 * @return BaseOpCode
	 */
	readProgram(){
		var op_code = null;
		var res = new Vector();
		while (!this.isEOF()){
			if (this.lookNextTokenType() == ParserBayToken.TOKEN_COMMENT){
				res.push(new OpComment(this.readAnyNextToken().token));
				continue;
			}
			else if (this.findNextToken("namespace")){
				res.push(this.readOperatorNamespace());
				continue;
			}
			else if (this.findNextToken("use")){
				res.push(this.readOperatorUse());
				continue;
			}
			else if (this.findNextTokenPreprocessor()){
				res.push(this.readPreprocessor());
				continue;
			}
			var flags = this.readFlags();
			if (this.findNextToken("class")){
				res.push(this.readDeclareClass(flags));
			}
			else if (this.findNextToken("interface")){
				res.push(this.readDeclareInterface(flags));
			}
			else {
				throw this.parserError("Unknown token "+rtl.toString(this.lookNextToken()));
			}
		}
		return res;
	}
	/**
	 * Reset parser to default settings
	 */
	resetParser(){
		super.resetParser();
		this.modules = new Map();
	}
	/**
	 * Parser function
	 */
	runParser(){
		this._result = new OpNope(this.readProgram());
	}
}
module.exports = ParserBay;