(()=>{var e={};e.id=100,e.ids=[100,220,636],e.modules={237:(e,t)=>{"use strict";Object.defineProperty(t,"A",{enumerable:!0,get:function(){return r}});var r=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},361:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},1413:(e,t)=>{"use strict";Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},2015:e=>{"use strict";e.exports=require("react")},2768:()=>{},3220:e=>{"use strict";e.exports=import("framer-motion")},3603:e=>{"use strict";e.exports=require("next-intl")},3873:e=>{"use strict";e.exports=require("path")},7312:e=>{"use strict";e.exports=import("next-themes")},7522:(e,t,r)=>{"use strict";r.a(e,async(e,i)=>{try{r.r(t),r.d(t,{default:()=>c});var n=r(8732);r(2768);var s=r(7312),a=r(3220),o=r(3603),l=e([s,a]);[s,a]=l.then?(await l)():l;let c=function({Component:e,pageProps:t}){let r=t?.locale??"sr",i=t?.messages??{};return(0,n.jsx)(o.NextIntlClientProvider,{locale:r,messages:i,timeZone:"Europe/Belgrade",children:(0,n.jsx)(s.ThemeProvider,{attribute:"class",children:(0,n.jsx)(a.AnimatePresence,{exitBeforeEnter:!0,initial:!1,children:(0,n.jsx)(e,{...t})})})})};i()}catch(e){i(e)}})},8061:(e,t,r)=>{"use strict";r.a(e,async(e,i)=>{try{r.r(t),r.d(t,{config:()=>h,default:()=>p,getServerSideProps:()=>g,getStaticPaths:()=>m,getStaticProps:()=>d,reportWebVitals:()=>f,routeModule:()=>j,unstable_getServerProps:()=>y,unstable_getServerSideProps:()=>v,unstable_getStaticParams:()=>S,unstable_getStaticPaths:()=>P,unstable_getStaticProps:()=>x});var n=r(3885),s=r(237),a=r(1413),o=r(9674),l=r(7522),c=r(8618),u=e([l]);l=(u.then?(await u)():u)[0];let p=(0,a.M)(c,"default"),d=(0,a.M)(c,"getStaticProps"),m=(0,a.M)(c,"getStaticPaths"),g=(0,a.M)(c,"getServerSideProps"),h=(0,a.M)(c,"config"),f=(0,a.M)(c,"reportWebVitals"),x=(0,a.M)(c,"unstable_getStaticProps"),P=(0,a.M)(c,"unstable_getStaticPaths"),S=(0,a.M)(c,"unstable_getStaticParams"),y=(0,a.M)(c,"unstable_getServerProps"),v=(0,a.M)(c,"unstable_getServerSideProps"),j=new n.PagesRouteModule({definition:{kind:s.A.PAGES,page:"/sitemap.xml",pathname:"/sitemap.xml",bundlePath:"",filename:""},components:{App:l.default,Document:o.default},userland:c});i()}catch(e){i(e)}})},8618:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s,getServerSideProps:()=>n});let i="https://petararsic.rs";async function n({res:e}){let t=`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${i}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${i}/projects</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${i}/services</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${i}/contact</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
      <url>
        <loc>${i}/cv</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
      </url>
    </urlset>
  `;return e.setHeader("Content-Type","text/xml"),e.setHeader("Cache-Control","public, s-maxage=86400, stale-while-revalidate"),e.write(t),e.end(),{props:{}}}let s=function(){}},8732:e=>{"use strict";e.exports=require("react/jsx-runtime")},9674:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});var i=r(8732),n=r(2341);function s(){return(0,i.jsxs)(n.Html,{lang:"sr",children:[(0,i.jsxs)(n.Head,{children:[(0,i.jsx)("link",{rel:"icon",href:"/favicon.ico",sizes:"any"}),(0,i.jsx)("link",{rel:"icon",type:"image/png",sizes:"32x32",href:"/favicon-32x32.png"}),(0,i.jsx)("link",{rel:"icon",type:"image/png",sizes:"16x16",href:"/favicon-16x16.png"}),(0,i.jsx)("link",{rel:"apple-touch-icon",href:"/apple-touch-icon.png"}),(0,i.jsx)("link",{rel:"manifest",href:"/site.webmanifest"}),(0,i.jsx)("meta",{name:"theme-color",content:"#0f172a"}),(0,i.jsx)("link",{rel:"icon",type:"image/png",sizes:"192x192",href:"/android-chrome-192x192.png"}),(0,i.jsx)("link",{rel:"icon",type:"image/png",sizes:"512x512",href:"/android-chrome-512x512.png"})]}),(0,i.jsxs)("body",{children:[(0,i.jsx)(n.Main,{}),(0,i.jsx)(n.NextScript,{})]})]})}}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),i=t.X(0,[341],()=>r(8061));module.exports=i})();