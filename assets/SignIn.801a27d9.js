import{_ as w,p as v,e as y,u as b,d as k,q as L,g as M,r as $,o as i,c as l,b as s,y as p,A as h,t as f,i as u,J as C,a as I,w as V,j as g}from"./index.1480d001.js";import{M as B}from"./meta-wall.b99404de.js";import{c as n,r as _,e as j,m as q,u as A}from"./index.esm.b881e757.js";var R="/social-media-frontend/assets/Google.4aeed1c5.png";const S={setup(){const d=v(),t=y(),c=b();k().query.error==="login-fail"&&(d.error("\u767B\u5165\u5931\u6557\uFF0C\u8ACB\u4F7F\u7528\u5176\u4ED6\u5E33\u865F"),c.push({name:"sign-in"}));let a=L(!1);const r=M({email:"",password:""}),m={email:{required:n.withMessage("\u8ACB\u8F38\u5165 Email",_),email:n.withMessage("Email \u683C\u5F0F\u932F\u8AA4",j),$lazy:!0},password:{required:n.withMessage("\u8ACB\u8F38\u5165\u5BC6\u78BC",_),minLength:n.withMessage("\u5BC6\u78BC\u6700\u5C11\u70BA 8 \u78BC",q(8)),$lazy:!0}},o=A(m,r);return{v$:o,isLoading:a,MetaWallImg:B,form:r,onClickLogin:async()=>{if(o.value.$touch(),!(o.value.$invalid||a.value))try{a.value=!0,await t.dispatch("users/signIn",{email:r.email,password:r.password}),await t.dispatch("users/getUser"),c.push({name:"posts-wall"})}catch(x){d.error(x||"\u767B\u5165\u5931\u6557")}finally{a.value=!1}},GoogleImg:R}}},z={class:"container flex items-center justify-center h-screen w-screen overflow-x-hidden"},E={class:"card py-[70px] px-12 flex"},G=["src"],N={class:"text-center"},W=s("h1",{class:"font-paytone text-primary text-5xl md:text-6xl leading-[84px]"}," MetaWall ",-1),D=s("h2",{class:"font-bold text-xl md:text-2xl"},"\u5230\u5143\u5B87\u5B99\u5C55\u958B\u5168\u65B0\u793E\u4EA4\u5708",-1),T={class:"mt-9"},U={class:"mb-8 relative"},J={key:0,class:"text-danger mt-2 text-xs text-left absolute"},O={class:"mb-11 relative"},P={key:0,class:"text-danger mt-2 text-xs text-left absolute"},F=["disabled"],H=g(" \u767B\u5165 "),K={key:0,class:"fa-solid fa-spinner text-white animate-spin-slow"},Q={class:"flex mb-4"},X={class:"bg-white hover:bg-gray-light border border-gray rounded-md flex items-center justify-center py-2 mr-2 w-[50%]",href:"https://meta-wall.herokuapp.com/users/google"},Y=["src"],Z=g(" Google "),ee=s("div",{class:"cursor-pointer bg-[#00B900] hover:bg-[#009300] border border-gray rounded-md text-white flex items-center justify-center w-[50%] py-2"}," Line \u5E33\u865F\u767B\u5165 ",-1),se=g("\u8A3B\u518A\u5E33\u865F");function te(d,t,c,e,a,r){const m=$("RouterLink");return i(),l("div",z,[s("div",E,[s("img",{src:e.MetaWallImg,alt:"",class:"hidden md:block md:w-[250px] lg:w-[360px] object-contain w-full mr-9"},null,8,G),s("div",N,[W,D,s("form",T,[s("div",U,[p(s("input",{type:"email",name:"email",id:"email",class:"font-Azeret py-3 px-5",placeholder:"EMAIL","onUpdate:modelValue":t[0]||(t[0]=o=>e.form.email=o),onBlur:t[1]||(t[1]=o=>e.v$.email.$touch())},null,544),[[h,e.form.email]]),e.v$.email.$invalid?(i(),l("p",J,f(e.v$.email.$errors[0].$message),1)):u("",!0)]),s("div",O,[p(s("input",{type:"password",name:"password",id:"password",class:"bg-gray-light w-full font-Azeret py-3 px-5",placeholder:"PASSWORD","onUpdate:modelValue":t[2]||(t[2]=o=>e.form.password=o),onBlur:t[3]||(t[3]=o=>e.v$.password.$touch())},null,544),[[h,e.form.password]]),e.v$.password.$invalid?(i(),l("p",P,f(e.v$.password.$errors[0].$message),1)):u("",!0)]),s("button",{class:"btn-primary mb-4",disabled:e.isLoading,onClick:t[4]||(t[4]=C((...o)=>e.onClickLogin&&e.onClickLogin(...o),["prevent"]))},[H,e.isLoading?(i(),l("i",K)):u("",!0)],8,F),s("div",Q,[s("a",X,[s("img",{class:"w-7 mr-2",src:e.GoogleImg},null,8,Y),Z]),ee]),I(m,{class:"link",to:"/sign-up"},{default:V(()=>[se]),_:1})])])])])}var le=w(S,[["render",te]]);export{le as default};
