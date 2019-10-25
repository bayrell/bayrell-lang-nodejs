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
if (typeof Bayrell.Lang.LangES6 == 'undefined') Bayrell.Lang.LangES6 = {};
Bayrell.Lang.LangES6.TranslatorES6Program = function(__ctx)
{
	use("Runtime.CoreStruct").apply(this, arguments);
};
Bayrell.Lang.LangES6.TranslatorES6Program.prototype = Object.create(use("Runtime.CoreStruct").prototype);
Bayrell.Lang.LangES6.TranslatorES6Program.prototype.constructor = Bayrell.Lang.LangES6.TranslatorES6Program;
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Program.prototype,
{
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.LangES6.TranslatorES6Program"))
		{
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		use("Runtime.CoreStruct").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Program";
	},
});
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Program, use("Runtime.CoreStruct"));
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Program,
{
	/**
	 * To pattern
	 */
	toPattern: function(__ctx, t, pattern)
	{
		var names = t.expression.constructor.findModuleNames(__ctx, t, pattern.entity_name.names);
		var __v0 = use("Runtime.rs");
		var e = __v0.join(__ctx, ".", names);
		var a = (pattern.template != null) ? pattern.template.map(__ctx, (__ctx, pattern) => 
		{
			return this.toPattern(__ctx, t, pattern);
		}) : null;
		var __v0 = use("Runtime.rs");
		var b = (a != null) ? ",\"t\":[" + use("Runtime.rtl").toStr(__v0.join(__ctx, ",", a)) + use("Runtime.rtl").toStr("]") : "";
		return "{\"e\":" + use("Runtime.rtl").toStr(t.expression.constructor.toString(__ctx, e)) + use("Runtime.rtl").toStr(b) + use("Runtime.rtl").toStr("}");
	},
	/**
	 * OpNamespace
	 */
	OpNamespace: function(__ctx, t, op_code)
	{
		var content = "";
		var name = "";
		var s = "";
		var __v0 = use("Runtime.rs");
		var arr = __v0.split(__ctx, "\\.", op_code.name);
		for (var i = 0;i < arr.count(__ctx);i++)
		{
			name = name + use("Runtime.rtl").toStr(((i == 0) ? "" : ".")) + use("Runtime.rtl").toStr(arr.item(__ctx, i));
			s = "if (typeof " + use("Runtime.rtl").toStr(name) + use("Runtime.rtl").toStr(" == 'undefined') ") + use("Runtime.rtl").toStr(name) + use("Runtime.rtl").toStr(" = {};");
			content += use("Runtime.rtl").toStr(t.s(__ctx, s));
		}
		t = t.copy(__ctx, { "current_namespace_name": op_code.name });
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClassConstructor: function(__ctx, t, op_code)
	{
		var open = "";
		var content = "";
		var save_t = t;
		/* Set function name */
		t = t.copy(__ctx, { "current_function": op_code.fn_create });
		/* Clear save op codes */
		t = t.constructor.clearSaveOpCode(__ctx, t);
		if (op_code.fn_create == null)
		{
			open += use("Runtime.rtl").toStr(t.current_class_full_name + use("Runtime.rtl").toStr(" = "));
			open += use("Runtime.rtl").toStr("function(__ctx)");
			open = t.s(__ctx, open) + use("Runtime.rtl").toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			/* Call parent */
			if (t.current_class_extends_name != "")
			{
				content += use("Runtime.rtl").toStr(t.s(__ctx, t.expression.constructor.useModuleName(__ctx, t, t.current_class_extends_name) + use("Runtime.rtl").toStr(".apply(this, arguments);")));
			}
		}
		else
		{
			open += use("Runtime.rtl").toStr(t.current_class_full_name + use("Runtime.rtl").toStr(" = function("));
			var res = t.operator.constructor.OpDeclareFunctionArgs(__ctx, t, op_code.fn_create);
			t = res[0];
			open += use("Runtime.rtl").toStr(res[1]);
			open += use("Runtime.rtl").toStr(")");
			open = t.s(__ctx, open) + use("Runtime.rtl").toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
		}
		/* Function body */
		if (op_code.fn_create != null)
		{
			var res = t.operator.constructor.Operators(__ctx, t, (op_code.fn_create.expression) ? op_code.fn_create.expression : op_code.fn_create.value);
			t = res[0];
			content += use("Runtime.rtl").toStr(res[1]);
		}
		/* Constructor end */
		content = open + use("Runtime.rtl").toStr(content);
		t = t.levelDec(__ctx);
		content += use("Runtime.rtl").toStr(t.s(__ctx, "};"));
		return use("Runtime.Collection").from([save_t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClassBodyStatic: function(__ctx, t, op_code)
	{
		var content = "";
		var class_kind = op_code.kind;
		var current_class_extends_name = t.expression.constructor.findModuleName(__ctx, t, t.current_class_extends_name);
		/* Returns parent class name */
		var parent_class_name = "";
		if (op_code.class_extends != null)
		{
			var res = t.expression.constructor.OpTypeIdentifier(__ctx, t, op_code.class_extends);
			parent_class_name = res[1];
		}
		if (current_class_extends_name != "")
		{
			content += use("Runtime.rtl").toStr(t.s(__ctx, "Object.assign(" + use("Runtime.rtl").toStr(t.current_class_full_name) + use("Runtime.rtl").toStr(", ") + use("Runtime.rtl").toStr(t.expression.constructor.useModuleName(__ctx, t, current_class_extends_name)) + use("Runtime.rtl").toStr(");")));
		}
		content += use("Runtime.rtl").toStr(t.s(__ctx, "Object.assign(" + use("Runtime.rtl").toStr(t.current_class_full_name) + use("Runtime.rtl").toStr(",")));
		content += use("Runtime.rtl").toStr(t.s(__ctx, "{"));
		t = t.levelInc(__ctx);
		/* Static variables */
		if (op_code.vars != null)
		{
			for (var i = 0;i < op_code.vars.count(__ctx);i++)
			{
				var variable = op_code.vars.item(__ctx, i);
				var __v0 = use("Bayrell.Lang.OpCodes.OpAssign");
				if (variable.kind != __v0.KIND_DECLARE)
				{
					continue;
				}
				var is_static = variable.flags.isFlag(__ctx, "static");
				if (!is_static)
				{
					continue;
				}
				for (var j = 0;j < variable.values.count(__ctx);j++)
				{
					var value = variable.values.item(__ctx, j);
					var res = t.expression.constructor.Expression(__ctx, t, value.expression);
					var s = (value.expression != null) ? res[1] : "null";
					content += use("Runtime.rtl").toStr(t.s(__ctx, value.var_name + use("Runtime.rtl").toStr(": ") + use("Runtime.rtl").toStr(s) + use("Runtime.rtl").toStr(",")));
				}
			}
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		if (class_kind != __v0.KIND_INTERFACE)
		{
			/* Static Functions */
			if (op_code.functions != null)
			{
				t = t.copy(__ctx, { "is_static_function": true });
				for (var i = 0;i < op_code.functions.count(__ctx);i++)
				{
					var f = op_code.functions.item(__ctx, i);
					if (f.flags.isFlag(__ctx, "declare"))
					{
						continue;
					}
					if (!f.isStatic(__ctx))
					{
						continue;
					}
					/* Set function name */
					t = t.copy(__ctx, { "current_function": f });
					var s = "";
					var res = t.operator.constructor.OpDeclareFunctionArgs(__ctx, t, f);
					var args = res[1];
					s += use("Runtime.rtl").toStr(f.name + use("Runtime.rtl").toStr(": function(") + use("Runtime.rtl").toStr(args) + use("Runtime.rtl").toStr(")"));
					var res = t.operator.constructor.OpDeclareFunctionBody(__ctx, t, f);
					s += use("Runtime.rtl").toStr(res[1]);
					s += use("Runtime.rtl").toStr(",");
					/* Function comments */
					var res = t.operator.constructor.AddComments(__ctx, t, f.comments, t.s(__ctx, s));
					content += use("Runtime.rtl").toStr(res[1]);
				}
			}
			content += use("Runtime.rtl").toStr(t.s(__ctx, "/* ======================= Class Init Functions ======================= */"));
			/* Get current namespace function */
			content += use("Runtime.rtl").toStr(t.s(__ctx, "getCurrentNamespace: function()"));
			content += use("Runtime.rtl").toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "return " + use("Runtime.rtl").toStr(t.expression.constructor.toString(__ctx, t.current_namespace_name)) + use("Runtime.rtl").toStr(";")));
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "},"));
			/* Get current class name function */
			content += use("Runtime.rtl").toStr(t.s(__ctx, "getCurrentClassName: function()"));
			content += use("Runtime.rtl").toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "return " + use("Runtime.rtl").toStr(t.expression.constructor.toString(__ctx, t.current_class_full_name)) + use("Runtime.rtl").toStr(";")));
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "},"));
			/* Get parent class name function */
			content += use("Runtime.rtl").toStr(t.s(__ctx, "getParentClassName: function()"));
			content += use("Runtime.rtl").toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "return " + use("Runtime.rtl").toStr(t.expression.constructor.toString(__ctx, current_class_extends_name)) + use("Runtime.rtl").toStr(";")));
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "},"));
			/* Class info */
			content += use("Runtime.rtl").toStr(t.s(__ctx, "getClassInfo: function(__ctx)"));
			content += use("Runtime.rtl").toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			var s1 = "";
			s1 += use("Runtime.rtl").toStr(t.s(__ctx, "var Collection = " + use("Runtime.rtl").toStr(t.expression.constructor.useModuleName(__ctx, t, "Runtime.Collection")) + use("Runtime.rtl").toStr(";")));
			s1 += use("Runtime.rtl").toStr(t.s(__ctx, "var Dict = " + use("Runtime.rtl").toStr(t.expression.constructor.useModuleName(__ctx, t, "Runtime.Dict")) + use("Runtime.rtl").toStr(";")));
			s1 += use("Runtime.rtl").toStr(t.s(__ctx, "var IntrospectionInfo = " + use("Runtime.rtl").toStr(t.expression.constructor.useModuleName(__ctx, t, "Runtime.Annotations.IntrospectionInfo")) + use("Runtime.rtl").toStr(";")));
			s1 += use("Runtime.rtl").toStr(t.s(__ctx, "return new IntrospectionInfo(__ctx, {"));
			t = t.levelInc(__ctx);
			s1 += use("Runtime.rtl").toStr(t.s(__ctx, "\"kind\": IntrospectionInfo.ITEM_CLASS,"));
			s1 += use("Runtime.rtl").toStr(t.s(__ctx, "\"class_name\": " + use("Runtime.rtl").toStr(t.expression.constructor.toString(__ctx, t.current_class_full_name)) + use("Runtime.rtl").toStr(",")));
			s1 += use("Runtime.rtl").toStr(t.s(__ctx, "\"name\": " + use("Runtime.rtl").toStr(t.expression.constructor.toString(__ctx, t.current_class_full_name)) + use("Runtime.rtl").toStr(",")));
			s1 += use("Runtime.rtl").toStr(t.s(__ctx, "\"annotations\": Collection.from(["));
			t = t.levelInc(__ctx);
			for (var j = 0;j < op_code.annotations.count(__ctx);j++)
			{
				var annotation = op_code.annotations.item(__ctx, j);
				var res = t.expression.constructor.OpTypeIdentifier(__ctx, t, annotation.name);
				t = res[0];
				var name = res[1];
				var res = t.expression.constructor.OpDict(__ctx, t, annotation.params, true);
				t = res[0];
				var params = res[1];
				s1 += use("Runtime.rtl").toStr(t.s(__ctx, "new " + use("Runtime.rtl").toStr(name) + use("Runtime.rtl").toStr("(__ctx, ") + use("Runtime.rtl").toStr(params) + use("Runtime.rtl").toStr("),")));
			}
			t = t.levelDec(__ctx);
			s1 += use("Runtime.rtl").toStr(t.s(__ctx, "]),"));
			t = t.levelDec(__ctx);
			s1 += use("Runtime.rtl").toStr(t.s(__ctx, "});"));
			var save = t.constructor.outputSaveOpCode(__ctx, t);
			if (save != "")
			{
				content += use("Runtime.rtl").toStr(t.s(__ctx, save));
			}
			content += use("Runtime.rtl").toStr(s1);
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "},"));
			/* Get fields list of the function */
			content += use("Runtime.rtl").toStr(t.s(__ctx, "getFieldsList: function(__ctx, f)"));
			content += use("Runtime.rtl").toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "var a = [];"));
			content += use("Runtime.rtl").toStr(t.s(__ctx, "if (f==undefined) f=0;"));
			if (op_code.vars != null)
			{
				var __v1 = use("Runtime.Map");
				var vars = new __v1(__ctx);
				for (var i = 0;i < op_code.vars.count(__ctx);i++)
				{
					var variable = op_code.vars.item(__ctx, i);
					var is_static = variable.flags.isFlag(__ctx, "static");
					var is_serializable = variable.flags.isFlag(__ctx, "serializable");
					var is_assignable = true;
					var has_annotation = variable.annotations != null && variable.annotations.count(__ctx) > 0;
					if (is_static)
					{
						continue;
					}
					var __v1 = use("Bayrell.Lang.OpCodes.OpAssign");
					if (variable.kind != __v1.KIND_DECLARE)
					{
						continue;
					}
					var __v1 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
					if (class_kind == __v1.KIND_STRUCT)
					{
						is_serializable = true;
						is_assignable = true;
					}
					if (is_serializable)
					{
						is_assignable = true;
					}
					var flag = 0;
					if (is_serializable)
					{
						flag = flag | 1;
					}
					if (is_assignable)
					{
						flag = flag | 2;
					}
					if (has_annotation)
					{
						flag = flag | 4;
					}
					if (flag != 0)
					{
						if (!vars.has(__ctx, flag))
						{
							var __v1 = use("Runtime.Vector");
							vars.set(__ctx, flag, new __v1(__ctx));
						}
						var v = vars.item(__ctx, flag);
						for (var j = 0;j < variable.values.count(__ctx);j++)
						{
							var value = variable.values.item(__ctx, j);
							v.push(__ctx, value.var_name);
						}
					}
				}
				vars.each(__ctx, (__ctx, v, flag) => 
				{
					content += use("Runtime.rtl").toStr(t.s(__ctx, "if ((f|" + use("Runtime.rtl").toStr(flag) + use("Runtime.rtl").toStr(")==") + use("Runtime.rtl").toStr(flag) + use("Runtime.rtl").toStr(")")));
					content += use("Runtime.rtl").toStr(t.s(__ctx, "{"));
					t = t.levelInc(__ctx);
					v.each(__ctx, (__ctx, varname) => 
					{
						content += use("Runtime.rtl").toStr(t.s(__ctx, "a.push(" + use("Runtime.rtl").toStr(t.expression.constructor.toString(__ctx, varname)) + use("Runtime.rtl").toStr(");")));
					});
					t = t.levelDec(__ctx);
					content += use("Runtime.rtl").toStr(t.s(__ctx, "}"));
				});
			}
			content += use("Runtime.rtl").toStr(t.s(__ctx, "return " + use("Runtime.rtl").toStr(t.expression.constructor.useModuleName(__ctx, t, "Runtime.Collection")) + use("Runtime.rtl").toStr(".from(a);")));
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "},"));
			/* Get field info by name */
			content += use("Runtime.rtl").toStr(t.s(__ctx, "getFieldInfoByName: function(__ctx,field_name)"));
			content += use("Runtime.rtl").toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "return null;"));
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "},"));
			/* Get methods list of the function */
			content += use("Runtime.rtl").toStr(t.s(__ctx, "getMethodsList: function(__ctx)"));
			content += use("Runtime.rtl").toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "var a = ["));
			t = t.levelInc(__ctx);
			if (op_code.functions != null)
			{
				for (var i = 0;i < op_code.functions.count(__ctx);i++)
				{
					var f = op_code.functions.item(__ctx, i);
					if (f.flags.isFlag(__ctx, "declare"))
					{
						continue;
					}
					if (f.annotations.count(__ctx) == 0)
					{
						continue;
					}
					content += use("Runtime.rtl").toStr(t.s(__ctx, t.expression.constructor.toString(__ctx, f.name) + use("Runtime.rtl").toStr(",")));
				}
			}
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "];"));
			content += use("Runtime.rtl").toStr(t.s(__ctx, "return " + use("Runtime.rtl").toStr(t.expression.constructor.useModuleName(__ctx, t, "Runtime.Collection")) + use("Runtime.rtl").toStr(".from(a);")));
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "},"));
			/* Get method info by name */
			content += use("Runtime.rtl").toStr(t.s(__ctx, "getMethodInfoByName: function(__ctx,field_name)"));
			content += use("Runtime.rtl").toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			if (op_code.functions != null)
			{
				for (var i = 0;i < op_code.functions.count(__ctx);i++)
				{
					var f = op_code.functions.item(__ctx, i);
					if (f.flags.isFlag(__ctx, "declare"))
					{
						continue;
					}
					if (f.annotations.count(__ctx) == 0)
					{
						continue;
					}
					content += use("Runtime.rtl").toStr(t.s(__ctx, "if (field_name == " + use("Runtime.rtl").toStr(t.expression.constructor.toString(__ctx, f.name)) + use("Runtime.rtl").toStr(")")));
					content += use("Runtime.rtl").toStr(t.s(__ctx, "{"));
					var s1 = "";
					t = t.levelInc(__ctx);
					s1 += use("Runtime.rtl").toStr(t.s(__ctx, "var Collection = " + use("Runtime.rtl").toStr(t.expression.constructor.useModuleName(__ctx, t, "Runtime.Collection")) + use("Runtime.rtl").toStr(";")));
					s1 += use("Runtime.rtl").toStr(t.s(__ctx, "var Dict = " + use("Runtime.rtl").toStr(t.expression.constructor.useModuleName(__ctx, t, "Runtime.Dict")) + use("Runtime.rtl").toStr(";")));
					s1 += use("Runtime.rtl").toStr(t.s(__ctx, "var IntrospectionInfo = " + use("Runtime.rtl").toStr(t.expression.constructor.useModuleName(__ctx, t, "Runtime.Annotations.IntrospectionInfo")) + use("Runtime.rtl").toStr(";")));
					s1 += use("Runtime.rtl").toStr(t.s(__ctx, "return new IntrospectionInfo(__ctx, {"));
					t = t.levelInc(__ctx);
					s1 += use("Runtime.rtl").toStr(t.s(__ctx, "\"kind\": IntrospectionInfo.ITEM_METHOD,"));
					s1 += use("Runtime.rtl").toStr(t.s(__ctx, "\"class_name\": " + use("Runtime.rtl").toStr(t.expression.constructor.toString(__ctx, t.current_class_full_name)) + use("Runtime.rtl").toStr(",")));
					s1 += use("Runtime.rtl").toStr(t.s(__ctx, "\"name\": " + use("Runtime.rtl").toStr(t.expression.constructor.toString(__ctx, f.name)) + use("Runtime.rtl").toStr(",")));
					s1 += use("Runtime.rtl").toStr(t.s(__ctx, "\"annotations\": Collection.from(["));
					t = t.levelInc(__ctx);
					for (var j = 0;j < f.annotations.count(__ctx);j++)
					{
						var annotation = f.annotations.item(__ctx, j);
						var res = t.expression.constructor.OpTypeIdentifier(__ctx, t, annotation.name);
						t = res[0];
						var name = res[1];
						var res = t.expression.constructor.OpDict(__ctx, t, annotation.params, true);
						t = res[0];
						var params = res[1];
						s1 += use("Runtime.rtl").toStr(t.s(__ctx, "new " + use("Runtime.rtl").toStr(name) + use("Runtime.rtl").toStr("(__ctx, ") + use("Runtime.rtl").toStr(params) + use("Runtime.rtl").toStr("),")));
					}
					t = t.levelDec(__ctx);
					s1 += use("Runtime.rtl").toStr(t.s(__ctx, "]),"));
					t = t.levelDec(__ctx);
					s1 += use("Runtime.rtl").toStr(t.s(__ctx, "});"));
					var save = t.constructor.outputSaveOpCode(__ctx, t);
					if (save != "")
					{
						content += use("Runtime.rtl").toStr(t.s(__ctx, save));
					}
					content += use("Runtime.rtl").toStr(s1);
					t = t.levelDec(__ctx);
					content += use("Runtime.rtl").toStr(t.s(__ctx, "}"));
				}
			}
			content += use("Runtime.rtl").toStr(t.s(__ctx, "return null;"));
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "},"));
			/* Add implements */
			if (op_code.class_implements != null && op_code.class_implements.count(__ctx) > 0)
			{
				content += use("Runtime.rtl").toStr(t.s(__ctx, "__implements__:"));
				content += use("Runtime.rtl").toStr(t.s(__ctx, "["));
				t = t.levelInc(__ctx);
				for (var i = 0;i < op_code.class_implements.count(__ctx);i++)
				{
					var item = op_code.class_implements.item(__ctx, i);
					var module_name = item.entity_name.names.first(__ctx);
					var s = t.expression.constructor.useModuleName(__ctx, t, module_name);
					if (s == "")
					{
						continue;
					}
					content += use("Runtime.rtl").toStr(t.s(__ctx, s + use("Runtime.rtl").toStr(",")));
				}
				t = t.levelDec(__ctx);
				content += use("Runtime.rtl").toStr(t.s(__ctx, "],"));
			}
		}
		else
		{
			/* Get current namespace function */
			content += use("Runtime.rtl").toStr(t.s(__ctx, "getCurrentNamespace: function()"));
			content += use("Runtime.rtl").toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "return " + use("Runtime.rtl").toStr(t.expression.constructor.toString(__ctx, t.current_namespace_name)) + use("Runtime.rtl").toStr(";")));
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "},"));
			/* Get current class name function */
			content += use("Runtime.rtl").toStr(t.s(__ctx, "getCurrentClassName: function()"));
			content += use("Runtime.rtl").toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "return " + use("Runtime.rtl").toStr(t.expression.constructor.toString(__ctx, t.current_class_full_name)) + use("Runtime.rtl").toStr(";")));
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "},"));
		}
		t = t.levelDec(__ctx);
		content += use("Runtime.rtl").toStr(t.s(__ctx, "});"));
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClassBody: function(__ctx, t, op_code)
	{
		var content = "";
		var class_kind = op_code.kind;
		content += use("Runtime.rtl").toStr(t.s(__ctx, "Object.assign(" + use("Runtime.rtl").toStr(t.current_class_full_name) + use("Runtime.rtl").toStr(".prototype,")));
		content += use("Runtime.rtl").toStr(t.s(__ctx, "{"));
		t = t.levelInc(__ctx);
		/* Functions */
		if (op_code.functions != null)
		{
			t = t.copy(__ctx, { "is_static_function": false });
			for (var i = 0;i < op_code.functions.count(__ctx);i++)
			{
				var f = op_code.functions.item(__ctx, i);
				if (f.flags.isFlag(__ctx, "declare"))
				{
					continue;
				}
				if (f.isStatic(__ctx))
				{
					continue;
				}
				/* Set function name */
				t = t.copy(__ctx, { "current_function": f });
				var s = "";
				var res = t.operator.constructor.OpDeclareFunctionArgs(__ctx, t, f);
				var args = res[1];
				s += use("Runtime.rtl").toStr(f.name + use("Runtime.rtl").toStr(": function(") + use("Runtime.rtl").toStr(args) + use("Runtime.rtl").toStr(")"));
				var res = t.operator.constructor.OpDeclareFunctionBody(__ctx, t, f);
				s += use("Runtime.rtl").toStr(res[1]);
				s += use("Runtime.rtl").toStr(",");
				/* Function comments */
				var res = t.operator.constructor.AddComments(__ctx, t, f.comments, t.s(__ctx, s));
				content += use("Runtime.rtl").toStr(res[1]);
			}
		}
		/* Init variables */
		var __v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		if (class_kind != __v0.KIND_INTERFACE && op_code.vars != null)
		{
			var vars = op_code.vars.filter(__ctx, (__ctx, variable) => 
			{
				return !variable.flags.isFlag(__ctx, "static");
			});
			if (t.current_class_full_name != "Runtime.CoreObject" && vars.count(__ctx) > 0)
			{
				content += use("Runtime.rtl").toStr(t.s(__ctx, "_init: function(__ctx)"));
				content += use("Runtime.rtl").toStr(t.s(__ctx, "{"));
				t = t.levelInc(__ctx);
				/* Clear save op codes */
				var save_op_codes = t.save_op_codes;
				var save_op_code_inc = t.save_op_code_inc;
				var __v1 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
				if (class_kind == __v1.KIND_STRUCT)
				{
					content += use("Runtime.rtl").toStr(t.s(__ctx, "var defProp = use('Runtime.rtl').defProp;"));
					content += use("Runtime.rtl").toStr(t.s(__ctx, "var a = Object.getOwnPropertyNames(this);"));
				}
				var s1 = "";
				for (var i = 0;i < op_code.vars.count(__ctx);i++)
				{
					var variable = op_code.vars.item(__ctx, i);
					var is_static = variable.flags.isFlag(__ctx, "static");
					if (is_static)
					{
						continue;
					}
					var __v1 = use("Bayrell.Lang.OpCodes.OpAssign");
					if (variable.kind != __v1.KIND_DECLARE)
					{
						continue;
					}
					var prefix = "";
					var __v1 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
					var __v2 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
					if (class_kind == __v1.KIND_STRUCT)
					{
						prefix = "__";
					}
					else if (class_kind == __v2.KIND_CLASS)
					{
						prefix = "";
					}
					for (var j = 0;j < variable.values.count(__ctx);j++)
					{
						var value = variable.values.item(__ctx, j);
						var res = t.expression.constructor.Expression(__ctx, t, value.expression);
						t = res[0];
						var s = (value.expression != null) ? res[1] : "null";
						s1 += use("Runtime.rtl").toStr(t.s(__ctx, "this." + use("Runtime.rtl").toStr(prefix) + use("Runtime.rtl").toStr(value.var_name) + use("Runtime.rtl").toStr(" = ") + use("Runtime.rtl").toStr(s) + use("Runtime.rtl").toStr(";")));
						var __v1 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
						if (class_kind == __v1.KIND_STRUCT)
						{
							var var_name = t.expression.constructor.toString(__ctx, value.var_name);
							s1 += use("Runtime.rtl").toStr(t.s(__ctx, "if (a.indexOf(" + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr(") == -1) defProp(this, ") + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr(");")));
							/*
							s1 ~= t.s
							(
								"if (a.indexOf(" ~ t.expression::toString(value.var_name) ~ ") == -1)"~
								"Object.defineProperty(this, " ~ t.expression::toString(value.var_name) ~ ",{"~
								"get:function(){return this." ~ prefix ~ value.var_name ~ ";},"~
								"set:function(value){"~
									"throw new Runtime.Exceptions.AssignStructValueError(" ~
										t.expression::toString(value.var_name) ~
									");}"~
								"});"
							);
							*/
						}
					}
				}
				if (t.current_class_extends_name != "")
				{
					s1 += use("Runtime.rtl").toStr(t.s(__ctx, t.expression.constructor.useModuleName(__ctx, t, t.current_class_extends_name) + use("Runtime.rtl").toStr(".prototype._init.call(this,__ctx);")));
				}
				/* Output save op code */
				var save = t.constructor.outputSaveOpCode(__ctx, t, save_op_codes.count(__ctx));
				if (save != "")
				{
					content += use("Runtime.rtl").toStr(save);
				}
				/* Restore save op codes */
				t = t.copy(__ctx, { "save_op_codes": save_op_codes });
				t = t.copy(__ctx, { "save_op_code_inc": save_op_code_inc });
				/* Add content */
				content += use("Runtime.rtl").toStr(s1);
				t = t.levelDec(__ctx);
				content += use("Runtime.rtl").toStr(t.s(__ctx, "},"));
			}
			var __v1 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
			var is_struct = class_kind == __v1.KIND_STRUCT;
			var var_prefix = (is_struct) ? "__" : "";
			/* Assign Object */
			content += use("Runtime.rtl").toStr(t.s(__ctx, "assignObject: function(__ctx,o)"));
			content += use("Runtime.rtl").toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "if (o instanceof " + use("Runtime.rtl").toStr(t.expression.constructor.useModuleName(__ctx, t, t.current_class_full_name)) + use("Runtime.rtl").toStr(")")));
			content += use("Runtime.rtl").toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			for (var i = 0;i < op_code.vars.count(__ctx);i++)
			{
				var variable = op_code.vars.item(__ctx, i);
				var __v1 = use("Bayrell.Lang.OpCodes.OpAssign");
				if (variable.kind != __v1.KIND_DECLARE)
				{
					continue;
				}
				var is_const = variable.flags.isFlag(__ctx, "const");
				var is_static = variable.flags.isFlag(__ctx, "static");
				if (is_const || is_static)
				{
					continue;
				}
				for (var j = 0;j < variable.values.count(__ctx);j++)
				{
					var value = variable.values.item(__ctx, j);
					content += use("Runtime.rtl").toStr(t.s(__ctx, "this." + use("Runtime.rtl").toStr(var_prefix) + use("Runtime.rtl").toStr(value.var_name) + use("Runtime.rtl").toStr(" = o.") + use("Runtime.rtl").toStr(var_prefix) + use("Runtime.rtl").toStr(value.var_name) + use("Runtime.rtl").toStr(";")));
				}
			}
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "}"));
			if (t.current_class_extends_name != "")
			{
				content += use("Runtime.rtl").toStr(t.s(__ctx, t.expression.constructor.useModuleName(__ctx, t, t.current_class_extends_name) + use("Runtime.rtl").toStr(".prototype.assignObject.call(this,__ctx,o);")));
			}
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "},"));
			/* Assign Value */
			content += use("Runtime.rtl").toStr(t.s(__ctx, "assignValue: function(__ctx,k,v)"));
			content += use("Runtime.rtl").toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			var flag = false;
			for (var i = 0;i < op_code.vars.count(__ctx);i++)
			{
				var variable = op_code.vars.item(__ctx, i);
				var __v1 = use("Bayrell.Lang.OpCodes.OpAssign");
				if (variable.kind != __v1.KIND_DECLARE)
				{
					continue;
				}
				var is_const = variable.flags.isFlag(__ctx, "const");
				var is_static = variable.flags.isFlag(__ctx, "static");
				if (is_const || is_static)
				{
					continue;
				}
				for (var j = 0;j < variable.values.count(__ctx);j++)
				{
					var value = variable.values.item(__ctx, j);
					if (t.flag_struct_check_types)
					{
						content += use("Runtime.rtl").toStr(t.s(__ctx, ((flag) ? "else " : "") + use("Runtime.rtl").toStr("if (k == ") + use("Runtime.rtl").toStr(t.expression.constructor.toString(__ctx, value.var_name)) + use("Runtime.rtl").toStr(")") + use("Runtime.rtl").toStr("this.") + use("Runtime.rtl").toStr(var_prefix) + use("Runtime.rtl").toStr(value.var_name) + use("Runtime.rtl").toStr(" = Runtime.rtl.to(v, null, ") + use("Runtime.rtl").toStr(this.toPattern(__ctx, t, variable.pattern)) + use("Runtime.rtl").toStr(");")));
					}
					else
					{
						content += use("Runtime.rtl").toStr(t.s(__ctx, ((flag) ? "else " : "") + use("Runtime.rtl").toStr("if (k == ") + use("Runtime.rtl").toStr(t.expression.constructor.toString(__ctx, value.var_name)) + use("Runtime.rtl").toStr(")") + use("Runtime.rtl").toStr("this.") + use("Runtime.rtl").toStr(var_prefix) + use("Runtime.rtl").toStr(value.var_name) + use("Runtime.rtl").toStr(" = v;")));
					}
					flag = true;
				}
			}
			if (t.current_class_extends_name != "")
			{
				content += use("Runtime.rtl").toStr(t.s(__ctx, ((flag) ? "else " : "") + use("Runtime.rtl").toStr(t.expression.constructor.useModuleName(__ctx, t, t.current_class_extends_name)) + use("Runtime.rtl").toStr(".prototype.assignValue.call(this,__ctx,k,v);")));
			}
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "},"));
			/* Take Value */
			content += use("Runtime.rtl").toStr(t.s(__ctx, "takeValue: function(__ctx,k,d)"));
			content += use("Runtime.rtl").toStr(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "if (d == undefined) d = null;"));
			var flag = false;
			for (var i = 0;i < op_code.vars.count(__ctx);i++)
			{
				var variable = op_code.vars.item(__ctx, i);
				var __v1 = use("Bayrell.Lang.OpCodes.OpAssign");
				if (variable.kind != __v1.KIND_DECLARE)
				{
					continue;
				}
				var is_const = variable.flags.isFlag(__ctx, "const");
				var is_static = variable.flags.isFlag(__ctx, "static");
				if (is_const || is_static)
				{
					continue;
				}
				for (var j = 0;j < variable.values.count(__ctx);j++)
				{
					var value = variable.values.item(__ctx, j);
					content += use("Runtime.rtl").toStr(t.s(__ctx, ((flag) ? "else " : "") + use("Runtime.rtl").toStr("if (k == ") + use("Runtime.rtl").toStr(t.expression.constructor.toString(__ctx, value.var_name)) + use("Runtime.rtl").toStr(")return this.") + use("Runtime.rtl").toStr(var_prefix) + use("Runtime.rtl").toStr(value.var_name) + use("Runtime.rtl").toStr(";")));
					flag = true;
				}
			}
			if (t.current_class_extends_name != "")
			{
				content += use("Runtime.rtl").toStr(t.s(__ctx, "return " + use("Runtime.rtl").toStr(t.expression.constructor.useModuleName(__ctx, t, t.current_class_extends_name)) + use("Runtime.rtl").toStr(".prototype.takeValue.call(this,__ctx,k,d);")));
			}
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toStr(t.s(__ctx, "},"));
		}
		/* Get class name function */
		content += use("Runtime.rtl").toStr(t.s(__ctx, "getClassName: function(__ctx)"));
		content += use("Runtime.rtl").toStr(t.s(__ctx, "{"));
		t = t.levelInc(__ctx);
		content += use("Runtime.rtl").toStr(t.s(__ctx, "return " + use("Runtime.rtl").toStr(t.expression.constructor.toString(__ctx, t.current_class_full_name)) + use("Runtime.rtl").toStr(";")));
		t = t.levelDec(__ctx);
		content += use("Runtime.rtl").toStr(t.s(__ctx, "},"));
		t = t.levelDec(__ctx);
		content += use("Runtime.rtl").toStr(t.s(__ctx, "});"));
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpDeclareClassFooter
	 */
	OpDeclareClassFooter: function(__ctx, t, op_code)
	{
		var content = t.s(__ctx, "Runtime.rtl.defClass(" + use("Runtime.rtl").toStr(t.current_class_full_name) + use("Runtime.rtl").toStr(");"));
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClass: function(__ctx, t, op_code)
	{
		if (op_code.is_declare)
		{
			return use("Runtime.Collection").from([t,""]);
		}
		var content = "";
		t = t.copy(__ctx, { "current_class_name": op_code.name });
		t = t.copy(__ctx, { "current_class_full_name": t.current_namespace_name + use("Runtime.rtl").toStr(".") + use("Runtime.rtl").toStr(t.current_class_name) });
		var __v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		var __v1 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		if (op_code.class_extends != null)
		{
			var __v0 = use("Runtime.rs");
			var extends_name = __v0.join(__ctx, ".", op_code.class_extends.entity_name.names);
			t = t.copy(__ctx, { "current_class_extends_name": extends_name });
		}
		else if (op_code.kind == __v0.KIND_STRUCT)
		{
			t = t.copy(__ctx, { "current_class_extends_name": "Runtime.CoreStruct" });
		}
		else if (op_code.kind == __v1.KIND_STRUCT)
		{
			t = t.copy(__ctx, { "current_class_extends_name": "" });
		}
		/* Constructor */
		var res = this.OpDeclareClassConstructor(__ctx, t, op_code);
		content += use("Runtime.rtl").toStr(res[1]);
		/* Extends */
		if (op_code.class_extends != null)
		{
			content += use("Runtime.rtl").toStr(t.s(__ctx, t.current_class_full_name + use("Runtime.rtl").toStr(".prototype = Object.create(") + use("Runtime.rtl").toStr(t.expression.constructor.useModuleName(__ctx, t, t.current_class_extends_name)) + use("Runtime.rtl").toStr(".prototype);")));
			content += use("Runtime.rtl").toStr(t.s(__ctx, t.current_class_full_name + use("Runtime.rtl").toStr(".prototype.constructor = ") + use("Runtime.rtl").toStr(t.current_class_full_name) + use("Runtime.rtl").toStr(";")));
		}
		/* Class body */
		var res = this.OpDeclareClassBody(__ctx, t, op_code);
		content += use("Runtime.rtl").toStr(res[1]);
		/* Class static functions */
		var res = this.OpDeclareClassBodyStatic(__ctx, t, op_code);
		content += use("Runtime.rtl").toStr(res[1]);
		/* Class comments */
		var res = t.operator.constructor.AddComments(__ctx, t, op_code.comments, content);
		content = res[1];
		/* Class footer */
		var res = this.OpDeclareClassFooter(__ctx, t, op_code);
		content += use("Runtime.rtl").toStr(res[1]);
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * Translate item
	 */
	translateItem: function(__ctx, t, op_code)
	{
		var __v0 = use("Bayrell.Lang.OpCodes.OpNamespace");
		var __v1 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		var __v2 = use("Bayrell.Lang.OpCodes.OpComment");
		var __v3 = use("Bayrell.Lang.OpCodes.OpPreprocessorIfCode");
		var __v4 = use("Bayrell.Lang.OpCodes.OpPreprocessorSwitch");
		if (op_code instanceof __v0)
		{
			return this.OpNamespace(__ctx, t, op_code);
		}
		else if (op_code instanceof __v1)
		{
			return this.OpDeclareClass(__ctx, t, op_code);
		}
		else if (op_code instanceof __v2)
		{
			return t.operator.constructor.OpComment(__ctx, t, op_code);
		}
		else if (op_code instanceof __v3)
		{
			return t.operator.constructor.OpPreprocessorIfCode(__ctx, t, op_code);
		}
		else if (op_code instanceof __v4)
		{
			var content = "";
			for (var i = 0;i < op_code.items.count(__ctx);i++)
			{
				var res = t.operator.constructor.OpPreprocessorIfCode(__ctx, t, op_code.items.item(__ctx, i));
				var s = res[1];
				if (s == "")
				{
					continue;
				}
				content += use("Runtime.rtl").toStr(s);
			}
			return use("Runtime.Collection").from([t,content]);
		}
		return use("Runtime.Collection").from([t,""]);
	},
	/**
	 * Translate program
	 */
	translateProgramHeader: function(__ctx, t, op_code)
	{
		var content = "\"use strict;\"";
		content += use("Runtime.rtl").toStr(t.s(__ctx, "var use = (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined')" + use("Runtime.rtl").toStr(" ? Runtime.rtl.find_class : null;")));
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * Translate program
	 */
	translateProgram: function(__ctx, t, op_code)
	{
		var content = "";
		if (op_code.uses != null)
		{
			t = t.copy(__ctx, { "modules": op_code.uses });
		}
		if (op_code.items != null)
		{
			var res = this.translateProgramHeader(__ctx, t, op_code);
			content += use("Runtime.rtl").toStr(res[1]);
			for (var i = 0;i < op_code.items.count(__ctx);i++)
			{
				var item = op_code.items.item(__ctx, i);
				var res = this.translateItem(__ctx, t, item);
				t = res[0];
				var s = res[1];
				if (s == "")
				{
					continue;
				}
				content += use("Runtime.rtl").toStr(s);
			}
		}
		return use("Runtime.Collection").from([t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangES6";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Program";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangES6.TranslatorES6Program",
			"name": "Bayrell.Lang.LangES6.TranslatorES6Program",
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
});use.add(Bayrell.Lang.LangES6.TranslatorES6Program);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangES6 == undefined) module.exports.Bayrell.Lang.LangES6 = {};
module.exports.Bayrell.Lang.LangES6.TranslatorES6Program = Bayrell.Lang.LangES6.TranslatorES6Program;