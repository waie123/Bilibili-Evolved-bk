!function(e,o){"object"==typeof exports&&"object"==typeof module?module.exports=o():"function"==typeof define&&define.amd?define([],o):"object"==typeof exports?exports["video/player/remove-popup"]=o():e["video/player/remove-popup"]=o()}(self,(function(){return function(){"use strict";var e={605:function(e,o,p){p.r(o),o.default='// Imports\nvar ___CSS_LOADER_API_IMPORT___ = require("../../../../../../node_modules/css-loader/dist/runtime/api.js");\nvar ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, "body.remove-player-popup-combo-likes .bilibili-player-video-popup-three,\\nbody.remove-player-popup-combo-likes .bilibili-player-video-popup-three-animate,\\nbody.remove-player-popup-combo-likes .bilibili-player-video-popup-follow,\\nbody.remove-player-popup-combo-likes .bilibili-player-video-popup-there-cyc {\\n  display: none !important;\\n}\\nbody.remove-player-popup-related-videos .bilibili-player-video-link,\\nbody.remove-player-popup-related-videos .bilibili-player-link {\\n  display: none !important;\\n}\\nbody.remove-player-popup-votes .bilibili-player-video-popup-vote {\\n  display: none !important;\\n}\\nbody.remove-player-popup-rates .bilibili-player-score {\\n  display: none !important;\\n}", ""]);\n// Exports\nmodule.exports = ___CSS_LOADER_EXPORT___;\n'}},o={};function p(i){var t=o[i];if(void 0!==t)return t.exports;var n=o[i]={exports:{}};return e[i](n,n.exports,p),n.exports}p.d=function(e,o){for(var i in o)p.o(o,i)&&!p.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:o[i]})},p.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},p.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var i={};return function(){p.d(i,{component:function(){return n}});var e=coreApis.componentApis.styledComponent,o=coreApis.settings,t=coreApis.utils.urls;const n={...(0,e.toggleStyle)("removePlayerPopup",(()=>Promise.resolve().then(p.bind(p,605))),(({settings:e,metadata:p})=>{const{options:i}=e,{kebabCase:t}=lodash;Object.keys(i).forEach((e=>{(0,o.addComponentListener)(`${p.name}.${e}`,(o=>{document.body.classList.toggle(`${t(p.name)}-${t(e)}`,o)}),!0)}))})),displayName:"删除视频弹窗",tags:[componentsTags.video,componentsTags.style],description:{"zh-CN":"删除视频播放器中出现的各种弹窗, 类别可在选项中分别选择."},urlInclude:t.playerUrls,options:{votes:{defaultValue:!1,displayName:"投票"},relatedVideos:{defaultValue:!0,displayName:"关联视频"},comboLikes:{defaultValue:!0,displayName:"关注/三连"},rates:{defaultValue:!0,displayName:"评分"}},commitHash:"0a2ab779aac2af6f58d15cee16533dd18200bb62"}}(),i=i.component}()}));