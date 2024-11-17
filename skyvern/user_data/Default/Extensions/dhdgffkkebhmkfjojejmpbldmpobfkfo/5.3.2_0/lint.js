(()=>{function e(r){var n=s[r];if(void 0!==n)return n.exports;var i=s[r]={exports:{}};return t[r](i,i.exports,e),i.exports}var t={2672:e=>{e.exports={meta:{type:"suggestion",docs:{description:"aligns attributes in the metadata",category:"Stylistic Issues"},schema:[{type:"integer",minimum:1,default:2}],messages:{spaceMetadata:"The metadata is not spaced"},fixable:"code"},create:e=>{const t=e.options[0]||2,s=e.getSourceCode(),r=s.getAllComments();let n=!1,i=!1,a=[],o={},l={}
;for(const e of r.filter((e=>"Line"===e.type)))i||(n&&"==/UserScript=="===e.value.trim()?(l=e.loc.end,i=!0):n||"==UserScript=="!==e.value.trim()?n&&e.value.trim().startsWith("@")&&a.push({key:e.value.trim().slice(1).split(/\s/)[0],space:/^\S*(\s+)/.exec(e.value.trim().slice(1))[1].length,line:e.loc.start.line,comment:e}):(o=e.loc.start,n=!0));if(0===Object.keys(l).length&&(l=s.getLocFromIndex(s.getText().length)),0===a.length)return{};const c=Math.max(...a.map((e=>e.key.length)))+t
;return(a.map((e=>e.space)).sort()[0]<t||a.map((e=>e.key.length+e.space)).find((e=>e!==c)))&&e.report({loc:{start:o,end:l},messageId:"spaceMetadata",fix:function(e){const t=[];for(const r of a)if(r.key.length+r.space!==c){const n=/^(.*?@\S*)/.exec(s.getLines()[r.line-1])[1].length;t.push(e.replaceTextRange([s.getIndexFromLoc({line:r.line,column:n}),s.getIndexFromLoc({line:r.line,column:n+r.space})]," ".repeat(c-r.key.length)))}return t}}),{}}}},3316:(e,t,s)=>{const r=s(2598)
;e.exports=r("include",!1,(({attrVal:e,context:t})=>{e.val.startsWith("/")&&t.report({loc:{start:{line:e.loc.start.line,column:0},end:e.loc.end},messageId:"avoidRegExpInclude"})}),{avoidRegExpInclude:"Using a regular expression at '@include' can cause performance issues. Use a regular @include or @match instead."})},8039:e=>{e.exports={meta:{type:"suggestion",docs:{description:"ensure userscripts end with .user.js",category:"Best Practices"},schema:[{enum:["always","never"]}],messages:{
filenameExtension:"Rename '{{ oldFilename }}' to '{{ newFilename }}'"}},create:e=>{const t=e.getFilename();return"<input>"===t||"<text>"===t?{}:{Program(){(!t.endsWith(".user.js")&&(!e.options[0]||"always"===e.options[0])||t.endsWith(".user.js")&&"never"===e.options[0])&&e.report({loc:{column:0,line:1},messageId:"filenameExtension",data:{newFilename:t.replace("always"===e.options[0]?/.js$/:/.user.js$/,"always"===e.options[0]?".user.js":".js"),oldFilename:t}})}}}}},70:(e,t,s)=>{
const r=s(2598),n=["addElement","addStyle","addValueChangeListener","cookie","deleteValue","deleteValues","download","getResourceText","getResourceURL","getTab","getTabs","getValue","getValues","info","listValues","log","notification","openInTab","registerMenuCommand","removeValueChangeListener","saveTab","setClipboard","setValue","setValues","unregisterMenuCommand","webRequest","xmlhttpRequest"].map((e=>`GM_${e}`)),i=["addElement","addStyle","addValueChangeListener","cookie","deleteValue","deleteValues","download","getResourceText","getResourceUrl","getTab","getTabs","getValue","getValues","info","listValues","log","notification","openInTab","registerMenuCommand","removeValueChangeListener","saveTab","setClipboard","setValue","setValues","unregisterMenuCommand","webRequest","xmlHttpRequest"].map((e=>`GM.${e}`)),a=new Set([...n,...i,"none","unsafeWindow","window.close","window.focus","window.onurlchange"])
;e.exports=r("grant",!1,(({attrVal:e,context:t})=>{const s=e.val;a.has(s)||t.report({loc:{start:{line:e.loc.start.line,column:0},end:e.loc.end},messageId:"grantHasInvalidArgument",data:{argument:s}})}),{grantHasInvalidArgument:"'{{ argument }}' is not a valid @grant argument"})},8754:(e,t,s)=>{
const r=s(2598),n=new Set(["antifeature","author","connect","contributor","contributors","copyright","defaulticon","description","developer","downloadURL","exclude","grant","history","homepage","homepageURL","icon","icon64","icon64URL","iconURL","include","license","match","name","namespace","nocompat","noframes","require","resource","run-at","run-in","sandbox","source","supportURL","tag","unwrap","updateURL","version","website"].map((e=>`@${e}`))),i=["name","description","antifeature"].map((e=>new RegExp(`^@${e}(:\\S+)?$`)))
;e.exports=r("headers",!1,(({attrVal:e,context:t})=>{const s=t.options[0],r=new Set((s&&s.allowed||[]).map((e=>`@${e}`)));for(const s of e){const e=`@${s.key}`;n.has(e)||r.has(e)||i.some((t=>t.test(e)))||t.report({loc:{start:{line:s.loc.start.line,column:0},end:s.loc.end},messageId:"invalidHeader",data:{header:e}})}}),{invalidHeader:"'{{ header }}' is not a valid userscript header"},!1,/./,!0,[{type:"object",properties:{allowed:{type:"array"}},additionalProperties:!1}])},1763:e=>{e.exports={
meta:{type:"suggestion",docs:{description:"ensure userscripts have valid metadata",category:"Possible Errors"},messages:{metadataRequired:"Add metadata to the userscript",moveMetadataToTop:"Move the metadata to the top of the file",noClosingMetadata:"Closing metadata comment not found",noCodeBetween:"Code found between in metadata",attributeNotStartsWithAtTheRate:"Attributes should begin with @"},schema:[{type:"object",properties:{top:{enum:["required","optional"],default:"required"}},
additionalProperties:!1}]},create:e=>{const t=e.getSourceCode(),s=t.getAllComments(),r=t.lines;let n=!1,i=!1;for(const[t,s]of r.entries()){if(i)continue;const r={start:{line:t+1,column:0},end:{line:t+1,column:s.length}};n&&!s.trim().startsWith("//")&&s.trim()?e.report({loc:r,messageId:"noCodeBetween"
}):n&&s.trim().startsWith("//")&&"==/UserScript=="===s.trim().slice(2).trim()?i=!0:!n&&s.trim().startsWith("//")&&"==UserScript=="===s.trim().slice(2).trim()?n=!0:n&&!s.trim().slice(2).trim().startsWith("@")&&s.trim().slice(2).trim()&&e.report({loc:r,messageId:"attributeNotStartsWithAtTheRate"})}return{Program(t){0!==s.length&&s.find((e=>"==UserScript=="===e.value.trim()&&"Line"===e.type))?(s.find((e=>"==/UserScript=="===e.value.trim()&&"Line"===e.type))||e.report({
loc:s.find((e=>"==UserScript=="===e.value.trim()&&"Line"===e.type)).loc,messageId:"noClosingMetadata"}),e.options[0]&&e.options[0].top&&"required"!==e.options[0].top||"==UserScript=="===s[0].value.trim()&&1===s[0].loc.start.line||e.report({loc:s.find((e=>"==UserScript=="===e.value.trim()&&"Line"===e.type)).loc,messageId:"moveMetadataToTop"})):e.report({node:t,messageId:"metadataRequired"})}}}}},4350:e=>{e.exports={meta:{type:"suggestion",docs:{
description:"ensure atributes are prefixed by one space",category:"Possible Errors"},messages:{attributeNotPrefixedBySpace:"Attributes should be prefixed by one space"},schema:[]},create:e=>{const t=e.getSourceCode().lines;let s=!1,r=!1;for(const[n,i]of t.entries()){if(r)continue;const t=i.trim()
;s&&t.startsWith("//")&&"==/UserScript=="===t.slice(2).trim()?r=!0:!s&&t.startsWith("//")&&"==UserScript=="===t.slice(2).trim()?s=!0:s&&t.slice(2).trim().startsWith("@")&&t.startsWith("//")&&(!t.startsWith("// ")||t.startsWith("//  "))&&e.report({loc:{start:{line:n+1,column:0},end:{line:n+1,column:i.length}},messageId:"attributeNotPrefixedBySpace"})}return{}}}},230:(e,t,s)=>{const r=s(2598);e.exports=r("description",!0,(({attrVal:e,context:t})=>{let s=[]
;for(let r of e)s.includes(r.key)?t.report({loc:r.loc,messageId:"multipleDescriptions"}):s.push(r.key)}),{multipleDescriptions:"Include only one description for each language"},!1,/^description(:\S+)?$/,!0)},8295:(e,t,s)=>{const r=s(2598),n=/^name(:\S+)?$/;e.exports=r("name",!0,(({attrVal:e,context:t,metadata:s})=>{let r=[];for(let s of e)r.includes(s.key)?t.report({loc:s.loc,messageId:"multipleNames"}):r.push(s.key);const i=Object.values(s)
;if(i.find(((e,t)=>0!==t&&n.test(e[0]?e[0].key:e.key)&&!n.test(i[t-1][0]?i[t-1][0].key:i[t-1].key)))){const s=t.getSourceCode(),r=s.getAllComments(),n=r.find((e=>"==/UserScript=="===e.value.trim()&&"Line"===e.type));t.report({loc:{start:r.find((e=>"==UserScript=="===e.value.trim()&&"Line"===e.type)).loc.start,end:n?n.loc.end:{line:s.lines.length,column:0}},messageId:"nameAtBeginning",fix:function(s){let r=[];for(let n of e){Array.isArray(n)||(n=[n])
;for(let e of n)r.push(s.removeRange(e.comment.range.map(((s,r)=>0===r?s-t.getSourceCode().lines[e.loc.start.line-1].split("//")[0].length-1:s))))}return r.push(s.insertTextAfterRange(t.getSourceCode().getAllComments().find((e=>"==UserScript=="===e.value.trim())).range,e.sort(((e,t)=>"name"===e.key?-1:"name"===t.key?1:0)).map((e=>`\n${t.getSourceCode().lines[e.loc.start.line-1].split("//")[0]}//${e.comment.value}`)).join(""))),r}})}}),{multipleNames:"Include only one name for each language",
nameAtBeginning:"The names should be at the beginning of the metadata"},!0,n,!0)},3880:(e,t,s)=>{const r=s(2598);e.exports=r("version",!0,(({attrVal:e,index:t,context:s})=>{t>0&&s.report({loc:e.loc,messageId:"multipleVersions"}),/^([^\s.]+)(\.[^\s.]+)*$/.test(e.val)||s.report({loc:{start:{line:e.loc.start.line,column:/^(\s*\/\/\s*)/.exec(s.getSourceCode().lines[e.comment.loc.start.line])[1].length-1},end:e.loc.end},messageId:"invalidVersion"})}),{multipleVersions:"Include only one version",
invalidVersion:"Invalid version"})},2215:(e,t,s)=>{const r=s(2598),n=["downloadURL","updateURL"];e.exports=r(n,!1,(({attrVal:e,metadata:t,context:s,keyName:r})=>{const i=n.find((e=>e!==r));t[i]||s.report({loc:e.loc,messageId:"missingAttribute",data:{attribute:i},fix:function(t){return t.insertTextAfterRange(e.comment.range,`\n${s.getSourceCode().lines[e.comment.loc.start.line-1].replace(/^(\s*\/\/\s*@)\S*/,"$1"+i)}`)}})}),{
missingAttribute:"Didn't find attribute '{{ attribute }}' in the metadata"},!0)},1933:(e,t,s)=>{const r=s(2598),n=["homepage","homepageURL"];e.exports=r(n,!1,(({attrVal:e,metadata:t,context:s,keyName:r})=>{const i=n.find((e=>e!==r));t[i]||s.report({loc:e.loc,messageId:"missingAttribute",data:{attribute:i},fix:function(t){return t.insertTextAfterRange(e.comment.range,`\n${s.getSourceCode().lines[e.comment.loc.start.line-1].replace(/^(\s*\/\/\s*@)\S*/,"$1"+i)}`)}})}),{
missingAttribute:"Didn't find attribute '{{ attribute }}' in the metadata"},!0)},2598:e=>{e.exports=function(e,t,s=!1,r={},n=!1,i=new RegExp("^("+("string"==typeof e?e:e.join("|"))+")$"),a=!1,o){return"string"==typeof e&&(e=[e]),{meta:{type:"suggestion",docs:{description:`${t?"require "+(s?"and validate ":""):"validate "}${e.join(" and ")} in the metadata for userscripts`,category:"Best Practices"},schema:t?[{enum:["required","optional"],default:"required"}]:o||void 0,messages:{
missingAttribute:`Didn't find attribute '${e}' in the metadata`,...r},fixable:n?"code":void 0},create:e=>{const r=e.getSourceCode().getAllComments();let n=!1,o=!1,l=!1,c={};for(const e of r.filter((e=>"Line"===e.type)))if(!l)if(n&&"==/UserScript=="===e.value.trim())l=!0;else if(n||"==UserScript=="!==e.value.trim()){if(n&&e.value.trim().startsWith("@")){const t=e.value.trim().slice(1).split(/[\t ]/)[0],s={val:e.value.trim().slice(1).split(/[\t ]/).slice(1).join(" ").trim(),loc:e.loc,comment:e,
key:t};if(c[t]){Array.isArray(c[t])||(c[t]=[c[t]]),c[t].push(s);continue}c[t]=s}}else n=!0,o=!0;const d=Object.keys(c);if(!t||!o||e.options[0]&&"required"!==e.options[0]||d.find((e=>i.test(e)))){if(s&&d.find((e=>i.test(e))))if(a){const t=[];for(const e in d)i.test(d[e])&&t.push(+e);const r=t.map((e=>c[d[e]])).reduce(((e,t)=>Array.isArray(t)?[...e,...t]:[...e,t]),[]);s({attrVal:r,index:[...r.keys()],indexMatch:t.reduce(((e,t)=>Array.isArray(c[d[t]])?[...e,...c[d[t]].map((()=>d))]:[...e,t]),[]),
metadata:c,context:e,keyName:t.map((e=>d[e]))})}else for(const t in d)if(i.test(d[t]))if(Array.isArray(c[d[t]]))for(const[r,n]of c[d[t]].entries())s({attrVal:n,index:r,indexMatch:t,metadata:c,context:e,keyName:d[t]});else s({attrVal:c[d[t]],index:0,indexMatch:t,metadata:c,context:e,keyName:d[t]})}else e.report({loc:r.find((e=>"==UserScript=="===e.value.trim()&&"Line"===e.type)).loc,messageId:"missingAttribute"});return{}}}}}},s={};e.n=t=>{var s=t&&t.__esModule?()=>t.default:()=>t;return e.d(s,{
a:s}),s},e.d=(t,s)=>{for(var r in s)e.o(s,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:s[r]})},e.o=(e,t)=>({}.hasOwnProperty.call(e,t)),(()=>{"use strict";var t=e(8039),s=e.n(t),r=e(70),n=e.n(r),i=e(8754),a=e.n(i),o=e(1763),l=e.n(o),c=e(8295),d=e.n(c),u=e(230),m=e.n(u),p=e(3880),g=e.n(p),f=e(4350),h=e.n(f),y=e(1933),x=e.n(y),v=e(2215),b=e.n(v),S=e(2672),w=e.n(S),A=e(3316),R=e.n(A);const I={rules:{"userscripts/filename-user":s(),"userscripts/no-invalid-grant":n(),
"userscripts/no-invalid-headers":a(),"userscripts/no-invalid-metadata":l(),"userscripts/require-name":d(),"userscripts/require-description":m(),"userscripts/require-version":g(),"userscripts/require-attribute-space-prefix":h(),"userscripts/use-homepage-and-url":x(),"userscripts/use-download-and-update-url":b(),"userscripts/align-attributes":w(),"userscripts/avoid-regexp-include":R()}};(()=>{let e="/";self.onmessage=t=>{const s=t.data;if("base_uri"==s.method){const t=s.value
;if(!t)throw new Error("missing base URI");e=t}else if("lint"==s.method){let{config:t,text:r,id:n,options:i}=s;if(!n)throw new Error("missing id");if(!r)throw new Error("missing text");if(!t)throw new Error("missing linter config");i=i||{};try{self.eslint||self.importScripts(e+"vendor/eslint/eslint.js");const s=((e,t,s)=>{const r=self.eslint,n={problem:"error",layout:1,suggestion:1},i=new r.Linter;if(i.defineRules(I.rules),t.extends&&t.extends.includes("eslint:recommended")){
const e=t.rules=t.rules||{};i.getRules().forEach((function(t,s){if(!t||void 0!==e[s])return;const r=t.meta;if(!r)return;const i=r.docs;if(!i||!i.recommended)return;let a;const o=[(r.type?n[r.type]:null)||1],l=r.schema;if(l){const e={};(Array.isArray(l)?l:[l]).forEach((t=>{if("object"!=t.type)return;const s=t.properties;s&&Object.entries(s).forEach((([t,s])=>{const r=s.default;void 0!==r&&!1!==r&&(e[t]=s.default,a=!0)}))})),a&&o.push(e)}e[s]=o}))}return i.verify(e,t,s)})(r,t,i);self.postMessage({
results:s,id:n})}catch(e){self.postMessage({error:e,id:n})}}}})()})()})();