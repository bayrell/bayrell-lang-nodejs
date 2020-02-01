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
if (typeof Bayrell.Lang.LangES6 == 'undefined') Bayrell.Lang.LangES6 = {};
Bayrell.Lang.LangES6.TranslatorES6Html = function(ctx)
{
};
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Html.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.LangES6.TranslatorES6Html"))
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
		var __v0 = use("Runtime.rs");
		var ch2 = __v0.strtoupper(ctx, ch1);
		return ch1 == "{" || ch1 == ch2;
	},
	/**
	 * Translator html template
	 */
	OpHtmlAttrs: function(ctx, t, attrs)
	{
		var attr_s = "null";
		var v_model = "";
		var __v0 = use("Runtime.lib");
		var model = attrs.findItem(ctx, __v0.equalAttr(ctx, "key", "@model"));
		if (!model)
		{
			var __v0 = use("Runtime.lib");
			var bind = attrs.findItem(ctx, __v0.equalAttr(ctx, "key", "@bind"));
			if (bind)
			{
				var res = t.expression.constructor.Expression(ctx, t, bind.value);
				t = res[0];
				v_model = "model[" + use("Runtime.rtl").toStr(res[1]) + use("Runtime.rtl").toStr("]");
			}
		}
		var attrs = attrs.map(ctx, (ctx, attr) => 
		{
			var attr_key = attr.key;
			var __v0 = use("Runtime.rs");
			var ch = __v0.substr(ctx, attr_key, 0, 1);
			var __v0 = use("Bayrell.Lang.OpCodes.OpString");
			if (attr_key == "@class" && attr.value instanceof __v0)
			{
				return "\"class\":" + use("Runtime.rtl").toStr("this.getCssName(ctx, ") + use("Runtime.rtl").toStr(t.expression.constructor.toString(ctx, attr.value.value)) + use("Runtime.rtl").toStr(")");
			}
			var __v0 = use("Runtime.rs");
			if (__v0.substr(ctx, attr_key, 0, 7) == "@event:")
			{
				var __v1 = use("Runtime.rs");
				var event_name = __v1.substr(ctx, attr_key, 7);
				event_name = t.expression.constructor.findModuleName(ctx, t, event_name);
				attr_key = "@event:" + use("Runtime.rtl").toStr(event_name);
			}
			var __v0 = use("Runtime.rs");
			if (__v0.substr(ctx, attr_key, 0, 12) == "@eventAsync:")
			{
				var __v1 = use("Runtime.rs");
				var event_name = __v1.substr(ctx, attr_key, 12);
				event_name = t.expression.constructor.findModuleName(ctx, t, event_name);
				attr_key = "@eventAsync:" + use("Runtime.rtl").toStr(event_name);
			}
			var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
			if (attr.value instanceof __v0)
			{
				var __v1 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				var __v2 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				if (attr.value.kind == __v1.KIND_RAW)
				{
					var res = t.expression.constructor.Expression(ctx, t, attr.value.value);
					t = res[0];
					return t.expression.constructor.toString(ctx, attr_key) + use("Runtime.rtl").toStr(":") + use("Runtime.rtl").toStr(res[1]);
				}
				else if (attr.value.kind == __v2.KIND_JSON)
				{
					var res = t.expression.constructor.Expression(ctx, t, attr.value.value);
					t = res[0];
					var value = res[1];
					value = t.expression.constructor.useModuleName(ctx, t, "RenderHelper") + use("Runtime.rtl").toStr(".json_encode(ctx, ") + use("Runtime.rtl").toStr(value) + use("Runtime.rtl").toStr(")");
					return t.expression.constructor.toString(ctx, attr_key) + use("Runtime.rtl").toStr(":") + use("Runtime.rtl").toStr(value);
				}
			}
			var res = t.expression.constructor.Expression(ctx, t, attr.value);
			t = res[0];
			var value = res[1];
			if (attr_key == "@bind" && v_model != "")
			{
				var s = "";
				s = t.expression.constructor.toString(ctx, attr_key) + use("Runtime.rtl").toStr(":") + use("Runtime.rtl").toStr(res[1]) + use("Runtime.rtl").toStr(",");
				s += use("Runtime.rtl").toStr(t.expression.constructor.toString(ctx, "@model") + use("Runtime.rtl").toStr(":") + use("Runtime.rtl").toStr(v_model));
				return s;
			}
			return t.expression.constructor.toString(ctx, attr_key) + use("Runtime.rtl").toStr(":") + use("Runtime.rtl").toStr(res[1]);
		});
		attrs = attrs.filter(ctx, (ctx, s) => 
		{
			return s != "";
		});
		if (attrs.count(ctx) > 0)
		{
			var __v0 = use("Runtime.rs");
			attr_s = "{" + use("Runtime.rtl").toStr(__v0.join(ctx, ",", attrs)) + use("Runtime.rtl").toStr("}");
		}
		return use("Runtime.Collection").from([t,attr_s]);
	},
	/**
	 * Translator html template
	 */
	OpHtmlTagEmpty: function(ctx, t, op_code, item_pos)
	{
		var __v0 = use("Runtime.rtl");
		var f = __v0.method(ctx, this.getCurrentClassName(ctx), "OpHtmlItems");
		var res = t.constructor.saveOpCodeCall(ctx, t, f, use("Runtime.Collection").from([op_code.items]));
		t = res[0];
		var content = res[1];
		var var_name = res[2];
		var res = t.constructor.addSaveOpCode(ctx, t, use("Runtime.Dict").from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = res[0];
		return use("Runtime.Collection").from([t,var_name]);
	},
	/**
	 * Translator html template
	 */
	OpHtmlTag: function(ctx, t, op_code, item_pos)
	{
		if (op_code.tag_name == "")
		{
			return this.OpHtmlTagEmpty(ctx, t, op_code, item_pos);
		}
		var is_component = this.isComponent(ctx, op_code.tag_name);
		var tag_name = "";
		var content = "";
		if (is_component)
		{
			content = t.s(ctx, "/* Component '" + use("Runtime.rtl").toStr(op_code.tag_name) + use("Runtime.rtl").toStr("' */"));
			tag_name = t.expression.constructor.toString(ctx, t.expression.constructor.findModuleName(ctx, t, op_code.tag_name));
		}
		else
		{
			content = t.s(ctx, "/* Element '" + use("Runtime.rtl").toStr(op_code.tag_name) + use("Runtime.rtl").toStr("' */"));
			tag_name = t.expression.constructor.toString(ctx, op_code.tag_name);
		}
		var res = t.constructor.incSaveOpCode(ctx, t);
		t = res[0];
		var var_name = res[1];
		var res = this.OpHtmlAttrs(ctx, t, op_code.attrs);
		t = res[0];
		var attrs = res[1];
		var var_name_content = var_name + use("Runtime.rtl").toStr("_content");
		if (op_code.items != null && op_code.items.items.count(ctx) > 0)
		{
			content += use("Runtime.rtl").toStr(t.s(ctx, "var " + use("Runtime.rtl").toStr(var_name_content) + use("Runtime.rtl").toStr(" = (control) =>")));
			content += use("Runtime.rtl").toStr(t.s(ctx, "{"));
			t = t.levelInc(ctx);
			var __v0 = use("Runtime.rtl");
			var f = __v0.method(ctx, this.getCurrentClassName(ctx), "OpHtmlItems");
			var res = t.constructor.saveOpCodeCall(ctx, t, f, use("Runtime.Collection").from([op_code.items]));
			t = res[0];
			content += use("Runtime.rtl").toStr(res[1]);
			content += use("Runtime.rtl").toStr(t.s(ctx, "return " + use("Runtime.rtl").toStr(res[2]) + use("Runtime.rtl").toStr(";")));
			t = t.levelDec(ctx);
			content += use("Runtime.rtl").toStr(t.s(ctx, "};"));
		}
		else
		{
			var_name_content = "null";
		}
		if (is_component)
		{
			if (op_code.op_code_name)
			{
				var res = t.expression.constructor.Expression(ctx, t, op_code.op_code_name);
				t = res[0];
				tag_name = res[1];
			}
			content += use("Runtime.rtl").toStr(t.s(ctx, "var " + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr("_elem = Runtime.Web.Drivers.RenderDriver.component(") + use("Runtime.rtl").toStr("layout,") + use("Runtime.rtl").toStr(tag_name) + use("Runtime.rtl").toStr(",") + use("Runtime.rtl").toStr(attrs) + use("Runtime.rtl").toStr(",") + use("Runtime.rtl").toStr(var_name_content) + use("Runtime.rtl").toStr(",") + use("Runtime.rtl").toStr("control,") + use("Runtime.rtl").toStr(item_pos) + use("Runtime.rtl").toStr(");")));
		}
		else
		{
			content += use("Runtime.rtl").toStr(t.s(ctx, "var " + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr("_elem = Runtime.Web.Drivers.RenderDriver.elem(") + use("Runtime.rtl").toStr("layout,") + use("Runtime.rtl").toStr(tag_name) + use("Runtime.rtl").toStr(",") + use("Runtime.rtl").toStr(attrs) + use("Runtime.rtl").toStr(",") + use("Runtime.rtl").toStr(var_name_content) + use("Runtime.rtl").toStr(",") + use("Runtime.rtl").toStr("control,") + use("Runtime.rtl").toStr(item_pos) + use("Runtime.rtl").toStr(");")));
		}
		var res = t.constructor.addSaveOpCode(ctx, t, use("Runtime.Dict").from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = res[0];
		return use("Runtime.Collection").from([t,var_name + use("Runtime.rtl").toStr("_elem")]);
	},
	/**
	 * Translator html items
	 */
	OpHtmlItems: function(ctx, t, op_code)
	{
		if (op_code.items.count(ctx) == 0)
		{
			return use("Runtime.Collection").from([t,""]);
		}
		var res = t.constructor.incSaveOpCode(ctx, t);
		t = res[0];
		var var_name = res[1];
		var content = t.s(ctx, "/* Items */");
		content += use("Runtime.rtl").toStr(t.s(ctx, "var " + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr(" = [];")));
		for (var i = 0;i < op_code.items.count(ctx);i++)
		{
			var item = op_code.items.item(ctx, i);
			var item_value = "";
			var is_text = false;
			var is_html = false;
			var is_raw = false;
			var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlContent");
			var __v1 = use("Bayrell.Lang.OpCodes.OpHtmlTag");
			var __v2 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
			if (item instanceof __v0)
			{
				item_value = t.expression.constructor.toString(ctx, item.value);
				is_text = true;
			}
			else if (item instanceof __v1)
			{
				var res = this.OpHtmlTag(ctx, t, item, i);
				t = res[0];
				item_value = res[1];
			}
			else if (item instanceof __v2)
			{
				var __v3 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				var __v4 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				var __v5 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				if (item.kind == __v3.KIND_RAW)
				{
					var res = t.expression.constructor.Expression(ctx, t, item.value);
					t = res[0];
					item_value = res[1];
					is_raw = true;
				}
				else if (item.kind == __v4.KIND_HTML)
				{
					var res = t.expression.constructor.Expression(ctx, t, item.value);
					t = res[0];
					item_value = res[1];
					is_html = true;
				}
				else if (item.kind == __v5.KIND_JSON)
				{
					var res = t.expression.constructor.Expression(ctx, t, item.value);
					t = res[0];
					item_value = res[1];
					item_value = "this.json_encode(ctx, " + use("Runtime.rtl").toStr(item_value) + use("Runtime.rtl").toStr(")");
					is_text = true;
				}
			}
			else
			{
				var res = t.expression.constructor.Expression(ctx, t, item);
				t = res[0];
				item_value = res[1];
				is_text = true;
			}
			if (item_value == "")
			{
				continue;
			}
			if (is_text)
			{
				item_value = "Runtime.Web.Drivers.RenderDriver.text(" + use("Runtime.rtl").toStr("layout,") + use("Runtime.rtl").toStr(item_value) + use("Runtime.rtl").toStr(",") + use("Runtime.rtl").toStr("control,") + use("Runtime.rtl").toStr(i) + use("Runtime.rtl").toStr(")");
			}
			else if (is_html)
			{
				item_value = "Runtime.Web.Drivers.RenderDriver.html(" + use("Runtime.rtl").toStr("layout,") + use("Runtime.rtl").toStr(item_value) + use("Runtime.rtl").toStr(",") + use("Runtime.rtl").toStr("control,") + use("Runtime.rtl").toStr(i) + use("Runtime.rtl").toStr(")");
			}
			else if (is_raw)
			{
				item_value = "Runtime.Web.Drivers.RenderDriver.raw(" + use("Runtime.rtl").toStr("layout,") + use("Runtime.rtl").toStr(item_value) + use("Runtime.rtl").toStr(",") + use("Runtime.rtl").toStr("control,") + use("Runtime.rtl").toStr(i) + use("Runtime.rtl").toStr(")");
			}
			content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(".push(") + use("Runtime.rtl").toStr(item_value) + use("Runtime.rtl").toStr(");")));
		}
		var res = t.constructor.addSaveOpCode(ctx, t, use("Runtime.Dict").from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = res[0];
		return use("Runtime.Collection").from([t,var_name]);
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
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
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
});use.add(Bayrell.Lang.LangES6.TranslatorES6Html);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangES6 == undefined) module.exports.Bayrell.Lang.LangES6 = {};
module.exports.Bayrell.Lang.LangES6.TranslatorES6Html = Bayrell.Lang.LangES6.TranslatorES6Html;