if(!self.define){let e,s={};const n=(n,r)=>(n=new URL(n+".js",r).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,l)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let o={};const f=e=>n(e,i),t={module:{uri:i},exports:o,require:f};s[i]=Promise.all(r.map((e=>t[e]||f(e)))).then((e=>(l(...e),o)))}}define(["./workbox-328ed40c"],(function(e){"use strict";e.setCacheNameDetails({prefix:"vv"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/css/app.8b05ae66.css",revision:null},{url:"/css/chunk-vendors.0144a886.css",revision:null},{url:"/fonts/fa-brands-400.672e913f.woff2",revision:null},{url:"/fonts/fa-brands-400.d67d1219.ttf",revision:null},{url:"/fonts/fa-regular-400.073940ed.ttf",revision:null},{url:"/fonts/fa-regular-400.c7c7429f.woff2",revision:null},{url:"/fonts/fa-solid-900.c9f6e418.ttf",revision:null},{url:"/fonts/fa-solid-900.d5d28b78.woff2",revision:null},{url:"/fonts/fa-v4compatibility.200e567a.ttf",revision:null},{url:"/fonts/fonts.bccbe474.ttf",revision:null},{url:"/index.html",revision:"a67fd5986fe9dec76867cb230c95b5d6"},{url:"/js/app.282352b1.js",revision:null},{url:"/js/chunk-vendors.b2857777.js",revision:null},{url:"/manifest.json",revision:"312fe5c2967ad2c7a7fa18e96d5329fe"},{url:"/robots.txt",revision:"735ab4f94fbcd57074377afca324c813"}],{})}));
//# sourceMappingURL=service-worker.js.map
