"use strict;"
/*!
 *  Bayrell Template Engine
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
var ParserToken = require('../Parser/ParserToken.js');
var ParserEOF = require('../Parser/Exceptions/ParserEOF.js');
var ParserExpected = require('../Parser/Exceptions/ParserExpected.js');
var EndOfStringExpected = require('../Exceptions/EndOfStringExpected.js');
class HtmlToken extends ParserToken{
	/**
	 * Returns new Instance
	 */
	createNewInstance(){
		return new HtmlToken(this.context(), this.parser);
	}
	/**
	 * Returns special tokens
	 */
	static getSpecialTokens(){
		return (new Vector()).push("...").push("@code{").push("@json{").push("@raw{").push("@{").push("<!--").push("-->").push("<!").push("</").push("/>").push("/*").push("*/");
	}
	/**
	 * Constructor
	 */
	constructor(context, parser){
		if (context == undefined) context=null;
		if (parser == undefined) parser=null;
		super(context, parser);
		this._special_tokens = HtmlToken.getSpecialTokens();
	}
	/**
	 * Return true if char is token char
	 * @param {char} ch
	 * @return {boolean}
	 */
	isTokenChar(ch){
		return rs.strpos("qazwsxedcrfvtgbyhnujmikolp0123456789_-", rs.strtolower(ch)) !== -1;
	}
	/**
	 * Read comments
	 */
	readComment(open_tag){
		var res = "";
		var ch = "";
		var look = "";
		this.moveString(open_tag);
		while (!this.isEOF()){
			ch = this.lookChar();
			look = this.lookString(2);
			if (look == "*/"){
				break;
			}
			res += ch;
			this.moveChar(ch);
		}
		if (look == "*/"){
			this.moveString(look);
		}
		else {
			throw new ParserEOF(this.context(), start_line, start_col);
		}
		return res;
	}
	/**
	 * Get next token without move cursor pos. Throws error if EOF.
	 * @param {BayrellLang.ParserToken} token
	 */
	readNextToken(){
		/* Init next token function */
		this.readNextTokenInit();
		this.skipSystemChar();
		this.initStartPos();
		/* Read comment */
		var look = this.lookString(2);
		if (look == "/*"){
			this.tp = HtmlToken.TOKEN_COMMENT;
			this.token = this.readComment(look);
			this.success = true;
			return ;
		}
		var pos = this.findVector(this._special_tokens);
		if (pos >= 0){
			this.tp = HtmlToken.TOKEN_BASE;
			this.token = this._special_tokens.item(pos);
			this.success = true;
			this.readString(rs.strlen(this.token));
			return ;
		}
		this.readNextTokenBase();
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.LangBay.HtmlToken";}
	static getCurrentNamespace(){return "BayrellLang.LangBay";}
	static getCurrentClassName(){return "BayrellLang.LangBay.HtmlToken";}
	static getParentClassName(){return "BayrellLang.Parser.ParserToken";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.TOKEN_NONE = "none";
		this.TOKEN_BASE = "base";
		this.TOKEN_HTML = "html";
		this.TOKEN_STRING = "string";
		this.TOKEN_COMMENT = "comment";
		this._special_tokens = null;
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
HtmlToken.TOKEN_NONE = "none";
HtmlToken.TOKEN_BASE = "base";
HtmlToken.TOKEN_HTML = "html";
HtmlToken.TOKEN_STRING = "string";
HtmlToken.TOKEN_COMMENT = "comment";
module.exports = HtmlToken;