!function(e,o){"object"==typeof exports&&"object"==typeof module?module.exports=o():"function"==typeof define&&define.amd?define([],o):"object"==typeof exports?exports["video/player/show-cover"]=o():e["video/player/show-cover"]=o()}(self,(function(){return function(){"use strict";var e,o,t={193:function(e,o,t){t.r(o),o.default='// Imports\nvar ___CSS_LOADER_API_IMPORT___ = require("../../../../../../node_modules/css-loader/dist/runtime/api.js");\nvar ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, ".bilibili-player-video::after {\\n  position: absolute;\\n  content: \\"\\";\\n  top: 0;\\n  left: 0;\\n  width: 100%;\\n  height: 100%;\\n  display: none;\\n  background: black var(--cover-url) center no-repeat;\\n  background-size: contain;\\n  pointer-events: none;\\n  z-index: 10;\\n}\\n\\n.bilibili-player-area.video-control-show.video-state-pause .bilibili-player-video::after {\\n  display: block;\\n}", ""]);\n// Exports\nmodule.exports = ___CSS_LOADER_EXPORT___;\n'},705:function(e){e.exports=coreApis.componentApis.video.videoInfo}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var i=n[e]={exports:{}};return t[e](i,i.exports,r),i.exports}o=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__},r.t=function(t,n){if(1&n&&(t=this(t)),8&n)return t;if("object"==typeof t&&t){if(4&n&&t.__esModule)return t;if(16&n&&"function"==typeof t.then)return t}var i=Object.create(null);r.r(i);var c={};e=e||[null,o({}),o([]),o(o)];for(var a=2&n&&t;"object"==typeof a&&!~e.indexOf(a);a=o(a))Object.getOwnPropertyNames(a).forEach((function(e){c[e]=function(){return t[e]}}));return c.default=function(){return t},r.d(i,c),i},r.d=function(e,o){for(var t in o)r.o(o,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:o[t]})},r.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var i={};return function(){r.d(i,{component:function(){return n}});var e=coreApis.observer,o=coreApis.spinQuery,t=coreApis.utils;const n={name:"showCoverBeforePlay",displayName:"播放前显示封面",urlInclude:coreApis.utils.urls.playerUrls,entry:async()=>{let n;// eslint-disable-next-line prefer-arrow-callback
(0,t.createHook)((0,t.isBwpVideo)()?BwpElement.prototype:HTMLVideoElement.prototype,"play",(function(){return document.body.style.removeProperty("--cover-url"),!0}));(0,e.videoChange)((async()=>{const e=await(0,o.select)((()=>unsafeWindow.aid));if(!e)return void console.warn("[播放前显示封面] 未找到av号");if(e===n)return;n=e;const{VideoInfo:t}=await Promise.resolve().then(r.t.bind(r,705,23)),i=new t(e);await i.fetchInfo(),document.body.style.setProperty("--cover-url",`url('${i.coverUrl}')`)}))},instantStyles:[{name:"showCoverBeforePlay",style:()=>Promise.resolve().then(r.bind(r,193))}],description:{"zh-CN":"在视频开始播放前, 在播放器中显示封面."},tags:[componentsTags.video],commitHash:"0a2ab779aac2af6f58d15cee16533dd18200bb62"}}(),i=i.component}()}));