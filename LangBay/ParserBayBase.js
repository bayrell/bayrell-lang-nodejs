"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2020 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangBay == 'undefined') Bayrell.Lang.LangBay = {};
Bayrell.Lang.LangBay.ParserBayBase = function(ctx)
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayBase.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.LangBay.ParserBayBase"))
		{
		}
	},
	assignValue: function(ctx,k,v)
	{
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.LangBay.ParserBayBase";
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayBase,
{
	/**
	 * Return true if is char
	 * @param char ch
	 * @return boolean
	 */
	isChar: function(ctx, ch)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isChar", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var __v0 = use("Runtime.rs");
		var __v1 = use("Runtime.rs");
		var __memorize_value = __v0.strpos(ctx, "qazwsxedcrfvtgbyhnujmikolp", __v1.strtolower(ctx, ch)) !== -1;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if is number
	 * @param char ch
	 * @return boolean
	 */
	isNumber: function(ctx, ch)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isNumber", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var __v0 = use("Runtime.rs");
		var __memorize_value = __v0.strpos(ctx, "0123456789", ch) !== -1;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isNumber", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if char is number
	 * @param char ch
	 * @return boolean
	 */
	isHexChar: function(ctx, ch)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isHexChar", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var __v0 = use("Runtime.rs");
		var __v1 = use("Runtime.rs");
		var __memorize_value = __v0.strpos(ctx, "0123456789abcdef", __v1.strtolower(ctx, ch)) !== -1;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isHexChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if is string of numbers
	 * @param string s
	 * @return boolean
	 */
	isStringOfNumbers: function(ctx, s)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isStringOfNumbers", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var __v0 = use("Runtime.rs");
		var sz = __v0.strlen(ctx, s);
		for (var i = 0;i < sz;i++)
		{
			var __v0 = use("Runtime.rs");
			if (!this.isNumber(ctx, __v0.charAt(ctx, s, i)))
			{
				var __memorize_value = false;
				use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isStringOfNumbers", arguments, __memorize_value);
				return __memorize_value;
			}
		}
		var __memorize_value = true;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isStringOfNumbers", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Is system type
	 */
	isSystemType: function(ctx, name)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		if (name == "var")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "void")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "bool")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "byte")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "int")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "double")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "float")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "char")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "string")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "list")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "scalar")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "primitive")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "html")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Error")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Object")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "DateTime")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Collection")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Dict")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Vector")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Map")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "rs")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "rtl")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "ArrayInterface")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = false;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns true if name is identifier
	 */
	isIdentifier: function(ctx, name)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		if (name == "")
		{
			var __memorize_value = false;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "@")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;
		}
		var __v0 = use("Runtime.rs");
		if (this.isNumber(ctx, __v0.charAt(ctx, name, 0)))
		{
			var __memorize_value = false;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;
		}
		var __v0 = use("Runtime.rs");
		var sz = __v0.strlen(ctx, name);
		for (var i = 0;i < sz;i++)
		{
			var __v0 = use("Runtime.rs");
			var ch = __v0.charAt(ctx, name, i);
			if (this.isChar(ctx, ch) || this.isNumber(ctx, ch) || ch == "_")
			{
				continue;
			}
			var __memorize_value = false;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = true;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns true if reserved words
	 */
	isReserved: function(ctx, name)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isReserved", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		if (name == "__async_t")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isReserved", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "__async_var")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isReserved", arguments, __memorize_value);
			return __memorize_value;
		}
		/*if (name == "__ctx") return true;*/
		/*if (name == "ctx") return true;*/
		var __v0 = use("Runtime.rs");
		if (__v0.substr(ctx, name, 0, 3) == "__v")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isReserved", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = false;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isReserved", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns kind of identifier or thrown Error
	 */
	findIdentifier: function(ctx, parser, name, caret)
	{
		var kind = "";
		if (parser.vars.has(ctx, name))
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v0.KIND_VARIABLE;
		}
		else if (parser.uses.has(ctx, name))
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v0.KIND_MODULE;
		}
		else if (this.isSystemType(ctx, name))
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v0.KIND_SYS_TYPE;
		}
		else if (name == "log")
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v0.KIND_SYS_FUNCTION;
		}
		else if (name == "null" || name == "true" || name == "false")
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v0.KIND_CONSTANT;
		}
		else if (name == "fn")
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v0.KIND_FUNCTION;
		}
		else if (name == "@" || name == "_")
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v0.KIND_CONTEXT;
		}
		else if (name == "static" || name == "self" || name == "this" || name == "parent")
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v0.KIND_CLASSREF;
		}
		else if (parser.find_ident)
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserError");
			throw new __v0(ctx, "Unknown identifier '" + use("Runtime.rtl").toStr(name) + use("Runtime.rtl").toStr("'"), caret, parser.file_name)
		}
		return kind;
	},
	/**
	 * Return true if char is token char
	 * @param {char} ch
	 * @return {boolean}
	 */
	isTokenChar: function(ctx, ch)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isTokenChar", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var __v0 = use("Runtime.rs");
		var __v1 = use("Runtime.rs");
		var __memorize_value = __v0.strpos(ctx, "qazwsxedcrfvtgbyhnujmikolp0123456789_", __v1.strtolower(ctx, ch)) !== -1;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isTokenChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if char is system or space. ASCII code <= 32.
	 * @param char ch
	 * @return boolean
	 */
	isSkipChar: function(ctx, ch)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isSkipChar", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var __v0 = use("Runtime.rs");
		if (__v0.ord(ctx, ch) <= 32)
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSkipChar", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = false;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSkipChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns next X
	 */
	nextX: function(ctx, parser, ch, pos)
	{
		if (ch == "\t")
		{
			return pos + parser.tab_size;
		}
		if (ch == "\n")
		{
			return 0;
		}
		return pos + 1;
	},
	/**
	 * Returns next Y
	 */
	nextY: function(ctx, parser, ch, pos)
	{
		if (ch == "\n")
		{
			return pos + 1;
		}
		return pos;
	},
	/**
	 * Returns next X
	 */
	next: function(ctx, parser, s, x, y, pos)
	{
		var __v0 = use("Runtime.rs");
		var sz = __v0.strlen(ctx, s);
		for (var i = 0;i < sz;i++)
		{
			var __v0 = use("Runtime.rs");
			var ch = __v0.substr(ctx, s, i, 1);
			x = this.nextX(ctx, parser, ch, x);
			y = this.nextY(ctx, parser, ch, y);
			pos = pos + 1;
		}
		return use("Runtime.Collection").from([x,y,pos]);
	},
	/**
	 * Open comment
	 */
	isCommentOpen: function(ctx, str, skip_comments)
	{
		return skip_comments && str == "/*";
	},
	/**
	 * Close comment
	 */
	isCommentClose: function(ctx, str)
	{
		return str == "*/";
	},
	/**
	 * Skip char
	 */
	skipChar: function(ctx, parser, content, start_pos)
	{
		var x = start_pos.x;
		var y = start_pos.y;
		var pos = start_pos.pos;
		var skip_comments = parser.skip_comments;
		/* Check boundaries */
		if (pos >= parser.content_sz)
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserEOF");
			throw new __v0(ctx)
		}
		var __v0 = use("Runtime.rs");
		var ch = __v0.charAt(ctx, content.ref, pos);
		var __v0 = use("Runtime.rs");
		var ch2 = __v0.substr(ctx, content.ref, pos, 2);
		while ((this.isSkipChar(ctx, ch) || this.isCommentOpen(ctx, ch2, skip_comments)) && pos < parser.content_sz)
		{
			if (this.isCommentOpen(ctx, ch2, skip_comments))
			{
				var __v0 = use("Runtime.rs");
				ch2 = __v0.substr(ctx, content.ref, pos, 2);
				while (!this.isCommentClose(ctx, ch2) && pos < parser.content_sz)
				{
					x = this.nextX(ctx, parser, ch, x);
					y = this.nextY(ctx, parser, ch, y);
					pos = pos + 1;
					if (pos >= parser.content_sz)
					{
						break;
					}
					var __v0 = use("Runtime.rs");
					ch = __v0.charAt(ctx, content.ref, pos);
					var __v0 = use("Runtime.rs");
					ch2 = __v0.substr(ctx, content.ref, pos, 2);
				}
				if (this.isCommentClose(ctx, ch2))
				{
					x = x + 2;
					pos = pos + 2;
				}
			}
			else
			{
				x = this.nextX(ctx, parser, ch, x);
				y = this.nextY(ctx, parser, ch, y);
				pos = pos + 1;
			}
			if (pos >= parser.content_sz)
			{
				break;
			}
			var __v0 = use("Runtime.rs");
			ch = __v0.charAt(ctx, content.ref, pos);
			var __v0 = use("Runtime.rs");
			ch2 = __v0.substr(ctx, content.ref, pos, 2);
		}
		var __v0 = use("Bayrell.Lang.Caret");
		return new __v0(ctx, use("Runtime.Dict").from({"pos":pos,"x":x,"y":y}));
	},
	/**
	 * Read special token
	 */
	readSpecialToken: function(ctx, parser, content, start_pos)
	{
		var pos = start_pos.pos;
		var s = "";
		var __v0 = use("Runtime.rs");
		s = __v0.substr(ctx, content.ref, pos, 10);
		if (s == "#endswitch")
		{
			return s;
		}
		var __v0 = use("Runtime.rs");
		s = __v0.substr(ctx, content.ref, pos, 7);
		if (s == "#ifcode" || s == "#switch")
		{
			return s;
		}
		var __v0 = use("Runtime.rs");
		s = __v0.substr(ctx, content.ref, pos, 6);
		if (s == "#endif" || s == "#ifdef")
		{
			return s;
		}
		var __v0 = use("Runtime.rs");
		s = __v0.substr(ctx, content.ref, pos, 5);
		if (s == "#case")
		{
			return s;
		}
		var __v0 = use("Runtime.rs");
		s = __v0.substr(ctx, content.ref, pos, 4);
		if (s == "@css")
		{
			return s;
		}
		var __v0 = use("Runtime.rs");
		s = __v0.substr(ctx, content.ref, pos, 3);
		if (s == "!==" || s == "===" || s == "#if")
		{
			return s;
		}
		var __v0 = use("Runtime.rs");
		s = __v0.substr(ctx, content.ref, pos, 2);
		if (s == "==" || s == "!=" || s == "<=" || s == ">=" || s == "=>" || s == "|>" || s == "->" || s == "::" || s == "+=" || s == "-=" || s == "~=" || s == "**" || s == "<<" || s == ">>" || s == "++" || s == "--")
		{
			return s;
		}
		return "";
	},
	/**
	 * Read next token and return caret end
	 */
	nextToken: function(ctx, parser, content, start_pos)
	{
		var is_first = true;
		var x = start_pos.x;
		var y = start_pos.y;
		var pos = start_pos.pos;
		/* Check boundaries */
		if (pos >= parser.content_sz)
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserEOF");
			throw new __v0(ctx)
		}
		var s = this.readSpecialToken(ctx, parser, content, start_pos);
		if (s != "")
		{
			var __v0 = use("Runtime.rs");
			var sz = __v0.strlen(ctx, s);
			for (var i = 0;i < sz;i++)
			{
				var __v0 = use("Runtime.rs");
				var ch = __v0.charAt(ctx, s, i);
				x = this.nextX(ctx, parser, ch, x);
				y = this.nextY(ctx, parser, ch, y);
				pos = pos + 1;
			}
			var __v0 = use("Bayrell.Lang.Caret");
			return new __v0(ctx, use("Runtime.Dict").from({"pos":pos,"x":x,"y":y}));
		}
		var __v0 = use("Runtime.rs");
		var ch = __v0.charAt(ctx, content.ref, pos);
		if (!this.isTokenChar(ctx, ch))
		{
			x = this.nextX(ctx, parser, ch, x);
			y = this.nextY(ctx, parser, ch, y);
			pos = pos + 1;
		}
		else
		{
			while (this.isTokenChar(ctx, ch))
			{
				x = this.nextX(ctx, parser, ch, x);
				y = this.nextY(ctx, parser, ch, y);
				pos = pos + 1;
				if (pos >= parser.content_sz)
				{
					break;
				}
				var __v0 = use("Runtime.rs");
				ch = __v0.charAt(ctx, content.ref, pos);
			}
		}
		var __v0 = use("Bayrell.Lang.Caret");
		return new __v0(ctx, use("Runtime.Dict").from({"pos":pos,"x":x,"y":y}));
	},
	/**
	 * Read next token
	 */
	readToken: function(ctx, parser)
	{
		var caret_start = null;
		var caret_end = null;
		var eof = false;
		var __v0 = use("Bayrell.Lang.Exceptions.ParserEOF");
		try
		{
			caret_start = this.skipChar(ctx, parser, parser.content, parser.caret.clone(ctx));
			caret_end = this.nextToken(ctx, parser, parser.content, caret_start);
		}
		catch (_ex)
		{
			if (_ex instanceof __v0)
			{
				var e = _ex;
				
				if (caret_start == null)
				{
					caret_start = parser.caret.clone(ctx);
				}
				if (caret_end == null)
				{
					caret_end = caret_start;
				}
				eof = true;
			}
			else if (true)
			{
				var e = _ex;
				
				throw e
			}
			else
			{
				throw _ex;
			}
		}
		var __v0 = use("Bayrell.Lang.CoreToken");
		var __v1 = use("Runtime.rs");
		return use("Runtime.Collection").from([parser.copy(ctx, use("Runtime.Dict").from({"caret":caret_end})),new __v0(ctx, use("Runtime.Dict").from({"content":__v1.substr(ctx, parser.content.ref, caret_start.pos, caret_end.pos - caret_start.pos),"caret_start":caret_start,"caret_end":caret_end,"eof":eof}))]);
	},
	/**
	 * Look next token
	 */
	lookToken: function(ctx, parser, token)
	{
		var token_content = "";
		var content = parser.content;
		var caret_start = null;
		var caret_end = null;
		var __v0 = use("Runtime.rs");
		var sz = __v0.strlen(ctx, token);
		var eof = false;
		var find = false;
		var __v0 = use("Bayrell.Lang.Exceptions.ParserEOF");
		try
		{
			caret_start = this.skipChar(ctx, parser, content, parser.caret.clone(ctx));
			var pos = caret_start.pos;
			var x = caret_start.x;
			var y = caret_start.y;
			var __v0 = use("Runtime.rs");
			token_content = __v0.substr(ctx, content.ref, pos, sz);
			if (token_content == token)
			{
				find = true;
			}
			var res = this.next(ctx, parser, token_content, x, y, pos);
			x = res[0];
			y = res[1];
			pos = res[2];
			var __v0 = use("Bayrell.Lang.Caret");
			caret_end = new __v0(ctx, use("Runtime.Dict").from({"pos":pos,"x":x,"y":y}));
		}
		catch (_ex)
		{
			if (_ex instanceof __v0)
			{
				var e = _ex;
				
				if (caret_start == null)
				{
					caret_start = parser.caret.clone(ctx);
				}
				if (caret_end == null)
				{
					caret_end = caret_start;
				}
				eof = true;
			}
			else if (true)
			{
				var e = _ex;
				
				throw e
			}
			else
			{
				throw _ex;
			}
		}
		var __v0 = use("Bayrell.Lang.CoreToken");
		return use("Runtime.Collection").from([parser.copy(ctx, use("Runtime.Dict").from({"caret":caret_end})),new __v0(ctx, use("Runtime.Dict").from({"content":token_content,"caret_start":caret_start,"caret_end":caret_end,"eof":eof})),find]);
	},
	/**
	 * Match next token
	 */
	matchToken: function(ctx, parser, next_token)
	{
		var token = null;
		/* Look token */
		var res = this.lookToken(ctx, parser, next_token);
		parser = res[0];
		token = res[1];
		var find = res[2];
		if (!find)
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0(ctx, next_token, token.caret_start.clone(ctx), parser.file_name)
		}
		return use("Runtime.Collection").from([parser,token]);
	},
	/**
	 * Match next string
	 */
	matchString: function(ctx, parser, str1)
	{
		var caret = parser.caret.clone(ctx);
		var __v0 = use("Runtime.rs");
		var sz = __v0.strlen(ctx, str1);
		var __v0 = use("Runtime.rs");
		var str2 = __v0.substr(ctx, parser.content.ref, caret.pos, sz);
		if (str1 != str2)
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0(ctx, str1, caret, parser.file_name)
		}
		var res = this.next(ctx, parser, str1, caret.x, caret.y, caret.pos);
		var __v0 = use("Bayrell.Lang.Caret");
		caret = new __v0(ctx, use("Runtime.Dict").from({"x":res[0],"y":res[1],"pos":res[2]}));
		parser = parser.copy(ctx, { "caret": caret });
		return use("Runtime.Collection").from([parser,null]);
	},
	/**
	 * Read number
	 */
	readNumber: function(ctx, parser)
	{
		var token = null;
		var start = parser.clone(ctx);
		/* Read token */
		var res = this.readToken(ctx, parser);
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		if (token.content == "")
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0(ctx, "Number", caret_start, parser.file_name)
		}
		if (!this.isStringOfNumbers(ctx, token.content))
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0(ctx, "Number", caret_start, parser.file_name)
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpNumber");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"value":token.content,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
	},
	/**
	 * Read string
	 */
	readUntilStringArr: function(ctx, parser, arr, flag_include)
	{
		if (flag_include == undefined) flag_include = true;
		var token = null;
		var look = null;
		var content = parser.content;
		var content_sz = parser.content_sz;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		/* Search next string in arr */
		var search = (ctx, pos) => 
		{
			for (var i = 0;i < arr.count(ctx);i++)
			{
				var item = arr.item(ctx, i);
				var __v0 = use("Runtime.rs");
				var sz = __v0.strlen(ctx, item);
				var __v0 = use("Runtime.rs");
				var str = __v0.substr(ctx, content.ref, pos, sz);
				if (str == item)
				{
					return i;
				}
			}
			return -1;
		};
		/* Start and end positionss */
		var start_pos = pos;
		var end_pos = pos;
		/* Read string value */
		var ch = "";
		var arr_pos = search(ctx, pos);
		while (pos < content_sz && arr_pos == -1)
		{
			var __v0 = use("Runtime.rs");
			ch = __v0.charAt(ctx, content.ref, pos);
			x = this.nextX(ctx, parser, ch, x);
			y = this.nextY(ctx, parser, ch, y);
			pos = pos + 1;
			if (pos >= content_sz)
			{
				var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
				var __v1 = use("Runtime.rs");
				var __v2 = use("Bayrell.Lang.Caret");
				throw new __v0(ctx, __v1.join(ctx, ",", arr), new __v2(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos})), parser.file_name)
			}
			arr_pos = search(ctx, pos);
		}
		if (arr_pos == -1)
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			var __v1 = use("Bayrell.Lang.Caret");
			throw new __v0(ctx, "End of string", new __v1(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos})), parser.file_name)
		}
		if (!flag_include)
		{
			end_pos = pos;
		}
		else
		{
			var item = arr.item(ctx, arr_pos);
			var __v0 = use("Runtime.rs");
			var sz = __v0.strlen(ctx, item);
			for (var i = 0;i < sz;i++)
			{
				var __v0 = use("Runtime.rs");
				ch = __v0.charAt(ctx, content.ref, pos);
				x = this.nextX(ctx, parser, ch, x);
				y = this.nextY(ctx, parser, ch, y);
				pos = pos + 1;
			}
			end_pos = pos;
		}
		/* Return result */
		var __v0 = use("Bayrell.Lang.Caret");
		var caret_end = new __v0(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":end_pos}));
		var __v0 = use("Runtime.rs");
		return use("Runtime.Collection").from([parser.copy(ctx, use("Runtime.Dict").from({"caret":caret_end})),__v0.substr(ctx, content.ref, start_pos, end_pos - start_pos)]);
	},
	/**
	 * Read string
	 */
	readString: function(ctx, parser)
	{
		var token = null;
		var look = null;
		/* Read token */
		var res = this.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		var str_char = token.content;
		/* Read begin string char */
		if (str_char != "'" && str_char != "\"")
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0(ctx, "String", caret_start, parser.file_name)
		}
		var content = look.content;
		var content_sz = look.content_sz;
		var pos = look.caret.pos;
		var x = look.caret.x;
		var y = look.caret.y;
		/* Read string value */
		var value_str = "";
		var __v0 = use("Runtime.rs");
		var ch = __v0.charAt(ctx, content.ref, pos);
		while (pos < content_sz && ch != str_char)
		{
			if (ch == "\\")
			{
				x = this.nextX(ctx, parser, ch, x);
				y = this.nextY(ctx, parser, ch, y);
				pos = pos + 1;
				if (pos >= content_sz)
				{
					var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
					var __v1 = use("Bayrell.Lang.Caret");
					throw new __v0(ctx, "End of string", new __v1(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos})), parser.file_name)
				}
				var __v0 = use("Runtime.rs");
				var ch2 = __v0.charAt(ctx, content.ref, pos);
				if (ch2 == "n")
				{
					value_str += use("Runtime.rtl").toStr("\n");
				}
				else if (ch2 == "r")
				{
					value_str += use("Runtime.rtl").toStr("\r");
				}
				else if (ch2 == "t")
				{
					value_str += use("Runtime.rtl").toStr("\t");
				}
				else if (ch2 == "\\")
				{
					value_str += use("Runtime.rtl").toStr("\\");
				}
				else if (ch2 == "'")
				{
					value_str += use("Runtime.rtl").toStr("'");
				}
				else if (ch2 == "\"")
				{
					value_str += use("Runtime.rtl").toStr("\"");
				}
				x = this.nextX(ctx, parser, ch2, x);
				y = this.nextY(ctx, parser, ch2, y);
				pos = pos + 1;
			}
			else
			{
				value_str += use("Runtime.rtl").toStr(ch);
				x = this.nextX(ctx, parser, ch, x);
				y = this.nextY(ctx, parser, ch, y);
				pos = pos + 1;
			}
			if (pos >= content_sz)
			{
				var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
				var __v1 = use("Bayrell.Lang.Caret");
				throw new __v0(ctx, "End of string", new __v1(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos})), parser.file_name)
			}
			var __v0 = use("Runtime.rs");
			ch = __v0.charAt(ctx, content.ref, pos);
		}
		/* Read end string char */
		if (ch != "'" && ch != "\"")
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			var __v1 = use("Bayrell.Lang.Caret");
			throw new __v0(ctx, "End of string", new __v1(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos})), parser.file_name)
		}
		x = this.nextX(ctx, parser, ch, x);
		y = this.nextY(ctx, parser, ch, y);
		pos = pos + 1;
		/* Return result */
		var __v0 = use("Bayrell.Lang.Caret");
		var caret_end = new __v0(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos}));
		var __v0 = use("Bayrell.Lang.OpCodes.OpString");
		return use("Runtime.Collection").from([parser.copy(ctx, use("Runtime.Dict").from({"caret":caret_end})),new __v0(ctx, use("Runtime.Dict").from({"value":value_str,"caret_start":caret_start,"caret_end":caret_end}))]);
	},
	/**
	 * Read comment
	 */
	readComment: function(ctx, parser)
	{
		var start = parser.clone(ctx);
		var token = null;
		var look = null;
		parser = parser.copy(ctx, { "skip_comments": false });
		var __v0 = use("Bayrell.Lang.LangBay.ParserBayBase");
		var res = __v0.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		parser = parser.copy(ctx, { "skip_comments": true });
		if (token.content == "/")
		{
			parser = look.clone(ctx);
			var content = look.content;
			var content_sz = look.content_sz;
			var pos = look.caret.pos;
			var x = look.caret.x;
			var y = look.caret.y;
			var pos_start = pos;
			var __v0 = use("Runtime.rs");
			var ch = __v0.charAt(ctx, content.ref, pos);
			var __v0 = use("Runtime.rs");
			var ch2 = __v0.substr(ctx, content.ref, pos, 2);
			while (!this.isCommentClose(ctx, ch2) && pos < content_sz)
			{
				x = this.nextX(ctx, parser, ch, x);
				y = this.nextY(ctx, parser, ch, y);
				pos = pos + 1;
				if (pos >= parser.content_sz)
				{
					break;
				}
				var __v0 = use("Runtime.rs");
				ch = __v0.charAt(ctx, content.ref, pos);
				var __v0 = use("Runtime.rs");
				ch2 = __v0.substr(ctx, content.ref, pos, 2);
			}
			var pos_end = pos;
			if (this.isCommentClose(ctx, ch2))
			{
				x = x + 2;
				pos = pos + 2;
			}
			else
			{
				var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
				var __v1 = use("Bayrell.Lang.Caret");
				throw new __v0(ctx, "End of comment", new __v1(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos})), start.file_name)
			}
			/* Return result */
			var __v0 = use("Runtime.rs");
			var value_str = __v0.substr(ctx, content.ref, pos_start + 1, pos_end - pos_start - 1);
			var __v0 = use("Bayrell.Lang.Caret");
			var caret_end = new __v0(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos}));
			var __v0 = use("Bayrell.Lang.OpCodes.OpComment");
			return use("Runtime.Collection").from([start.copy(ctx, use("Runtime.Dict").from({"caret":caret_end})),new __v0(ctx, use("Runtime.Dict").from({"value":value_str,"caret_start":caret_start,"caret_end":caret_end}))]);
		}
		return use("Runtime.Collection").from([parser,null]);
	},
	/**
	 * Read identifier
	 */
	readIdentifier: function(ctx, parser, find_ident)
	{
		if (find_ident == undefined) find_ident = false;
		var start = parser.clone(ctx);
		var token = null;
		var look = null;
		var name = "";
		var __v0 = use("Bayrell.Lang.LangBay.ParserBayBase");
		var res = __v0.readToken(ctx, parser);
		parser = res[0];
		token = res[1];
		if (token.content == "")
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0(ctx, "Identifier", token.caret_start.clone(ctx), parser.file_name)
		}
		if (!this.isIdentifier(ctx, token.content))
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0(ctx, "Identifier", token.caret_start.clone(ctx), parser.file_name)
		}
		if (this.isReserved(ctx, token.content))
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0(ctx, "Identifier " + use("Runtime.rtl").toStr(token.content) + use("Runtime.rtl").toStr(" is reserverd"), token.caret_start.clone(ctx), parser.file_name)
		}
		name = token.content;
		var kind = "";
		if (find_ident)
		{
			kind = this.findIdentifier(ctx, parser, name, token.caret_start.clone(ctx));
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"kind":kind,"value":name,"caret_start":token.caret_start.clone(ctx),"caret_end":token.caret_end.clone(ctx)}))]);
	},
	/**
	 * Read entity name
	 */
	readEntityName: function(ctx, parser, find_ident)
	{
		if (find_ident == undefined) find_ident = true;
		var look = null;
		var token = null;
		var ident = null;
		var __v0 = use("Runtime.Vector");
		var names = new __v0(ctx);
		var res = parser.parser_base.constructor.readIdentifier(ctx, parser, find_ident);
		parser = res[0];
		ident = res[1];
		var caret_start = ident.caret_start.clone(ctx);
		var name = ident.value;
		names.push(ctx, name);
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && token.content == ".")
		{
			var res = parser.parser_base.constructor.matchToken(ctx, parser, ".");
			parser = res[0];
			var res = parser.parser_base.constructor.readIdentifier(ctx, parser);
			parser = res[0];
			ident = res[1];
			name = ident.value;
			names.push(ctx, name);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpEntityName");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"caret_start":caret_start,"caret_end":parser.caret.clone(ctx),"names":names.toCollection(ctx)}))]);
	},
	/**
	 * Read type identifier
	 */
	readTypeIdentifier: function(ctx, parser, find_ident)
	{
		if (find_ident == undefined) find_ident = true;
		var start = parser.clone(ctx);
		var look = null;
		var token = null;
		var op_code = null;
		var entity_name = null;
		var template = null;
		var res = this.readEntityName(ctx, parser, find_ident);
		parser = res[0];
		entity_name = res[1];
		var caret_start = entity_name.caret_start.clone(ctx);
		var flag_open_caret = false;
		var flag_end_caret = false;
		var res = this.lookToken(ctx, parser.clone(ctx), "<");
		look = res[0];
		token = res[1];
		flag_open_caret = res[2];
		if (flag_open_caret)
		{
			var __v0 = use("Runtime.Vector");
			template = new __v0(ctx);
			var res = this.matchToken(ctx, parser, "<");
			parser = res[0];
			var res = this.lookToken(ctx, parser.clone(ctx), ">");
			look = res[0];
			token = res[1];
			flag_end_caret = res[2];
			while (!token.eof && !flag_end_caret)
			{
				var parser_value = null;
				var res = this.readTypeIdentifier(ctx, parser);
				parser = res[0];
				parser_value = res[1];
				template.push(ctx, parser_value);
				var res = this.lookToken(ctx, parser.clone(ctx), ">");
				look = res[0];
				token = res[1];
				flag_end_caret = res[2];
				if (!flag_end_caret)
				{
					var res = this.matchToken(ctx, parser, ",");
					parser = res[0];
					var res = this.lookToken(ctx, parser.clone(ctx), ">");
					look = res[0];
					token = res[1];
					flag_end_caret = res[2];
				}
			}
			var res = this.matchToken(ctx, parser, ">");
			parser = res[0];
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpTypeIdentifier");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"entity_name":entity_name,"template":(template) ? template.toCollection(ctx) : null,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
	},
	/**
	 * Read collection
	 */
	readCollection: function(ctx, parser)
	{
		var start = parser.clone(ctx);
		var look = null;
		var token = null;
		var __v0 = use("Runtime.Vector");
		var values = new __v0(ctx);
		var res = this.matchToken(ctx, parser, "[");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		var res = this.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && token.content != "]")
		{
			var parser_value = null;
			var res = parser.parser_expression.constructor.readExpression(ctx, parser);
			parser = res[0];
			parser_value = res[1];
			values.push(ctx, parser_value);
			var res = this.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
			if (token.content == ",")
			{
				parser = look.clone(ctx);
				var res = this.readToken(ctx, parser.clone(ctx));
				look = res[0];
				token = res[1];
			}
		}
		var res = this.matchToken(ctx, parser, "]");
		parser = res[0];
		token = res[1];
		var __v0 = use("Bayrell.Lang.OpCodes.OpCollection");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"values":values.toCollection(ctx),"caret_start":caret_start,"caret_end":token.caret_end.clone(ctx)}))]);
	},
	/**
	 * Read collection
	 */
	readDict: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var __v0 = use("Runtime.Map");
		var values = new __v0(ctx);
		var res = this.matchToken(ctx, parser, "{");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		var res = this.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && token.content != "}")
		{
			var parser_value = null;
			var res = this.readString(ctx, parser);
			parser = res[0];
			parser_value = res[1];
			var key = parser_value.value;
			var res = this.matchToken(ctx, parser, ":");
			parser = res[0];
			var res = parser.parser_expression.constructor.readExpression(ctx, parser);
			parser = res[0];
			parser_value = res[1];
			values.set(ctx, key, parser_value);
			var res = this.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
			if (token.content == ",")
			{
				parser = look.clone(ctx);
				var res = this.readToken(ctx, parser.clone(ctx));
				look = res[0];
				token = res[1];
			}
		}
		var res = this.matchToken(ctx, parser, "}");
		parser = res[0];
		token = res[1];
		var __v0 = use("Bayrell.Lang.OpCodes.OpDict");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"values":values.toDict(ctx),"caret_start":caret_start,"caret_end":token.caret_end.clone(ctx)}))]);
	},
	/**
	 * Read fixed
	 */
	readFixed: function(ctx, parser, find_ident)
	{
		if (find_ident == undefined) find_ident = false;
		var look = null;
		var token = null;
		var start = parser.clone(ctx);
		var flag_negative = false;
		var res = this.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		if (token.content == "")
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0(ctx, "Identifier", token.caret_start.clone(ctx), look.file_name)
		}
		/* Negative number */
		if (token.content == "-")
		{
			flag_negative = true;
			var res = this.readToken(ctx, look);
			look = res[0];
			token = res[1];
		}
		/* Read string */
		if (!flag_negative && (token.content == "'" || token.content == "\""))
		{
			return this.readString(ctx, parser);
		}
		/* Read Collection */
		if (!flag_negative && token.content == "[")
		{
			return this.readCollection(ctx, parser);
		}
		/* Read Dict */
		if (!flag_negative && token.content == "{")
		{
			return this.readDict(ctx, parser);
		}
		/* Read Number */
		if (this.isStringOfNumbers(ctx, token.content))
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpNumber");
			return use("Runtime.Collection").from([look,new __v0(ctx, use("Runtime.Dict").from({"value":token.content,"caret_start":token.caret_start.clone(ctx),"caret_end":look.caret.clone(ctx),"negative":flag_negative}))]);
		}
		/* Read Identifier */
		if (!this.isIdentifier(ctx, token.content))
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0(ctx, "Identifier", token.caret_start.clone(ctx), look.file_name)
		}
		var kind = "";
		if (find_ident)
		{
			kind = this.findIdentifier(ctx, parser, token.content, token.caret_start.clone(ctx));
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		return use("Runtime.Collection").from([look,new __v0(ctx, use("Runtime.Dict").from({"kind":kind,"value":token.content,"caret_start":token.caret_start.clone(ctx),"caret_end":look.caret.clone(ctx)}))]);
	},
	/**
	 * Read call args
	 */
	readCallArgs: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var __v0 = use("Runtime.Vector");
		var items = new __v0(ctx);
		var res = this.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		if (token.content == "{")
		{
			var res = this.readDict(ctx, parser);
			parser = res[0];
			var d = res[1];
			items = use("Runtime.Collection").from([d]);
		}
		else if (token.content == "(")
		{
			var res = this.matchToken(ctx, parser, "(");
			parser = res[0];
			var res = this.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
			while (!token.eof && token.content != ")")
			{
				var parser_value = null;
				var res = parser.parser_expression.constructor.readExpression(ctx, parser);
				parser = res[0];
				parser_value = res[1].clone(ctx);
				items.push(ctx, parser_value);
				var res = this.readToken(ctx, parser.clone(ctx));
				look = res[0];
				token = res[1];
				if (token.content == ",")
				{
					parser = look.clone(ctx);
					var res = this.readToken(ctx, parser.clone(ctx));
					look = res[0];
					token = res[1];
				}
			}
			var res = this.matchToken(ctx, parser, ")");
			parser = res[0];
		}
		return use("Runtime.Collection").from([parser,items.toCollection(ctx)]);
	},
	/**
	 * Read new instance
	 */
	readNew: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var args = use("Runtime.Collection").from([]);
		var res = this.matchToken(ctx, parser, "new");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		var res = this.readTypeIdentifier(ctx, parser);
		parser = res[0];
		op_code = res[1];
		var res = this.readToken(ctx, parser.clone(ctx));
		token = res[1];
		if (token.content == "(" || token.content == "{")
		{
			var res = this.readCallArgs(ctx, parser);
			parser = res[0];
			args = res[1];
		}
		else
		{
			this.matchToken(ctx, parser.clone(ctx), "(");
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpNew");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"args":args,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
	},
	/**
	 * Read method
	 */
	readMethod: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var parser_value = null;
		var value1 = null;
		var value2 = null;
		var res = this.matchToken(ctx, parser, "method");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		var res = this.readTypeIdentifier(ctx, parser);
		parser = res[0];
		value2 = res[1];
		var res = this.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		var look_token = token.content;
		if (look_token != "." && look_token != "::")
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0(ctx, "'.' or '::'", token.caret_start.clone(ctx), look.file_name)
		}
		var res = this.readIdentifier(ctx, look.clone(ctx));
		parser = res[0];
		value2 = res[1];
		var __v0 = use("Bayrell.Lang.OpCodes.OpMethod");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"value1":value1,"value2":value2,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
	},
	/**
	 * Read dynamic
	 */
	readDynamic: function(ctx, parser, op_code)
	{
		if (op_code == undefined) op_code = null;
		var look = null;
		var token = null;
		var parser_items = null;
		var op_code_first = null;
		var is_await = false;
		var is_context_call = true;
		var caret_start = null;
		var f_next = (ctx, s) => 
		{
			return s == "." || s == "::" || s == "->" || s == "|>" || s == "{" || s == "[" || s == "(" || s == "@";
		};
		if (op_code == null)
		{
			var res = this.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
			if (token.content == "await")
			{
				caret_start = token.caret_start.clone(ctx);
				is_await = true;
				parser = look.clone(ctx);
			}
			var res = this.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
			if (token.content == "@")
			{
				var res = this.readToken(ctx, look.clone(ctx));
				var look2 = res[0];
				var token2 = res[1];
				if (!f_next(ctx, token2.content))
				{
					if (this.isIdentifier(ctx, token2.content))
					{
						parser = look.clone(ctx);
						is_context_call = false;
					}
				}
			}
			var res = this.readFixed(ctx, parser, true);
			parser = res[0];
			op_code = res[1];
		}
		op_code_first = op_code;
		if (caret_start == null)
		{
			caret_start = op_code.caret_start.clone(ctx);
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		var __v1 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		if (op_code.kind == __v0.KIND_CONTEXT || op_code.kind == __v1.KIND_SYS_FUNCTION)
		{
			is_context_call = false;
		}
		var res = this.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		if (f_next(ctx, token.content))
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			var __v1 = use("Bayrell.Lang.OpCodes.OpNew");
			if (op_code instanceof __v0)
			{
				var __v1 = use("Bayrell.Lang.OpCodes.OpIdentifier");
				var __v2 = use("Bayrell.Lang.OpCodes.OpIdentifier");
				var __v3 = use("Bayrell.Lang.OpCodes.OpIdentifier");
				var __v4 = use("Bayrell.Lang.OpCodes.OpIdentifier");
				var __v5 = use("Bayrell.Lang.OpCodes.OpIdentifier");
				var __v6 = use("Bayrell.Lang.OpCodes.OpIdentifier");
				if (op_code.kind != __v1.KIND_SYS_TYPE && op_code.kind != __v2.KIND_SYS_FUNCTION && op_code.kind != __v3.KIND_VARIABLE && op_code.kind != __v4.KIND_MODULE && op_code.kind != __v5.KIND_CLASSREF && op_code.kind != __v6.KIND_CONTEXT)
				{
					var __v7 = use("Bayrell.Lang.Exceptions.ParserExpected");
					throw new __v7(ctx, "Module or variable '" + use("Runtime.rtl").toStr(op_code.value) + use("Runtime.rtl").toStr("'"), op_code.caret_start.clone(ctx), parser.file_name)
				}
			}
			else if (op_code instanceof __v1)
			{
			}
			else
			{
				var __v2 = use("Bayrell.Lang.Exceptions.ParserExpected");
				throw new __v2(ctx, "Module or variable", op_code.caret_start.clone(ctx), parser.file_name)
			}
		}
		while (!token.eof && f_next(ctx, token.content))
		{
			var token_content = token.content;
			/* Static call */
			if (token_content == "(" || token_content == "{" || token_content == "@")
			{
				if (token_content == "@")
				{
					parser = look.clone(ctx);
					is_context_call = false;
				}
				var res = this.readCallArgs(ctx, parser);
				parser = res[0];
				parser_items = res[1];
				var __v0 = use("Bayrell.Lang.OpCodes.OpCall");
				op_code = new __v0(ctx, use("Runtime.Dict").from({"obj":op_code,"args":parser_items,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx),"is_await":is_await,"is_context":is_context_call}));
				is_context_call = true;
			}
			else if (token_content == "->" || token_content == "|>")
			{
				var kind = "";
				var class_name = null;
				var method_name = null;
				parser = look.clone(ctx);
				is_context_call = true;
				if (token_content == "->")
				{
					var res = this.readToken(ctx, parser.clone(ctx));
					look = res[0];
					token = res[1];
					if (token.content == "@")
					{
						parser = look.clone(ctx);
						is_context_call = false;
					}
					var res = this.readIdentifier(ctx, parser);
					parser = res[0];
					method_name = res[1];
					var __v0 = use("Bayrell.Lang.OpCodes.OpPipe");
					kind = __v0.KIND_METHOD;
				}
				else if (token_content == "|>")
				{
					var res = this.readTypeIdentifier(ctx, parser);
					parser = res[0];
					class_name = res[1];
					var res = this.matchToken(ctx, parser, "::");
					parser = res[0];
					var res = this.readToken(ctx, parser.clone(ctx));
					look = res[0];
					token = res[1];
					if (token.content == "@")
					{
						parser = look.clone(ctx);
						is_context_call = false;
					}
					var res = this.readIdentifier(ctx, parser);
					parser = res[0];
					method_name = res[1];
					var __v0 = use("Bayrell.Lang.OpCodes.OpPipe");
					kind = __v0.KIND_LAMBDA;
				}
				var res = this.readCallArgs(ctx, parser);
				parser = res[0];
				var args = res[1];
				var __v0 = use("Bayrell.Lang.OpCodes.OpPipe");
				op_code = new __v0(ctx, use("Runtime.Dict").from({"kind":kind,"obj":op_code,"args":args,"class_name":class_name,"method_name":method_name,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx),"is_await":is_await,"is_context":is_context_call}));
				is_context_call = true;
			}
			else if (token_content == "." || token_content == "::" || token_content == "[")
			{
				var kind = "";
				var look_value = null;
				parser = look.clone(ctx);
				is_context_call = true;
				if (token_content == ".")
				{
					var __v0 = use("Bayrell.Lang.OpCodes.OpAttr");
					kind = __v0.KIND_ATTR;
				}
				else if (token_content == "::")
				{
					var __v0 = use("Bayrell.Lang.OpCodes.OpAttr");
					kind = __v0.KIND_STATIC;
				}
				else if (token_content == "[")
				{
					var __v0 = use("Bayrell.Lang.OpCodes.OpAttr");
					kind = __v0.KIND_DYNAMIC;
				}
				if (token_content == "[")
				{
					var res = parser.parser_expression.constructor.readExpression(ctx, parser);
					parser = res[0];
					look_value = res[1];
					var res = this.matchToken(ctx, parser, "]");
					parser = res[0];
				}
				else
				{
					var res = this.readToken(ctx, parser.clone(ctx));
					look = res[0];
					token = res[1];
					if (token.content == "@")
					{
						parser = look.clone(ctx);
						is_context_call = false;
					}
					var res = this.readIdentifier(ctx, parser);
					parser = res[0];
					look_value = res[1];
				}
				var __v0 = use("Bayrell.Lang.OpCodes.OpAttr");
				op_code = new __v0(ctx, use("Runtime.Dict").from({"kind":kind,"obj":op_code,"value":look_value,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}));
			}
			else
			{
				var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
				throw new __v0(ctx, "Next attr", token.caret_start.clone(ctx), parser.file_name)
			}
			var res = this.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
			var __v0 = use("Bayrell.Lang.OpCodes.OpAttr");
			var __v1 = use("Bayrell.Lang.OpCodes.OpAttr");
			if (op_code instanceof __v0 && op_code.kind == __v1.KIND_PIPE && token.content != "(" && token.content != "{")
			{
				var __v2 = use("Bayrell.Lang.Exceptions.ParserExpected");
				throw new __v2(ctx, "Call", token.caret_start.clone(ctx), parser.file_name)
			}
		}
		return use("Runtime.Collection").from([parser,op_code]);
	},
	/**
	 * Read base item
	 */
	readBaseItem: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var flag_dynamic = false;
		var res = this.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		var caret_start = look.caret.clone(ctx);
		if (token.content == "new")
		{
			var res = this.readNew(ctx, parser);
			parser = res[0];
			op_code = res[1];
			flag_dynamic = true;
		}
		else if (token.content == "method")
		{
			var res = this.readMethod(ctx, parser);
			parser = res[0];
			op_code = res[1];
		}
		else if (token.content == "classof")
		{
			var res = this.readClassOf(ctx, parser);
			parser = res[0];
			op_code = res[1];
		}
		else if (token.content == "classref")
		{
			var res = this.readClassRef(ctx, parser);
			parser = res[0];
			op_code = res[1];
		}
		else if (token.content == "(")
		{
			var save_parser = look.clone(ctx);
			parser = look.clone(ctx);
			/* Try to read OpTypeConvert */
			var __v0 = use("Bayrell.Lang.Exceptions.ParserError");
			try
			{
				var res = this.readTypeIdentifier(ctx, parser);
				parser = res[0];
				var op_type = res[1];
				var res = this.readToken(ctx, parser);
				parser = res[0];
				token = res[1];
				if (token.content == ")")
				{
					var res = this.readBaseItem(ctx, parser);
					parser = res[0];
					op_code = res[1];
					var __v0 = use("Bayrell.Lang.OpCodes.OpTypeConvert");
					return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"pattern":op_type,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
				}
			}
			catch (_ex)
			{
				if (_ex instanceof __v0)
				{
					var e = _ex;
				}
				else
				{
					throw _ex;
				}
			}
			/* Read Expression */
			parser = save_parser.clone(ctx);
			var res = parser.parser_expression.constructor.readExpression(ctx, parser);
			parser = res[0];
			op_code = res[1];
			var res = this.matchToken(ctx, parser, ")");
			parser = res[0];
			flag_dynamic = true;
		}
		else
		{
			flag_dynamic = true;
		}
		if (flag_dynamic)
		{
			var res = this.readDynamic(ctx, parser, op_code);
			parser = res[0];
			op_code = res[1];
		}
		return use("Runtime.Collection").from([parser,op_code]);
	},
	/**
	 * Read classof
	 */
	readClassOf: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var res = this.matchToken(ctx, parser, "classof");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		var res = this.readEntityName(ctx, parser);
		parser = res[0];
		op_code = res[1];
		var __v0 = use("Bayrell.Lang.OpCodes.OpClassOf");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"entity_name":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
	},
	/**
	 * Read classref
	 */
	readClassRef: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var res = this.matchToken(ctx, parser, "classref");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		var res = parser.parser_expression.constructor.readExpression(ctx, parser);
		parser = res[0];
		op_code = res[1];
		var __v0 = use("Bayrell.Lang.OpCodes.OpClassRef");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"value":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayBase";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangBay.ParserBayBase",
			"name": "Bayrell.Lang.LangBay.ParserBayBase",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Bayrell.Lang.LangBay.ParserBayBase);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangBay == undefined) module.exports.Bayrell.Lang.LangBay = {};
module.exports.Bayrell.Lang.LangBay.ParserBayBase = Bayrell.Lang.LangBay.ParserBayBase;