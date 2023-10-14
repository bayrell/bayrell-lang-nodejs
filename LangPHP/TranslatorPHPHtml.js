"use strict;"
var use = require('bay-lang').use;
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell.Lang.LangPHP == 'undefined') Bayrell.Lang.LangPHP = {};
Bayrell.Lang.LangPHP.TranslatorPHPHtml = function(ctx)
{
};
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPHtml.prototype,
{
});
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPHtml,
{
	/**
	 * Is component
	 */
	isComponent: function(ctx, tag_name)
	{
		var __v0 = use("Runtime.rs");
		var ch1 = __v0.substr(ctx, tag_name, 0, 1);
		var __v1 = use("Runtime.rs");
		var ch2 = __v1.strtoupper(ctx, ch1);
		return tag_name != "" && (ch1 == "{" || ch1 == ch2);
	},
	/**
	 * Is single tag
	 */
	isSingleTag: function(ctx, tag_name)
	{
		var tokens = use("Runtime.Collection").from(["img","meta","input","link","br"]);
		if (tokens.indexOf(ctx, tag_name) == -1)
		{
			return false;
		}
		return true;
	},
	/**
	 * Translator html component
	 */
	OpHtmlComponent: function(ctx, t, op_code)
	{
		var res = t.constructor.incSaveOpCode(ctx, t);
		t = Runtime.rtl.get(ctx, res, 0);
		var var_name = Runtime.rtl.get(ctx, res, 1);
		var content = "";
		var v_model = "null";
		var tag_name = op_code.tag_name;
		var module_name = "";
		if (op_code.op_code_name)
		{
			var res = t.expression.constructor.Expression(ctx, t, op_code.op_code_name);
			t = Runtime.rtl.get(ctx, res, 0);
			module_name = Runtime.rtl.get(ctx, res, 1);
		}
		else
		{
			module_name = t.expression.constructor.toString(ctx, t.expression.constructor.findModuleName(ctx, t, op_code.tag_name));
		}
		content += use("Runtime.rtl").toStr(t.s(ctx, "/* Component '" + use("Runtime.rtl").toStr(tag_name) + use("Runtime.rtl").toStr("' */")));
		content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr("_params = [];")));
		var __v0 = use("Runtime.lib");
		var attr_name = op_code.attrs.findItem(ctx, __v0.equalAttr(ctx, "key", "@name"));
		var __v1 = use("Runtime.lib");
		var attr_bind = op_code.attrs.findItem(ctx, __v1.equalAttr(ctx, "key", "@bind"));
		var __v2 = use("Runtime.lib");
		var attr_model = op_code.attrs.findItem(ctx, __v2.equalAttr(ctx, "key", "@model"));
		var __v3 = use("Runtime.lib");
		var attr_model_path = op_code.attrs.findItem(ctx, __v3.equalAttr(ctx, "key", "@model_path"));
		if (attr_name)
		{
			var res = t.expression.constructor.Expression(ctx, t, attr_name.value);
			t = Runtime.rtl.get(ctx, res, 0);
			v_model = "\\Runtime\\rs::_concat_attrs($ctx, $model_path, " + use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1)) + use("Runtime.rtl").toStr(")");
		}
		else if (attr_bind)
		{
			var res = t.expression.constructor.Expression(ctx, t, attr_bind.value);
			t = Runtime.rtl.get(ctx, res, 0);
			v_model = "\\Runtime\\rs::_concat_attrs($ctx, $model_path, " + use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1)) + use("Runtime.rtl").toStr(")");
		}
		else if (attr_model)
		{
			var res = t.expression.constructor.Expression(ctx, t, attr_model.value);
			t = Runtime.rtl.get(ctx, res, 0);
			v_model = "\\Runtime\\rs::_concat_attrs($ctx, $model_path, " + use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1)) + use("Runtime.rtl").toStr(")");
		}
		else if (attr_model_path)
		{
			var res = t.expression.constructor.Expression(ctx, t, attr_model_path.value);
			t = Runtime.rtl.get(ctx, res, 0);
			v_model = "\\Runtime\\rs::_concat_attrs($ctx, [], " + use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1)) + use("Runtime.rtl").toStr(")");
		}
		for (var i = 0;i < op_code.attrs.count(ctx);i++)
		{
			var attr = op_code.attrs.item(ctx, i);
			if (attr.key == "@bind")
			{
				continue;
			}
			if (attr.key == "@name")
			{
				continue;
			}
			if (attr.key == "@model")
			{
				continue;
			}
			if (attr.key == "@model_path")
			{
				continue;
			}
			if (attr.key == "@ref")
			{
				continue;
			}
			if (attr.is_spread)
			{
				content += use("Runtime.rtl").toStr(t.s(ctx, "if($" + use("Runtime.rtl").toStr(attr.value.value) + use("Runtime.rtl").toStr("!=null)") + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr("_params = array_merge(") + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr("_params,$") + use("Runtime.rtl").toStr(attr.value.value) + use("Runtime.rtl").toStr("->_map);")));
			}
			else
			{
				var res = this.OpHtmlAttr(ctx, t, attr);
				t = Runtime.rtl.get(ctx, res, 0);
				var attr_value = Runtime.rtl.get(ctx, res, 1);
				content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr("_params[") + use("Runtime.rtl").toStr(t.expression.constructor.toString(ctx, attr.key)) + use("Runtime.rtl").toStr("] = ") + use("Runtime.rtl").toStr(attr_value) + use("Runtime.rtl").toStr(";")));
			}
		}
		content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr("_content = [];")));
		var __v4 = use("Runtime.rtl");
		var f = __v4.method(ctx, this.getClassName(ctx), "OpHtmlItems");
		var res = t.constructor.saveOpCodeCall(ctx, t, f, use("Runtime.Collection").from([op_code.items,var_name + use("Runtime.rtl").toStr("_content")]));
		t = Runtime.rtl.get(ctx, res, 0);
		content += use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1));
		if (op_code.op_code_name)
		{
			content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr("_name = \\Runtime\\rtl::find_class(") + use("Runtime.rtl").toStr(module_name) + use("Runtime.rtl").toStr(");")));
			content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(" = [") + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr("_name::render($ctx, $layout,") + use("Runtime.rtl").toStr(v_model) + use("Runtime.rtl").toStr(",\\Runtime\\Dict::from(") + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr("_params),") + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr("_content)];")));
		}
		else
		{
			content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr("_name = \\Runtime\\rtl::find_class(") + use("Runtime.rtl").toStr(module_name) + use("Runtime.rtl").toStr(");")));
			content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(" = [") + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr("_name::render($ctx, $layout,") + use("Runtime.rtl").toStr(v_model) + use("Runtime.rtl").toStr(",\\Runtime\\Dict::from(") + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr("_params),") + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr("_content)];")));
		}
		var res = t.constructor.addSaveOpCode(ctx, t, use("Runtime.Dict").from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = Runtime.rtl.get(ctx, res, 0);
		return use("Runtime.Collection").from([t,var_name]);
	},
	/**
	 * Translator html attr
	 */
	OpHtmlAttr: function(ctx, t, attr)
	{
		var __v0 = use("Bayrell.Lang.OpCodes.OpString");
		if (attr.value instanceof __v0)
		{
			return use("Runtime.Collection").from([t,t.expression.constructor.toString(ctx, attr.value.value)]);
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
		if (attr.value instanceof __v0)
		{
			var __v1 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
			var __v2 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
			if (attr.value.kind == __v1.KIND_RAW)
			{
				var res = t.expression.constructor.Expression(ctx, t, attr.value.value);
				t = Runtime.rtl.get(ctx, res, 0);
				return use("Runtime.Collection").from([t,Runtime.rtl.get(ctx, res, 1)]);
			}
			else if (attr.value.kind == __v2.KIND_JSON)
			{
				var res = t.expression.constructor.Expression(ctx, t, attr.value.value);
				t = Runtime.rtl.get(ctx, res, 0);
				var value = Runtime.rtl.get(ctx, res, 1);
				value = "\\Runtime\\rtl::json_encode($ctx, " + use("Runtime.rtl").toStr(value) + use("Runtime.rtl").toStr(")");
				return use("Runtime.Collection").from([t,value]);
			}
		}
		var res = t.expression.constructor.Expression(ctx, t, attr.value);
		t = Runtime.rtl.get(ctx, res, 0);
		var value = Runtime.rtl.get(ctx, res, 1);
		value = t.o(ctx, value, Runtime.rtl.get(ctx, res, 0).opcode_level, 13);
		return use("Runtime.Collection").from([t,value]);
	},
	/**
	 * Translator html template
	 */
	OpHtmlAttrs: function(ctx, t, attrs)
	{
		var __v0 = use("Runtime.Vector");
		var attr_class = new __v0(ctx);
		var attr_s = "";
		var attr_key_value = "";
		var has_attr_key = false;
		var res_attrs = attrs.map(ctx, (ctx, attr) => 
		{
			if (attr.is_spread)
			{
				return "";
			}
			var attr_key = attr.key;
			var attr_value = "";
			/*
				if (attr_key == "@class")
				{
					list res = static::OpHtmlAttr(t, attr); t = res[0]; attr_value = res[1];
					attr_class.pushValue( "\\Runtime\\rs::_get_css_name($ctx, " ~
						attr_value ~ ")" );
					
					if (not has_attr_key and attr.value instanceof OpString)
					{
						var arr = rs::split(" ", attr.value.value);
						attr_key_value = t.expression::toString(arr[0]);
						has_attr_key = true;
					}
					
					return "";
				}
				*/
			if (attr_key == "class")
			{
				t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["opcode_level"]), 1000);
				var res = this.OpHtmlAttr(ctx, t, attr);
				t = Runtime.rtl.get(ctx, res, 0);
				attr_value = Runtime.rtl.get(ctx, res, 1);
				attr_class.pushValue(ctx, attr_value);
				var __v1 = use("Bayrell.Lang.OpCodes.OpString");
				if (!has_attr_key && attr.value instanceof __v1)
				{
					var __v2 = use("Runtime.rs");
					var arr = __v2.split(ctx, " ", attr.value.value);
					attr_key_value = t.expression.constructor.toString(ctx, Runtime.rtl.get(ctx, arr, 0));
					has_attr_key = true;
				}
				return "";
			}
			else if (attr_key == "@key")
			{
				has_attr_key = true;
				var res = this.OpHtmlAttr(ctx, t, attr);
				t = Runtime.rtl.get(ctx, res, 0);
				attr_value = Runtime.rtl.get(ctx, res, 1);
				attr_key_value = attr_value;
				return "";
			}
			if (attr_key == "@bind" || attr_key == "@name")
			{
				attr_key = "value";
				var res = t.expression.constructor.Expression(ctx, t, attr.value);
				t = Runtime.rtl.get(ctx, res, 0);
				attr_value = "\\Runtime\\rtl::attr($ctx, $model, " + use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1)) + use("Runtime.rtl").toStr(", null)");
			}
			var __v1 = use("Runtime.rs");
			var ch = __v1.substr(ctx, attr_key, 0, 1);
			if (ch == "@")
			{
				return "";
			}
			if (attr_value == "")
			{
				var res = this.OpHtmlAttr(ctx, t, attr);
				t = Runtime.rtl.get(ctx, res, 0);
				attr_value = Runtime.rtl.get(ctx, res, 1);
			}
			return attr_key + use("Runtime.rtl").toStr("=\"'.\\Runtime\\rs::_escape_attr($ctx, ") + use("Runtime.rtl").toStr(attr_value) + use("Runtime.rtl").toStr(").'\"");
		});
		res_attrs = res_attrs.filter(ctx, (ctx, s) => 
		{
			return s != "";
		});
		if (attr_class.count(ctx) > 0)
		{
			attr_class.pushValue(ctx, "\\Runtime\\rs::getCssHash($ctx, static::getClassName())");
			/*attr_class.pushValue( t.expression::toString("h-" ~
				ParserBayHtml::getCssHash(t.current_class_full_name)) );*/
			var __v1 = use("Runtime.rs");
			res_attrs = res_attrs.pushIm(ctx, "class=" + use("Runtime.rtl").toStr("\"'.") + use("Runtime.rtl").toStr(__v1.join(ctx, ".\" \".", attr_class)) + use("Runtime.rtl").toStr(".'\""));
		}
		if (res_attrs.count(ctx) > 0)
		{
			var __v1 = use("Runtime.rs");
			attr_s = " " + use("Runtime.rtl").toStr(__v1.join(ctx, " ", res_attrs));
		}
		/* Add spreads */
		for (var i = 0;i < attrs.count(ctx);i++)
		{
			var attr = Runtime.rtl.get(ctx, attrs, i);
			if (!attr.is_spread)
			{
				continue;
			}
			attr_s += use("Runtime.rtl").toStr(" ' . \\Runtime\\rs::_join_attrs($ctx, $" + use("Runtime.rtl").toStr(attr.value.value) + use("Runtime.rtl").toStr(") . '"));
		}
		return use("Runtime.Collection").from([t,attr_s]);
	},
	/**
	 * Translator html template
	 */
	OpHtmlTag: function(ctx, t, op_code)
	{
		if (this.isComponent(ctx, op_code.tag_name))
		{
			return this.OpHtmlComponent(ctx, t, op_code);
		}
		/* Output attrs */
		var res = this.OpHtmlAttrs(ctx, t, op_code.attrs);
		t = Runtime.rtl.get(ctx, res, 0);
		var attr_s = Runtime.rtl.get(ctx, res, 1);
		var res = t.constructor.incSaveOpCode(ctx, t);
		t = Runtime.rtl.get(ctx, res, 0);
		var var_name = Runtime.rtl.get(ctx, res, 1);
		var content = "";
		if (op_code.tag_name != "")
		{
			content += use("Runtime.rtl").toStr(t.s(ctx, "/* Element '" + use("Runtime.rtl").toStr(op_code.tag_name) + use("Runtime.rtl").toStr("' */")));
		}
		if (this.isSingleTag(ctx, op_code.tag_name))
		{
			content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(" = ['<") + use("Runtime.rtl").toStr(op_code.tag_name) + use("Runtime.rtl").toStr(attr_s) + use("Runtime.rtl").toStr(" />'];")));
		}
		else
		{
			if (op_code.tag_name != "")
			{
				content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(" = ['<") + use("Runtime.rtl").toStr(op_code.tag_name) + use("Runtime.rtl").toStr(attr_s) + use("Runtime.rtl").toStr(">'];")));
			}
			else
			{
				content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(" = [];")));
			}
			var flag_value = false;
			if (!flag_value)
			{
				var __v0 = use("Runtime.rtl");
				var f = __v0.method(ctx, this.getClassName(ctx), "OpHtmlItems");
				var res = t.constructor.saveOpCodeCall(ctx, t, f, use("Runtime.Collection").from([op_code.items,var_name]));
				t = Runtime.rtl.get(ctx, res, 0);
				content += use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1));
			}
			if (op_code.tag_name != "")
			{
				content += use("Runtime.rtl").toStr(t.s(ctx, "\\Runtime\\rs::_p(" + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr(", '</") + use("Runtime.rtl").toStr(op_code.tag_name) + use("Runtime.rtl").toStr(">');")));
			}
		}
		var res = t.constructor.addSaveOpCode(ctx, t, use("Runtime.Dict").from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = Runtime.rtl.get(ctx, res, 0);
		return use("Runtime.Collection").from([t,var_name]);
	},
	/**
	 * Translator html items
	 */
	OpHtmlItems: function(ctx, t, op_code, var_name)
	{
		if (var_name == undefined) var_name = "";
		if (op_code == null || op_code.items.count(ctx) == 0)
		{
			return use("Runtime.Collection").from([t,""]);
		}
		var items_count = op_code.items.count(ctx);
		var content = "";
		if (var_name == "")
		{
			var res = t.constructor.incSaveOpCode(ctx, t);
			t = Runtime.rtl.get(ctx, res, 0);
			var var_name = Runtime.rtl.get(ctx, res, 1);
			content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(" = [];")));
		}
		var save_html_var_name = t.html_var_name;
		t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["html_var_name"]), var_name);
		for (var i = 0;i < op_code.items.count(ctx);i++)
		{
			var item = op_code.items.item(ctx, i);
			var item_value = "";
			var op_content = "";
			/* Save op codes */
			var save_op_codes = t.save_op_codes;
			var save_op_code_inc = t.save_op_code_inc;
			var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlContent");
			var __v1 = use("Bayrell.Lang.OpCodes.OpHtmlTag");
			var __v2 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
			var __v3 = use("Bayrell.Lang.OpCodes.OpAssign");
			var __v4 = use("Bayrell.Lang.OpCodes.OpComment");
			var __v5 = use("Bayrell.Lang.OpCodes.OpFor");
			var __v6 = use("Bayrell.Lang.OpCodes.OpIf");
			var __v7 = use("Bayrell.Lang.OpCodes.OpWhile");
			var __v8 = use("Bayrell.Lang.OpCodes.OpCall");
			if (item instanceof __v0)
			{
				item_value = t.expression.constructor.toString(ctx, item.value);
			}
			else if (item instanceof __v1)
			{
				var res = this.OpHtmlTag(ctx, t, item);
				t = Runtime.rtl.get(ctx, res, 0);
				item_value = Runtime.rtl.get(ctx, res, 1);
			}
			else if (item instanceof __v2)
			{
				var __v3 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				var __v4 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				var __v5 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				if (item.kind == __v3.KIND_RAW)
				{
					var res = t.expression.constructor.Expression(ctx, t, item.value);
					t = Runtime.rtl.get(ctx, res, 0);
					item_value = Runtime.rtl.get(ctx, res, 1);
				}
				else if (item.kind == __v4.KIND_HTML)
				{
					var res = t.expression.constructor.Expression(ctx, t, item.value);
					t = Runtime.rtl.get(ctx, res, 0);
					item_value = Runtime.rtl.get(ctx, res, 1);
					item_value = "\\Runtime\\rs::_to_html($ctx, " + use("Runtime.rtl").toStr(item_value) + use("Runtime.rtl").toStr(")");
				}
				else if (item.kind == __v5.KIND_JSON)
				{
					var res = t.expression.constructor.Expression(ctx, t, item.value);
					t = Runtime.rtl.get(ctx, res, 0);
					item_value = Runtime.rtl.get(ctx, res, 1);
					item_value = "\\Runtime\\rtl::json_encode($ctx, " + use("Runtime.rtl").toStr(item_value) + use("Runtime.rtl").toStr(")");
				}
			}
			else if (item instanceof __v3)
			{
				var res = t.operator.constructor.OpAssign(ctx, t, item);
				t = Runtime.rtl.get(ctx, res, 0);
				op_content += use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1));
			}
			else if (item instanceof __v4)
			{
				var res = t.operator.constructor.OpComment(ctx, t, item);
				t = Runtime.rtl.get(ctx, res, 0);
				op_content += use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1));
			}
			else if (item instanceof __v5)
			{
				var res = t.operator.constructor.OpFor(ctx, t, item);
				t = Runtime.rtl.get(ctx, res, 0);
				op_content += use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1));
			}
			else if (item instanceof __v6)
			{
				var res = t.operator.constructor.OpIf(ctx, t, item);
				t = Runtime.rtl.get(ctx, res, 0);
				op_content += use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1));
			}
			else if (item instanceof __v7)
			{
				var res = t.operator.constructor.OpWhile(ctx, t, item);
				t = Runtime.rtl.get(ctx, res, 0);
				op_content += use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1));
			}
			else if (item instanceof __v8)
			{
				var res = t.expression.constructor.OpCall(ctx, t, item);
				t = Runtime.rtl.get(ctx, res, 0);
				item_value = Runtime.rtl.get(ctx, res, 1);
				item_value = "\\Runtime\\rs::_escape_html($ctx, " + use("Runtime.rtl").toStr(item_value) + use("Runtime.rtl").toStr(")");
			}
			else
			{
				var res = t.expression.constructor.Expression(ctx, t, item);
				t = Runtime.rtl.get(ctx, res, 0);
				item_value = Runtime.rtl.get(ctx, res, 1);
				item_value = "\\Runtime\\rs::_escape_html($ctx, " + use("Runtime.rtl").toStr(item_value) + use("Runtime.rtl").toStr(")");
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
			if (item_value != "")
			{
				content += use("Runtime.rtl").toStr(t.s(ctx, "\\Runtime\\rs::_p(" + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr(", ") + use("Runtime.rtl").toStr(item_value) + use("Runtime.rtl").toStr(");")));
			}
		}
		t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["html_var_name"]), save_html_var_name);
		var res = t.constructor.addSaveOpCode(ctx, t, use("Runtime.Dict").from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = Runtime.rtl.get(ctx, res, 0);
		return use("Runtime.Collection").from([t,"new \\Runtime\\RawString(" + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr(")")]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangPHP";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHPHtml";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx)
	{
		var a = [];
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a=[
			"isComponent",
			"isSingleTag",
			"OpHtmlComponent",
			"OpHtmlAttr",
			"OpHtmlAttrs",
			"OpHtmlTag",
			"OpHtmlItems",
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Bayrell.Lang.LangPHP.TranslatorPHPHtml);
module.exports = Bayrell.Lang.LangPHP.TranslatorPHPHtml;