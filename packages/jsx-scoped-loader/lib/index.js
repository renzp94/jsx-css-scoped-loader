var F=Object.create;var c=Object.defineProperty;var w=Object.getOwnPropertyDescriptor;var L=Object.getOwnPropertyNames,f=Object.getOwnPropertySymbols,k=Object.getPrototypeOf,P=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;var T=(t,e,i)=>e in t?c(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,g=(t,e)=>{for(var i in e||(e={}))P.call(e,i)&&T(t,i,e[i]);if(f)for(var i of f(e))R.call(e,i)&&T(t,i,e[i]);return t};var b=t=>c(t,"__esModule",{value:!0});var j=(t,e)=>()=>(t&&(e=t(t=0)),e);var V=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),W=(t,e)=>{for(var i in e)c(t,i,{get:e[i],enumerable:!0})},A=(t,e,i,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of L(e))!P.call(t,r)&&(i||r!=="default")&&c(t,r,{get:()=>e[r],enumerable:!(s=w(e,r))||s.enumerable});return t},m=(t,e)=>A(b(c(t!=null?F(k(t)):{},"default",!e&&t&&t.__esModule?{get:()=>t.default,enumerable:!0}:{value:t,enumerable:!0})),t),q=(t=>(e,i)=>t&&t.get(e)||(i=A(b({}),e,1),t&&t.set(e,i),i))(typeof WeakMap!="undefined"?new WeakMap:0);var n=j(()=>{});var N=V((H,I)=>{"use strict";n();function U(t,e){for(;t.length<e;)t="0"+t;return t}function o(t,e){var i,s,r;if(e.length===0)return t;for(i=0,r=e.length;i<r;i++)s=e.charCodeAt(i),t=(t<<5)-t+s,t|=0;return t<0?t*-2:t}function K(t,e,i){return Object.keys(e).sort().reduce(s,t);function s(r,a){return D(r,e[a],a,i)}}function D(t,e,i,s){var r=o(o(o(t,i),$(e)),typeof e);if(e===null)return o(r,"null");if(e===void 0)return o(r,"undefined");if(typeof e=="object"||typeof e=="function"){if(s.indexOf(e)!==-1)return o(r,"[Circular]"+i);s.push(e);var a=K(r,e,s);if(!("valueOf"in e)||typeof e.valueOf!="function")return a;try{return o(a,String(e.valueOf()))}catch(p){return o(a,"[valueOf exception]"+(p.stack||p.message))}}return o(r,e.toString())}function $(t){return Object.prototype.toString.call(t)}function Q(t){return U(D(0,t,"",[]).toString(16),8)}I.exports=Q});var Y={};W(Y,{default:()=>O});n();var M=require("@swc/core");n();var J=require("@swc/core/Visitor"),X=m(require("path")),C=m(require("fs")),S=m(N());n();var y=m(require("fs")),E=(t,e)=>{let i=l=>u=>y.default.statSync(`${t}/${u}`)[l](),s=y.default.readdirSync(t),r=s.filter(i("isFile")),a=s.filter(i("isDirectory"));if(r.includes(e))return`${t}/${e}`;if(a.length===0)return;let h=a.find(l=>E(`${t}/${l}`,e));return h?`${t}/${h}/${e}`:void 0};var v=class extends J.Visitor{constructor(e){super();this.resourcePath=e}visitModule(e){return e.body=this.visitModuleItems(e.body),e}visitModuleItems(e){return e.map(this.visitModuleItem.bind(this))}visitModuleItem(e){switch(e.type){case"ExportDeclaration":case"ExportDefaultDeclaration":case"ExportNamedDeclaration":case"ExportDefaultExpression":case"ImportDeclaration":case"ExportAllDeclaration":case"TsImportEqualsDeclaration":case"TsExportAssignment":case"TsNamespaceExportDeclaration":return this.visitModuleDeclaration(e);default:return this.visitStatement(e)}}visitModuleDeclaration(e){switch(e.type){case"ExportDeclaration":return this.visitExportDeclaration(e);case"ExportDefaultDeclaration":return this.visitExportDefaultDeclaration(e);case"ExportNamedDeclaration":return this.visitExportNamedDeclration(e);case"ExportDefaultExpression":return this.visitExportDefaultExpression(e);case"ImportDeclaration":return this.setHash(e.source),this.visitImportDeclaration(e);case"ExportAllDeclaration":return this.visitExportAllDeclration(e);case"TsImportEqualsDeclaration":return this.visitTsImportEqualsDeclaration(e);case"TsExportAssignment":return this.visitTsExportAssignment(e);case"TsNamespaceExportDeclaration":return this.visitTsNamespaceExportDeclaration(e)}}setHash(e){var l,u;let i=(u=(l=e.value)==null?void 0:l.split("/"))==null?void 0:u.pop();if(!/\.(css|less|scss|sass)$/.test(i))return;let r=this.resourcePath.split("/");r.pop();let a=r.join("/"),p=X.default.resolve(a,i);if(C.default.existsSync(p))this.hash=(0,S.default)(p);else{let B=`${process.cwd()}/src`,x=E(B,i);x?this.hash=(0,S.default)(x):console.log(`\u672A\u627E\u5230${this.resourcePath}\u6587\u4EF6\u4E2D\u5BFC\u5165\u7684${i}\u6587\u4EF6\uFF0C\u65E0\u6CD5\u751F\u6210css scope`)}}visitTsNamespaceExportDeclaration(e){return e.id=this.visitBindingIdentifier(e.id),e}visitTsExportAssignment(e){return e.expression=this.visitExpression(e.expression),e}visitTsImportEqualsDeclaration(e){return e.id=this.visitBindingIdentifier(e.id),e.moduleRef=this.visitTsModuleReference(e.moduleRef),e}visitTsModuleReference(e){switch(e.type){case"Identifier":return this.visitIdentifierReference(e);case"TsExternalModuleReference":return this.visitTsExternalModuleReference(e);case"TsQualifiedName":return this.visitTsQualifiedName(e)}}visitTsExternalModuleReference(e){return e.expression=this.visitExpression(e.expression),e}visitExportAllDeclration(e){return e.source=this.visitStringLiteral(e.source),e}visitExportDefaultExpression(e){return e.expression=this.visitExpression(e.expression),e}visitExportNamedDeclration(e){return e.specifiers=this.visitExportSpecifiers(e.specifiers),e.source=this.visitOptionalStringLiteral(e.source),e}visitExportSpecifiers(e){return e.map(this.visitExportSpecifier.bind(this))}visitExportSpecifier(e){switch(e.type){case"ExportDefaultSpecifier":return this.visitExportDefaultSpecifier(e);case"ExportNamespaceSpecifier":return this.visitExportNamespaceSpecifier(e);case"ExportSpecifier":return this.visitNamedExportSpecifier(e)}}visitNamedExportSpecifier(e){return e.exported&&(e.exported=this.visitBindingIdentifier(e.exported)),e.orig=this.visitIdentifierReference(e.orig),e}visitExportNamespaceSpecifier(e){return e.name=this.visitBindingIdentifier(e.name),e}visitExportDefaultSpecifier(e){return e.exported=this.visitBindingIdentifier(e.exported),e}visitOptionalStringLiteral(e){if(e)return this.visitStringLiteral(e)}visitExportDefaultDeclaration(e){return e.decl=this.visitDefaultDeclaration(e.decl),e}visitDefaultDeclaration(e){switch(e.type){case"ClassExpression":return this.visitClassExpression(e);case"FunctionExpression":return this.visitFunctionExpression(e);case"TsInterfaceDeclaration":return this.visitTsInterfaceDeclaration(e)}}visitFunctionExpression(e){return e=this.visitFunction(e),e.identifier&&(e.identifier=this.visitBindingIdentifier(e.identifier)),e}visitClassExpression(e){return e=this.visitClass(e),e.identifier&&(e.identifier=this.visitBindingIdentifier(e.identifier)),e}visitExportDeclaration(e){return e.declaration=this.visitDeclaration(e.declaration),e}visitArrayExpression(e){return e.elements&&(e.elements=e.elements.map(this.visitArrayElement.bind(this))),e}visitArrayElement(e){return this.visitExprOrSpread(e)}visitExprOrSpread(e){return e.expression=this.visitOptionalExpression(e.expression),e}visitSpreadElement(e){return e.arguments=this.visitExpression(e.arguments),e}visitOptionalExpression(e){if(e)return this.visitExpression(e)}visitArrowFunctionExpression(e){return e.body=this.visitArrowBody(e.body),e.params=this.visitPatterns(e.params),e.returnType=this.visitTsTypeAnnotation(e.returnType),e.typeParameters=this.visitTsTypeParameterDeclaration(e.typeParameters),e}visitArrowBody(e){switch(e.type){case"BlockStatement":return this.visitBlockStatement(e);default:return this.visitExpression(e)}}visitBlockStatement(e){return e.stmts=this.visitStatements(e.stmts),e}visitStatements(e){return e.map(this.visitStatement.bind(this))}visitStatement(e){switch(e.type){case"ClassDeclaration":case"FunctionDeclaration":case"TsEnumDeclaration":case"TsInterfaceDeclaration":case"TsModuleDeclaration":case"TsTypeAliasDeclaration":case"VariableDeclaration":return this.visitDeclaration(e);case"BreakStatement":return this.visitBreakStatement(e);case"BlockStatement":return this.visitBlockStatement(e);case"ContinueStatement":return this.visitContinueStatement(e);case"DebuggerStatement":return this.visitDebuggerStatement(e);case"DoWhileStatement":return this.visitDoWhileStatement(e);case"EmptyStatement":return this.visitEmptyStatement(e);case"ForInStatement":return this.visitForInStatement(e);case"ForOfStatement":return this.visitForOfStatement(e);case"ForStatement":return this.visitForStatement(e);case"IfStatement":return this.visitIfStatement(e);case"LabeledStatement":return this.visitLabeledStatement(e);case"ReturnStatement":return this.visitReturnStatement(e);case"SwitchStatement":return this.visitSwitchStatement(e);case"ThrowStatement":return this.visitThrowStatement(e);case"TryStatement":return this.visitTryStatement(e);case"WhileStatement":return this.visitWhileStatement(e);case"WithStatement":return this.visitWithStatement(e);default:return this.visitExpressionStatement(e)}}visitSwitchStatement(e){return e.discriminant=this.visitExpression(e.discriminant),e.cases=this.visitSwitchCases(e.cases),e}visitSwitchCases(e){return e.map(this.visitSwitchCase.bind(this))}visitSwitchCase(e){return e.test=this.visitOptionalExpression(e.test),e.consequent=this.visitStatements(e.consequent),e}visitIfStatement(e){return e.test=this.visitExpression(e.test),e.consequent=this.visitStatement(e.consequent),e.alternate=this.visitOptionalStatement(e.alternate),e}visitOptionalStatement(e){if(e)return this.visitStatement(e)}visitBreakStatement(e){return e.label&&(e.label=this.visitLabelIdentifier(e.label)),e}visitWhileStatement(e){return e.test=this.visitExpression(e.test),e.body=this.visitStatement(e.body),e}visitTryStatement(e){return e.block=this.visitBlockStatement(e.block),e.handler=this.visitCatchClause(e.handler),e.finalizer&&(e.finalizer=this.visitBlockStatement(e.finalizer)),e}visitCatchClause(e){return e&&(e.param&&(e.param=this.visitPattern(e.param)),e.body=this.visitBlockStatement(e.body)),e}visitThrowStatement(e){return e.argument=this.visitExpression(e.argument),e}visitReturnStatement(e){return e.argument&&(e.argument=this.visitExpression(e.argument)),e}visitLabeledStatement(e){return e.label=this.visitLabelIdentifier(e.label),e.body=this.visitStatement(e.body),e}visitForStatement(e){return e.init&&(e.init.type==="VariableDeclaration"?e.init=this.visitVariableDeclaration(e.init):e.init=this.visitOptionalExpression(e.init)),e.test=this.visitOptionalExpression(e.test),e.update=this.visitOptionalExpression(e.update),e.body=this.visitStatement(e.body),e}visitForOfStatement(e){return e.left.type==="VariableDeclaration"?e.left=this.visitVariableDeclaration(e.left):e.left=this.visitPattern(e.left),e.right=this.visitExpression(e.right),e.body=this.visitStatement(e.body),e}visitForInStatement(e){return e.left.type==="VariableDeclaration"?e.left=this.visitVariableDeclaration(e.left):e.left=this.visitPattern(e.left),e.right=this.visitExpression(e.right),e.body=this.visitStatement(e.body),e}visitEmptyStatement(e){return e}visitDoWhileStatement(e){return e.body=this.visitStatement(e.body),e.test=this.visitExpression(e.test),e}visitDebuggerStatement(e){return e}visitWithStatement(e){return e.object=this.visitExpression(e.object),e.body=this.visitStatement(e.body),e}visitDeclaration(e){switch(e.type){case"ClassDeclaration":return this.visitClassDeclartion(e);case"FunctionDeclaration":return this.visitFunctionDeclaration(e);case"TsEnumDeclaration":return this.visitTsEnumDeclaration(e);case"TsInterfaceDeclaration":return this.visitTsInterfaceDeclaration(e);case"TsModuleDeclaration":return this.visitTsModuleDeclaration(e);case"TsTypeAliasDeclaration":return this.visitTsTypeAliasDeclaration(e);case"VariableDeclaration":return this.visitVariableDeclaration(e)}}visitVariableDeclaration(e){return e.declarations=this.visitVariableDeclarators(e.declarations),e}visitVariableDeclarators(e){return e.map(this.visitVariableDeclarator.bind(this))}visitVariableDeclarator(e){return e.id=this.visitPattern(e.id),e.init=this.visitOptionalExpression(e.init),e}visitTsTypeAliasDeclaration(e){return e.id=this.visitBindingIdentifier(e.id),e.typeAnnotation=this.visitTsType(e.typeAnnotation),e.typeParams=this.visitTsTypeParameterDeclaration(e.typeParams),e}visitTsModuleDeclaration(e){return e.id=this.visitTsModuleName(e.id),e.body&&(e.body=this.visitTsNamespaceBody(e.body)),e}visitTsModuleName(e){switch(e.type){case"Identifier":return this.visitBindingIdentifier(e);case"StringLiteral":return this.visitStringLiteral(e)}}visitTsNamespaceBody(e){if(e)switch(e.type){case"TsModuleBlock":return this.visitTsModuleBlock(e);case"TsNamespaceDeclaration":return this.visitTsNamespaceDeclaration(e)}}visitTsNamespaceDeclaration(e){let i=this.visitTsNamespaceBody(e.body);return i&&(e.body=i),e.id=this.visitBindingIdentifier(e.id),e}visitTsModuleBlock(e){return e.body=this.visitModuleItems(e.body),e}visitTsInterfaceDeclaration(e){return e.id=this.visitBindingIdentifier(e.id),e.typeParams=this.visitTsTypeParameterDeclaration(e.typeParams),e.extends=this.visitTsExpressionsWithTypeArguments(e.extends),e.body=this.visitTsInterfaceBody(e.body),e}visitTsInterfaceBody(e){return e.body=this.visitTsTypeElements(e.body),e}visitTsTypeElements(e){return e.map(this.visitTsTypeElement.bind(this))}visitTsTypeElement(e){return e.params=this.visitTsFnParameters(e.params),e.typeAnnotation=this.visitTsTypeAnnotation(e.typeAnnotation),e}visitTsEnumDeclaration(e){return e.id=this.visitIdentifier(e.id),e.members=this.visitTsEnumMembers(e.members),e}visitTsEnumMembers(e){return e.map(this.visitTsEnumMember.bind(this))}visitTsEnumMember(e){return e.id=this.visitTsEnumMemberId(e.id),e.init=this.visitOptionalExpression(e.init),e}visitTsEnumMemberId(e){switch(e.type){case"Identifier":return this.visitBindingIdentifier(e);case"StringLiteral":return this.visitStringLiteral(e)}}visitFunctionDeclaration(e){return e.identifier=this.visitIdentifier(e.identifier),e=this.visitFunction(e),e}visitClassDeclartion(e){return e=this.visitClass(e),e.identifier=this.visitIdentifier(e.identifier),e}visitClassBody(e){if(e)return e.map(this.visitClassMember.bind(this))}visitClassMember(e){switch(e.type){case"ClassMethod":return this.visitClassMethod(e);case"ClassProperty":return this.visitClassProperty(e);case"Constructor":return this.visitConstructor(e);case"PrivateMethod":return this.visitPrivateMethod(e);case"PrivateProperty":return this.visitPrivateProperty(e);case"TsIndexSignature":return this.visitTsIndexSignature(e)}}visitTsIndexSignature(e){return e.params=this.visitTsFnParameters(e.params),e.typeAnnotation=this.visitTsTypeAnnotation(e.typeAnnotation),e}visitTsFnParameters(e){return e.map(this.visitTsFnParameter.bind(this))}visitTsFnParameter(e){return e.typeAnnotation=this.visitTsTypeAnnotation(e.typeAnnotation),e}visitPrivateProperty(e){return e.decorators=this.visitDecorators(e.decorators),e.key=this.visitPrivateName(e.key),e.typeAnnotation=this.visitTsTypeAnnotation(e.typeAnnotation),e.value=this.visitOptionalExpression(e.value),e}visitPrivateMethod(e){return e.accessibility=this.visitAccessibility(e.accessibility),e.function=this.visitFunction(e.function),e.key=this.visitPrivateName(e.key),e}visitPrivateName(e){return e}visitConstructor(e){return e.accessibility=this.visitAccessibility(e.accessibility),e.key=this.visitPropertyName(e.key),e.params=this.visitConstructorParameters(e.params),e.body&&(e.body=this.visitBlockStatement(e.body)),e}visitConstructorParameters(e){return e.map(this.visitConstructorParameter.bind(this))}visitConstructorParameter(e){switch(e.type){case"TsParameterProperty":return this.visitTsParameterProperty(e);default:return this.visitParameter(e)}}visitParameter(e){return e.pat=this.visitPattern(e.pat),e}visitTsParameterProperty(e){return e.accessibility=this.visitAccessibility(e.accessibility),e.decorators=this.visitDecorators(e.decorators),e.param=this.visitTsParameterPropertyParameter(e.param),e}visitTsParameterPropertyParameter(e){return e.typeAnnotation=this.visitTsTypeAnnotation(e.typeAnnotation),e}visitPropertyName(e){switch(e.type){case"Identifier":return this.visitBindingIdentifier(e);case"StringLiteral":return this.visitStringLiteral(e);case"NumericLiteral":return this.visitNumericLiteral(e);case"BigIntLiteral":return this.visitBigIntLiteral(e);default:return this.visitComputedPropertyKey(e)}}visitAccessibility(e){return e}visitClassProperty(e){return e.accessibility=this.visitAccessibility(e.accessibility),e.decorators=this.visitDecorators(e.decorators),e.key=this.visitPropertyName(e.key),e.typeAnnotation=this.visitTsTypeAnnotation(e.typeAnnotation),e.value=this.visitOptionalExpression(e.value),e}visitClassMethod(e){return e.accessibility=this.visitAccessibility(e.accessibility),e.function=this.visitFunction(e.function),e.key=this.visitPropertyName(e.key),e}visitPropertName(e){switch(e.type){case"Identifier":return this.visitIdentifier(e);case"NumericLiteral":return this.visitNumericLiteral(e);case"StringLiteral":return this.visitStringLiteral(e);case"Computed":return this.visitComputedPropertyKey(e)}}visitComputedPropertyKey(e){return e.expression=this.visitExpression(e.expression),e}visitClass(e){return e.decorators=this.visitDecorators(e.decorators),e.superClass=this.visitOptionalExpression(e.superClass),e.superTypeParams=this.visitTsTypeParameterInstantiation(e.superTypeParams),e.implements&&(e.implements=this.visitTsExpressionsWithTypeArguments(e.implements)),e.body=this.visitClassBody(e.body),e}visitFunction(e){return e.decorators=this.visitDecorators(e.decorators),e.params=this.visitParameters(e.params),e.body&&(e.body=this.visitBlockStatement(e.body)),e.returnType=this.visitTsTypeAnnotation(e.returnType),e.typeParameters=this.visitTsTypeParameterDeclaration(e.typeParameters),e}visitTsExpressionsWithTypeArguments(e){return e.map(this.visitTsExpressionWithTypeArguments.bind(this))}visitTsExpressionWithTypeArguments(e){return e.expression=this.visitTsEntityName(e.expression),e.typeArguments=this.visitTsTypeParameterInstantiation(e.typeArguments),e}visitTsTypeParameterInstantiation(e){return e&&(e.params=this.visitTsTypes(e.params)),e}visitTsTypes(e){return e.map(this.visitTsType.bind(this))}visitTsEntityName(e){switch(e.type){case"Identifier":return this.visitBindingIdentifier(e);case"TsQualifiedName":return this.visitTsQualifiedName(e)}}visitTsQualifiedName(e){return e.left=this.visitTsEntityName(e.left),e.right=this.visitIdentifier(e.right),e}visitDecorators(e){if(e)return e.map(this.visitDecorator.bind(this))}visitDecorator(e){return e.expression=this.visitExpression(e.expression),e}visitExpressionStatement(e){return e.expression=this.visitExpression(e.expression),e}visitContinueStatement(e){return e.label&&(e.label=this.visitLabelIdentifier(e.label)),e}visitExpression(e){switch(e.type){case"ArrayExpression":return this.visitArrayExpression(e);case"ArrowFunctionExpression":return this.visitArrowFunctionExpression(e);case"AssignmentExpression":return this.visitAssignmentExpression(e);case"AwaitExpression":return this.visitAwaitExpression(e);case"BinaryExpression":return this.visitBinaryExpression(e);case"BooleanLiteral":return this.visitBooleanLiteral(e);case"CallExpression":return this.visitCallExpression(e);case"ClassExpression":return this.visitClassExpression(e);case"ConditionalExpression":return this.visitConditionalExpression(e);case"FunctionExpression":return this.visitFunctionExpression(e);case"Identifier":return this.visitIdentifierReference(e);case"JSXElement":return this.visitJSXElement(e);case"JSXEmptyExpression":return this.visitJSXEmptyExpression(e);case"JSXFragment":return this.visitJSXFragment(e);case"JSXMemberExpression":return this.visitJSXMemberExpression(e);case"JSXNamespacedName":return this.visitJSXNamespacedName(e);case"JSXText":return this.visitJSXText(e);case"MemberExpression":return this.visitMemberExpression(e);case"MetaProperty":return this.visitMetaProperty(e);case"NewExpression":return this.visitNewExpression(e);case"NullLiteral":return this.visitNullLiteral(e);case"NumericLiteral":return this.visitNumericLiteral(e);case"ObjectExpression":return this.visitObjectExpression(e);case"ParenthesisExpression":return this.visitParenthesisExpression(e);case"PrivateName":return this.visitPrivateName(e);case"RegExpLiteral":return this.visitRegExpLiteral(e);case"SequenceExpression":return this.visitSequenceExpression(e);case"StringLiteral":return this.visitStringLiteral(e);case"TaggedTemplateExpression":return this.visitTaggedTemplateExpression(e);case"TemplateLiteral":return this.visitTemplateLiteral(e);case"ThisExpression":return this.visitThisExpression(e);case"TsAsExpression":return this.visitTsAsExpression(e);case"TsNonNullExpression":return this.visitTsNonNullExpression(e);case"TsTypeAssertion":return this.visitTsTypeAssertion(e);case"UnaryExpression":return this.visitUnaryExpression(e);case"UpdateExpression":return this.visitUpdateExpression(e);case"YieldExpression":return this.visitYieldExpression(e);case"Invalid":return e}}visitAssignmentExpression(e){return e.left=this.visitPatternOrExpressison(e.left),e.right=this.visitExpression(e.right),e}visitPatternOrExpressison(e){switch(e.type){case"ObjectPattern":case"ArrayPattern":case"Identifier":case"AssignmentPattern":case"RestElement":return this.visitPattern(e);default:return this.visitExpression(e)}}visitYieldExpression(e){return e.argument=this.visitOptionalExpression(e.argument),e}visitUpdateExpression(e){return e.argument=this.visitExpression(e.argument),e}visitUnaryExpression(e){return e.argument=this.visitExpression(e.argument),e}visitTsTypeAssertion(e){return e.expression=this.visitExpression(e.expression),e.typeAnnotation=this.visitTsType(e.typeAnnotation),e}visitTsNonNullExpression(e){return e.expression=this.visitExpression(e.expression),e}visitTsAsExpression(e){return e.expression=this.visitExpression(e.expression),e.typeAnnotation=this.visitTsType(e.typeAnnotation),e}visitThisExpression(e){return e}visitTemplateLiteral(e){return e.expressions=e.expressions.map(this.visitExpression.bind(this)),e}visitTaggedTemplateExpression(e){return e.tag=this.visitExpression(e.tag),e.typeParameters=this.visitTsTypeParameterInstantiation(e.typeParameters),e}visitSequenceExpression(e){return e.expressions=e.expressions.map(this.visitExpression.bind(this)),e}visitRegExpLiteral(e){return e}visitParenthesisExpression(e){return e.expression=this.visitExpression(e.expression),e}visitObjectExpression(e){return e.properties&&(e.properties=this.visitObjectProperties(e.properties)),e}visitObjectProperties(e){return e.map(this.visitObjectProperty.bind(this))}visitObjectProperty(e){switch(e.type){case"SpreadElement":return this.visitSpreadElement(e);default:return this.visitProperty(e)}}visitProperty(e){switch(e.type){case"Identifier":return this.visitIdentifier(e);case"AssignmentProperty":return this.visitAssignmentProperty(e);case"GetterProperty":return this.visitGetterProperty(e);case"KeyValueProperty":return this.visitKeyValueProperty(e);case"MethodProperty":return this.visitMethodProperty(e);case"SetterProperty":return this.visitSetterProperty(e)}}visitSetterProperty(e){return e.key=this.visitPropertyName(e.key),e.param=this.visitPattern(e.param),e.body&&(e.body=this.visitBlockStatement(e.body)),e}visitMethodProperty(e){return e.key=this.visitPropertyName(e.key),e.body&&(e.body=this.visitBlockStatement(e.body)),e.decorators=this.visitDecorators(e.decorators),e.params=this.visitParameters(e.params),e.returnType=this.visitTsTypeAnnotation(e.returnType),e.typeParameters=this.visitTsTypeParameterDeclaration(e.typeParameters),e}visitKeyValueProperty(e){return e.key=this.visitPropertyName(e.key),e.value=this.visitExpression(e.value),e}visitGetterProperty(e){return e.key=this.visitPropertyName(e.key),e.body&&(e.body=this.visitBlockStatement(e.body)),e}visitAssignmentProperty(e){return e.key=this.visitIdentifier(e.key),e.value=this.visitExpression(e.value),e}visitNullLiteral(e){return e}visitNewExpression(e){return e.callee=this.visitExpression(e.callee),e.arguments&&(e.arguments=this.visitArguments(e.arguments)),e.typeArguments=this.visitTsTypeArguments(e.typeArguments),e}visitTsTypeArguments(e){return e&&(e.params=this.visitTsTypes(e.params)),e}visitArguments(e){return e.map(this.visitArgument.bind(this))}visitArgument(e){return e.expression=this.visitExpression(e.expression),e}visitMetaProperty(e){return e}visitMemberExpression(e){return e.object=this.visitExpression(e.object),e}visitExpressionOrSuper(e){return e.type==="Super"?e:this.visitExpression(e)}visitJSXText(e){return e}visitJSXNamespacedName(e){return e.namespace=this.visitIdentifierReference(e.namespace),e.name=this.visitIdentifierReference(e.name),e}visitJSXMemberExpression(e){return e.object=this.visitJSXObject(e.object),e.property=this.visitIdentifierReference(e.property),e}visitJSXObject(e){switch(e.type){case"Identifier":return this.visitIdentifierReference(e);case"JSXMemberExpression":return this.visitJSXMemberExpression(e)}}visitJSXFragment(e){return e.opening=this.visitJSXOpeningFragment(e.opening),e.children&&(e.children=this.visitJSXElementChildren(e.children)),e.closing=this.visitJSXClosingFragment(e.closing),e}visitJSXClosingFragment(e){return e}visitJSXElementChildren(e){return e.map(this.visitJSXElementChild.bind(this))}visitJSXElementChild(e){switch(e.type){case"JSXElement":return this.visitJSXElement(e);case"JSXExpressionContainer":return this.visitJSXExpressionContainer(e);case"JSXFragment":return this.visitJSXFragment(e);case"JSXSpreadChild":return this.visitJSXSpreadChild(e);case"JSXText":return this.visitJSXText(e)}}visitJSXExpressionContainer(e){return e.expression=this.visitExpression(e.expression),e}visitJSXSpreadChild(e){return e.expression=this.visitExpression(e.expression),e}visitJSXOpeningFragment(e){return e}visitJSXEmptyExpression(e){return e}visitJSXElement(e){return e.opening=this.visitJSXOpeningElement(e.opening),e.children=this.visitJSXElementChildren(e.children),e.closing=this.visitJSXClosingElement(e.closing),e}visitJSXClosingElement(e){return e&&(e.name=this.visitJSXElementName(e.name)),e}visitJSXElementName(e){switch(e.type){case"Identifier":return this.visitIdentifierReference(e);case"JSXMemberExpression":return this.visitJSXMemberExpression(e);case"JSXNamespacedName":return this.visitJSXNamespacedName(e)}}visitJSXOpeningElement(e){return e.name=this.visitJSXElementName(e.name),e.typeArguments=this.visitTsTypeParameterInstantiation(e.typeArguments),e.attributes=this.visitJSXAttributes(e.attributes),e.attributes=this.setScopeAttribute(e.attributes),e}setScopeAttribute(e){if(e&&this.hash){let i;e.length>0&&(i=e[e.length-1]);let s=i?i.span.end+1:0,r={start:s,end:s+this.hash.length,ctxt:0};e.push({type:"JSXAttribute",span:r,name:{type:"Identifier",span:r,value:`data-scope-${this.hash}`,optional:!1},value:null})}return e}visitJSXAttributes(e){if(e)return e.map(this.visitJSXAttributeOrSpread.bind(this))}visitJSXAttributeOrSpread(e){switch(e.type){case"JSXAttribute":return this.visitJSXAttribute(e);case"SpreadElement":return this.visitSpreadElement(e)}}visitJSXAttribute(e){return e.name=this.visitJSXAttributeName(e.name),e.value=this.visitJSXAttributeValue(e.value),e}visitJSXAttributeValue(e){return e}visitJSXAttributeName(e){switch(e.type){case"Identifier":return this.visitIdentifierReference(e);case"JSXNamespacedName":return this.visitJSXNamespacedName(e)}}visitConditionalExpression(e){return e.test=this.visitExpression(e.test),e.consequent=this.visitExpression(e.consequent),e.alternate=this.visitExpression(e.alternate),e}visitCallExpression(e){return e.callee=this.visitExpressionOrSuper(e.callee),e.typeArguments=this.visitTsTypeParameterInstantiation(e.typeArguments),e.arguments&&(e.arguments=this.visitArguments(e.arguments)),e}visitBooleanLiteral(e){return e}visitBinaryExpression(e){return e.left=this.visitExpression(e.left),e.right=this.visitExpression(e.right),e}visitAwaitExpression(e){return e.argument=this.visitExpression(e.argument),e}visitTsTypeParameterDeclaration(e){return e&&(e.parameters=this.visitTsTypeParameters(e.parameters)),e}visitTsTypeParameters(e){return e.map(this.visitTsTypeParameter.bind(this))}visitTsTypeParameter(e){return e.constraint&&(e.constraint=this.visitTsType(e.constraint)),e.default&&(e.default=this.visitTsType(e.default)),e.name=this.visitIdentifierReference(e.name),e}visitTsTypeAnnotation(e){return e&&(e.typeAnnotation=this.visitTsType(e.typeAnnotation)),e}visitPatterns(e){return e.map(this.visitPattern.bind(this))}visitImportDeclaration(e){return e.source=this.visitStringLiteral(e.source),e.specifiers=this.visitImportSpecifiers(e.specifiers||[]),e}visitImportSpecifiers(e){return e.map(this.visitImportSpecifier.bind(this))}visitImportSpecifier(e){switch(e.type){case"ImportDefaultSpecifier":return this.visitImportDefaultSpecifier(e);case"ImportNamespaceSpecifier":return this.visitImportNamespaceSpecifier(e);case"ImportSpecifier":return this.visitNamedImportSpecifier(e)}}visitNamedImportSpecifier(e){return e.local=this.visitBindingIdentifier(e.local),e.imported&&(e.imported=this.visitIdentifierReference(e.imported)),e}visitImportNamespaceSpecifier(e){return e.local=this.visitBindingIdentifier(e.local),e}visitImportDefaultSpecifier(e){return e.local=this.visitBindingIdentifier(e.local),e}visitBindingIdentifier(e){return this.visitIdentifier(e)}visitIdentifierReference(e){return this.visitIdentifier(e)}visitLabelIdentifier(e){return this.visitIdentifier(e)}visitIdentifier(e){return e}visitStringLiteral(e){return e}visitNumericLiteral(e){return e}visitBigIntLiteral(e){return e}visitPattern(e){switch(e.type){case"Identifier":return this.visitBindingIdentifier(e);case"ArrayPattern":return this.visitArrayPattern(e);case"ObjectPattern":return this.visitObjectPattern(e);case"AssignmentPattern":return this.visitAssignmentPattern(e);case"RestElement":return this.visitRestElement(e);default:return this.visitExpression(e)}}visitRestElement(e){return e.argument=this.visitPattern(e.argument),e.typeAnnotation=this.visitTsTypeAnnotation(e.typeAnnotation),e}visitAssignmentPattern(e){return e.left=this.visitPattern(e.left),e.right=this.visitExpression(e.right),e.typeAnnotation=this.visitTsTypeAnnotation(e.typeAnnotation),e}visitObjectPattern(e){return e.properties=this.visitObjectPatternProperties(e.properties),e.typeAnnotation=this.visitTsTypeAnnotation(e.typeAnnotation),e}visitObjectPatternProperties(e){return e.map(this.visitObjectPatternProperty.bind(this))}visitObjectPatternProperty(e){switch(e.type){case"AssignmentPatternProperty":return this.visitAssignmentPatternProperty(e);case"KeyValuePatternProperty":return this.visitKeyValuePatternProperty(e);case"RestElement":return this.visitRestElement(e)}}visitKeyValuePatternProperty(e){return e.key=this.visitPropertyName(e.key),e.value=this.visitPattern(e.value),e}visitAssignmentPatternProperty(e){return e.key=this.visitBindingIdentifier(e.key),e.value=this.visitOptionalExpression(e.value),e}visitArrayPattern(e){return e.typeAnnotation=this.visitTsTypeAnnotation(e.typeAnnotation),e.elements=this.visitArrayPatternElements(e.elements),e}visitArrayPatternElements(e){return e.map(this.visitArrayPatternElement.bind(this))}visitArrayPatternElement(e){return e&&(e=this.visitPattern(e)),e}};var G={jsc:{parser:{syntax:"typescript",tsx:!0,decorators:!1,dynamicImport:!1},transform:{react:{pragma:"React.createElement",pragmaFrag:"React.Fragment",throwIfNamespace:!0,development:!1,useBuiltins:!1}}}};function O(t){let{code:e}=(0,M.transformSync)(t,g({plugin:i=>new v(this.resourcePath).visitModule(i)},G));return e}module.exports=q(Y);0&&(module.exports={});
//# sourceMappingURL=index.js.map