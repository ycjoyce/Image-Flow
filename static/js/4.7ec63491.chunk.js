(this["webpackJsonpimage-flow"]=this["webpackJsonpimage-flow"]||[]).push([[4],{37:function(t,e,r){"use strict";var n,a=r(0),o=new Map,i=function(t){t.forEach((function(t){var e=t.isIntersecting,r=t.intersectionRatio,a=t.target,i=o.get(a);i&&(e||r>0)&&(n.unobserve(a),o.delete(a),i(e,r))}))};e.a=function(t,e){Object(a.useEffect)((function(){try{var r=t.current,a=(void 0===n&&(n=new IntersectionObserver(i,{threshold:.8})),n);return o.set(r,e),a.observe(r),function(){a.unobserve(r),o.delete(r)}}catch(c){}}),[e,t])}},39:function(t,e,r){"use strict";var n=r(42),a=r.n(n);e.a=a.a.create({baseURL:"https://api.unsplash.com/",headers:{Authorization:"Client-ID ".concat("fhbZ9QgPk1Wv5s8LU0XwqS9psSwfJlpGlAqHJUXxIxA")}})},40:function(t,e,r){"use strict";var n=r(33),a=r(0),o=r(51),i=r(37),c=r(1),u=function(t){var e=t.blur_hash,r=t.urls,u=t.description,s=t.thumb,l=void 0!==s&&s,f=Object(a.useState)(!1),h=Object(n.a)(f,2),p=h[0],d=h[1],g=Object(a.useState)(!1),v=Object(n.a)(g,2),b=v[0],m=v[1],y=Object(a.useRef)(null);return Object(i.a)(y,(function(){d(!0)})),Object(c.jsx)("div",{ref:y,style:{width:"100%",height:"100%",position:"absolute"},children:Object(c.jsxs)("div",{className:"image-renderer",children:[Object(c.jsx)("div",{className:"image-placeholder",style:{opacity:b?0:1},children:function(t){return t?Object(c.jsx)(o.a,{hash:t,width:"100%",height:"100%"}):Object(c.jsx)("div",{style:{background:"#eee",width:"100%",height:"100%"}})}(e)}),p&&Object(c.jsx)("img",{src:r[l?"thumb":"regular"],alt:u,className:"image",onLoad:function(){return m(!0)}})]})})};e.a=Object(a.memo)(u)},52:function(t,e,r){t.exports=r(53)},53:function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(G){u=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var a=e&&e.prototype instanceof v?e:v,o=Object.create(a.prototype),i=new I(n||[]);return o._invoke=function(t,e,r){var n=f;return function(a,o){if(n===p)throw new Error("Generator is already running");if(n===d){if("throw"===a)throw o;return M()}for(r.method=a,r.arg=o;;){var i=r.delegate;if(i){var c=S(i,r);if(c){if(c===g)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var u=l(t,e,r);if("normal"===u.type){if(n=r.done?d:h,u.arg===g)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=d,r.method="throw",r.arg=u.arg)}}}(t,r,i),o}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(G){return{type:"throw",arg:G}}}t.wrap=s;var f="suspendedStart",h="suspendedYield",p="executing",d="completed",g={};function v(){}function b(){}function m(){}var y={};u(y,o,(function(){return this}));var j=Object.getPrototypeOf,O=j&&j(j(L([])));O&&O!==r&&n.call(O,o)&&(y=O);var w=m.prototype=v.prototype=Object.create(y);function x(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function r(a,o,i,c){var u=l(t[a],t,o);if("throw"!==u.type){var s=u.arg,f=s.value;return f&&"object"===typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):e.resolve(f).then((function(t){s.value=t,i(s)}),(function(t){return r("throw",t,i,c)}))}c(u.arg)}var a;this._invoke=function(t,n){function o(){return new e((function(e,a){r(t,n,e,a)}))}return a=a?a.then(o,o):o()}}function S(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,S(t,r),"throw"===r.method))return g;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var a=l(n,t.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,g;var o=a.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,g):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function A(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function _(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function I(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(A,this),this.reset(!0)}function L(t){if(t){var r=t[o];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var a=-1,i=function r(){for(;++a<t.length;)if(n.call(t,a))return r.value=t[a],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:M}}function M(){return{value:e,done:!0}}return b.prototype=m,u(w,"constructor",m),u(m,"constructor",b),b.displayName=u(m,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,u(t,c,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},x(E.prototype),u(E.prototype,i,(function(){return this})),t.AsyncIterator=E,t.async=function(e,r,n,a,o){void 0===o&&(o=Promise);var i=new E(s(e,r,n,a),o);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},x(w),u(w,c,"Generator"),u(w,o,(function(){return this})),u(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=L,I.prototype={constructor:I,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(_),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function a(n,a){return c.type="throw",c.arg=t,r.next=n,a&&(r.method="next",r.arg=e),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var u=n.call(i,"catchLoc"),s=n.call(i,"finallyLoc");if(u&&s){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),_(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;_(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:L(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),g}},t}(t.exports);try{regeneratorRuntime=n}catch(a){"object"===typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}},73:function(t,e,r){"use strict";r.r(e);var n=r(33),a=r(52),o=r.n(a);function i(t,e,r,n,a,o,i){try{var c=t[o](i),u=c.value}catch(s){return void r(s)}c.done?e(u):Promise.resolve(u).then(n,a)}var c=r(41);var u=r(38);function s(t){return function(t){if(Array.isArray(t))return Object(c.a)(t)}(t)||function(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(u.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var l=r(34),f=r(0),h=r(2);var p,d=function(){var t=Object(f.useState)(0),e=Object(n.a)(t,2),r=e[0],a=e[1];return[r,Object(f.useCallback)((function(t){var e=new ResizeObserver((function(t){var e,r=function(t,e){var r;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(r=Object(u.a)(t))||e&&t&&"number"===typeof t.length){r&&(t=r);var n=0,a=function(){};return{s:a,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,c=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return i=t.done,t},e:function(t){c=!0,o=t},f:function(){try{i||null==r.return||r.return()}finally{if(c)throw o}}}}(t);try{for(r.s();!(e=r.n()).done;){var n=e.value;a(n.contentRect.width)}}catch(o){r.e(o)}finally{r.f()}}));t&&e.observe(t)}),[])]},g=function(t){var e=Object(f.useRef)(t);return Object(f.useEffect)((function(){e.current=t})),e.current},v=r(39),b=r(14),m=r(11),y=r(1),j=function(t){var e=t.defaultValue,r=t.className,a=t.onSubmit,o=Object(f.useState)(""),i=Object(n.a)(o,2),c=i[0],u=i[1];return Object(f.useEffect)((function(){void 0!==e&&u(e)}),[e]),Object(y.jsxs)("form",{className:"search-bar d-flex ".concat(r||""),onSubmit:function(t){t.preventDefault();var e=c.trim();e&&a(e)},children:[Object(y.jsx)("input",{type:"text",value:c,"aria-label":"Enter keywords",className:"form-controller flex-grow-1",onChange:function(t){return u(t.target.value)}}),Object(y.jsx)("button",{"aria-label":"Search",className:"btn btn-primary flex-shrink-0",children:Object(y.jsx)("i",{className:"fas fa-search text-white"})})]})},O=Object(f.memo)(j),w=r(40),x=function(t){var e=t.id,r=t.width,n=t.height,a=t.position,o=t.onClick,i=t.cardWidth<0?200:t.cardWidth,c=r/i;return Object(y.jsx)("div",{className:"image-card",style:{width:"".concat(i,"px"),height:"".concat(n/c,"px"),position:a?"absolute":"relative",left:a?"".concat(a.left,"px"):"auto",top:a?"".concat(a.top,"px"):"auto"},onClick:function(){return o&&o(e)},children:Object(y.jsx)(w.a,Object(l.a)(Object(l.a)({},t),{},{thumb:!0}))})},E=Object(f.memo)(x),S=function(t){var e=t.idx,r=t.images,n=t.itemAmountPerRow,a=t.gap,o=t.cardWidth,i=Object(f.useMemo)((function(){return function(t,e){for(var r=Math.floor(t/n)+1,i=(t+1)%n===0?n:(t+1)%n,c=1===i?0:(a+o)*(i-1),u=0,s=r-1;s>=1;s--){var l=e[t-n*s];if(1===r||!l)break;u+=l.height/(l.width/o)+a}return{left:c,top:u}}(e,r)}),[e,r,o,a,n]);return Object(y.jsx)(E,Object(l.a)(Object(l.a)({},t),{},{position:i}))},A=function(t){var e=t.containerWidth,r=void 0===e?document.documentElement.clientWidth:e,a=t.cardWidth,o=void 0===a?200:a,i=t.gap,c=void 0===i?10:i,u=t.images,h=t.getHeight,p=Object(f.useState)(Math.floor((r+c)/(o+c))||1),d=Object(n.a)(p,2),v=d[0],b=d[1],m=Object(f.useRef)({prev:Array.from({length:v},(function(){return[]})),new:Array.from({length:v},(function(){return[]}))}),j=Object(f.useRef)(Array.from({length:v},(function(){return 0}))),O=g(v),w=Object(f.useRef)([]),x=Object(f.useMemo)((function(){var t=function(t,e){for(var r=t.slice(),n=m.current.prev,a=0,o=1/0,i=0;i<v;i++){n[i].length+e[i].length>a&&(a=n[i].length+e[i].length),n[i].length<o&&(o=n[i].length);for(var c=o-1;c<a;c++)c<0||(r[v*c+i]=e[i][c])}return r},e=function(t,e){return m.current.prev=JSON.parse(JSON.stringify(m.current.new)),t.forEach((function(t,r){if(t){var n=Math.floor(r/v)+1,a=(r+1)%v===0?v:(r+1)%v,o=t.height/(t.width/e);if(1===n)m.current.new[a-1].push(t),j.current[a-1]+=o;else{var i=j.current.findIndex((function(t){return t===Math.min.apply(Math,s(j.current))}));m.current.new[i].push(t),j.current[i]+=o}}})),m.current.new},r=function(r){if(v!==O)return j.current=Array.from({length:v},(function(){return 0})),m.current={prev:Array.from({length:v},(function(){return[]})),new:Array.from({length:v},(function(){return[]}))},t([],e(r.map((function(t){return t})),o));var n=r.filter((function(t){return!w.current.find((function(e){return e&&e.id===t.id}))}));return n.length>0?t(w.current,e(n,o)):s(w.current)}(u);return w.current=r,r}),[u,v,O,o]);return Object(f.useEffect)((function(){b(Math.floor(Math.floor((r+c)/(o+c)))||1),h&&h(Math.max.apply(Math,s(j.current)))}),[r,c,o,h]),Object(y.jsx)("div",{className:"image-flow",style:{width:"".concat(o*v+c*(v-1),"px"),height:"".concat(Math.max.apply(Math,s(j.current)),"px")},children:function(e){return e.map((function(e,r,n){return e?Object(y.jsx)(S,Object(l.a)(Object(l.a)({},e),{},{cardWidth:o,gap:c,itemAmountPerRow:v,idx:r,images:n,onClick:t.onCardClick}),e.id):null}))}(x)})},_=r(37);!function(t){t[t.INIT_IMAGES=0]="INIT_IMAGES",t[t.LOAD_MORE_IMAGES=1]="LOAD_MORE_IMAGES",t[t.SUCCESS_IMAGES=2]="SUCCESS_IMAGES",t[t.FAILURE_IMAGES=3]="FAILURE_IMAGES",t[t.IMAGES_LOADED=4]="IMAGES_LOADED"}(p||(p={}));var I={page:1,total_pages:0,loading:!0,alert:"",images:[]},L=function(t,e){switch(e.type){case p.INIT_IMAGES:return Object(l.a)(Object(l.a)({},t),{},{page:1,loading:!0,alert:"",images:[]});case p.LOAD_MORE_IMAGES:return Object(l.a)(Object(l.a)({},t),{},{loading:!0,page:e.payload.page});case p.SUCCESS_IMAGES:return Object(l.a)(Object(l.a)({},t),{},{alert:"",loading:!1,page:e.payload.page,total_pages:e.payload.total_pages||t.total_pages,images:1===e.payload.page?s(e.payload.images):[].concat(s(t.images),s(e.payload.images))});case p.FAILURE_IMAGES:return Object(l.a)(Object(l.a)({},t),{},{loading:!1,alert:e.payload.alert});case p.IMAGES_LOADED:return Object(l.a)(Object(l.a)({},t),{},{loading:!1});default:throw new Error("imagesReducer \u6c92\u6709\u6b64\u7a2e type")}},M=function(){var t,e=(t=o.a.mark((function t(e,r){var n,a,i,c,u,s,l=arguments;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=l.length>2&&void 0!==l[2]?l[2]:30,a=l.length>3&&void 0!==l[3]?l[3]:"sky",t.prev=2,t.next=5,v.a.get("/search/photos",{params:{query:e||a,page:r,per_page:n}});case 5:return i=t.sent,c=i.data,u=c.results,s=c.total_pages,t.abrupt("return",Promise.resolve({images:u,total_pages:s}));case 12:return t.prev=12,t.t0=t.catch(2),t.abrupt("return",Promise.reject());case 15:case"end":return t.stop()}}),t,null,[[2,12]])})),function(){var e=this,r=arguments;return new Promise((function(n,a){var o=t.apply(e,r);function c(t){i(o,n,a,c,u,"next",t)}function u(t){i(o,n,a,c,u,"throw",t)}c(void 0)}))});return function(t,r){return e.apply(this,arguments)}}();e.default=function(t){var e=t.alertMsg,r=void 0===e?"\u8d85\u904e\u9650\u5236\u8acb\u6c42\u6b21\u6578(50\u6b21/\u5c0f\u6642)\uff0c\u8acb\u4e0b\u500b\u5c0f\u6642\u518d\u8a66":e,a=Object(h.g)(),o=d(),i=Object(n.a)(o,2),c=i[0],u=i[1],s=Object(f.useRef)(null),v=Object(h.h)().search,j=new URLSearchParams(v).get("q"),w=g(j),x=Object(f.useReducer)(L,I),E=Object(n.a)(x,2),S=E[0],G=S.page,N=S.total_pages,R=S.loading,k=S.alert,C=S.images,D=E[1];return Object(f.useEffect)((function(){j!==w&&(document.documentElement.scrollTop=0,D({type:p.INIT_IMAGES}))}),[j,w]),Object(f.useEffect)((function(){j!==w&&1!==G||M(j,G).then((function(t){D({type:p.SUCCESS_IMAGES,payload:Object(l.a)(Object(l.a)({},t),{},{page:G})})})).catch((function(){D({type:p.FAILURE_IMAGES,payload:{alert:r}})}))}),[w,j,G,r]),Object(_.a)(s,(function(){D(G+1>N?{type:p.IMAGES_LOADED}:{type:p.LOAD_MORE_IMAGES,payload:{page:G+1}})})),Object(y.jsxs)("div",{ref:u,className:"d-flex flex-direction-column height-viewport",children:[R&&!k&&Object(y.jsx)(m.a,{}),k&&Object(y.jsx)(b.a,{children:Object(y.jsx)("p",{className:"mask-text text-white letter-spacing-lg",children:k})}),C.length>0&&Object(y.jsxs)(f.Fragment,{children:[Object(y.jsx)(O,{defaultValue:j||"",onSubmit:function(t){a.push("?q=".concat(t))},className:"flex-shrink-0"}),Object(y.jsxs)("div",{className:"image-flow-container flex-1 scroll-y",children:[Object(y.jsx)(A,{images:C,containerWidth:c,gap:10,onCardClick:function(t){a.push("/photo/".concat(t))}}),!R&&Object(y.jsx)("div",{ref:s})]})]})]})}}}]);
//# sourceMappingURL=4.7ec63491.chunk.js.map