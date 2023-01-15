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
if (typeof Bayrell.Lang.Compiler == 'undefined') Bayrell.Lang.Compiler = {};
Bayrell.Lang.Compiler.SettingsProvider = function(ctx)
{
	use("Runtime.BaseProvider").apply(this, arguments);
};
Bayrell.Lang.Compiler.SettingsProvider.prototype = Object.create(use("Runtime.BaseProvider").prototype);
Bayrell.Lang.Compiler.SettingsProvider.prototype.constructor = Bayrell.Lang.Compiler.SettingsProvider;
Object.assign(Bayrell.Lang.Compiler.SettingsProvider.prototype,
{
	/**
	 * Start provider
	 */
	start: async function(ctx)
	{
		/* Read settings from file located in @.base_path */
		var __v0 = use("Runtime.fs");
		await this.readSettingsFromFile(ctx, __v0.join(ctx, use("Runtime.Collection").from([ctx.base_path,"project.json"])));
	},
	/**
     * Read settings from file
     */
	readSettingsFromFile: async function(ctx, file_name)
	{
		var __v0 = use("Runtime.fs");
		var is_file = await __v0.isFile(ctx, file_name);
		if (!is_file)
		{
			var __v1 = use("Runtime.Exceptions.RuntimeException");
			throw new __v1(ctx, "File '" + file_name + "' does not exists")
		}
		var __v1 = use("Runtime.fs");
		var file_content = await __v1.readFile(ctx, file_name);
		var __v2 = use("Runtime.rtl");
		this.config = __v2.json_decode(ctx, file_content);
		var __v3 = use("Runtime.rs");
		this.project_path = __v3.dirname(ctx, file_name);
		/* Load modules */
		this.modules = await this.readModules(ctx);
	},
	/**
	 * Returns modules from config
	 */
	readModules: async function(ctx)
	{
		var __v0 = use("Runtime.Map");
		var modules = new __v0(ctx);
		var config = this.config;
		var __v1 = use("Runtime.Monad");
		var __v2 = new __v1(ctx, Runtime.rtl.get(ctx, config, "modules"));
		var __v3 = use("Runtime.rtl");
		__v2 = __v2.monad(ctx, __v3.m_to(ctx, "Runtime.Collection", use("Runtime.Collection").from([])));
		var modules_info = __v2.value(ctx);
		for (var i = 0;i < modules_info.count(ctx);i++)
		{
			var __v4 = use("Runtime.Monad");
			var __v5 = new __v4(ctx, Runtime.rtl.get(ctx, modules_info, i));
			var __v6 = use("Runtime.rtl");
			__v5 = __v5.monad(ctx, __v6.m_to(ctx, "Runtime.Dict", use("Runtime.Dict").from({})));
			var module_info = __v5.value(ctx);
			var __v7 = use("Runtime.Monad");
			var __v8 = new __v7(ctx, Runtime.rtl.get(ctx, module_info, "src"));
			var __v9 = use("Runtime.rtl");
			__v8 = __v8.monad(ctx, __v9.m_to(ctx, "string", ""));
			var module_src = __v8.value(ctx);
			var __v10 = use("Runtime.Monad");
			var __v11 = new __v10(ctx, Runtime.rtl.get(ctx, module_info, "type"));
			var __v12 = use("Runtime.rtl");
			__v11 = __v11.monad(ctx, __v12.m_to(ctx, "string", ""));
			var module_type = __v11.value(ctx);
			if (module_type == "module")
			{
				var __v13 = use("Runtime.fs");
				var module_path = __v13.join(ctx, use("Runtime.Collection").from([this.project_path,module_src]));
				var module = await this.readModule(ctx, module_path);
				if (module && !modules.has(ctx, module.name))
				{
					modules.setValue(ctx, module.name, module);
				}
			}
			else if (module_type == "folder")
			{
				var __v14 = use("Runtime.fs");
				var folder_path = __v14.join(ctx, use("Runtime.Collection").from([this.project_path,module_src]));
				var folder_modules = await this.readModulesFromFolder(ctx, folder_path);
				for (var j = 0;j < folder_modules.count(ctx);j++)
				{
					var module = Runtime.rtl.get(ctx, folder_modules, j);
					if (module && !modules.has(ctx, module.name))
					{
						modules.setValue(ctx, module.name, module);
					}
				}
			}
		}
		return Promise.resolve(modules.toDict(ctx));
	},
	/**
	 * Read module from folder
	 */
	readModule: async function(ctx, module_path)
	{
		var __v0 = use("Runtime.fs");
		var module_json_path = __v0.join(ctx, use("Runtime.Collection").from([module_path,"module.json"]));
		var __v1 = use("Runtime.fs");
		var is_file = await __v1.isFile(ctx, module_json_path);
		if (!is_file)
		{
			return Promise.resolve(null);
		}
		var __v2 = use("Runtime.fs");
		var module_json_content = await __v2.readFile(ctx, module_json_path);
		var __v3 = use("Runtime.rtl");
		var module_json = __v3.json_decode(ctx, module_json_content);
		if (!module_json)
		{
			return Promise.resolve(null);
		}
		var __v4 = use("Runtime.Monad");
		var __v5 = new __v4(ctx, Runtime.rtl.get(ctx, module_json, "name"));
		var __v6 = use("Runtime.rtl");
		__v5 = __v5.monad(ctx, __v6.m_to(ctx, "string", ""));
		var module_name = __v5.value(ctx);
		if (module_name == "")
		{
			return Promise.resolve(null);
		}
		var __v7 = use("Bayrell.Lang.Compiler.Module");
		var module = new __v7(ctx, use("Runtime.Dict").from({"name":module_name,"config":module_json,"path":module_path}));
		return Promise.resolve(module);
	},
	/**
	 * Read modules from folder
	 */
	readModulesFromFolder: async function(ctx, folder_path)
	{
		var __v0 = use("Runtime.Vector");
		var modules = new __v0(ctx);
		var __v1 = use("Runtime.fs");
		var file_names = await __v1.listDir(ctx, folder_path);
		for (var i = 0;i < file_names.count(ctx);i++)
		{
			var file_name = Runtime.rtl.get(ctx, file_names, i);
			var __v2 = use("Runtime.fs");
			var module_path = __v2.join(ctx, use("Runtime.Collection").from([folder_path,file_name]));
			var module = await this.readModule(ctx, module_path);
			if (module)
			{
				modules.pushValue(ctx, module);
			}
		}
		return Promise.resolve(modules.toCollection(ctx));
	},
	/**
	 * Find module by module name
	 */
	findModuleByFileName: function(ctx, file_name)
	{
		var res = null;
		var module_path_sz = -1;
		var module_names = this.modules.keys(ctx);
		for (var i = 0;i < module_names.count(ctx);i++)
		{
			var module_name = Runtime.rtl.get(ctx, module_names, i);
			var module = Runtime.rtl.get(ctx, this.modules, module_name);
			var __v0 = use("Runtime.rs");
			if (__v0.indexOf(ctx, file_name, module.path) == 0)
			{
				var __v1 = use("Runtime.rs");
				var sz = __v1.strlen(ctx, module.path);
				if (module_path_sz < sz)
				{
					module_path_sz = sz;
					res = module;
				}
			}
		}
		return res;
	},
	/**
	 * Resolve source file.
	 * Returns file_name, ext_name and module by file
	 */
	resolveSourceFile: async function(ctx, file_name)
	{
		var __v0 = use("Runtime.fs");
		if (!await __v0.isFile(ctx, file_name))
		{
			return Promise.resolve(null);
		}
		var module = this.findModuleByFileName(ctx, file_name);
		if (!module)
		{
			return Promise.resolve(null);
		}
		var module_src_path = module.getSourcePath(ctx);
		var __v0 = use("Runtime.rs");
		if (__v0.indexOf(ctx, file_name, module_src_path) != 0)
		{
			return Promise.resolve(null);
		}
		var __v0 = use("Runtime.rs");
		var __v1 = use("Runtime.rs");
		var module_file_name = __v0.substr(ctx, file_name, __v1.strlen(ctx, module_src_path));
		var __v2 = use("Runtime.fs");
		module_file_name = __v2.removeFirstSlash(ctx, module_file_name);
		var __v3 = use("Runtime.rs");
		var module_ext_name = __v3.extname(ctx, module_file_name);
		var d = use("Runtime.Dict").from({"file_name":module_file_name,"ext_name":module_ext_name,"module":module,"success":false});
		/* Check whitelist */
		var module_whitelist = Runtime.rtl.attr(ctx, module, ["config", "whitelist"]);
		var __v4 = use("Runtime.Collection");
		if (module_whitelist && module_whitelist instanceof __v4)
		{
			var whitelist_res = false;
			for (var i = 0;i < module_whitelist.count(ctx);i++)
			{
				var __v5 = use("Runtime.Monad");
				var __v6 = new __v5(ctx, Runtime.rtl.get(ctx, module_whitelist, i));
				var __v7 = use("Runtime.rtl");
				__v6 = __v6.monad(ctx, __v7.m_to(ctx, "string", ""));
				var whitelist = __v6.value(ctx);
				if (whitelist != "")
				{
					var __v8 = use("Runtime.re");
					var res = __v8.match(ctx, whitelist, module_file_name);
					whitelist_res = whitelist_res || res;
					if (res)
					{
						break;
					}
				}
			}
			if (!whitelist_res)
			{
				return Promise.resolve(d);
			}
		}
		/* Check blacklist */
		var module_blacklist = Runtime.rtl.attr(ctx, module, ["config", "blacklist"]);
		var __v4 = use("Runtime.Collection");
		if (module_blacklist && module_blacklist instanceof __v4)
		{
			var blacklist_res = false;
			for (var i = 0;i < module_blacklist.count(ctx);i++)
			{
				var __v5 = use("Runtime.Monad");
				var __v6 = new __v5(ctx, Runtime.rtl.get(ctx, module_blacklist, i));
				var __v7 = use("Runtime.rtl");
				__v6 = __v6.monad(ctx, __v7.m_to(ctx, "string", ""));
				var blacklist = __v6.value(ctx);
				if (blacklist != "")
				{
					var __v8 = use("Runtime.re");
					var res = __v8.match(ctx, blacklist, module_file_name);
					blacklist_res = blacklist_res && res;
					if (res)
					{
						break;
					}
				}
			}
			if (blacklist_res)
			{
				return Promise.resolve(d);
			}
		}
		d = Runtime.rtl.setAttr(ctx, d, Runtime.Collection.from(["success"]), true);
		return Promise.resolve(d);
	},
	_init: function(ctx)
	{
		use("Runtime.BaseProvider").prototype._init.call(this,ctx);
		this.project_path = "";
		this.config = use("Runtime.Dict").from({});
		this.modules = use("Runtime.Dict").from({});
	},
});
Object.assign(Bayrell.Lang.Compiler.SettingsProvider, use("Runtime.BaseProvider"));
Object.assign(Bayrell.Lang.Compiler.SettingsProvider,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.Compiler";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.Compiler.SettingsProvider";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseProvider";
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
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f&2)==2)
		{
			a.push("project_path");
			a.push("config");
			a.push("modules");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		if (field_name == "project_path") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "config") return Dict.from({
			"t": "Runtime.Dict",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "modules") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["Bayrell.Lang.Compiler.Module"],
			"annotations": Collection.from([
			]),
		});
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
});use.add(Bayrell.Lang.Compiler.SettingsProvider);
module.exports = Bayrell.Lang.Compiler.SettingsProvider;