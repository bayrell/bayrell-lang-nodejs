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
Bayrell.Lang.Compiler.CLI = function(ctx)
{
};
Object.assign(Bayrell.Lang.Compiler.CLI.prototype,
{
	/**
	 * Returns modules
	 */
	getModules: function(ctx)
	{
		return this.settings.modules;
	},
	/**
	 * Compile file
	 */
	compileFile: async function(ctx, file_path, lang, log_level)
	{
		if (log_level == undefined) log_level = 0;
		var file_info = await this.settings.resolveSourceFile(ctx, file_path);
		if (!Runtime.rtl.get(ctx, file_info, "success"))
		{
			return Promise.resolve(file_info);
		}
		if ((log_level & 2) == 2)
		{
			var __v0 = use("Runtime.io");
			__v0.print(ctx, file_path);
		}
		else if ((log_level & 1) == 1)
		{
			var __v1 = use("Runtime.io");
			__v1.print(ctx, Runtime.rtl.get(ctx, file_info, "file_name"));
		}
		var ext_name = Runtime.rtl.get(ctx, file_info, "ext_name");
		var container = use("Runtime.Dict").from({"op_code":null,"success":false,"content":"","result":"","lang":""});
		var __v0 = use("Runtime.fs");
		container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["content"]), await __v0.readFile(ctx, file_path));
		if (ext_name == "bay")
		{
			var __v1 = use("Bayrell.Lang.LangBay.ParserBay");
			var parser = new __v1(ctx);
			var __v2 = use("Bayrell.Lang.LangUtils");
			var op_code = __v2.parse(ctx, parser, Runtime.rtl.get(ctx, container, "content"));
			container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["op_code"]), op_code);
		}
		var is_lang = (ctx, ext_name, lang) => 
		{
			/* ES6 */
			if (ext_name == "es6" && lang == "es6")
			{
				return true;
			}
			if (ext_name == "js" && lang == "es6")
			{
				return true;
			}
			/* NodeJS */
			if (ext_name == "node" && lang == "nodejs")
			{
				return true;
			}
			if (ext_name == "nodejs" && lang == "nodejs")
			{
				return true;
			}
			if (ext_name == "js" && lang == "nodejs")
			{
				return true;
			}
			/* PHP */
			if (ext_name == "php" && lang == "php")
			{
				return true;
			}
			return false;
		};
		var save_file = async (ctx, file_info, container) => 
		{
			var file_name = Runtime.rtl.get(ctx, file_info, "file_name");
			var module = Runtime.rtl.get(ctx, file_info, "module");
			var dest_path = module.resolveDestFile(ctx, this.settings.project_path, file_name, Runtime.rtl.get(ctx, container, "lang"));
			if (dest_path == "")
			{
				return Promise.resolve(false);
			}
			/* Create directory if does not exists */
			var __v1 = use("Runtime.rs");
			var dir_name = __v1.dirname(ctx, dest_path);
			var __v2 = use("Runtime.fs");
			if (!await __v2.isDir(ctx, dir_name))
			{
				var __v3 = use("Runtime.fs");
				await __v3.mkdir(ctx, dir_name);
			}
			/* Save file */
			var __v2 = use("Runtime.fs");
			await __v2.saveFile(ctx, dest_path, Runtime.rtl.get(ctx, container, "result"));
			if ((log_level & 2) == 2)
			{
				var __v3 = use("Runtime.io");
				__v3.print(ctx, "=> " + use("Runtime.rtl").toStr(dest_path));
			}
			return Promise.resolve(true);
		};
		var languages = use("Runtime.Collection").from([]);
		if (lang == "")
		{
			var __v1 = use("Runtime.Monad");
			var __v2 = new __v1(ctx, Runtime.rtl.get(ctx, this.settings.config, "languages"));
			var __v3 = use("Runtime.rtl");
			__v2 = __v2.monad(ctx, __v3.m_to(ctx, "Runtime.Collection", use("Runtime.Collection").from([])));
			languages = __v2.value(ctx);
		}
		else
		{
			languages = use("Runtime.Collection").from([lang]);
		}
		for (var i = 0;i < languages.count(ctx);i++)
		{
			var __v1 = use("Runtime.Monad");
			var __v2 = new __v1(ctx, Runtime.rtl.get(ctx, languages, i));
			var __v3 = use("Runtime.rtl");
			__v2 = __v2.monad(ctx, __v3.m_to(ctx, "string", ""));
			var lang_name = __v2.value(ctx);
			var op_code = Runtime.rtl.get(ctx, container, "op_code");
			container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["success"]), false);
			container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["lang"]), lang_name);
			container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["result"]), "");
			if (ext_name == "bay")
			{
				if (op_code)
				{
					var __v4 = use("Bayrell.Lang.LangUtils");
					var t = __v4.createTranslator(ctx, lang_name);
					if (t)
					{
						var __v5 = use("Bayrell.Lang.LangUtils");
						container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["result"]), __v5.translate(ctx, t, op_code));
						container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["success"]), true);
					}
				}
			}
			else if (is_lang(ctx, ext_name, lang_name))
			{
				container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["result"]), Runtime.rtl.get(ctx, container, "content"));
				container = Runtime.rtl.setAttr(ctx, container, Runtime.Collection.from(["success"]), true);
			}
			if (Runtime.rtl.get(ctx, container, "success"))
			{
				await save_file(ctx, file_info, container, lang_name);
			}
		}
		if ((log_level & 2) == 2)
		{
			var __v1 = use("Runtime.io");
			__v1.print(ctx, "Ok");
		}
		return Promise.resolve(file_info);
	},
	/**
	 * Compile module
	 */
	compileModule: async function(ctx, module_name, lang)
	{
		if (lang == undefined) lang = "";
		if (!this.settings.modules.has(ctx, module_name))
		{
			var __v0 = use("Runtime.io");
			__v0.print_error(ctx, "Module " + module_name + " not found");
			return Promise.resolve(-1);
		}
		var module = Runtime.rtl.get(ctx, this.settings.modules, module_name);
		var module_src_path = module.getSourcePath(ctx);
		var is_success = true;
		var __v0 = use("Runtime.fs");
		var files = await __v0.listDirRecursive(ctx, module_src_path);
		for (var i = 0;i < files.count(ctx);i++)
		{
			var file_name = Runtime.rtl.get(ctx, files, i);
			var __v1 = use("Runtime.fs");
			var file_path = __v1.join(ctx, use("Runtime.Collection").from([module_src_path,file_name]));
			var __v2 = use("Runtime.fs");
			if (!await __v2.isFile(ctx, file_path))
			{
				continue;
			}
			var __v2 = use("Bayrell.Lang.Exceptions.ParserUnknownError");
			try
			{
				await this.compileFile(ctx, file_path, lang, 1);
			}
			catch (_ex)
			{
				if (_ex instanceof __v2)
				{
					var e = _ex;
					
					var __v3 = use("Runtime.io");
					__v3.print_error(ctx, e.getErrorMessage(ctx));
					is_success = false;
				}
				else if (true)
				{
					var e = _ex;
					
					var __v4 = use("Runtime.io");
					__v4.print_error(ctx, e);
					is_success = false;
				}
				else
				{
					throw _ex;
				}
			}
		}
		if (is_success)
		{
			await this.makeAssets(ctx, module_name);
		}
	},
	/**
	 * Make assets
	 */
	makeBundle: async function(ctx, assets)
	{
		var __v0 = use("Runtime.Monad");
		var __v1 = new __v0(ctx, Runtime.rtl.get(ctx, assets, "modules"));
		var __v2 = use("Runtime.rtl");
		__v1 = __v1.monad(ctx, __v2.m_to(ctx, "Runtime.Collection", use("Runtime.Collection").from([])));
		var modules = __v1.value(ctx);
		var __v3 = use("Runtime.Monad");
		var __v4 = new __v3(ctx, Runtime.rtl.get(ctx, assets, "dest"));
		var __v5 = use("Runtime.rtl");
		__v4 = __v4.monad(ctx, __v5.m_to(ctx, "string", ""));
		var assets_path_relative = __v4.value(ctx);
		if (assets_path_relative == "")
		{
			return Promise.resolve();
		}
		var __v6 = use("Runtime.fs");
		var assets_path = __v6.join(ctx, use("Runtime.Collection").from([this.settings.project_path,assets_path_relative]));
		var assets_content = "";
		for (var i = 0;i < modules.count(ctx);i++)
		{
			var module_name = Runtime.rtl.get(ctx, modules, i);
			var module = Runtime.rtl.get(ctx, this.settings.modules, module_name);
			if (!module)
			{
				continue;
			}
			var __v7 = use("Runtime.Monad");
			var __v8 = new __v7(ctx, Runtime.rtl.get(ctx, module.config, "assets"));
			var __v9 = use("Runtime.rtl");
			__v8 = __v8.monad(ctx, __v9.m_to(ctx, "Runtime.Collection", use("Runtime.Collection").from([])));
			var files = __v8.value(ctx);
			for (var j = 0;j < files.count(ctx);j++)
			{
				var file_name = Runtime.rtl.get(ctx, files, j);
				var file_source_path = module.resolveSourceFile(ctx, file_name);
				var file_dest_path = module.resolveDestFile(ctx, this.settings.project_path, file_name, "es6");
				var __v10 = use("Runtime.fs");
				var __v12 = use("Runtime.fs");
				if (await __v10.isFile(ctx, file_dest_path))
				{
					var __v11 = use("Runtime.fs");
					var content = await __v11.readFile(ctx, file_dest_path);
					assets_content += use("Runtime.rtl").toStr(content + use("Runtime.rtl").toStr("\n"));
				}
				else if (await __v12.isFile(ctx, file_source_path))
				{
					var __v13 = use("Runtime.fs");
					var content = await __v13.readFile(ctx, file_source_path);
					assets_content += use("Runtime.rtl").toStr(content + use("Runtime.rtl").toStr("\n"));
				}
			}
		}
		/* Create directory if does not exists */
		var __v7 = use("Runtime.rs");
		var dir_name = __v7.dirname(ctx, assets_path);
		var __v8 = use("Runtime.fs");
		if (!await __v8.isDir(ctx, dir_name))
		{
			var __v9 = use("Runtime.fs");
			await __v9.mkdir(ctx, dir_name);
		}
		/* Save file */
		var __v8 = use("Runtime.fs");
		await __v8.saveFile(ctx, assets_path, assets_content);
		var __v9 = use("Runtime.io");
		__v9.print(ctx, "Bundle to => " + use("Runtime.rtl").toStr(assets_path_relative));
	},
	/**
	 * Make assets
	 */
	makeAssets: async function(ctx, module_name)
	{
		var __v0 = use("Runtime.Monad");
		var __v1 = new __v0(ctx, Runtime.rtl.get(ctx, this.settings.config, "languages"));
		var __v2 = use("Runtime.rtl");
		__v1 = __v1.monad(ctx, __v2.m_to(ctx, "Runtime.Collection", use("Runtime.Collection").from([])));
		var languages = __v1.value(ctx);
		if (languages.indexOf(ctx, "es6") == -1)
		{
			return Promise.resolve(-1);
		}
		if (!this.settings.modules.has(ctx, module_name))
		{
			var __v3 = use("Runtime.io");
			__v3.print_error(ctx, "Module " + module_name + " not found");
			return Promise.resolve(-1);
		}
		var module = Runtime.rtl.get(ctx, this.settings.modules, module_name);
		var __v3 = use("Runtime.Monad");
		var __v4 = new __v3(ctx, Runtime.rtl.get(ctx, this.settings.config, "assets"));
		var __v5 = use("Runtime.rtl");
		__v4 = __v4.monad(ctx, __v5.m_to(ctx, "Runtime.Collection", use("Runtime.Collection").from([])));
		var assets = __v4.value(ctx);
		for (var i = 0;i < assets.count(ctx);i++)
		{
			var a = Runtime.rtl.get(ctx, assets, i);
			var __v6 = use("Runtime.Monad");
			var __v7 = new __v6(ctx, Runtime.rtl.get(ctx, a, "modules"));
			var __v8 = use("Runtime.rtl");
			__v7 = __v7.monad(ctx, __v8.m_to(ctx, "Runtime.Collection", use("Runtime.Collection").from([])));
			var modules = __v7.value(ctx);
			if (modules.indexOf(ctx, module_name) >= 0)
			{
				await this.makeBundle(ctx, a);
			}
		}
		return Promise.resolve(0);
	},
	/**
	 * Show modules
	 */
	showModules: function(ctx, verbose)
	{
		var modules = this.getModules(ctx);
		var modules_names = modules.keys(ctx).sort(ctx);
		for (var i = 0;i < modules_names.count(ctx);i++)
		{
			var module_name = Runtime.rtl.get(ctx, modules_names, i);
			var module = Runtime.rtl.get(ctx, modules, module_name);
			if (verbose)
			{
				var __v0 = use("Runtime.io");
				var __v1 = use("Runtime.io");
				__v0.print(ctx, i + 1 + use("Runtime.rtl").toStr(") ") + use("Runtime.rtl").toStr(__v1.color(ctx, "yellow", module_name)) + use("Runtime.rtl").toStr(" - ") + use("Runtime.rtl").toStr(module.path));
			}
			else
			{
				var __v2 = use("Runtime.io");
				__v2.print(ctx, module_name);
			}
		}
	},
	/**
	 * Init app
	 */
	init: async function(ctx, c)
	{
		return Promise.resolve(c);
	},
	/**
	 * Start app
	 */
	start: async function(ctx)
	{
		/* Create settings provider */
		var __v0 = use("Bayrell.Lang.Compiler.SettingsProvider");
		this.settings = new __v0(ctx);
		await this.settings.start(ctx);
	},
	/**
	 * Main entry point
	 */
	main: async function(ctx)
	{
		var cmd = Runtime.rtl.get(ctx, ctx.cli_args, 1);
		var __v0 = use("Runtime.rtl");
		if (__v0.isEmpty(ctx, cmd))
		{
			var __v1 = use("Runtime.io");
			__v1.print(ctx, "Methods:");
			var __v2 = use("Runtime.io");
			__v2.print(ctx, "  assets");
			var __v3 = use("Runtime.io");
			__v3.print(ctx, "  make");
			var __v4 = use("Runtime.io");
			__v4.print(ctx, "  modules");
			var __v5 = use("Runtime.io");
			__v5.print(ctx, "  version");
			var __v6 = use("Runtime.io");
			__v6.print(ctx, "  watch");
			return Promise.resolve(0);
		}
		else if (cmd == "version")
		{
			var __v7 = use("Runtime.rtl");
			var runtime_version = __v7.method(ctx, "Runtime.ModuleDescription", "getModuleVersion");
			var __v8 = use("Runtime.rtl");
			var lang_version = __v8.method(ctx, "Bayrell.Lang.ModuleDescription", "getModuleVersion");
			var __v9 = use("Runtime.io");
			__v9.print(ctx, "Lang version: " + use("Runtime.rtl").toStr(lang_version(ctx)));
			var __v10 = use("Runtime.io");
			__v10.print(ctx, "Runtime version: " + use("Runtime.rtl").toStr(runtime_version(ctx)));
			return Promise.resolve(0);
		}
		else if (cmd == "modules")
		{
			this.showModules(ctx, true);
			return Promise.resolve(0);
		}
		else if (cmd == "make")
		{
			var module_name = Runtime.rtl.get(ctx, ctx.cli_args, 2);
			var lang = Runtime.rtl.get(ctx, ctx.cli_args, 3);
			var __v11 = use("Runtime.rtl");
			if (__v11.isEmpty(ctx, module_name))
			{
				this.showModules(ctx);
				return Promise.resolve(0);
			}
			return Promise.resolve(await this.compileModule(ctx, module_name, lang));
		}
		else if (cmd == "assets")
		{
			var module_name = Runtime.rtl.get(ctx, ctx.cli_args, 2);
			var lang = Runtime.rtl.get(ctx, ctx.cli_args, 3);
			var __v11 = use("Runtime.rtl");
			if (__v11.isEmpty(ctx, module_name))
			{
				this.showModules(ctx);
				return Promise.resolve(0);
			}
			return Promise.resolve(await this.makeAssets(ctx, module_name));
		}
		else if (cmd == "watch")
		{
			let on_change_file = async (ctx, changed_file_path) =>
			{
				let io = use("Runtime.io");
				try
				{
					let file_info = await this.compileFile(ctx, changed_file_path, "", 3);
					if (file_info)
					{
						let module = file_info.get(ctx, "module");
						let assets = module.config.get(ctx, "assets");
						let file_name = file_info.get(ctx, "file_name");
						
						if (assets.indexOf(ctx, file_name) >= 0)
						{
							await this.makeAssets(ctx, module.name);
						}
					}
				}
				catch (e)
				{
					let ParserUnknownError = use("Bayrell.Lang.Exceptions.ParserUnknownError");
					if (e instanceof ParserUnknownError)
					{
						io.print_error(ctx, "Error: " + e.getErrorMessage());
					}
					else
					{
						io.print_error(ctx, e);
					}
					return;
				}
			};
			
			let watch_dir = (ctx) =>
			{
				let io = use("Runtime.io");
				let chokidar = require('chokidar');
				return new Promise(() => {
					
					io.print(ctx, "Start watch");
					chokidar
						.watch(ctx.base_path)
						.on('change', (path, stat) => {
							setTimeout(()=>{ on_change_file(ctx, path); }, 500);
						})
					;
					
				});
			};
			
			await watch_dir(ctx);
		}
		return Promise.resolve(0);
	},
	_init: function(ctx)
	{
		this.settings = null;
	},
});
Object.assign(Bayrell.Lang.Compiler.CLI,
{
	/**
	 * App modules
	 */
	modules: function(ctx)
	{
		return use("Runtime.Collection").from(["Bayrell.Lang"]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.Compiler";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.Compiler.CLI";
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
		if (f==undefined) f=0;
		a.push("settings");
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		if (field_name == "settings") return Dict.from({
			"t": "Bayrell.Lang.Compiler.SettingsProvider",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a=[
			"getModules",
			"compileFile",
			"compileModule",
			"makeBundle",
			"makeAssets",
			"showModules",
			"modules",
			"init",
			"start",
			"main",
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Bayrell.Lang.Compiler.CLI);
module.exports = Bayrell.Lang.Compiler.CLI;