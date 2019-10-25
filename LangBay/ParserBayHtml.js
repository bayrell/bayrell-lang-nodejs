"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
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
Bayrell.Lang.LangBay.ParserBayHtml = function(__ctx)
{
	use("Runtime.CoreObject").apply(this, arguments);
};
Bayrell.Lang.LangBay.ParserBayHtml.prototype = Object.create(use("Runtime.CoreObject").prototype);
Bayrell.Lang.LangBay.ParserBayHtml.prototype.constructor = Bayrell.Lang.LangBay.ParserBayHtml;
Object.assign(Bayrell.Lang.LangBay.ParserBayHtml.prototype,
{
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.LangBay.ParserBayHtml"))
		{
		}
		use("Runtime.CoreObject").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		use("Runtime.CoreObject").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		return use("Runtime.CoreObject").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Bayrell.Lang.LangBay.ParserBayHtml";
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayHtml, use("Runtime.CoreObject"));
Object.assign(Bayrell.Lang.LangBay.ParserBayHtml,
{
	/**
	 * Read css selector
	 */
	readCssSelector: function(__ctx, parser)
	{
		var content = parser.content;
		var content_sz = parser.content_sz;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var class_name = parser.current_namespace_name + use("Runtime.rtl").toStr(".") + use("Runtime.rtl").toStr(parser.current_class_name);
		var __v0 = use("Runtime.rs");
		var ch = __v0.substr(__ctx, content.ref, pos, 1);
		if (ch == "(")
		{
			pos = pos + 1;
			x = parser.parser_base.constructor.nextX(__ctx, parser, ch, x);
			y = parser.parser_base.constructor.nextY(__ctx, parser, ch, y);
			var start_pos = pos;
			while (pos < content_sz && ch != ")")
			{
				pos = pos + 1;
				x = parser.parser_base.constructor.nextX(__ctx, parser, ch, x);
				y = parser.parser_base.constructor.nextY(__ctx, parser, ch, y);
				var __v0 = use("Runtime.rs");
				ch = __v0.substr(__ctx, content.ref, pos, 1);
			}
			var __v0 = use("Runtime.rs");
			class_name = __v0.substr(__ctx, content.ref, start_pos, pos - start_pos);
			if (parser.uses.has(__ctx, class_name))
			{
				class_name = parser.uses.item(__ctx, class_name);
			}
			pos = pos + 1;
			x = parser.parser_base.constructor.nextX(__ctx, parser, ch, x);
			y = parser.parser_base.constructor.nextY(__ctx, parser, ch, y);
		}
		var start_pos = pos;
		var __v0 = use("Runtime.rs");
		ch = __v0.substr(__ctx, content.ref, pos, 1);
		while (pos < content_sz && ch != " " && ch != "," && ch != "." && ch != ":" && ch != "[" && ch != "{")
		{
			pos = pos + 1;
			x = parser.parser_base.constructor.nextX(__ctx, parser, ch, x);
			y = parser.parser_base.constructor.nextY(__ctx, parser, ch, y);
			var __v0 = use("Runtime.rs");
			ch = __v0.substr(__ctx, content.ref, pos, 1);
		}
		var __v0 = use("Runtime.rs");
		var postfix = __v0.substr(__ctx, content.ref, start_pos, pos - start_pos);
		var __v0 = use("Runtime.RuntimeUtils");
		var selector = "." + use("Runtime.rtl").toStr(postfix) + use("Runtime.rtl").toStr("-") + use("Runtime.rtl").toStr(__v0.getCssHash(__ctx, class_name));
		var __v0 = use("Bayrell.Lang.Caret");
		var caret = new __v0(__ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos}));
		parser = parser.copy(__ctx, { "caret": caret });
		return use("Runtime.Collection").from([parser,selector]);
	},
	/**
	 * Read css
	 */
	readCss: function(__ctx, parser)
	{
		var caret_start = parser.caret.clone(__ctx);
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, "@css");
		parser = res[0];
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, "{");
		parser = res[0];
		var css_str = "";
		var content = parser.content;
		var content_sz = parser.content_sz;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var bracket_level = 0;
		var start_pos = pos;
		var __v0 = use("Runtime.rs");
		var ch = __v0.substr(__ctx, content.ref, pos, 1);
		while (pos < content_sz && (ch != "}" || ch == "}" && bracket_level > 0))
		{
			/* If html or  tag */
			if (ch == "%")
			{
				x = parser.parser_base.constructor.nextX(__ctx, parser, ch, x);
				y = parser.parser_base.constructor.nextY(__ctx, parser, ch, y);
				pos = pos + 1;
				/* Add value */
				var __v0 = use("Runtime.rs");
				var value = __v0.substr(__ctx, content.ref, start_pos, pos - start_pos - 1);
				if (value != "")
				{
					css_str += use("Runtime.rtl").toStr(value);
				}
				/* Read CSS Selector */
				var __v0 = use("Bayrell.Lang.Caret");
				var caret = new __v0(__ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos}));
				parser = parser.copy(__ctx, { "caret": caret });
				var res = this.readCssSelector(__ctx, parser);
				parser = res[0];
				var s = res[1];
				css_str += use("Runtime.rtl").toStr(s);
				/* Set pos, x, y */
				caret_start = parser.caret.clone(__ctx);
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
			}
			else if (ch == "{")
			{
				/* Add value */
				var __v0 = use("Runtime.rs");
				var value = __v0.substr(__ctx, content.ref, start_pos, pos - start_pos);
				if (value != "")
				{
					css_str += use("Runtime.rtl").toStr(value);
				}
				/* Read CSS Block */
				var __v0 = use("Bayrell.Lang.Caret");
				var caret = new __v0(__ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos}));
				parser = parser.copy(__ctx, { "caret": caret });
				var res = parser.parser_base.constructor.matchToken(__ctx, parser, "{");
				parser = res[0];
				var res = parser.parser_base.constructor.readUntilStringArr(__ctx, parser, use("Runtime.Collection").from(["}"]), false);
				parser = res[0];
				var s = res[1];
				var res = parser.parser_base.constructor.matchToken(__ctx, parser, "}");
				parser = res[0];
				css_str += use("Runtime.rtl").toStr("{" + use("Runtime.rtl").toStr(s) + use("Runtime.rtl").toStr("}"));
				/* Set pos, x, y */
				caret_start = parser.caret.clone(__ctx);
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
			}
			else
			{
				x = parser.parser_base.constructor.nextX(__ctx, parser, ch, x);
				y = parser.parser_base.constructor.nextY(__ctx, parser, ch, y);
				pos = pos + 1;
			}
			var __v0 = use("Runtime.rs");
			ch = __v0.substr(__ctx, content.ref, pos, 1);
		}
		/* Push item */
		var __v0 = use("Runtime.rs");
		var value = __v0.substr(__ctx, content.ref, start_pos, pos - start_pos);
		var __v0 = use("Bayrell.Lang.Caret");
		var caret = new __v0(__ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos}));
		if (value != "")
		{
			css_str += use("Runtime.rtl").toStr(value);
		}
		parser = parser.copy(__ctx, { "caret": caret });
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, "}");
		parser = res[0];
		var __v0 = use("Runtime.rs");
		css_str = __v0.replace(__ctx, "\t", "", css_str);
		var __v0 = use("Runtime.rs");
		css_str = __v0.replace(__ctx, "\n", "", css_str);
		var __v0 = use("Bayrell.Lang.OpCodes.OpString");
		var op_code = new __v0(__ctx, use("Runtime.Dict").from({"caret_start":caret,"caret_end":parser.caret.clone(__ctx),"value":css_str}));
		return use("Runtime.Collection").from([parser,op_code]);
	},
	/**
	 * Read html value
	 */
	readHTMLValue: function(__ctx, parser)
	{
		var item = null;
		var caret = parser.caret.clone(__ctx);
		var content = parser.content;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var __v0 = use("Runtime.rs");
		var ch = __v0.substr(__ctx, content.ref, pos, 1);
		if (ch == "<")
		{
			var res = this.readHTMLTag(__ctx, parser);
			parser = res[0];
			item = res[1];
		}
		else if (ch == "{")
		{
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, "{");
			parser = res[0];
			var res = parser.parser_expression.constructor.readExpression(__ctx, parser);
			parser = res[0];
			item = res[1];
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, "}");
			parser = res[0];
		}
		else if (ch == "@")
		{
			x = parser.parser_base.constructor.nextX(__ctx, parser, ch, x);
			y = parser.parser_base.constructor.nextY(__ctx, parser, ch, y);
			pos = pos + 1;
			var __v0 = use("Runtime.rs");
			var ch3 = __v0.substr(__ctx, content.ref, pos, 3);
			var __v0 = use("Runtime.rs");
			var ch4 = __v0.substr(__ctx, content.ref, pos, 4);
			if (ch3 == "raw" || ch4 == "json")
			{
				var res;
				if (ch3 == "raw")
				{
					res = parser.parser_base.constructor.next(__ctx, parser, ch3, x, y, pos);
				}
				if (ch4 == "json")
				{
					res = parser.parser_base.constructor.next(__ctx, parser, ch4, x, y, pos);
				}
				x = res[0];
				y = res[1];
				pos = res[2];
			}
			var __v0 = use("Bayrell.Lang.Caret");
			caret = new __v0(__ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos}));
			parser = parser.copy(__ctx, { "caret": caret });
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, "{");
			parser = res[0];
			var res = parser.parser_expression.constructor.readExpression(__ctx, parser);
			parser = res[0];
			item = res[1];
			if (ch3 == "raw")
			{
				var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				var __v1 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				item = new __v0(__ctx, use("Runtime.Dict").from({"kind":__v1.KIND_RAW,"value":item,"caret_start":caret,"caret_end":parser.caret.clone(__ctx)}));
			}
			else if (ch4 == "json")
			{
				var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				var __v1 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				item = new __v0(__ctx, use("Runtime.Dict").from({"kind":__v1.KIND_JSON,"value":item,"caret_start":caret,"caret_end":parser.caret.clone(__ctx)}));
			}
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, "}");
			parser = res[0];
		}
		return use("Runtime.Collection").from([parser,item]);
	},
	/**
	 * Read html attribute key
	 */
	readHTMLAttrKey: function(__ctx, parser)
	{
		var token = null;
		var look = null;
		var ident = null;
		var key = "";
		/* Look token */
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content == "@")
		{
			parser = look.clone(__ctx);
			key = "@";
		}
		var res = parser.parser_base.constructor.readIdentifier(__ctx, parser);
		parser = res[0];
		ident = res[1];
		key += use("Runtime.rtl").toStr(ident.value);
		/* Look token */
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content == ":")
		{
			parser = look.clone(__ctx);
			key += use("Runtime.rtl").toStr(":");
			var res = parser.parser_base.constructor.readIdentifier(__ctx, parser);
			parser = res[0];
			ident = res[1];
			key += use("Runtime.rtl").toStr(ident.value);
		}
		return use("Runtime.Collection").from([parser,key]);
	},
	/**
	 * Read html attribute value
	 */
	readHTMLAttrValue: function(__ctx, parser)
	{
		var token = null;
		var look = null;
		var op_code = null;
		var ident = null;
		/* Look token */
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content == "{")
		{
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, "{");
			parser = res[0];
			var res = parser.parser_expression.constructor.readExpression(__ctx, parser);
			parser = res[0];
			op_code = res[1];
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, "}");
			parser = res[0];
		}
		else if (token.content == "@")
		{
			var res = this.readHTMLValue(__ctx, parser);
			parser = res[0];
			op_code = res[1];
		}
		else
		{
			var res = parser.parser_base.constructor.readString(__ctx, parser);
			parser = res[0];
			op_code = res[1];
		}
		return use("Runtime.Collection").from([parser,op_code]);
	},
	/**
	 * Read html attributes
	 */
	readHTMLAttrs: function(__ctx, parser)
	{
		var __v0 = use("Runtime.Vector");
		var items = new __v0(__ctx);
		var content = parser.content;
		var content_sz = parser.content_sz;
		var caret = parser.parser_base.constructor.skipChar(__ctx, parser, content.ref, parser.caret.clone(__ctx));
		var __v0 = use("Runtime.rs");
		var ch = __v0.substr(__ctx, content.ref, caret.pos, 1);
		while (ch != ">" && caret.pos < content_sz)
		{
			var caret_start = caret;
			var res = this.readHTMLAttrKey(__ctx, parser);
			parser = res[0];
			var key = res[1];
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, "=");
			parser = res[0];
			var res = this.readHTMLAttrValue(__ctx, parser);
			parser = res[0];
			var value = res[1];
			var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlAttribute");
			items.push(__ctx, new __v0(__ctx, use("Runtime.Dict").from({"key":key,"value":value,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)})));
			caret = parser.parser_base.constructor.skipChar(__ctx, parser, content.ref, parser.caret.clone(__ctx));
			var __v0 = use("Runtime.rs");
			ch = __v0.substr(__ctx, content.ref, caret.pos, 1);
			var __v0 = use("Runtime.rs");
			var ch2 = __v0.substr(__ctx, content.ref, caret.pos, 2);
			if (ch2 == "/>")
			{
				break;
			}
		}
		return use("Runtime.Collection").from([parser,items.toCollection(__ctx)]);
	},
	/**
	 * Read html template
	 */
	readHTMLContent: function(__ctx, parser, end_tag)
	{
		var __v0 = use("Runtime.Vector");
		var items = new __v0(__ctx);
		var item = null;
		var token = null;
		var look = null;
		var caret = null;
		var caret_start = parser.caret.clone(__ctx);
		var content = parser.content;
		var content_sz = parser.content_sz;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var start_pos = pos;
		var __v0 = use("Runtime.rs");
		var end_tag_sz = __v0.strlen(__ctx, end_tag);
		var __v0 = use("Runtime.rs");
		var ch2 = __v0.substr(__ctx, content.ref, pos, end_tag_sz);
		while (ch2 != end_tag && pos < content_sz)
		{
			var __v0 = use("Runtime.rs");
			var ch = __v0.substr(__ctx, content.ref, pos, 1);
			/* If html or  tag */
			if (ch == "<" || ch == "{" || ch == "@")
			{
				var __v0 = use("Runtime.rs");
				var value = __v0.substr(__ctx, content.ref, start_pos, pos - start_pos);
				var __v0 = use("Bayrell.Lang.Caret");
				caret = new __v0(__ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos}));
				var __v0 = use("Runtime.rs");
				value = __v0.trim(__ctx, value, "\t\r\n");
				if (value != "")
				{
					var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlContent");
					item = new __v0(__ctx, use("Runtime.Dict").from({"value":value,"caret_start":caret_start,"caret_end":caret}));
					items.push(__ctx, item);
				}
				/* Read HTML Value */
				parser = parser.copy(__ctx, { "caret": caret });
				var res = this.readHTMLValue(__ctx, parser);
				parser = res[0];
				item = res[1];
				items.push(__ctx, item);
				/* Set pos, x, y */
				caret_start = parser.caret.clone(__ctx);
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
			}
			else
			{
				x = parser.parser_base.constructor.nextX(__ctx, parser, ch, x);
				y = parser.parser_base.constructor.nextY(__ctx, parser, ch, y);
				pos = pos + 1;
			}
			var __v0 = use("Runtime.rs");
			ch2 = __v0.substr(__ctx, content.ref, pos, end_tag_sz);
		}
		/* Push item */
		var __v0 = use("Runtime.rs");
		var value = __v0.substr(__ctx, content.ref, start_pos, pos - start_pos);
		var __v0 = use("Runtime.rs");
		value = __v0.trim(__ctx, value, "\t\r\n");
		var __v0 = use("Bayrell.Lang.Caret");
		caret = new __v0(__ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos}));
		if (value != "")
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlContent");
			item = new __v0(__ctx, use("Runtime.Dict").from({"value":value,"caret_start":caret_start,"caret_end":caret}));
			items.push(__ctx, item);
		}
		return use("Runtime.Collection").from([parser.copy(__ctx, use("Runtime.Dict").from({"caret":caret})),items]);
	},
	/**
	 * Read html tag
	 */
	readHTMLTag: function(__ctx, parser)
	{
		var token = null;
		var look = null;
		var ident = null;
		var caret_items_start = null;
		var caret_items_end = null;
		var caret_start = parser.caret.clone(__ctx);
		var items = null;
		var op_code_name = null;
		var is_single_flag = false;
		var op_code_flag = false;
		var tag_name = "";
		/* Tag start */
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, "<");
		parser = res[0];
		/* Look token */
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content == "{")
		{
			op_code_flag = true;
			var caret1 = parser.caret.clone(__ctx);
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, "{");
			parser = res[0];
			var res = parser.parser_expression.constructor.readExpression(__ctx, parser);
			parser = res[0];
			op_code_name = res[1];
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, "}");
			parser = res[0];
			var caret2 = parser.caret.clone(__ctx);
			var __v0 = use("Runtime.rs");
			tag_name = __v0.substr(__ctx, parser.content.ref, caret1.pos, caret2.pos - caret1.pos);
		}
		else
		{
			var res = parser.parser_base.constructor.readIdentifier(__ctx, parser, false);
			parser = res[0];
			ident = res[1];
			tag_name = ident.value;
		}
		var res = this.readHTMLAttrs(__ctx, parser);
		parser = res[0];
		var attrs = res[1];
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content == "/")
		{
			parser = look.clone(__ctx);
			is_single_flag = true;
		}
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, ">");
		parser = res[0];
		if (!is_single_flag)
		{
			/* Read items */
			caret_items_start = parser.caret.clone(__ctx);
			var res = this.readHTMLContent(__ctx, parser, "</" + use("Runtime.rtl").toStr(tag_name));
			parser = res[0];
			var items = res[1];
			caret_items_end = parser.caret.clone(__ctx);
			/* Tag end */
			if (op_code_flag)
			{
				var res = parser.parser_base.constructor.matchToken(__ctx, parser, "<");
				parser = res[0];
				var res = parser.parser_base.constructor.matchToken(__ctx, parser, "/");
				parser = res[0];
				var res = parser.parser_base.constructor.matchString(__ctx, parser, tag_name);
				parser = res[0];
				var res = parser.parser_base.constructor.matchToken(__ctx, parser, ">");
				parser = res[0];
			}
			else
			{
				var res = parser.parser_base.constructor.matchToken(__ctx, parser, "<");
				parser = res[0];
				var res = parser.parser_base.constructor.matchToken(__ctx, parser, "/");
				parser = res[0];
				var res = parser.parser_base.constructor.matchToken(__ctx, parser, ident.value);
				parser = res[0];
				var res = parser.parser_base.constructor.matchToken(__ctx, parser, ">");
				parser = res[0];
			}
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlTag");
		var __v1 = use("Bayrell.Lang.OpCodes.OpHtmlItems");
		var op_code = new __v0(__ctx, use("Runtime.Dict").from({"attrs":attrs,"tag_name":tag_name,"op_code_name":op_code_name,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx),"items":(items != null) ? new __v1(__ctx, use("Runtime.Dict").from({"caret_start":caret_items_start,"caret_end":caret_items_end,"items":items.toCollection(__ctx)})) : null}));
		return use("Runtime.Collection").from([parser,op_code]);
	},
	/**
	 * Read html template
	 */
	readHTML: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var __v0 = use("Runtime.Vector");
		var items = new __v0(__ctx);
		var caret_start = parser.caret.clone(__ctx);
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		var __v0 = use("Runtime.rs");
		var ch2 = __v0.substr(__ctx, parser.content.ref, parser.caret.pos, 2);
		while (!token.eof && token.content == "<" && ch2 != "</")
		{
			var res = this.readHTMLTag(__ctx, parser);
			parser = res[0];
			var op_code = res[1];
			items.push(__ctx, op_code);
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			var caret = parser.parser_base.constructor.skipChar(__ctx, parser, parser.content, parser.caret.clone(__ctx));
			var __v0 = use("Runtime.rs");
			ch2 = __v0.substr(__ctx, parser.content.ref, caret.pos, 2);
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlItems");
		var op_code = new __v0(__ctx, use("Runtime.Dict").from({"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx),"items":items.toCollection(__ctx)}));
		return use("Runtime.Collection").from([parser,op_code]);
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
		return "Runtime.CoreObject";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangBay.ParserBayHtml",
			"name": "Bayrell.Lang.LangBay.ParserBayHtml",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(__ctx,field_name)
	{
		return null;
	},
	getMethodsList: function(__ctx)
	{
		var a = [
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(__ctx,field_name)
	{
		return null;
	},
});use.add(Bayrell.Lang.LangBay.ParserBayHtml);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangBay == undefined) module.exports.Bayrell.Lang.LangBay = {};
module.exports.Bayrell.Lang.LangBay.ParserBayHtml = Bayrell.Lang.LangBay.ParserBayHtml;