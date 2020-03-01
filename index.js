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

if (false){

function ObjectAssign(res, obj){
	for (var key in obj){
		if (res[key] == undefined) res[key] = obj[key];
		else if (res[key] instanceof Object) ObjectAssign(res[key], obj[key]);
	}
}

module.exports = {
	VERSION: '0.8.3',
};

}
else{

function ObjectAssign(res, obj){
	for (var key in obj){
		if (res[key] == undefined) res[key] = obj[key];
		else if (res[key] instanceof Object) ObjectAssign(res[key], obj[key]);
	}
}

module.exports = {
	VERSION: '0.8.3',
	'Exceptions': {
		'ParserUnknownError': require("./Exceptions/ParserUnknownError.js"),
	},
	'OpCodes': {
		'BaseOpCode': require("./OpCodes/BaseOpCode.js"),
	},
	'Caret': require("./Caret.js"),
	'CoreParser': require("./CoreParser.js"),
	'CoreToken': require("./CoreToken.js"),
	'CoreTranslator': require("./CoreTranslator.js"),
	'LangConstant': require("./LangConstant.js"),
	'LangUtils': require("./LangUtils.js"),
	'ModuleDescription': require("./ModuleDescription.js"),
	'SaveOpCode': require("./SaveOpCode.js"),
};


ObjectAssign(module.exports, {
	'Exceptions': {
		'ParserEOF': require("./Exceptions/ParserEOF.js"),
		'ParserError': require("./Exceptions/ParserError.js"),
		'ParserExpected': require("./Exceptions/ParserExpected.js"),
	},
	'LangBay': {
		'ParserBay': require("./LangBay/ParserBay.js"),
		'ParserBayBase': require("./LangBay/ParserBayBase.js"),
		'ParserBayExpression': require("./LangBay/ParserBayExpression.js"),
		'ParserBayHtml': require("./LangBay/ParserBayHtml.js"),
		'ParserBayOperator': require("./LangBay/ParserBayOperator.js"),
		'ParserBayPreprocessor': require("./LangBay/ParserBayPreprocessor.js"),
		'ParserBayProgram': require("./LangBay/ParserBayProgram.js"),
	},
	'LangES6': {
		'AsyncAwait': require("./LangES6/AsyncAwait.js"),
		'TranslatorES6': require("./LangES6/TranslatorES6.js"),
		'TranslatorES6AsyncAwait': require("./LangES6/TranslatorES6AsyncAwait.js"),
		'TranslatorES6Expression': require("./LangES6/TranslatorES6Expression.js"),
		'TranslatorES6Html': require("./LangES6/TranslatorES6Html.js"),
		'TranslatorES6Operator': require("./LangES6/TranslatorES6Operator.js"),
		'TranslatorES6Program': require("./LangES6/TranslatorES6Program.js"),
	},
	'LangNode': {
		'TranslatorNode': require("./LangNode/TranslatorNode.js"),
		'TranslatorNodeExpression': require("./LangNode/TranslatorNodeExpression.js"),
		'TranslatorNodeProgram': require("./LangNode/TranslatorNodeProgram.js"),
	},
	'LangPHP': {
		'TranslatorPHP': require("./LangPHP/TranslatorPHP.js"),
		'TranslatorPHPExpression': require("./LangPHP/TranslatorPHPExpression.js"),
		'TranslatorPHPHtml': require("./LangPHP/TranslatorPHPHtml.js"),
		'TranslatorPHPOperator': require("./LangPHP/TranslatorPHPOperator.js"),
		'TranslatorPHPProgram': require("./LangPHP/TranslatorPHPProgram.js"),
	},
	'OpCodes': {
		'OpAnnotation': require("./OpCodes/OpAnnotation.js"),
		'OpAssign': require("./OpCodes/OpAssign.js"),
		'OpAssignStruct': require("./OpCodes/OpAssignStruct.js"),
		'OpAssignValue': require("./OpCodes/OpAssignValue.js"),
		'OpAttr': require("./OpCodes/OpAttr.js"),
		'OpBreak': require("./OpCodes/OpBreak.js"),
		'OpCall': require("./OpCodes/OpCall.js"),
		'OpClassOf': require("./OpCodes/OpClassOf.js"),
		'OpClassRef': require("./OpCodes/OpClassRef.js"),
		'OpCollection': require("./OpCodes/OpCollection.js"),
		'OpComment': require("./OpCodes/OpComment.js"),
		'OpContinue': require("./OpCodes/OpContinue.js"),
		'OpDeclareClass': require("./OpCodes/OpDeclareClass.js"),
		'OpDeclareFunction': require("./OpCodes/OpDeclareFunction.js"),
		'OpDeclareFunctionArg': require("./OpCodes/OpDeclareFunctionArg.js"),
		'OpDelete': require("./OpCodes/OpDelete.js"),
		'OpDict': require("./OpCodes/OpDict.js"),
		'OpEntityName': require("./OpCodes/OpEntityName.js"),
		'OpFlags': require("./OpCodes/OpFlags.js"),
		'OpFor': require("./OpCodes/OpFor.js"),
		'OpHtmlAttribute': require("./OpCodes/OpHtmlAttribute.js"),
		'OpHtmlContent': require("./OpCodes/OpHtmlContent.js"),
		'OpHtmlItems': require("./OpCodes/OpHtmlItems.js"),
		'OpHtmlTag': require("./OpCodes/OpHtmlTag.js"),
		'OpHtmlValue': require("./OpCodes/OpHtmlValue.js"),
		'OpIdentifier': require("./OpCodes/OpIdentifier.js"),
		'OpIf': require("./OpCodes/OpIf.js"),
		'OpIfElse': require("./OpCodes/OpIfElse.js"),
		'OpInc': require("./OpCodes/OpInc.js"),
		'OpItems': require("./OpCodes/OpItems.js"),
		'OpMath': require("./OpCodes/OpMath.js"),
		'OpMethod': require("./OpCodes/OpMethod.js"),
		'OpModule': require("./OpCodes/OpModule.js"),
		'OpNamespace': require("./OpCodes/OpNamespace.js"),
		'OpNew': require("./OpCodes/OpNew.js"),
		'OpNumber': require("./OpCodes/OpNumber.js"),
		'OpPipe': require("./OpCodes/OpPipe.js"),
		'OpPreprocessorIfCode': require("./OpCodes/OpPreprocessorIfCode.js"),
		'OpPreprocessorIfDef': require("./OpCodes/OpPreprocessorIfDef.js"),
		'OpPreprocessorSwitch': require("./OpCodes/OpPreprocessorSwitch.js"),
		'OpReturn': require("./OpCodes/OpReturn.js"),
		'OpString': require("./OpCodes/OpString.js"),
		'OpTernary': require("./OpCodes/OpTernary.js"),
		'OpTryCatch': require("./OpCodes/OpTryCatch.js"),
		'OpTryCatchItem': require("./OpCodes/OpTryCatchItem.js"),
		'OpThrow': require("./OpCodes/OpThrow.js"),
		'OpTypeConvert': require("./OpCodes/OpTypeConvert.js"),
		'OpTypeIdentifier': require("./OpCodes/OpTypeIdentifier.js"),
		'OpUse': require("./OpCodes/OpUse.js"),
		'OpWhile': require("./OpCodes/OpWhile.js"),
	},
	
});

require('bayrell').use.add_exports(module.exports);

}