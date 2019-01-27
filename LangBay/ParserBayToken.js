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
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var rs = require('bayrell-runtime-nodejs').rs;
var ParserToken = require('bayrell-parser-nodejs').ParserToken;
var ParserEOF = require('bayrell-parser-nodejs').Exceptions.ParserEOF;
var ParserExpected = require('bayrell-parser-nodejs').Exceptions.ParserExpected;
var EndOfStringExpected = require('../Exceptions/EndOfStringExpected.js');
class ParserBayToken extends ParserToken{
	/**
	 * Current content of the file
	 */
	/**
	 * Returns new Instance
	 */
	createNewInstance(){
		return new ParserBayToken(this.context(), this.parser);
	}
	/**
	 * Constructor
	 */
	constructor(context, parser){
		if (context == undefined) context=null;
		if (parser == undefined) parser=null;
		super(context, parser);
		this._special_tokens = (new Vector()).push("!==").push("===").push("!=").push("==").push("<=").push(">=").push("=>").push("::").push("++").push("--").push("+=").push("-=").push("~=").push("!=").push("**").push("<<").push(">>").push("#ifcode").push("#switch").push("#case").push("#endswitch").push("#endif");
	}
	/**
	 * Read next token as string
	 */
	readTokenString(){
		/*
		\[0-7]{1,3}	- последовательность символов, соответствующая регулярному выражению символа в восьмеричной системе счисления, который молча переполняется, чтобы поместиться в байт (т.е. "\400" === "\000")
		\x[0-9A-Fa-f]{1,2} - последовательность символов, соответствующая регулярному выражению символа в шестнадцатеричной системе счисления
		\u{[0-9A-Fa-f]+} - последовательность символов, соответствующая регулярному выражению символа Unicode, которая отображается в строка в представлении UTF-8 (добавлено в PHP 7.0.0)
		*/
		var arr1 = (new Vector()).push("n").push("r").push("t").push("\\").push("'").push("\"");
		var start_line = this.start_line;
		var start_col = this.start_col;
		var match_char = this.lookChar();
		this.moveChar(match_char);
		var res_str = "";
		var look = this.lookChar();
		while (look != match_char && !this.isEOF()){
			if (look == "\\"){
				this.moveChar(look);
				var look2 = this.lookChar();
				if (arr1.indexOf(look2) != -1){
					if (look2 == "n"){
						res_str += "\n";
					}
					else if (look2 == "r"){
						res_str += "\r";
					}
					else if (look2 == "t"){
						res_str += "\t";
					}
					else if (look2 == "\\"){
						res_str += "\\";
					}
					else if (look2 == "\""){
						res_str += "\"";
					}
					else if (look2 == "'"){
						res_str += "'";
					}
				}
				else {
					res_str += look2;
				}
				this.moveChar(look2);
			}
			else {
				res_str += look;
				this.moveChar(look);
			}
			look = this.lookChar();
		}
		if (this.lookChar() == match_char){
			this.moveChar(match_char);
		}
		else {
			throw new EndOfStringExpected(start_line, start_col, this.context());
		}
		return res_str;
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
	 * Skip comments
	 */
	skipComments(){
		var look = this.lookString(2);
		while (look == "/*" && !this.isEOF()){
			/* */
			this.readComment(look);
			this.skipSystemChar();
			look = this.lookString(2);
		}
	}
	/**
	 * Get next token without move cursor pos. Throws error if EOF.
	 * @param {BayrellParserToken} token
	 */
	readNextToken(){
		var look = "";
		/* Init next token function */
		this.readNextTokenInit();
		this.skipSystemChar();
		if (this.parser.skip_comments){
			this.skipComments();
		}
		this.initStartPos();
		/* Try to read special tokens */
		var pos = this.findVector(this._special_tokens);
		if (pos >= 0){
			this.tp = ParserBayToken.TOKEN_BASE;
			this.token = this._special_tokens.item(pos);
			this.success = true;
			this.readString(rs.strlen(this.token));
			return ;
		}
		look = this.lookChar();
		if (look == "'" || look == "\""){
			this.tp = ParserBayToken.TOKEN_STRING;
			this.token = this.readTokenString();
			this.success = true;
			return ;
		}
		look = this.lookString(2);
		if (look == "/*"){
			this.tp = ParserBayToken.TOKEN_COMMENT;
			this.token = this.readComment(look);
			this.success = true;
			return ;
		}
		this.readNextTokenBase();
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.LangBay.ParserBayToken";}
	static getParentClassName(){return "ParserToken";}
	_init(){
		super._init();
		this.TOKEN_NONE = "none";
		this.TOKEN_BASE = "base";
		this.TOKEN_STRING = "string";
		this.TOKEN_COMMENT = "comment";
		this._special_tokens = null;
		this.parser = null;
	}
}
ParserBayToken.TOKEN_NONE = "none";
ParserBayToken.TOKEN_BASE = "base";
ParserBayToken.TOKEN_STRING = "string";
ParserBayToken.TOKEN_COMMENT = "comment";
module.exports = ParserBayToken;