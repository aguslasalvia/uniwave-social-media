import{r as l}from"./index.RH_Wq4ov.js";/* empty css                            */var x={exports:{}},n={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d;function h(){if(d)return n;d=1;var i=Symbol.for("react.transitional.element"),a=Symbol.for("react.fragment");function t(c,e,s){var u=null;if(s!==void 0&&(u=""+s),e.key!==void 0&&(u=""+e.key),"key"in e){s={};for(var o in e)o!=="key"&&(s[o]=e[o])}else s=e;return e=s.ref,{$$typeof:i,type:c,key:u,ref:e!==void 0?e:null,props:s}}return n.Fragment=a,n.jsx=t,n.jsxs=t,n}var v;function j(){return v||(v=1,x.exports=h()),x.exports}var r=j();function m({token:i}){const[a,t]=l.useState("loading");return l.useEffect(()=>{if(!i){t("error");return}fetch("undefined/auth/activate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({jwt:i})}).then(c=>{c.status!==200?t("error"):t("success")}).catch(()=>t("error"))},[i]),r.jsx(r.Fragment,{children:r.jsxs("section",{className:"activation-container float",children:[r.jsx("h1",{children:"Activación de Cuenta"}),a==="loading"&&r.jsxs("div",{children:[r.jsx("p",{children:"Por favor espere mientras se activa su cuenta"}),r.jsx("p",{children:"No cierre esta ventana"}),r.jsx("i",{className:"bx bx-hourglass waiting"})]}),a==="success"&&r.jsxs("div",{children:[r.jsx("p",{children:"Cuenta activada con éxito"}),r.jsx("i",{className:"bx bx-check-circle success"})]}),a==="error"&&r.jsxs("div",{children:[r.jsx("p",{children:"Ocurrió un error al activar la cuenta"}),r.jsx("i",{className:"bx bx-x-circle error"})]})]})})}export{m as default};
