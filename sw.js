if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const a=e=>i(e,o),d={module:{uri:o},exports:t,require:a};s[o]=Promise.all(n.map((e=>d[e]||a(e)))).then((e=>(r(...e),t)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BkN4gbuF.js",revision:null},{url:"assets/index-DveTQY4O.css",revision:null},{url:"index.html",revision:"adaf2b0357efbc8bf4719f2ac7941cab"},{url:"registerSW.js",revision:"1f6fcb239a7b37e34a0020b1d69d44a6"},{url:"assets/images/android-icon-144x144.png",revision:"e7d134c33673663f0101aab7b3b0ad71"},{url:"assets/images/android-icon-192x192.png",revision:"b3657c6ca6cbbca8ddb708d47f9e10f9"},{url:"assets/images/apple-icon-152x152.png",revision:"0825c432a7c2528664ad8ada4d248de5"},{url:"assets/images/apple-icon-180x180.png",revision:"b051ff03343c910e4fcb5d7dde1f9479"},{url:"manifest.webmanifest",revision:"28f3a941f8432f85826f89bf6ab23c7e"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
