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
	VERSION: '0.6.1',
};

/* Exceptions */
ObjectAssign(module.exports, require("./Exceptions/EndOfStringExpected.js"));
ObjectAssign(module.exports, require("./Exceptions/HexNumberExpected.js"));
ObjectAssign(module.exports, require("./Exceptions/TwiceDeclareElseError.js"));
 
/* LangBay */
ObjectAssign(module.exports, require("./LangBay/ParserBay.js"));
ObjectAssign(module.exports, require("./LangBay/ParserBayFactory.js"));
ObjectAssign(module.exports, require("./LangBay/ParserBayNameToken.js"));
ObjectAssign(module.exports, require("./LangBay/ParserBayToken.js"));

/* LangES6 */
ObjectAssign(module.exports, require("./LangES6/FunctionStack.js"));
ObjectAssign(module.exports, require("./LangES6/TranslatorES6.js"));
ObjectAssign(module.exports, require("./LangES6/TranslatorES6Factory.js"));

/* LangNodeJS */
ObjectAssign(module.exports, require("./LangNodeJS/TranslatorNodeJS.js"));
ObjectAssign(module.exports, require("./LangNodeJS/TranslatorNodeJSFactory.js"));

/* LangPHP */
ObjectAssign(module.exports, require("./LangPHP/TranslatorPHP.js"));
ObjectAssign(module.exports, require("./LangPHP/TranslatorPHPFactory.js"));

/* OpCodes */
ObjectAssign(module.exports, require("./OpCodes/BaseOpCode.js"));
ObjectAssign(module.exports, require("./OpCodes/OpAdd.js"));
ObjectAssign(module.exports, require("./OpCodes/OpAnd.js"));
ObjectAssign(module.exports, require("./OpCodes/OpAnnotation.js"));
ObjectAssign(module.exports, require("./OpCodes/OpAssign.js"));
ObjectAssign(module.exports, require("./OpCodes/OpAssignDeclare.js"));
ObjectAssign(module.exports, require("./OpCodes/OpBitAnd.js"));
ObjectAssign(module.exports, require("./OpCodes/OpBitNot.js"));
ObjectAssign(module.exports, require("./OpCodes/OpBitOr.js"));
ObjectAssign(module.exports, require("./OpCodes/OpBitXor.js"));
ObjectAssign(module.exports, require("./OpCodes/OpBreak.js"));
ObjectAssign(module.exports, require("./OpCodes/OpCall.js"));
ObjectAssign(module.exports, require("./OpCodes/OpCallAwait.js"));
ObjectAssign(module.exports, require("./OpCodes/OpChilds.js"));
ObjectAssign(module.exports, require("./OpCodes/OpClassDeclare.js"));
ObjectAssign(module.exports, require("./OpCodes/OpClassName.js"));
ObjectAssign(module.exports, require("./OpCodes/OpClone.js"));
ObjectAssign(module.exports, require("./OpCodes/OpComment.js"));
ObjectAssign(module.exports, require("./OpCodes/OpCompare.js"));
ObjectAssign(module.exports, require("./OpCodes/OpConcat.js"));
ObjectAssign(module.exports, require("./OpCodes/OpContinue.js"));
ObjectAssign(module.exports, require("./OpCodes/OpDelete.js"));
ObjectAssign(module.exports, require("./OpCodes/OpDiv.js"));
ObjectAssign(module.exports, require("./OpCodes/OpDynamic.js"));
ObjectAssign(module.exports, require("./OpCodes/OpFlags.js"));
ObjectAssign(module.exports, require("./OpCodes/OpFor.js"));
ObjectAssign(module.exports, require("./OpCodes/OpFunctionArrowDeclare.js"));
ObjectAssign(module.exports, require("./OpCodes/OpFunctionDeclare.js"));
ObjectAssign(module.exports, require("./OpCodes/OpHexNumber.js"));
ObjectAssign(module.exports, require("./OpCodes/OpIdentifier.js"));
ObjectAssign(module.exports, require("./OpCodes/OpIf.js"));
ObjectAssign(module.exports, require("./OpCodes/OpIfElse.js"));
ObjectAssign(module.exports, require("./OpCodes/OpInterfaceDeclare.js"));
ObjectAssign(module.exports, require("./OpCodes/OpMap.js"));
ObjectAssign(module.exports, require("./OpCodes/OpMod.js"));
ObjectAssign(module.exports, require("./OpCodes/OpMult.js"));
ObjectAssign(module.exports, require("./OpCodes/OpNew.js"));
ObjectAssign(module.exports, require("./OpCodes/OpNope.js"));
ObjectAssign(module.exports, require("./OpCodes/OpNot.js"));
ObjectAssign(module.exports, require("./OpCodes/OpNumber.js"));
ObjectAssign(module.exports, require("./OpCodes/OpOr.js"));
ObjectAssign(module.exports, require("./OpCodes/OpPostDec.js"));
ObjectAssign(module.exports, require("./OpCodes/OpPostInc.js"));
ObjectAssign(module.exports, require("./OpCodes/OpPow.js"));
ObjectAssign(module.exports, require("./OpCodes/OpPreDec.js"));
ObjectAssign(module.exports, require("./OpCodes/OpPreInc.js"));
ObjectAssign(module.exports, require("./OpCodes/OpPreprocessorCase.js"));
ObjectAssign(module.exports, require("./OpCodes/OpPreprocessorSwitch.js"));
ObjectAssign(module.exports, require("./OpCodes/OpReturn.js"));
ObjectAssign(module.exports, require("./OpCodes/OpShiftLeft.js"));
ObjectAssign(module.exports, require("./OpCodes/OpShiftRight.js"));
ObjectAssign(module.exports, require("./OpCodes/OpStatic.js"));
ObjectAssign(module.exports, require("./OpCodes/OpString.js"));
ObjectAssign(module.exports, require("./OpCodes/OpStringItem.js"));
ObjectAssign(module.exports, require("./OpCodes/OpStructDeclare.js"));
ObjectAssign(module.exports, require("./OpCodes/OpSub.js"));
ObjectAssign(module.exports, require("./OpCodes/OpTemplateIdentifier.js"));
ObjectAssign(module.exports, require("./OpCodes/OpTernary.js"));
ObjectAssign(module.exports, require("./OpCodes/OpThrow.js"));
ObjectAssign(module.exports, require("./OpCodes/OpTryCatch.js"));
ObjectAssign(module.exports, require("./OpCodes/OpTryCatchChilds.js"));
ObjectAssign(module.exports, require("./OpCodes/OpUse.js"));
ObjectAssign(module.exports, require("./OpCodes/OpValue1.js"));
ObjectAssign(module.exports, require("./OpCodes/OpValue2.js"));
ObjectAssign(module.exports, require("./OpCodes/OpValueString.js"));
ObjectAssign(module.exports, require("./OpCodes/OpVector.js"));
ObjectAssign(module.exports, require("./OpCodes/OpWhile.js"));

/* Root */
ObjectAssign(module.exports, require("./CommonParser.js"));
ObjectAssign(module.exports, require("./CommonTranslator.js"));
ObjectAssign(module.exports, require("./LangConstant.js"));
ObjectAssign(module.exports, require("./ModuleDescription.js"));
ObjectAssign(module.exports, require("./Utils.js"));

}
else{

module.exports = {
	VERSION: '0.6.1',
	'Exceptions': {
		'EndOfStringExpected': require("./Exceptions/EndOfStringExpected.js"),
		'HexNumberExpected': require("./Exceptions/HexNumberExpected.js"),
		'TwiceDeclareElseError': require("./Exceptions/TwiceDeclareElseError.js"),
	},
	'LangBay': {
		'ParserBay': require("./LangBay/ParserBay.js"),
		'ParserBayFactory': require("./LangBay/ParserBayFactory.js"),
		'ParserBayNameToken': require("./LangBay/ParserBayNameToken.js"),
		'ParserBayToken': require("./LangBay/ParserBayToken.js"),
	},
	'LangES6': {
		'FunctionStack': require("./LangES6/FunctionStack.js"),
		'TranslatorES6': require("./LangES6/TranslatorES6.js"),
		'TranslatorES6Factory': require("./LangES6/TranslatorES6Factory.js"),
	},
	'LangNodeJS': {
		'TranslatorNodeJS': require("./LangNodeJS/TranslatorNodeJS.js"),
		'TranslatorNodeJSFactory': require("./LangNodeJS/TranslatorNodeJSFactory.js"),
	},
	'LangPHP': {
		'TranslatorPHP': require("./LangPHP/TranslatorPHP.js"),
		'TranslatorPHPFactory': require("./LangPHP/TranslatorPHPFactory.js"),
	},
	'OpCodes': {
		'BaseOpCode': require("./OpCodes/BaseOpCode.js"),
		'OpAdd': require("./OpCodes/OpAdd.js"),
		'OpAnd': require("./OpCodes/OpAnd.js"),
		'OpAssign': require("./OpCodes/OpAssign.js"),
		'OpAssignDeclare': require("./OpCodes/OpAssignDeclare.js"),
		'OpBitAnd': require("./OpCodes/OpBitAnd.js"),
		'OpBitNot': require("./OpCodes/OpBitNot.js"),
		'OpBitOr': require("./OpCodes/OpBitOr.js"),
		'OpBitXor': require("./OpCodes/OpBitXor.js"),
		'OpBreak': require("./OpCodes/OpBreak.js"),
		'OpCall': require("./OpCodes/OpCall.js"),
		'OpCallAwait': require("./OpCodes/OpCallAwait.js"),
		'OpChilds': require("./OpCodes/OpChilds.js"),
		'OpClassDeclare': require("./OpCodes/OpClassDeclare.js"),
		'OpClassName': require("./OpCodes/OpClassName.js"),
		'OpClone': require("./OpCodes/OpClone.js"),
		'OpComment': require("./OpCodes/OpComment.js"),
		'OpCompare': require("./OpCodes/OpCompare.js"),
		'OpConcat': require("./OpCodes/OpConcat.js"),
		'OpContinue': require("./OpCodes/OpContinue.js"),
		'OpDelete': require("./OpCodes/OpDelete.js"),
		'OpDiv': require("./OpCodes/OpDiv.js"),
		'OpDynamic': require("./OpCodes/OpDynamic.js"),
		'OpFlags': require("./OpCodes/OpFlags.js"),
		'OpFor': require("./OpCodes/OpFor.js"),
		'OpFunctionArrowDeclare': require("./OpCodes/OpFunctionArrowDeclare.js"),
		'OpFunctionDeclare': require("./OpCodes/OpFunctionDeclare.js"),
		'OpHexNumber': require("./OpCodes/OpHexNumber.js"),
		'OpIdentifier': require("./OpCodes/OpIdentifier.js"),
		'OpIf': require("./OpCodes/OpIf.js"),
		'OpIfElse': require("./OpCodes/OpIfElse.js"),
		'OpInterfaceDeclare': require("./OpCodes/OpInterfaceDeclare.js"),
		'OpMap': require("./OpCodes/OpMap.js"),
		'OpMod': require("./OpCodes/OpMod.js"),
		'OpMult': require("./OpCodes/OpMult.js"),
		'OpNew': require("./OpCodes/OpNew.js"),
		'OpNope': require("./OpCodes/OpNope.js"),
		'OpNot': require("./OpCodes/OpNot.js"),
		'OpNumber': require("./OpCodes/OpNumber.js"),
		'OpOr': require("./OpCodes/OpOr.js"),
		'OpPostDec': require("./OpCodes/OpPostDec.js"),
		'OpPostInc': require("./OpCodes/OpPostInc.js"),
		'OpPow': require("./OpCodes/OpPow.js"),
		'OpPreDec': require("./OpCodes/OpPreDec.js"),
		'OpPreInc': require("./OpCodes/OpPreInc.js"),
		'OpPreprocessorCase': require("./OpCodes/OpPreprocessorCase.js"),
		'OpPreprocessorSwitch': require("./OpCodes/OpPreprocessorSwitch.js"),
		'OpReturn': require("./OpCodes/OpReturn.js"),
		'OpShiftLeft': require("./OpCodes/OpShiftLeft.js"),
		'OpShiftRight': require("./OpCodes/OpShiftRight.js"),
		'OpStatic': require("./OpCodes/OpStatic.js"),
		'OpString': require("./OpCodes/OpString.js"),
		'OpStringItem': require("./OpCodes/OpStringItem.js"),
		'OpSub': require("./OpCodes/OpSub.js"),
		'OpTemplateIdentifier': require("./OpCodes/OpTemplateIdentifier.js"),
		'OpTernary': require("./OpCodes/OpTernary.js"),
		'OpThrow': require("./OpCodes/OpThrow.js"),
		'OpTryCatch': require("./OpCodes/OpTryCatch.js"),
		'OpTryCatchChilds': require("./OpCodes/OpTryCatchChilds.js"),
		'OpUse': require("./OpCodes/OpUse.js"),
		'OpValue1': require("./OpCodes/OpValue1.js"),
		'OpValue2': require("./OpCodes/OpValue2.js"),
		'OpValueString': require("./OpCodes/OpValueString.js"),
		'OpVector': require("./OpCodes/OpVector.js"),
		'OpWhile': require("./OpCodes/OpWhile.js"),
	},
	'CommonParser': require("./CommonParser.js"),
	'CommonTranslator': require("./CommonTranslator.js"),
	'LangConstant': require("./LangConstant.js"),
	'ModuleDescription': require("./ModuleDescription.js"),
	'Utils': require("./Utils.js"),
};

}