!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["settings-panel/recent-components"]=t():e["settings-panel/recent-components"]=t()}(self,(function(){return function(){"use strict";var e,t,n={407:function(e){e.exports=coreApis.settings}},o={};function r(e){var t=o[e];if(void 0!==t)return t.exports;var a=o[e]={exports:{}};return n[e](a,a.exports,r),a.exports}t=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__},r.t=function(n,o){if(1&o&&(n=this(n)),8&o)return n;if("object"==typeof n&&n){if(4&o&&n.__esModule)return n;if(16&o&&"function"==typeof n.then)return n}var a=Object.create(null);r.r(a);var i={};e=e||[null,t({}),t([]),t(t)];for(var c=2&o&&n;"object"==typeof c&&!~e.indexOf(c);c=t(c))Object.getOwnPropertyNames(c).forEach((function(e){i[e]=function(){return n[e]}}));return i.default=function(){return n},r.d(a,i),a},r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var a={};return function(){r.d(a,{plugin:function(){return e}});const e={name:"settingsPanel.tagFilters.recentComponents",displayName:'设置面板 - "最近使用" 类别',description:'在设置面板中添加 "最近使用" 类别, 方便检索最近操作过的组件.',setup:({addData:e,addHook:t})=>{const n=async()=>{const{getGeneralSettings:e}=await Promise.resolve().then(r.t.bind(r,407,23)),t=e();return t.recentComponents||(t.recentComponents={}),t.recentComponents};t("settingsPanel.componentDetail.open",{after:async e=>{(await n())[e]=Number(new Date)}}),t("userComponents.add",{after:async(e,t,o)=>{(await n())[o.name]=Number(new Date)}}),t("userComponents.remove",{after:async e=>{delete(await n())[e.name]}}),e("settingsPanel.tagFilters",(async e=>{const t=await n();e.unshift((({renderedComponents:e})=>({name:"recent",displayName:"最近",color:"inherit",icon:"mdi-clock-outline",order:0,count:e.length,filter:e=>lodash.sortBy(e,(e=>t[e.name]??0)).reverse()})))}))},commitHash:"0a2ab779aac2af6f58d15cee16533dd18200bb62"}}(),a=a.plugin}()}));