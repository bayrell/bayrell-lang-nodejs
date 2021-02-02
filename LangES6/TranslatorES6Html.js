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
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangES6 == 'undefined') Bayrell.Lang.LangES6 = {};
Bayrell.Lang.LangES6.TranslatorES6Html = function(ctx)
{
};
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Html.prototype,
{
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Html";
	},
});
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Html,
{
	/**
	 * Is component
	 */
	isComponent: function(ctx, tag_name)
	{
		if (tag_name == "")
		{
			return false;
		}
		var __v0 = use("Runtime.rs");
		var ch1 = __v0.substr(ctx, tag_name, 0, 1);
		var __v1 = use("Runtime.rs");
		var ch2 = __v1.strtoupper(ctx, ch1);
		return ch1 == "{" || ch1 == ch2;
	},
	/**
	 * Translator html value
	 */
	OpHtmlAttr: function(ctx, t, attr, item_pos)
	{
		var op_code = attr.value;
		var __v0 = use("Bayrell.Lang.OpCodes.OpString");
		if (attr instanceof __v0)
		{
			return use("Runtime.Collection").from([t,t.expression.constructor.toString(ctx, op_code.value)]);
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
		if (op_code instanceof __v0)
		{
			var __v1 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
			var __v2 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
			if (op_code.kind == __v1.KIND_RAW)
			{
				var res = t.expression.constructor.Expression(ctx, t, op_code.value);
				t = Runtime.rtl.get(ctx, res, 0);
				var value = Runtime.rtl.get(ctx, res, 1);
				return use("Runtime.Collection").from([t,value]);
			}
			else if (op_code.kind == __v2.KIND_JSON)
			{
				var res = t.expression.constructor.Expression(ctx, t, op_code.value);
				t = Runtime.rtl.get(ctx, res, 0);
				var value = Runtime.rtl.get(ctx, res, 1);
				value = "this.json_encode(ctx, " + use("Runtime.rtl").toStr(value) + use("Runtime.rtl").toStr(")");
				return use("Runtime.Collection").from([t,value]);
			}
		}
		var res = t.expression.constructor.Expression(ctx, t, op_code);
		t = Runtime.rtl.get(ctx, res, 0);
		var value = Runtime.rtl.get(ctx, res, 1);
		value = t.o(ctx, value, Runtime.rtl.get(ctx, res, 0).opcode_level, 13);
		return use("Runtime.Collection").from([t,value]);
	},
	/**
	 * Translator html template
	 */
	OpHtmlAttrs: function(ctx, t, attrs, item_pos)
	{
		var __v0 = use("Runtime.Vector");
		var attr_class = new __v0(ctx);
		var attr_s = "null";
		var attr_key_value = "";
		var attr_elem_name = "";
		var has_attr_key = false;
		var res_attrs = attrs.map(ctx, (ctx, attr) => 
		{
			if (attr.is_spread)
			{
				return "";
			}
			var res = this.OpHtmlAttr(ctx, t, attr);
			t = Runtime.rtl.get(ctx, res, 0);
			var attr_value = Runtime.rtl.get(ctx, res, 1);
			var attr_key = attr.key;
			var __v1 = use("Runtime.rs");
			var ch = __v1.substr(ctx, attr_key, 0, 1);
			var __v2 = use("Runtime.rs");
			var __v4 = use("Runtime.rs");
			if (attr_key == "class")
			{
				attr_class.push(ctx, attr_value);
				var __v2 = use("Bayrell.Lang.OpCodes.OpString");
				if (attr_elem_name == "" && attr.value instanceof __v2)
				{
					var __v3 = use("Runtime.rs");
					var arr = __v3.split(ctx, " ", attr.value.value);
					attr_elem_name = t.expression.constructor.toString(ctx, Runtime.rtl.get(ctx, arr, 0));
				}
				return "";
			}
			else if (attr_key == "@key")
			{
				var res = this.OpHtmlAttr(ctx, t, attr);
				t = Runtime.rtl.get(ctx, res, 0);
				attr_value = Runtime.rtl.get(ctx, res, 1);
				attr_key_value = attr_value;
				return "";
			}
			else if (__v2.substr(ctx, attr_key, 0, 7) == "@event:")
			{
				var __v3 = use("Runtime.rs");
				var event_name = __v3.substr(ctx, attr_key, 7);
				event_name = t.expression.constructor.findModuleName(ctx, t, event_name);
				attr_key = "@event:" + use("Runtime.rtl").toStr(event_name);
				attr_value = "[" + use("Runtime.rtl").toStr(t.expression.constructor.toString(ctx, t.current_class_full_name)) + use("Runtime.rtl").toStr(",") + use("Runtime.rtl").toStr(attr_value) + use("Runtime.rtl").toStr("]");
			}
			else if (__v4.substr(ctx, attr_key, 0, 12) == "@eventAsync:")
			{
				var __v5 = use("Runtime.rs");
				var event_name = __v5.substr(ctx, attr_key, 12);
				event_name = t.expression.constructor.findModuleName(ctx, t, event_name);
				attr_key = "@eventAsync:" + use("Runtime.rtl").toStr(event_name);
				attr_value = "[" + use("Runtime.rtl").toStr(t.expression.constructor.toString(ctx, t.current_class_full_name)) + use("Runtime.rtl").toStr(",") + use("Runtime.rtl").toStr(attr_value) + use("Runtime.rtl").toStr("]");
			}
			else if (attr_key == "@ref" || attr_key == "@bind" || attr_key == "@name")
			{
				attr_value = "[" + use("Runtime.rtl").toStr(t.expression.constructor.toString(ctx, t.current_class_full_name)) + use("Runtime.rtl").toStr(",") + use("Runtime.rtl").toStr(attr_value) + use("Runtime.rtl").toStr("]");
			}
			return t.expression.constructor.toString(ctx, attr_key) + use("Runtime.rtl").toStr(":") + use("Runtime.rtl").toStr(attr_value);
		});
		res_attrs = res_attrs.filter(ctx, (ctx, s) => 
		{
			return s != "";
		});
		if (attr_class.count(ctx) > 0)
		{
			attr_class.push(ctx, "this.getCssHash(ctx)");
			/*attr_class.push( t.expression::toString("h-" ~ ParserBayHtml::getCssHash(t.current_class_full_name)) );*/
			var __v1 = use("Runtime.rs");
			res_attrs = res_attrs.pushIm(ctx, "\"class\":" + use("Runtime.rtl").toStr("[") + use("Runtime.rtl").toStr(__v1.join(ctx, ", ", attr_class)) + use("Runtime.rtl").toStr("].join(\" \")"));
		}
		if (attr_key_value != "")
		{
			res_attrs = res_attrs.pushIm(ctx, "\"@key\":" + use("Runtime.rtl").toStr(attr_key_value));
		}
		if (attr_elem_name != "")
		{
			res_attrs = res_attrs.pushIm(ctx, "\"@elem_name\":" + use("Runtime.rtl").toStr(attr_elem_name));
		}
		if (res_attrs.count(ctx) > 0)
		{
			var __v1 = use("Runtime.rs");
			attr_s = "{" + use("Runtime.rtl").toStr(__v1.join(ctx, ",", res_attrs)) + use("Runtime.rtl").toStr("}");
		}
		else
		{
			attr_s = "{}";
		}
		/* Add spreads */
		for (var i = 0;i < attrs.count(ctx);i++)
		{
			var attr = Runtime.rtl.get(ctx, attrs, i);
			if (!attr.is_spread)
			{
				continue;
			}
			attr_s = "this.mergeAttrs(ctx, " + use("Runtime.rtl").toStr(attr_s) + use("Runtime.rtl").toStr(",") + use("Runtime.rtl").toStr(attr.value.value) + use("Runtime.rtl").toStr(")");
		}
		return use("Runtime.Collection").from([t,attr_s]);
	},
	/**
	 * Returns class name
	 */
	getOpHtmlAttrsClassName: function(ctx, attrs)
	{
		var __v0 = use("Runtime.Vector");
		var class_names = new __v0(ctx);
		if (attrs != "")
		{
			for (var attrs_i = 0;attrs_i < attrs.count(ctx);attrs_i++)
			{
				var attr = Runtime.rtl.get(ctx, attrs, attrs_i);
				var attr_key = attr.key;
				if (attr_key == "class")
				{
					var __v1 = use("Bayrell.Lang.OpCodes.OpString");
					if (attr.value instanceof __v1)
					{
						class_names.push(ctx, attr.value.value);
					}
				}
			}
		}
		var __v1 = use("Runtime.rs");
		return __v1.join(ctx, " ", class_names);
	},
	/**
	 * Translator html template
	 */
	OpHtmlTag: function(ctx, t, op_code, item_pos, var_name)
	{
		var content = "";
		var content2 = "";
		var str_var_name = t.expression.constructor.toString(ctx, var_name);
		var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlContent");
		var __v1 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
		var __v2 = use("Bayrell.Lang.OpCodes.OpHtmlTag");
		if (op_code instanceof __v0)
		{
			var item_value = t.expression.constructor.toString(ctx, op_code.value);
			content += use("Runtime.rtl").toStr(t.s(ctx, "/* Text */"));
			content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(".e(ctx, \"text\")")));
			t = t.levelInc(ctx);
			content += use("Runtime.rtl").toStr(t.s(ctx, ".c(ctx, " + use("Runtime.rtl").toStr(item_value) + use("Runtime.rtl").toStr(")")));
			content += use("Runtime.rtl").toStr(t.s(ctx, ".r(ctx);"));
			t = t.levelDec(ctx);
		}
		else if (op_code instanceof __v1)
		{
			/* Save op codes */
			var save_op_codes = t.save_op_codes;
			var save_op_code_inc = t.save_op_code_inc;
			var res = t.expression.constructor.Expression(ctx, t, op_code.value);
			t = Runtime.rtl.get(ctx, res, 0);
			var item_value = Runtime.rtl.get(ctx, res, 1);
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(ctx, t, save_op_codes.count(ctx));
			if (save != "")
			{
				content += use("Runtime.rtl").toStr(save);
			}
			/* Restore op codes */
			t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
			t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
			var __v2 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
			var __v3 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
			var __v4 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
			if (op_code.kind == __v2.KIND_RAW)
			{
				content += use("Runtime.rtl").toStr(t.s(ctx, "/* Raw */"));
				content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(".e(ctx, \"raw\")")));
				t = t.levelInc(ctx);
				content += use("Runtime.rtl").toStr(t.s(ctx, ".c(ctx, " + use("Runtime.rtl").toStr(item_value) + use("Runtime.rtl").toStr(")")));
				content += use("Runtime.rtl").toStr(t.s(ctx, ".r(ctx);"));
				t = t.levelDec(ctx);
			}
			else if (op_code.kind == __v3.KIND_HTML)
			{
				content += use("Runtime.rtl").toStr(t.s(ctx, "/* Html */"));
				content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(".e(ctx, \"html\")")));
				t = t.levelInc(ctx);
				content += use("Runtime.rtl").toStr(t.s(ctx, ".c(ctx, " + use("Runtime.rtl").toStr(item_value) + use("Runtime.rtl").toStr(")")));
				content += use("Runtime.rtl").toStr(t.s(ctx, ".r(ctx);"));
				t = t.levelDec(ctx);
			}
			else if (op_code.kind == __v4.KIND_JSON)
			{
				content += use("Runtime.rtl").toStr(t.s(ctx, "/* Text */"));
				item_value = "this.json_encode(ctx, " + use("Runtime.rtl").toStr(item_value) + use("Runtime.rtl").toStr(")");
				content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(".e(ctx, \"text\")")));
				t = t.levelInc(ctx);
				content += use("Runtime.rtl").toStr(t.s(ctx, ".c(ctx, " + use("Runtime.rtl").toStr(item_value) + use("Runtime.rtl").toStr(")")));
				content += use("Runtime.rtl").toStr(t.s(ctx, ".r(ctx);"));
				t = t.levelDec(ctx);
			}
		}
		else if (op_code instanceof __v2)
		{
			var new_var_name = "";
			var has_childs = op_code.items != null && op_code.items.items != null && op_code.items.items.count(ctx) > 0;
			var is_component = this.isComponent(ctx, op_code.tag_name);
			var res = this.OpHtmlAttrs(ctx, t, op_code.attrs, item_pos);
			t = Runtime.rtl.get(ctx, res, 0);
			var attrs = Runtime.rtl.get(ctx, res, 1);
			if (op_code.tag_name == "")
			{
				if (has_childs)
				{
					var res = t.constructor.incSaveOpCode(ctx, t);
					t = Runtime.rtl.get(ctx, res, 0);
					new_var_name = Runtime.rtl.get(ctx, res, 1);
					content += use("Runtime.rtl").toStr(t.s(ctx, "/* Items */"));
					content += use("Runtime.rtl").toStr(t.s(ctx, "var " + use("Runtime.rtl").toStr(new_var_name) + use("Runtime.rtl").toStr(" = ") + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr(".e(ctx, \"empty\").r(ctx);")));
				}
				else
				{
					content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(".e(ctx, \"empty\").r(ctx);")));
				}
			}
			else if (is_component)
			{
				var tag_name = "";
				if (op_code.op_code_name)
				{
					var res = t.expression.constructor.Expression(ctx, t, op_code.op_code_name);
					t = Runtime.rtl.get(ctx, res, 0);
					tag_name = Runtime.rtl.get(ctx, res, 1);
				}
				else
				{
					tag_name = t.expression.constructor.toString(ctx, t.expression.constructor.findModuleName(ctx, t, op_code.tag_name));
				}
				if (has_childs)
				{
					content += use("Runtime.rtl").toStr(t.s(ctx, "/* Component '" + use("Runtime.rtl").toStr(op_code.tag_name) + use("Runtime.rtl").toStr("' */")));
					content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(".e(ctx, \"component\", ") + use("Runtime.rtl").toStr(tag_name) + use("Runtime.rtl").toStr(")")));
					t = t.levelInc(ctx);
					if (attrs != "{}")
					{
						content += use("Runtime.rtl").toStr(t.s(ctx, ".a(ctx, " + use("Runtime.rtl").toStr(attrs) + use("Runtime.rtl").toStr(")")));
					}
					var res = this.OpHtmlItems(ctx, t, op_code.items);
					t = Runtime.rtl.get(ctx, res, 0);
					var f = Runtime.rtl.get(ctx, res, 1);
					content += use("Runtime.rtl").toStr(t.s(ctx, ".c(ctx, " + use("Runtime.rtl").toStr(f) + use("Runtime.rtl").toStr(")")));
					content += use("Runtime.rtl").toStr(t.s(ctx, ".r(ctx);"));
					t = t.levelDec(ctx);
					has_childs = false;
				}
				else
				{
					content += use("Runtime.rtl").toStr(t.s(ctx, "/* Component '" + use("Runtime.rtl").toStr(op_code.tag_name) + use("Runtime.rtl").toStr("' */")));
					content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(".e(ctx, \"component\", ") + use("Runtime.rtl").toStr(tag_name) + use("Runtime.rtl").toStr(")")));
					t = t.levelInc(ctx);
					if (attrs != "{}")
					{
						content += use("Runtime.rtl").toStr(t.s(ctx, ".a(ctx, " + use("Runtime.rtl").toStr(attrs) + use("Runtime.rtl").toStr(")")));
					}
					content += use("Runtime.rtl").toStr(t.s(ctx, ".r(ctx);"));
					t = t.levelDec(ctx);
				}
			}
			else
			{
				var tag_name = t.expression.constructor.toString(ctx, op_code.tag_name);
				var attr_class_name = this.getOpHtmlAttrsClassName(ctx, op_code.attrs);
				var __v3 = use("Runtime.rs");
				attr_class_name = __v3.replace(ctx, " ", ".", attr_class_name);
				if (attr_class_name != "")
				{
					attr_class_name = "." + use("Runtime.rtl").toStr(attr_class_name);
				}
				content += use("Runtime.rtl").toStr(t.s(ctx, "/* Element '" + use("Runtime.rtl").toStr(op_code.tag_name) + use("Runtime.rtl").toStr(attr_class_name) + use("Runtime.rtl").toStr("' */")));
				if (op_code.tag_name == "svg")
				{
					var __v4 = use("Runtime.Monad");
					var __v5 = new __v4(ctx, Runtime.rtl.attr(ctx, op_code, ["items", "items", 0, "value", "value"]));
					var __v6 = use("Runtime.rtl");
					__v5 = __v5.monad(ctx, __v6.m_to(ctx, "string", ""));
					var svg_content = __v5.value(ctx);
					svg_content = t.expression.constructor.toString(ctx, svg_content);
					content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(".e(ctx, \"element\", ") + use("Runtime.rtl").toStr(tag_name) + use("Runtime.rtl").toStr(")")));
					t = t.levelInc(ctx);
					if (attrs != "{}")
					{
						content += use("Runtime.rtl").toStr(t.s(ctx, ".a(ctx, " + use("Runtime.rtl").toStr(attrs) + use("Runtime.rtl").toStr(")")));
					}
					content += use("Runtime.rtl").toStr(t.s(ctx, ".c(ctx, " + use("Runtime.rtl").toStr(svg_content) + use("Runtime.rtl").toStr(")")));
					content += use("Runtime.rtl").toStr(t.s(ctx, ".r(ctx);"));
					t = t.levelDec(ctx);
					has_childs = false;
				}
				else if (has_childs)
				{
					var res = t.constructor.incSaveOpCode(ctx, t);
					t = Runtime.rtl.get(ctx, res, 0);
					new_var_name = Runtime.rtl.get(ctx, res, 1);
					content += use("Runtime.rtl").toStr(t.s(ctx, "var " + use("Runtime.rtl").toStr(new_var_name) + use("Runtime.rtl").toStr(" = ") + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr(".e(ctx, \"element\", ") + use("Runtime.rtl").toStr(tag_name) + use("Runtime.rtl").toStr(")")));
					t = t.levelInc(ctx);
					if (attrs != "{}")
					{
						content += use("Runtime.rtl").toStr(t.s(ctx, ".a(ctx, " + use("Runtime.rtl").toStr(attrs) + use("Runtime.rtl").toStr(")")));
					}
					content += use("Runtime.rtl").toStr(t.s(ctx, ".r(ctx);"));
					t = t.levelDec(ctx);
				}
				else
				{
					content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(".e(ctx, \"element\", ") + use("Runtime.rtl").toStr(tag_name) + use("Runtime.rtl").toStr(")")));
					t = t.levelInc(ctx);
					if (attrs != "{}")
					{
						content += use("Runtime.rtl").toStr(t.s(ctx, ".a(ctx, " + use("Runtime.rtl").toStr(attrs) + use("Runtime.rtl").toStr(")")));
					}
					content += use("Runtime.rtl").toStr(t.s(ctx, ".r(ctx);"));
					t = t.levelDec(ctx);
				}
			}
			if (has_childs)
			{
				content += use("Runtime.rtl").toStr(t.s2(ctx, ""));
				var res = this.OpHtmlChilds(ctx, t, op_code.items, new_var_name);
				t = Runtime.rtl.get(ctx, res, 0);
				content += use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1));
				content += use("Runtime.rtl").toStr(t.s(ctx, new_var_name + use("Runtime.rtl").toStr(".p(ctx);")));
				/* content ~= t.s("RenderDriver.p(" ~ new_var_name ~ ", " ~ new_var_name ~ "_childs);"); */
			}
			if (op_code.tag_name == "")
			{
				content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr("_childs.concat(") + use("Runtime.rtl").toStr(new_var_name) + use("Runtime.rtl").toStr("_childs);")));
			}
		}
		else
		{
			/* Save op codes */
			var save_op_codes = t.save_op_codes;
			var save_op_code_inc = t.save_op_code_inc;
			var res = t.expression.constructor.Expression(ctx, t, op_code);
			t = Runtime.rtl.get(ctx, res, 0);
			var item_value = Runtime.rtl.get(ctx, res, 1);
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(ctx, t, save_op_codes.count(ctx));
			if (save != "")
			{
				content += use("Runtime.rtl").toStr(save);
			}
			/* Restore op codes */
			t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
			t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
			content += use("Runtime.rtl").toStr(t.s(ctx, "/* Text */"));
			content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(".e(ctx, \"text\")")));
			t = t.levelInc(ctx);
			content += use("Runtime.rtl").toStr(t.s(ctx, ".c(ctx, " + use("Runtime.rtl").toStr(item_value) + use("Runtime.rtl").toStr(")")));
			content += use("Runtime.rtl").toStr(t.s(ctx, ".r(ctx);"));
			t = t.levelDec(ctx);
			content += use("Runtime.rtl").toStr(t.s(ctx, ";"));
		}
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * Translator html items
	 */
	OpHtmlChilds: function(ctx, t, op_code, control_name)
	{
		if (op_code == null || op_code.items.count(ctx) == 0)
		{
			return use("Runtime.Collection").from([t,""]);
		}
		var save_control_name = t.html_var_name;
		t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["html_var_name"]), control_name);
		var next_space = true;
		var content = "";
		for (var i = 0;i < op_code.items.count(ctx);i++)
		{
			var item = op_code.items.item(ctx, i);
			/* Save op codes */
			var save_op_codes = t.save_op_codes;
			var save_op_code_inc = t.save_op_code_inc;
			var op_content = "";
			if (i > 0 && next_space)
			{
				content += use("Runtime.rtl").toStr(t.s2(ctx, ""));
			}
			if (!next_space)
			{
				next_space = true;
			}
			var __v0 = use("Bayrell.Lang.OpCodes.OpAssign");
			var __v1 = use("Bayrell.Lang.OpCodes.OpComment");
			var __v2 = use("Bayrell.Lang.OpCodes.OpFor");
			var __v3 = use("Bayrell.Lang.OpCodes.OpIf");
			var __v4 = use("Bayrell.Lang.OpCodes.OpWhile");
			if (item instanceof __v0)
			{
				var res = t.operator.constructor.OpAssign(ctx, t, item);
				t = Runtime.rtl.get(ctx, res, 0);
				op_content += use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1));
			}
			else if (item instanceof __v1)
			{
				var res = t.operator.constructor.OpComment(ctx, t, item);
				t = Runtime.rtl.get(ctx, res, 0);
				op_content += use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1));
				next_space = false;
			}
			else if (item instanceof __v2)
			{
				var res = t.operator.constructor.OpFor(ctx, t, item);
				t = Runtime.rtl.get(ctx, res, 0);
				op_content += use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1));
			}
			else if (item instanceof __v3)
			{
				var res = t.operator.constructor.OpIf(ctx, t, item);
				t = Runtime.rtl.get(ctx, res, 0);
				op_content += use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1));
			}
			else if (item instanceof __v4)
			{
				var res = t.operator.constructor.OpWhile(ctx, t, item);
				t = Runtime.rtl.get(ctx, res, 0);
				op_content += use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1));
			}
			else
			{
				var res = this.OpHtmlTag(ctx, t, item, i, control_name);
				t = Runtime.rtl.get(ctx, res, 0);
				op_content += use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1));
			}
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(ctx, t, save_op_codes.count(ctx));
			if (save != "")
			{
				content += use("Runtime.rtl").toStr(save);
			}
			if (op_content != "")
			{
				content += use("Runtime.rtl").toStr(op_content);
			}
			/* Restore save op codes */
			t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
			t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
		}
		/*
		if (control_name != "control" and patch_flag)
		{
			content ~= t.s("RenderDriver.p(" ~ control_name ~ ", " ~ control_name ~ "_childs);");
		}
		*/
		t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["html_var_name"]), save_control_name);
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * Translator html items
	 */
	OpHtmlItems: function(ctx, t, op_code)
	{
		if (op_code == null || op_code.items.count(ctx) == 0)
		{
			return use("Runtime.Collection").from([t,""]);
		}
		/* Save op codes */
		var save_t = t;
		var save_op_codes = t.save_op_codes;
		var save_op_code_inc = t.save_op_code_inc;
		var content = "";
		content += use("Runtime.rtl").toStr("(ctx, __control) =>");
		content += use("Runtime.rtl").toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		/* content ~= t.s("var __vnull = null;"); */
		/* content ~= t.s("var __control_childs = [];"); */
		content += use("Runtime.rtl").toStr(t.s2(ctx, ""));
		var res = this.OpHtmlChilds(ctx, t, op_code, "__control");
		t = Runtime.rtl.get(ctx, res, 0);
		content += use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1));
		/*content ~= t.s("RenderDriver.p(__control, __control_childs);");*/
		content += use("Runtime.rtl").toStr(t.s2(ctx, ""));
		/* content ~= t.s("return __control_childs;"); */
		t = t.levelDec(ctx);
		content += use("Runtime.rtl").toStr(t.s(ctx, "}"));
		/* Restore save op codes */
		t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
		t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * Translate html
	 */
	OpHtml: function(ctx, t, op_code)
	{
		var content = "";
		var res = this.OpHtmlItems(ctx, t, op_code);
		t = Runtime.rtl.get(ctx, res, 0);
		content += use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1));
		return use("Runtime.Collection").from([t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangES6";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Html";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangES6.TranslatorES6Html",
			"name": "Bayrell.Lang.LangES6.TranslatorES6Html",
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
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return null;
	},
	getMethodsList: function(ctx,f)
	{
		if (f==undefined) f=0;
		var a = [];
		if ((f&4)==4) a=[
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Bayrell.Lang.LangES6.TranslatorES6Html);
module.exports = Bayrell.Lang.LangES6.TranslatorES6Html;