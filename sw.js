if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const a=s=>l(s,n),o={module:{uri:n},exports:u,require:a};e[n]=Promise.all(i.map((s=>o[s]||a(s)))).then((s=>(r(...s),u)))}}define(["./workbox-56845df7"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/AddUser-7a9d20a5.js",revision:null},{url:"assets/axios-f13eed09.js",revision:null},{url:"assets/cil-lock-locked-7ee886ed.js",revision:null},{url:"assets/cil-magnifying-glass-b979aee8.js",revision:null},{url:"assets/cil-user-5af1b2f2.js",revision:null},{url:"assets/CreateRole-27ef9c98.js",revision:null},{url:"assets/Dashboard-d34211a0.js",revision:null},{url:"assets/DefaultLayout-435a64b7.css",revision:null},{url:"assets/DefaultLayout-dca0b3b8.js",revision:null},{url:"assets/EditRole-1b03fbff.js",revision:null},{url:"assets/EditUser-73a73444.js",revision:null},{url:"assets/Form-39720e29.js",revision:null},{url:"assets/index-348f4eb0.css",revision:null},{url:"assets/index-b92ad479.js",revision:null},{url:"assets/index.es-f1a080d1.js",revision:null},{url:"assets/jalali-moment-abb1df22.js",revision:null},{url:"assets/Labels-5a75316c.js",revision:null},{url:"assets/Login-942b5f23.js",revision:null},{url:"assets/Mails-28c923e8.js",revision:null},{url:"assets/ManageUsers-d935e846.js",revision:null},{url:"assets/moment-fbc5633a.js",revision:null},{url:"assets/Page404-6fd5d655.js",revision:null},{url:"assets/Page500-b5998370.js",revision:null},{url:"assets/References-b5a33fce.js",revision:null},{url:"assets/Register-9852a9cf.js",revision:null},{url:"assets/sweetalert2.all-58ecf48c.js",revision:null},{url:"assets/Table-8f73397b.js",revision:null},{url:"assets/Tree-00376234.js",revision:null},{url:"assets/web-vitals-9f4c2f45.js",revision:null},{url:"index.html",revision:"575c9c12d9ab99336e348788a87192a7"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"c92b85a5b907c70211f4ec25e29a8c4a"},{url:"logo192.png",revision:"33dbdd0177549353eeeb785d02c294af"},{url:"manifest.webmanifest",revision:"0b99fcfa450eec2c5e34299ed6729ce8"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
