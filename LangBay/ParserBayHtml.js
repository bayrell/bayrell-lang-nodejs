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
Bayrell.Lang.LangBay.ParserBayHtml = function(ctx)
{
	use("Runtime.BaseObject").apply(this, arguments);
};
Bayrell.Lang.LangBay.ParserBayHtml.prototype = Object.create(use("Runtime.BaseObject").prototype);
Bayrell.Lang.LangBay.ParserBayHtml.prototype.constructor = Bayrell.Lang.LangBay.ParserBayHtml;
Object.assign(Bayrell.Lang.LangBay.ParserBayHtml.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.LangBay.ParserBayHtml"))
		{
		}
		use("Runtime.BaseObject").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		use("Runtime.BaseObject").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return use("Runtime.BaseObject").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.LangBay.ParserBayHtml";
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayHtml, use("Runtime.BaseObject"));
Object.assign(Bayrell.Lang.LangBay.ParserBayHtml,
{
	/**
	 * Retuns css hash
	 * @param string component class name
	 * @return string hash
	 */
	getCssHash: function(ctx, s)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayHtml.getCssHash", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var r = "";
		var a = "1234567890abcdef";
		var __v0 = use("Runtime.rs");
		var sz = __v0.strlen(ctx, s);
		var h = 0;
		for (var i = 0;i < sz;i++)
		{
			var __v1 = use("Runtime.rs");
			var __v2 = use("Runtime.rs");
			var c = __v1.ord(ctx, __v2.substr(ctx, s, i, 1));
			h = (h << 2) + (h >> 14) + c & 65535;
		}
		var p = 0;
		while (h != 0 || p < 4)
		{
			var c = h & 15;
			h = h >> 4;
			var __v1 = use("Runtime.rs");
			r += use("Runtime.rtl").toStr(__v1.substr(ctx, a, c, 1));
			p = p + 1;
		}
		var __memorize_value = r;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayHtml.getCssHash", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Read css selector
	 */
	readCssSelector: function(ctx, parser)
	{
		var content = parser.content;
		var content_sz = parser.content_sz;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var class_name = parser.current_namespace_name + use("Runtime.rtl").toStr(".") + use("Runtime.rtl").toStr(parser.current_class_name);
		var __v0 = use("Runtime.rs");
		var ch = __v0.substr(ctx, content.ref, pos, 1);
		if (ch == "(")
		{
			pos = pos + 1;
			x = parser.parser_base.constructor.nextX(ctx, parser, ch, x);
			y = parser.parser_base.constructor.nextY(ctx, parser, ch, y);
			var start_pos = pos;
			while (pos < content_sz && ch != ")")
			{
				pos = pos + 1;
				x = parser.parser_base.constructor.nextX(ctx, parser, ch, x);
				y = parser.parser_base.constructor.nextY(ctx, parser, ch, y);
				var __v1 = use("Runtime.rs");
				ch = __v1.substr(ctx, content.ref, pos, 1);
			}
			var __v1 = use("Runtime.rs");
			class_name = __v1.substr(ctx, content.ref, start_pos, pos - start_pos);
			if (parser.uses.has(ctx, class_name))
			{
				class_name = parser.uses.item(ctx, class_name);
			}
			pos = pos + 1;
			x = parser.parser_base.constructor.nextX(ctx, parser, ch, x);
			y = parser.parser_base.constructor.nextY(ctx, parser, ch, y);
		}
		var start_pos = pos;
		var __v1 = use("Runtime.rs");
		ch = __v1.substr(ctx, content.ref, pos, 1);
		while (pos < content_sz && ch != " " && ch != "," && ch != "." && ch != ":" && ch != "[" && ch != "{")
		{
			pos = pos + 1;
			x = parser.parser_base.constructor.nextX(ctx, parser, ch, x);
			y = parser.parser_base.constructor.nextY(ctx, parser, ch, y);
			var __v2 = use("Runtime.rs");
			ch = __v2.substr(ctx, content.ref, pos, 1);
		}
		var __v2 = use("Runtime.rs");
		var postfix = __v2.substr(ctx, content.ref, start_pos, pos - start_pos);
		var selector = "." + use("Runtime.rtl").toStr(postfix) + use("Runtime.rtl").toStr("-") + use("Runtime.rtl").toStr(this.getCssHash(ctx, class_name));
		var __v3 = use("Bayrell.Lang.Caret");
		var caret = new __v3(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos}));
		parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["caret"]), caret);
		return use("Runtime.Collection").from([parser,selector]);
	},
	/**
	 * Read css body
	 */
	readCssBody: function(ctx, parser)
	{
		var caret_start = parser.caret;
		var css_str = "";
		var content = parser.content;
		var content_sz = parser.content_sz;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var bracket_level = 0;
		var start_pos = pos;
		var __v0 = use("Runtime.rs");
		var ch = __v0.substr(ctx, content.ref, pos, 1);
		while (pos < content_sz && (ch != "}" || ch == "}" && bracket_level > 0) && ch != "<")
		{
			/* If html or  tag */
			if (ch == "%")
			{
				x = parser.parser_base.constructor.nextX(ctx, parser, ch, x);
				y = parser.parser_base.constructor.nextY(ctx, parser, ch, y);
				pos = pos + 1;
				/* Add value */
				var __v1 = use("Runtime.rs");
				var value = __v1.substr(ctx, content.ref, start_pos, pos - start_pos - 1);
				if (value != "")
				{
					css_str += use("Runtime.rtl").toStr(value);
				}
				/* Read CSS Selector */
				var __v2 = use("Bayrell.Lang.Caret");
				var caret = new __v2(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos}));
				parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["caret"]), caret);
				var res = this.readCssSelector(ctx, parser);
				parser = Runtime.rtl.get(ctx, res, 0);
				var s = Runtime.rtl.get(ctx, res, 1);
				css_str += use("Runtime.rtl").toStr(s);
				/* Set pos, x, y */
				caret_start = parser.caret;
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
			}
			else if (ch == "@")
			{
				x = parser.parser_base.constructor.nextX(ctx, parser, ch, x);
				y = parser.parser_base.constructor.nextY(ctx, parser, ch, y);
				pos = pos + 1;
				var res = parser.parser_base.constructor.readUntilStringArr(ctx, parser, use("Runtime.Collection").from(["{"]), false);
				parser = Runtime.rtl.get(ctx, res, 0);
				var s1 = Runtime.rtl.get(ctx, res, 1);
				var res = parser.parser_base.constructor.matchToken(ctx, parser, "{");
				parser = Runtime.rtl.get(ctx, res, 0);
				var res = this.readCssBody(ctx, parser);
				parser = Runtime.rtl.get(ctx, res, 0);
				var s2 = Runtime.rtl.get(ctx, res, 1);
				var res = parser.parser_base.constructor.matchToken(ctx, parser, "}");
				parser = Runtime.rtl.get(ctx, res, 0);
				css_str += use("Runtime.rtl").toStr(s1 + use("Runtime.rtl").toStr("{") + use("Runtime.rtl").toStr(s2) + use("Runtime.rtl").toStr("}"));
				/* Set pos, x, y */
				caret_start = parser.caret;
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
			}
			else if (ch == "{")
			{
				/* Add value */
				var __v3 = use("Runtime.rs");
				var value = __v3.substr(ctx, content.ref, start_pos, pos - start_pos);
				if (value != "")
				{
					css_str += use("Runtime.rtl").toStr(value);
				}
				/* Read CSS Block */
				var __v4 = use("Bayrell.Lang.Caret");
				var caret = new __v4(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos}));
				parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["caret"]), caret);
				var res = parser.parser_base.constructor.matchToken(ctx, parser, "{");
				parser = Runtime.rtl.get(ctx, res, 0);
				var res = parser.parser_base.constructor.readUntilStringArr(ctx, parser, use("Runtime.Collection").from(["}"]), false);
				parser = Runtime.rtl.get(ctx, res, 0);
				var s = Runtime.rtl.get(ctx, res, 1);
				var res = parser.parser_base.constructor.matchToken(ctx, parser, "}");
				parser = Runtime.rtl.get(ctx, res, 0);
				css_str += use("Runtime.rtl").toStr("{" + use("Runtime.rtl").toStr(s) + use("Runtime.rtl").toStr("}"));
				/* Set pos, x, y */
				caret_start = parser.caret;
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
			}
			else
			{
				x = parser.parser_base.constructor.nextX(ctx, parser, ch, x);
				y = parser.parser_base.constructor.nextY(ctx, parser, ch, y);
				pos = pos + 1;
			}
			var __v1 = use("Runtime.rs");
			ch = __v1.substr(ctx, content.ref, pos, 1);
		}
		/* Push item */
		var __v1 = use("Runtime.rs");
		var value = __v1.substr(ctx, content.ref, start_pos, pos - start_pos);
		var __v2 = use("Bayrell.Lang.Caret");
		var caret = new __v2(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos}));
		if (value != "")
		{
			css_str += use("Runtime.rtl").toStr(value);
		}
		parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["caret"]), caret);
		return use("Runtime.Collection").from([parser,css_str]);
	},
	/**
	 * Read css
	 */
	readCss: function(ctx, parser)
	{
		var caret_start = parser.caret;
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "@css");
		parser = Runtime.rtl.get(ctx, res, 0);
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "{");
		parser = Runtime.rtl.get(ctx, res, 0);
		var res = this.readCssBody(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		var css_str = Runtime.rtl.get(ctx, res, 1);
		var caret = parser.caret;
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "}");
		parser = Runtime.rtl.get(ctx, res, 0);
		var __v0 = use("Runtime.rs");
		css_str = __v0.replace(ctx, "\t", "", css_str);
		var __v1 = use("Runtime.rs");
		css_str = __v1.replace(ctx, "\n", "", css_str);
		var __v2 = use("Bayrell.Lang.OpCodes.OpString");
		var op_code = new __v2(ctx, use("Runtime.Dict").from({"caret_start":caret,"caret_end":parser.caret,"value":css_str}));
		return use("Runtime.Collection").from([parser,op_code]);
	},
	/**
	 * Read html value
	 */
	readHTMLValue: function(ctx, parser)
	{
		var item = null;
		var caret = parser.caret;
		var content = parser.content;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var __v0 = use("Runtime.rs");
		var ch = __v0.substr(ctx, content.ref, pos, 1);
		if (ch == "<")
		{
			var res = this.readHTMLTag(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			item = Runtime.rtl.get(ctx, res, 1);
		}
		else if (ch == "{")
		{
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "{");
			parser = Runtime.rtl.get(ctx, res, 0);
			var res = parser.parser_expression.constructor.readExpression(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			item = Runtime.rtl.get(ctx, res, 1);
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "}");
			parser = Runtime.rtl.get(ctx, res, 0);
		}
		else if (ch == "@")
		{
			x = parser.parser_base.constructor.nextX(ctx, parser, ch, x);
			y = parser.parser_base.constructor.nextY(ctx, parser, ch, y);
			pos = pos + 1;
			var __v1 = use("Runtime.rs");
			var ch3 = __v1.substr(ctx, content.ref, pos, 3);
			var __v2 = use("Runtime.rs");
			var ch4 = __v2.substr(ctx, content.ref, pos, 4);
			if (ch3 == "raw" || ch4 == "json" || ch4 == "html")
			{
				var res;
				if (ch3 == "raw")
				{
					res = parser.parser_base.constructor.next(ctx, parser, ch3, x, y, pos);
				}
				if (ch4 == "json")
				{
					res = parser.parser_base.constructor.next(ctx, parser, ch4, x, y, pos);
				}
				if (ch4 == "html")
				{
					res = parser.parser_base.constructor.next(ctx, parser, ch4, x, y, pos);
				}
				x = Runtime.rtl.get(ctx, res, 0);
				y = Runtime.rtl.get(ctx, res, 1);
				pos = Runtime.rtl.get(ctx, res, 2);
			}
			var __v3 = use("Bayrell.Lang.Caret");
			caret = new __v3(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos}));
			parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["caret"]), caret);
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "{");
			parser = Runtime.rtl.get(ctx, res, 0);
			var res = parser.parser_expression.constructor.readExpression(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			item = Runtime.rtl.get(ctx, res, 1);
			if (ch3 == "raw")
			{
				var __v4 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				var __v5 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				item = new __v4(ctx, use("Runtime.Dict").from({"kind":__v5.KIND_RAW,"value":item,"caret_start":caret,"caret_end":parser.caret}));
			}
			else if (ch4 == "json")
			{
				var __v6 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				var __v7 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				item = new __v6(ctx, use("Runtime.Dict").from({"kind":__v7.KIND_JSON,"value":item,"caret_start":caret,"caret_end":parser.caret}));
			}
			else if (ch4 == "html")
			{
				var __v8 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				var __v9 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				item = new __v8(ctx, use("Runtime.Dict").from({"kind":__v9.KIND_HTML,"value":item,"caret_start":caret,"caret_end":parser.caret}));
			}
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "}");
			parser = Runtime.rtl.get(ctx, res, 0);
		}
		return use("Runtime.Collection").from([parser,item]);
	},
	/**
	 * Read html attribute key
	 */
	readHTMLAttrKey: function(ctx, parser)
	{
		var token = null;
		var look = null;
		var ident = null;
		var key = "";
		/* Look token */
		var res = parser.parser_base.constructor.readToken(ctx, parser);
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content == "@")
		{
			parser = look;
			key = "@";
		}
		var res = parser.parser_base.constructor.readIdentifier(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		ident = Runtime.rtl.get(ctx, res, 1);
		key += use("Runtime.rtl").toStr(ident.value);
		/* Read attr */
		var res = parser.parser_base.constructor.readToken(ctx, parser);
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		while (token.content == "-")
		{
			var res = parser.parser_base.constructor.readIdentifier(ctx, look);
			parser = Runtime.rtl.get(ctx, res, 0);
			ident = Runtime.rtl.get(ctx, res, 1);
			key += use("Runtime.rtl").toStr("-" + use("Runtime.rtl").toStr(ident.value));
			/* Look next token */
			var res = parser.parser_base.constructor.readToken(ctx, parser);
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
		}
		/* Look token */
		var res = parser.parser_base.constructor.readToken(ctx, parser);
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content == ":")
		{
			parser = look;
			key += use("Runtime.rtl").toStr(":");
			var res = parser.parser_base.constructor.readIdentifier(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			ident = Runtime.rtl.get(ctx, res, 1);
			key += use("Runtime.rtl").toStr(ident.value);
		}
		return use("Runtime.Collection").from([parser,key]);
	},
	/**
	 * Read html attribute value
	 */
	readHTMLAttrValue: function(ctx, parser)
	{
		var token = null;
		var look = null;
		var op_code = null;
		var ident = null;
		/* Look token */
		var res = parser.parser_base.constructor.readToken(ctx, parser);
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content == "{")
		{
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "{");
			parser = Runtime.rtl.get(ctx, res, 0);
			var res = parser.parser_expression.constructor.readExpression(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			op_code = Runtime.rtl.get(ctx, res, 1);
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "}");
			parser = Runtime.rtl.get(ctx, res, 0);
		}
		else if (token.content == "@")
		{
			var res = this.readHTMLValue(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			op_code = Runtime.rtl.get(ctx, res, 1);
		}
		else if (token.content == "[")
		{
			var res = parser.parser_base.constructor.readCollection(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			op_code = Runtime.rtl.get(ctx, res, 1);
		}
		else
		{
			var res = parser.parser_base.constructor.readString(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			op_code = Runtime.rtl.get(ctx, res, 1);
		}
		return use("Runtime.Collection").from([parser,op_code]);
	},
	/**
	 * Read html attributes
	 */
	readHTMLAttrs: function(ctx, parser)
	{
		var __v0 = use("Runtime.Vector");
		var items = new __v0(ctx);
		var content = parser.content;
		var content_sz = parser.content_sz;
		var caret = parser.parser_base.constructor.skipChar(ctx, parser, content, parser.caret);
		var __v1 = use("Runtime.rs");
		var ch = __v1.substr(ctx, content.ref, caret.pos, 1);
		while (ch != "/" && ch != ">" && caret.pos < content_sz)
		{
			var caret_start = caret;
			parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["caret"]), caret);
			var res = this.readHTMLAttrKey(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			var key = Runtime.rtl.get(ctx, res, 1);
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "=");
			parser = Runtime.rtl.get(ctx, res, 0);
			var res = this.readHTMLAttrValue(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			var value = Runtime.rtl.get(ctx, res, 1);
			var __v2 = use("Bayrell.Lang.OpCodes.OpHtmlAttribute");
			items.push(ctx, new __v2(ctx, use("Runtime.Dict").from({"key":key,"value":value,"caret_start":caret_start,"caret_end":parser.caret})));
			caret = parser.parser_base.constructor.skipChar(ctx, parser, content, parser.caret);
			var __v3 = use("Runtime.rs");
			ch = __v3.substr(ctx, content.ref, caret.pos, 1);
			var __v4 = use("Runtime.rs");
			var ch2 = __v4.substr(ctx, content.ref, caret.pos, 2);
			if (ch2 == "/>")
			{
				break;
			}
		}
		return use("Runtime.Collection").from([parser,items.toCollection(ctx)]);
	},
	/**
	 * Read html template
	 */
	readHTMLContent: function(ctx, parser, end_tag)
	{
		var __v0 = use("Runtime.Vector");
		var items = new __v0(ctx);
		var item = null;
		var token = null;
		var look = null;
		var caret = null;
		var caret_start = parser.caret;
		var content = parser.content;
		var content_sz = parser.content_sz;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var start_pos = pos;
		var __v1 = use("Runtime.rs");
		var end_tag_sz = __v1.strlen(ctx, end_tag);
		var __v2 = use("Runtime.rs");
		var ch2 = __v2.substr(ctx, content.ref, pos, end_tag_sz);
		var flag_first = true;
		var first_html_tag = false;
		if (end_tag == "")
		{
			first_html_tag = true;
		}
		while ((end_tag == "" || end_tag != "" && ch2 != end_tag) && pos < content_sz)
		{
			var __v3 = use("Runtime.rs");
			var ch = __v3.substr(ctx, content.ref, pos, 1);
			var __v4 = use("Runtime.rs");
			var ch3 = __v4.substr(ctx, content.ref, pos, 3);
			var __v5 = use("Runtime.rs");
			var ch4 = __v5.substr(ctx, content.ref, pos, 4);
			var __v6 = use("Runtime.rs");
			var ch6 = __v6.substr(ctx, content.ref, pos, 6);
			/* If html or tag */
			if (ch == "<" || ch == "{" || ch == "@")
			{
				var __v7 = use("Runtime.rs");
				var value = __v7.substr(ctx, content.ref, start_pos, pos - start_pos);
				var __v8 = use("Bayrell.Lang.Caret");
				caret = new __v8(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos}));
				var __v9 = use("Runtime.rs");
				value = __v9.trim(ctx, value, "\t\r\n");
				if (flag_first && first_html_tag)
				{
					var __v10 = use("Runtime.rs");
					value = __v10.trim(ctx, value, " ");
				}
				if (value != "")
				{
					var __v10 = use("Bayrell.Lang.OpCodes.OpHtmlContent");
					item = new __v10(ctx, use("Runtime.Dict").from({"value":value,"caret_start":caret_start,"caret_end":caret}));
					items.push(ctx, item);
				}
				/* Read HTML Value */
				parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["caret"]), caret);
				var res = this.readHTMLValue(ctx, parser);
				parser = Runtime.rtl.get(ctx, res, 0);
				item = Runtime.rtl.get(ctx, res, 1);
				items.push(ctx, item);
				/* Set pos, x, y */
				caret_start = parser.caret;
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
			}
			else if (ch3 == "%if" || ch4 == "%for" || ch4 == "%var" || ch6 == "%while")
			{
				var __v10 = use("Runtime.rs");
				var value = __v10.substr(ctx, content.ref, start_pos, pos - start_pos);
				var __v11 = use("Bayrell.Lang.Caret");
				caret = new __v11(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos}));
				var __v12 = use("Runtime.rs");
				value = __v12.trim(ctx, value, "\t\r\n");
				var __v13 = use("Runtime.rs");
				value = __v13.trim(ctx, value, " ");
				if (value != "")
				{
					var __v14 = use("Bayrell.Lang.OpCodes.OpHtmlContent");
					item = new __v14(ctx, use("Runtime.Dict").from({"value":value,"caret_start":caret_start,"caret_end":caret}));
					items.push(ctx, item);
				}
				/* Read HTML Operator */
				parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["caret"]), caret);
				var res = this.readHTMLOperator(ctx, parser);
				parser = Runtime.rtl.get(ctx, res, 0);
				item = Runtime.rtl.get(ctx, res, 1);
				items.push(ctx, item);
				/* Set pos, x, y */
				caret_start = parser.caret;
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
			}
			else
			{
				if (first_html_tag && ch != " " && ch != "\t" && ch != "\r" && ch != "\n")
				{
					break;
				}
				x = parser.parser_base.constructor.nextX(ctx, parser, ch, x);
				y = parser.parser_base.constructor.nextY(ctx, parser, ch, y);
				pos = pos + 1;
			}
			var __v7 = use("Runtime.rs");
			ch2 = __v7.substr(ctx, content.ref, pos, end_tag_sz);
		}
		/* Push item */
		var __v3 = use("Runtime.rs");
		var value = __v3.substr(ctx, content.ref, start_pos, pos - start_pos);
		var __v4 = use("Runtime.rs");
		value = __v4.trim(ctx, value, "\t\r\n");
		var __v5 = use("Bayrell.Lang.Caret");
		caret = new __v5(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos}));
		if (first_html_tag)
		{
			var __v6 = use("Runtime.rs");
			value = __v6.trim(ctx, value, " ");
		}
		if (value != "")
		{
			var __v6 = use("Bayrell.Lang.OpCodes.OpHtmlContent");
			item = new __v6(ctx, use("Runtime.Dict").from({"value":value,"caret_start":caret_start,"caret_end":caret}));
			items.push(ctx, item);
		}
		return use("Runtime.Collection").from([parser.copy(ctx, use("Runtime.Dict").from({"caret":caret})),items]);
	},
	/**
	 * Read html tag
	 */
	readHTMLTag: function(ctx, parser)
	{
		var token = null;
		var look = null;
		var ident = null;
		var caret_items_start = null;
		var caret_items_end = null;
		var caret_start = parser.caret;
		var items = null;
		var op_code_name = null;
		var is_single_flag = false;
		var op_code_flag = false;
		var tag_name = "";
		/* Tag start */
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "<");
		parser = Runtime.rtl.get(ctx, res, 0);
		/* Look token */
		var res = parser.parser_base.constructor.readToken(ctx, parser);
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content == "{")
		{
			op_code_flag = true;
			var caret1 = parser.caret;
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "{");
			parser = Runtime.rtl.get(ctx, res, 0);
			var res = parser.parser_expression.constructor.readExpression(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			op_code_name = Runtime.rtl.get(ctx, res, 1);
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "}");
			parser = Runtime.rtl.get(ctx, res, 0);
			var caret2 = parser.caret;
			var __v0 = use("Runtime.rs");
			tag_name = __v0.substr(ctx, parser.content.ref, caret1.pos, caret2.pos - caret1.pos);
		}
		else if (token.content == ">")
		{
			op_code_flag = true;
			tag_name = "";
		}
		else
		{
			var res = parser.parser_base.constructor.readIdentifier(ctx, parser, false);
			parser = Runtime.rtl.get(ctx, res, 0);
			ident = Runtime.rtl.get(ctx, res, 1);
			tag_name = ident.value;
		}
		var res = this.readHTMLAttrs(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		var attrs = Runtime.rtl.get(ctx, res, 1);
		var res = parser.parser_base.constructor.readToken(ctx, parser);
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content == "/")
		{
			parser = look;
			is_single_flag = true;
		}
		var res = parser.parser_base.constructor.matchToken(ctx, parser, ">");
		parser = Runtime.rtl.get(ctx, res, 0);
		if (!is_single_flag)
		{
			/* Read items */
			caret_items_start = parser.caret;
			var res = this.readHTMLContent(ctx, parser, "</" + use("Runtime.rtl").toStr(tag_name));
			parser = Runtime.rtl.get(ctx, res, 0);
			var items = Runtime.rtl.get(ctx, res, 1);
			caret_items_end = parser.caret;
			/* Tag end */
			if (op_code_flag)
			{
				var res = parser.parser_base.constructor.matchToken(ctx, parser, "<");
				parser = Runtime.rtl.get(ctx, res, 0);
				var res = parser.parser_base.constructor.matchToken(ctx, parser, "/");
				parser = Runtime.rtl.get(ctx, res, 0);
				if (tag_name)
				{
					var res = parser.parser_base.constructor.matchString(ctx, parser, tag_name);
					parser = Runtime.rtl.get(ctx, res, 0);
				}
				var res = parser.parser_base.constructor.matchToken(ctx, parser, ">");
				parser = Runtime.rtl.get(ctx, res, 0);
			}
			else
			{
				var res = parser.parser_base.constructor.matchToken(ctx, parser, "<");
				parser = Runtime.rtl.get(ctx, res, 0);
				var res = parser.parser_base.constructor.matchToken(ctx, parser, "/");
				parser = Runtime.rtl.get(ctx, res, 0);
				if (ident != null)
				{
					var res = parser.parser_base.constructor.matchToken(ctx, parser, ident.value);
					parser = Runtime.rtl.get(ctx, res, 0);
				}
				var res = parser.parser_base.constructor.matchToken(ctx, parser, ">");
				parser = Runtime.rtl.get(ctx, res, 0);
			}
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlTag");
		var __v1 = use("Bayrell.Lang.OpCodes.OpHtmlItems");
		var op_code = new __v0(ctx, use("Runtime.Dict").from({"attrs":attrs,"tag_name":tag_name,"op_code_name":op_code_name,"caret_start":caret_start,"caret_end":parser.caret,"items":(items != null) ? (new __v1(ctx, use("Runtime.Dict").from({"caret_start":caret_items_start,"caret_end":caret_items_end,"items":items.toCollection(ctx)}))) : (null)}));
		return use("Runtime.Collection").from([parser,op_code]);
	},
	/**
	 * Read html operator
	 */
	readHTMLOperator: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(ctx, parser);
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content == "%if")
		{
			return parser.parser_operator.constructor.readIf(ctx, parser);
		}
		else if (token.content == "%for")
		{
			return parser.parser_operator.constructor.readFor(ctx, parser);
		}
		else if (token.content == "%while")
		{
			return parser.parser_operator.constructor.readWhile(ctx, parser);
		}
		else if (token.content == "%var")
		{
			var op_code = null;
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "%var");
			parser = Runtime.rtl.get(ctx, res, 0);
			var res = parser.parser_operator.constructor.readAssign(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			op_code = Runtime.rtl.get(ctx, res, 1);
			var res = parser.parser_base.constructor.matchToken(ctx, parser, ";");
			parser = Runtime.rtl.get(ctx, res, 0);
			return use("Runtime.Collection").from([parser,op_code]);
		}
		return use("Runtime.Collection").from([parser,null]);
	},
	/**
	 * Read html template
	 */
	readHTML: function(ctx, parser, end_tag)
	{
		if (end_tag == undefined) end_tag = "";
		var caret_start = parser.caret;
		/* Enable html flag */
		var save_is_html = parser.is_html;
		parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["is_html"]), true);
		var res = this.readHTMLContent(ctx, parser, end_tag);
		parser = Runtime.rtl.get(ctx, res, 0);
		var items = Runtime.rtl.get(ctx, res, 1);
		var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlItems");
		var op_code = new __v0(ctx, use("Runtime.Dict").from({"caret_start":caret_start,"caret_end":parser.caret,"items":items}));
		/* Disable html flag */
		parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["is_html"]), save_is_html);
		return use("Runtime.Collection").from([parser,op_code]);
	},
	/**
	 * Read html attributes
	 */
	readAttrs: function(ctx, parser)
	{
		var op_code = null;
		var token = null;
		var __v0 = use("Runtime.Map");
		var items = new __v0(ctx);
		var content = parser.content;
		var content_sz = parser.content_sz;
		var caret = parser.parser_base.constructor.skipChar(ctx, parser, content, parser.caret);
		var __v1 = use("Runtime.rs");
		var ch = __v1.substr(ctx, content.ref, caret.pos, 1);
		while (ch != "/" && ch != ">" && caret.pos < content_sz)
		{
			var res = parser.parser_base.constructor.readToken(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "=");
			parser = Runtime.rtl.get(ctx, res, 0);
			var res = parser.parser_base.constructor.readString(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			op_code = Runtime.rtl.get(ctx, res, 1);
			items.set(ctx, token.content, op_code.value);
			caret = parser.parser_base.constructor.skipChar(ctx, parser, content, parser.caret);
			var __v2 = use("Runtime.rs");
			ch = __v2.substr(ctx, content.ref, caret.pos, 1);
			var __v3 = use("Runtime.rs");
			var ch2 = __v3.substr(ctx, content.ref, caret.pos, 2);
			if (ch2 == "/>")
			{
				break;
			}
		}
		return use("Runtime.Collection").from([parser,items.toDict(ctx)]);
	},
	/**
	 * Read UI
	 */
	readUI: function(ctx, parser)
	{
		var __v0 = use("Runtime.Vector");
		var items = new __v0(ctx);
		var class_caret_start = parser.caret;
		var token = null;
		var class_name = "";
		var class_extends = "";
		var class_version = "";
		var item_name = "";
		var short_name = "";
		var full_name;
		/* Content */
		var content = parser.content;
		var content_sz = parser.content_sz;
		/* Read class header */
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "<");
		parser = Runtime.rtl.get(ctx, res, 0);
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "class");
		parser = Runtime.rtl.get(ctx, res, 0);
		var res = this.readAttrs(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		var attrs = Runtime.rtl.get(ctx, res, 1);
		class_name = attrs.get(ctx, "name", "");
		class_extends = attrs.get(ctx, "extends", "");
		class_version = attrs.get(ctx, "version", "");
		var res = parser.parser_base.constructor.matchToken(ctx, parser, ">");
		parser = Runtime.rtl.get(ctx, res, 0);
		var __v1 = use("Bayrell.Lang.OpCodes.OpTypeIdentifier");
		var __v2 = use("Bayrell.Lang.OpCodes.OpEntityName");
		var __v3 = use("Runtime.rs");
		var class_extend_op_code = new __v1(ctx, use("Runtime.Dict").from({"entity_name":new __v2(ctx, use("Runtime.Dict").from({"caret_start":class_caret_start,"caret_end":parser.caret,"names":__v3.split(ctx, "\\.", class_extends)})),"template":null,"caret_start":class_caret_start,"caret_end":parser.caret}));
		/* Read class body */
		var caret = parser.parser_base.constructor.skipChar(ctx, parser, content, parser.caret);
		var __v4 = use("Runtime.rs");
		var ch2 = __v4.substr(ctx, content.ref, caret.pos, 2);
		while (ch2 != "</" && caret.pos < content_sz)
		{
			var caret_start = parser.caret;
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "<");
			parser = Runtime.rtl.get(ctx, res, 0);
			var res = parser.parser_base.constructor.readToken(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			var item_token = Runtime.rtl.get(ctx, res, 1);
			item_name = item_token.content;
			var res = this.readAttrs(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			var item_attrs = Runtime.rtl.get(ctx, res, 1);
			if (item_name == "use")
			{
				full_name = item_attrs.get(ctx, "name", "");
				short_name = item_attrs.get(ctx, "as", "");
				if (short_name == "")
				{
					var __v5 = use("Runtime.rs");
					short_name = __v5.explode(ctx, ".", full_name).last(ctx);
				}
				parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["uses"]), parser.uses.setIm(ctx, short_name, full_name));
			}
			/* Read body */
			var res = parser.parser_base.constructor.readToken(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			if (token.content == ">")
			{
				if (item_name == "template")
				{
					var fn_name = item_attrs.get(ctx, "name", "render");
					var fn_args_str = item_attrs.get(ctx, "args", "");
					var parser2 = parser.constructor.setContent(ctx, parser, fn_args_str);
					var __v5 = use("Bayrell.Lang.Caret");
					parser2 = Runtime.rtl.setAttr(ctx, parser2, Runtime.Collection.from(["caret"]), new __v5(ctx, use("Runtime.Dict").from({})));
					/* Parse args */
					var fn_args = null;
					var res = parser.parser_operator.constructor.readDeclareFunctionArgs(ctx, parser2, false, false);
					parser2 = Runtime.rtl.get(ctx, res, 0);
					fn_args = Runtime.rtl.get(ctx, res, 1);
					/* Read template content */
					var save_vars = parser.vars;
					parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["vars"]), parser.vars.concat(ctx, parser2.vars));
					var res = this.readHTML(ctx, parser, "</template");
					parser = Runtime.rtl.get(ctx, res, 0);
					var expression = Runtime.rtl.get(ctx, res, 1);
					parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["vars"]), save_vars);
					/* Read template footer */
					var res = parser.parser_base.constructor.matchToken(ctx, parser, "<");
					parser = Runtime.rtl.get(ctx, res, 0);
					var res = parser.parser_base.constructor.matchToken(ctx, parser, "/");
					parser = Runtime.rtl.get(ctx, res, 0);
					var res = parser.parser_base.constructor.matchToken(ctx, parser, "template");
					parser = Runtime.rtl.get(ctx, res, 0);
					var res = parser.parser_base.constructor.matchToken(ctx, parser, ">");
					parser = Runtime.rtl.get(ctx, res, 0);
					var __v6 = use("Bayrell.Lang.OpCodes.OpDeclareFunction");
					var __v7 = use("Bayrell.Lang.OpCodes.OpFlags");
					items.push(ctx, new __v6(ctx, use("Runtime.Dict").from({"args":fn_args,"vars":use("Runtime.Collection").from([]),"flags":new __v7(ctx, use("Runtime.Dict").from({"p_static":true,"p_pure":true})),"name":fn_name,"is_context":false,"result_type":"html","expression":expression,"items":null,"caret_start":caret_start,"caret_end":parser.caret})));
				}
				else if (item_name == "style")
				{
					var res = this.readCssBody(ctx, parser);
					parser = Runtime.rtl.get(ctx, res, 0);
					var css_body = Runtime.rtl.get(ctx, res, 1);
					/* Read style footer */
					var res = parser.parser_base.constructor.matchToken(ctx, parser, "<");
					parser = Runtime.rtl.get(ctx, res, 0);
					var res = parser.parser_base.constructor.matchToken(ctx, parser, "/");
					parser = Runtime.rtl.get(ctx, res, 0);
					var res = parser.parser_base.constructor.matchToken(ctx, parser, "style");
					parser = Runtime.rtl.get(ctx, res, 0);
					var res = parser.parser_base.constructor.matchToken(ctx, parser, ">");
					parser = Runtime.rtl.get(ctx, res, 0);
					var __v8 = use("Bayrell.Lang.OpCodes.OpDeclareFunction");
					var __v9 = use("Bayrell.Lang.OpCodes.OpFlags");
					var __v10 = use("Bayrell.Lang.OpCodes.OpString");
					items.push(ctx, new __v8(ctx, use("Runtime.Dict").from({"args":use("Runtime.Collection").from([]),"vars":use("Runtime.Collection").from([]),"flags":new __v9(ctx, use("Runtime.Dict").from({"p_static":true,"p_pure":true})),"name":"css","is_context":false,"result_type":"html","expression":new __v10(ctx, use("Runtime.Dict").from({"caret_start":caret_start,"caret_end":parser.caret,"value":css_body})),"items":null,"caret_start":caret_start,"caret_end":parser.caret})));
				}
				else if (item_name == "script")
				{
					var res = parser.parser_program.constructor.readClassBody(ctx, parser, "</");
					parser = Runtime.rtl.get(ctx, res, 0);
					var arr = Runtime.rtl.get(ctx, res, 1);
					items = items.appendCollectionIm(ctx, arr);
					/* Read script footer */
					var res = parser.parser_base.constructor.matchToken(ctx, parser, "<");
					parser = Runtime.rtl.get(ctx, res, 0);
					var res = parser.parser_base.constructor.matchToken(ctx, parser, "/");
					parser = Runtime.rtl.get(ctx, res, 0);
					var res = parser.parser_base.constructor.matchToken(ctx, parser, "script");
					parser = Runtime.rtl.get(ctx, res, 0);
					var res = parser.parser_base.constructor.matchToken(ctx, parser, ">");
					parser = Runtime.rtl.get(ctx, res, 0);
				}
				else
				{
					var __v11 = use("Bayrell.Lang.Exceptions.ParserError");
					throw new __v11(ctx, "Unknown identifier '" + use("Runtime.rtl").toStr(item_name) + use("Runtime.rtl").toStr("'"), item_token.caret_start, parser.file_name)
				}
			}
			else if (token.content == "/")
			{
				var res = parser.parser_base.constructor.matchToken(ctx, parser, ">");
				parser = Runtime.rtl.get(ctx, res, 0);
			}
			else
			{
				var __v5 = use("Bayrell.Lang.Exceptions.ParserError");
				throw new __v5(ctx, "Unknown identifier '" + use("Runtime.rtl").toStr(token.content) + use("Runtime.rtl").toStr("'"), token.caret_start, parser.file_name)
			}
			caret = parser.parser_base.constructor.skipChar(ctx, parser, content, parser.caret);
			var __v5 = use("Runtime.rs");
			ch2 = __v5.substr(ctx, content.ref, caret.pos, 2);
		}
		/* Read class footer */
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "<");
		parser = Runtime.rtl.get(ctx, res, 0);
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "/");
		parser = Runtime.rtl.get(ctx, res, 0);
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "class");
		parser = Runtime.rtl.get(ctx, res, 0);
		var res = parser.parser_base.constructor.matchToken(ctx, parser, ">");
		parser = Runtime.rtl.get(ctx, res, 0);
		/* Analyze class body */
		var class_body = parser.parser_program.constructor.classBodyAnalyze(ctx, parser, items);
		var __v5 = use("Runtime.rs");
		var class_name_arr = __v5.split(ctx, "\\.", class_name);
		class_name = class_name_arr.last(ctx);
		class_name_arr = class_name_arr.removeLastIm(ctx);
		var __v6 = use("Bayrell.Lang.OpCodes.OpModule");
		var __v7 = use("Bayrell.Lang.OpCodes.OpNamespace");
		var __v8 = use("Runtime.rs");
		var __v9 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		var __v10 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		return use("Runtime.Collection").from([parser,new __v6(ctx, use("Runtime.Dict").from({"uses":parser.uses.toDict(ctx),"items":use("Runtime.Collection").from([new __v7(ctx, use("Runtime.Dict").from({"name":__v8.join(ctx, ".", class_name_arr)})),new __v9(ctx, use("Runtime.Dict").from({"kind":__v10.KIND_CLASS,"name":class_name,"is_static":true,"is_declare":false,"class_extends":class_extend_op_code,"class_implements":null,"annotations":use("Runtime.Collection").from([]),"template":null,"vars":class_body.item(ctx, "vars"),"functions":class_body.item(ctx, "functions"),"fn_create":class_body.item(ctx, "fn_create"),"fn_destroy":class_body.item(ctx, "fn_destroy"),"items":class_body.item(ctx, "items"),"caret_start":class_caret_start,"caret_end":parser.caret}))]),"caret_start":class_caret_start,"caret_end":parser.caret}))]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayHtml";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangBay.ParserBayHtml",
			"name": "Bayrell.Lang.LangBay.ParserBayHtml",
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
});use.add(Bayrell.Lang.LangBay.ParserBayHtml);
module.exports = Bayrell.Lang.LangBay.ParserBayHtml;