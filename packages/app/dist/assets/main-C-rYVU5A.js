(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();var Pe;class at extends Error{}at.prototype.name="InvalidTokenError";function Ks(r){return decodeURIComponent(atob(r).replace(/(.)/g,(t,e)=>{let s=e.charCodeAt(0).toString(16).toUpperCase();return s.length<2&&(s="0"+s),"%"+s}))}function Zs(r){let t=r.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return Ks(t)}catch{return atob(t)}}function ts(r,t){if(typeof r!="string")throw new at("Invalid token specified: must be a string");t||(t={});const e=t.header===!0?0:1,s=r.split(".")[e];if(typeof s!="string")throw new at(`Invalid token specified: missing part #${e+1}`);let i;try{i=Zs(s)}catch(n){throw new at(`Invalid token specified: invalid base64 for part #${e+1} (${n.message})`)}try{return JSON.parse(i)}catch(n){throw new at(`Invalid token specified: invalid json for part #${e+1} (${n.message})`)}}const Qs="mu:context",Xt=`${Qs}:change`;class Xs{constructor(t,e){this._proxy=ti(t,e)}get value(){return this._proxy}set value(t){Object.assign(this._proxy,t)}apply(t){this.value=t(this.value)}}class oe extends HTMLElement{constructor(t){super(),console.log("Constructing context provider",this),this.context=new Xs(t,this),this.style.display="contents"}attach(t){return this.addEventListener(Xt,t),t}detach(t){this.removeEventListener(Xt,t)}}function ti(r,t){return new Proxy(r,{get:(s,i,n)=>{if(i==="then")return;const o=Reflect.get(s,i,n);return console.log(`Context['${i}'] => `,o),o},set:(s,i,n,o)=>{const l=r[i];console.log(`Context['${i.toString()}'] <= `,n);const a=Reflect.set(s,i,n,o);if(a){let p=new CustomEvent(Xt,{bubbles:!0,cancelable:!0,composed:!0});Object.assign(p,{property:i,oldValue:l,value:n}),t.dispatchEvent(p)}else console.log(`Context['${i}] was not set to ${n}`);return a}})}function ei(r,t){const e=es(t,r);return new Promise((s,i)=>{if(e){const n=e.localName;customElements.whenDefined(n).then(()=>s(e))}else i({context:t,reason:`No provider for this context "${t}:`})})}function es(r,t){const e=`[provides="${r}"]`;if(!t||t===document.getRootNode())return;const s=t.closest(e);if(s)return s;const i=t.getRootNode();if(i instanceof ShadowRoot)return es(r,i.host)}class si extends CustomEvent{constructor(t,e="mu:message"){super(e,{bubbles:!0,composed:!0,detail:t})}}function ss(r="mu:message"){return(t,...e)=>t.dispatchEvent(new si(e,r))}class ae{constructor(t,e,s="service:message",i=!0){this._pending=[],this._context=e,this._update=t,this._eventType=s,this._running=i}attach(t){t.addEventListener(this._eventType,e=>{e.stopPropagation();const s=e.detail;this.consume(s)})}start(){this._running||(console.log(`Starting ${this._eventType} service`),this._running=!0,this._pending.forEach(t=>this.process(t)))}apply(t){this._context.apply(t)}consume(t){this._running?this.process(t):(console.log(`Queueing ${this._eventType} message`,t),this._pending.push(t))}process(t){console.log(`Processing ${this._eventType} message`,t);const e=this._update(t,this.apply.bind(this));e&&e(this._context.value)}}function ii(r){return t=>({...t,...r})}const te="mu:auth:jwt",is=class rs extends ae{constructor(t,e){super((s,i)=>this.update(s,i),t,rs.EVENT_TYPE),this._redirectForLogin=e}update(t,e){switch(t[0]){case"auth/signin":const{token:s,redirect:i}=t[1];return e(ni(s)),Yt(i);case"auth/signout":return e(oi()),Yt(this._redirectForLogin);case"auth/redirect":return Yt(this._redirectForLogin,{next:window.location.href});default:const n=t[0];throw new Error(`Unhandled Auth message "${n}"`)}}};is.EVENT_TYPE="auth:message";let ns=is;const os=ss(ns.EVENT_TYPE);function Yt(r,t={}){if(!r)return;const e=window.location.href,s=new URL(r,e);return Object.entries(t).forEach(([i,n])=>s.searchParams.set(i,n)),()=>{console.log("Redirecting to ",r),window.location.assign(s)}}class ri extends oe{get redirect(){return this.getAttribute("redirect")||void 0}constructor(){super({user:Y.authenticateFromLocalStorage()})}connectedCallback(){new ns(this.context,this.redirect).attach(this)}}class W{constructor(){this.authenticated=!1,this.username="anonymous"}static deauthenticate(t){return t.authenticated=!1,t.username="anonymous",localStorage.removeItem(te),t}}class Y extends W{constructor(t){super();const e=ts(t);console.log("Token payload",e),this.token=t,this.authenticated=!0,this.username=e.username}static authenticate(t){const e=new Y(t);return localStorage.setItem(te,t),e}static authenticateFromLocalStorage(){const t=localStorage.getItem(te);return t?Y.authenticate(t):new W}}function ni(r){return ii({user:Y.authenticate(r),token:r})}function oi(){return r=>{const t=r.user;return{user:t&&t.authenticated?W.deauthenticate(t):t,token:""}}}function ai(r){return r.authenticated?{Authorization:`Bearer ${r.token||"NO_TOKEN"}`}:{}}function li(r){return r.authenticated?ts(r.token||""):{}}const Mt=Object.freeze(Object.defineProperty({__proto__:null,AuthenticatedUser:Y,Provider:ri,User:W,dispatch:os,headers:ai,payload:li},Symbol.toStringTag,{value:"Module"}));function xt(r,t,e){const s=r.target,i=new CustomEvent(t,{bubbles:!0,composed:!0,detail:e});console.log(`Relaying event from ${r.type}:`,i),s.dispatchEvent(i),r.stopPropagation()}function ee(r,t="*"){return r.composedPath().find(s=>{const i=s;return i.tagName&&i.matches(t)})}const as=Object.freeze(Object.defineProperty({__proto__:null,originalTarget:ee,relay:xt},Symbol.toStringTag,{value:"Module"})),ci=new DOMParser;function vt(r,...t){const e=r.map((o,l)=>l?[t[l-1],o]:[o]).flat().join(""),s=ci.parseFromString(e,"text/html"),i=s.head.childElementCount?s.head.children:s.body.children,n=new DocumentFragment;return n.replaceChildren(...i),n}function jt(r){const t=r.firstElementChild,e=t&&t.tagName==="TEMPLATE"?t:void 0;return{attach:s};function s(i,n={mode:"open"}){const o=i.attachShadow(n);return e&&o.appendChild(e.content.cloneNode(!0)),o}}const ls=class cs extends HTMLElement{constructor(){super(),this._state={},jt(cs.template).attach(this),this.addEventListener("change",t=>{const e=t.target;if(e){const s=e.name,i=e.value;s&&(this._state[s]=i)}}),this.form&&this.form.addEventListener("submit",t=>{t.preventDefault(),xt(t,"mu-form:submit",this._state)})}set init(t){this._state=t||{},ui(this._state,this)}get form(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("form")}};ls.template=vt`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style>
        form {
          display: grid;
          gap: var(--size-spacing-medium);
          grid-template-columns: [start] 1fr [label] 1fr [input] 3fr 1fr [end];
        }
        ::slotted(label) {
          display: grid;
          grid-column: label / end;
          grid-template-columns: subgrid;
          gap: var(--size-spacing-medium);
        }
        button[type="submit"] {
          grid-column: input;
          justify-self: start;
        }
      </style>
    </template>
  `;let hi=ls;function ui(r,t){const e=Object.entries(r);for(const[s,i]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!i;break;case"date":o.value=i.toISOString().substr(0,10);break;default:o.value=i;break}}}return r}const di=Object.freeze(Object.defineProperty({__proto__:null,Element:hi},Symbol.toStringTag,{value:"Module"})),hs=class us extends ae{constructor(t){super((e,s)=>this.update(e,s),t,us.EVENT_TYPE)}update(t,e){switch(t[0]){case"history/navigate":{const{href:s,state:i}=t[1];e(fi(s,i));break}case"history/redirect":{const{href:s,state:i}=t[1];e(mi(s,i));break}}}};hs.EVENT_TYPE="history:message";let le=hs;class Ce extends oe{constructor(){super({location:document.location,state:{}}),this.addEventListener("click",t=>{const e=pi(t);if(e){const s=new URL(e.href);s.origin===this.context.value.location.origin&&(console.log("Preventing Click Event on <A>",t),t.preventDefault(),ce(e,"history/navigate",{href:s.pathname+s.search}))}}),window.addEventListener("popstate",t=>{console.log("Popstate",t.state),this.context.value={location:document.location,state:t.state}})}connectedCallback(){new le(this.context).attach(this)}}function pi(r){const t=r.currentTarget,e=s=>s.tagName=="A"&&s.href;if(r.button===0)if(r.composed){const i=r.composedPath().find(e);return i||void 0}else{for(let s=r.target;s;s===t?null:s.parentElement)if(e(s))return s;return}}function fi(r,t={}){return history.pushState(t,"",r),()=>({location:document.location,state:history.state})}function mi(r,t={}){return history.replaceState(t,"",r),()=>({location:document.location,state:history.state})}const ce=ss(le.EVENT_TYPE),ds=Object.freeze(Object.defineProperty({__proto__:null,HistoryProvider:Ce,Provider:Ce,Service:le,dispatch:ce},Symbol.toStringTag,{value:"Module"}));class G{constructor(t,e){this._effects=[],this._target=t,this._contextLabel=e}observe(t=void 0){return new Promise((e,s)=>{if(this._provider){const i=new Oe(this._provider,t);this._effects.push(i),e(i)}else ei(this._target,this._contextLabel).then(i=>{const n=new Oe(i,t);this._provider=i,this._effects.push(n),i.attach(o=>this._handleChange(o)),e(n)}).catch(i=>console.log(`Observer ${this._contextLabel} failed to locate a provider`,i))})}_handleChange(t){console.log("Received change event for observers",t,this._effects),this._effects.forEach(e=>e.runEffect())}}class Oe{constructor(t,e){this._provider=t,e&&this.setEffect(e)}get context(){return this._provider.context}get value(){return this.context.value}setEffect(t){this._effectFn=t,this.runEffect()}runEffect(){this._effectFn&&this._effectFn(this.context.value)}}const he=class ps extends HTMLElement{constructor(){super(),this._state={},this._user=new W,this._authObserver=new G(this,"blazing:auth"),jt(ps.template).attach(this),this.form&&this.form.addEventListener("submit",t=>{if(t.preventDefault(),this.src||this.action){if(console.log("Submitting form",this._state),this.action)this.action(this._state);else if(this.src){const e=this.isNew?"POST":"PUT",s=this.isNew?"created":"updated",i=this.isNew?this.src.replace(/[/][$]new$/,""):this.src;yi(i,this._state,e,this.authorization).then(n=>it(n,this)).then(n=>{const o=`mu-rest-form:${s}`,l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,[s]:n,url:i}});this.dispatchEvent(l)}).catch(n=>{const o="mu-rest-form:error",l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,error:n,url:i,request:this._state}});this.dispatchEvent(l)})}}}),this.addEventListener("change",t=>{const e=t.target;if(e){const s=e.name,i=e.value;s&&(this._state[s]=i)}})}get src(){return this.getAttribute("src")}get isNew(){return this.hasAttribute("new")}set init(t){this._state=t||{},it(this._state,this)}get form(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("form")}get authorization(){var t;return(t=this._user)!=null&&t.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}connectedCallback(){this._authObserver.observe(({user:t})=>{t&&(this._user=t,this.src&&!this.isNew&&se(this.src,this.authorization).then(e=>{this._state=e,it(e,this)}))})}attributeChangedCallback(t,e,s){switch(t){case"src":this.src&&s&&s!==e&&!this.isNew&&se(this.src,this.authorization).then(i=>{this._state=i,it(i,this)});break;case"new":s&&(this._state={},it({},this));break}}};he.observedAttributes=["src","new","action"];he.template=vt`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style>
        form {
          display: grid;
          gap: var(--size-spacing-medium);
          grid-template-columns: [start] 1fr [label] 1fr [input] 3fr 1fr [end];
        }
        ::slotted(label) {
          display: grid;
          grid-column: label / end;
          grid-template-columns: subgrid;
          gap: var(--size-spacing-medium);
        }
        button[type="submit"] {
          grid-column: input;
          justify-self: start;
        }
      </style>
    </template>
  `;let gi=he;function se(r,t){return fetch(r,{headers:t}).then(e=>{if(e.status!==200)throw`Status: ${e.status}`;return e.json()}).catch(e=>console.log(`Failed to load form from ${r}:`,e))}function it(r,t){const e=Object.entries(r);for(const[s,i]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!i;break;default:o.value=i;break}}}return r}function yi(r,t,e="PUT",s={}){return fetch(r,{method:e,headers:{"Content-Type":"application/json",...s},body:JSON.stringify(t)}).then(i=>{if(i.status!=200&&i.status!=201)throw`Form submission failed: Status ${i.status}`;return i.json()})}const en=Object.freeze(Object.defineProperty({__proto__:null,FormElement:gi,fetchData:se},Symbol.toStringTag,{value:"Module"})),fs=class ms extends ae{constructor(t,e){super(e,t,ms.EVENT_TYPE,!1)}};fs.EVENT_TYPE="mu:message";let gs=fs;class _i extends oe{constructor(t,e,s){super(e),this._user=new W,this._updateFn=t,this._authObserver=new G(this,s)}connectedCallback(){const t=new gs(this.context,(e,s)=>this._updateFn(e,s,this._user));t.attach(this),this._authObserver.observe(({user:e})=>{console.log("Store got auth",e),e&&(this._user=e),t.start()})}}const vi=Object.freeze(Object.defineProperty({__proto__:null,Provider:_i,Service:gs},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const St=globalThis,ue=St.ShadowRoot&&(St.ShadyCSS===void 0||St.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,de=Symbol(),ke=new WeakMap;let ys=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==de)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(ue&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=ke.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ke.set(e,t))}return t}toString(){return this.cssText}};const $i=r=>new ys(typeof r=="string"?r:r+"",void 0,de),bi=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new ys(e,r,de)},Ai=(r,t)=>{if(ue)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=St.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},Te=ue?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return $i(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ei,defineProperty:Si,getOwnPropertyDescriptor:wi,getOwnPropertyNames:xi,getOwnPropertySymbols:Pi,getPrototypeOf:Ci}=Object,J=globalThis,Re=J.trustedTypes,Oi=Re?Re.emptyScript:"",Ue=J.reactiveElementPolyfillSupport,lt=(r,t)=>r,Pt={toAttribute(r,t){switch(t){case Boolean:r=r?Oi:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},pe=(r,t)=>!Ei(r,t),Ne={attribute:!0,type:String,converter:Pt,reflect:!1,hasChanged:pe};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),J.litPropertyMetadata??(J.litPropertyMetadata=new WeakMap);let V=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Ne){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Si(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=wi(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return i==null?void 0:i.call(this)},set(o){const l=i==null?void 0:i.call(this);n.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ne}static _$Ei(){if(this.hasOwnProperty(lt("elementProperties")))return;const t=Ci(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(lt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(lt("properties"))){const e=this.properties,s=[...xi(e),...Pi(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Te(i))}else t!==void 0&&e.push(Te(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ai(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var s;const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(n!==void 0&&i.reflect===!0){const o=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:Pt).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){var s;const i=this.constructor,n=i._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const o=i.getPropertyOptions(n),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)==null?void 0:s.fromAttribute)!==void 0?o.converter:Pt;this._$Em=n,this[n]=l.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??pe)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],o)}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$EO)==null||t.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(s)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}};V.elementStyles=[],V.shadowRootOptions={mode:"open"},V[lt("elementProperties")]=new Map,V[lt("finalized")]=new Map,Ue==null||Ue({ReactiveElement:V}),(J.reactiveElementVersions??(J.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ct=globalThis,Ot=Ct.trustedTypes,Le=Ot?Ot.createPolicy("lit-html",{createHTML:r=>r}):void 0,_s="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,vs="?"+C,ki=`<${vs}>`,H=document,ut=()=>H.createComment(""),dt=r=>r===null||typeof r!="object"&&typeof r!="function",$s=Array.isArray,Ti=r=>$s(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",Gt=`[ 	
\f\r]`,rt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Me=/-->/g,je=/>/g,N=RegExp(`>|${Gt}(?:([^\\s"'>=/]+)(${Gt}*=${Gt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),He=/'/g,Ie=/"/g,bs=/^(?:script|style|textarea|title)$/i,Ri=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),nt=Ri(1),K=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),ze=new WeakMap,M=H.createTreeWalker(H,129);function As(r,t){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Le!==void 0?Le.createHTML(t):t}const Ui=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":"",o=rt;for(let l=0;l<e;l++){const a=r[l];let p,f,u=-1,c=0;for(;c<a.length&&(o.lastIndex=c,f=o.exec(a),f!==null);)c=o.lastIndex,o===rt?f[1]==="!--"?o=Me:f[1]!==void 0?o=je:f[2]!==void 0?(bs.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=N):f[3]!==void 0&&(o=N):o===N?f[0]===">"?(o=i??rt,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,p=f[1],o=f[3]===void 0?N:f[3]==='"'?Ie:He):o===Ie||o===He?o=N:o===Me||o===je?o=rt:(o=N,i=void 0);const h=o===N&&r[l+1].startsWith("/>")?" ":"";n+=o===rt?a+ki:u>=0?(s.push(p),a.slice(0,u)+_s+a.slice(u)+C+h):a+C+(u===-2?l:h)}return[As(r,n+(r[e]||"<?>")+(t===2?"</svg>":"")),s]};let ie=class Es{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[p,f]=Ui(t,e);if(this.el=Es.createElement(p,s),M.currentNode=this.el.content,e===2){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=M.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(_s)){const c=f[o++],h=i.getAttribute(u).split(C),d=/([.?@])?(.*)/.exec(c);a.push({type:1,index:n,name:d[2],strings:h,ctor:d[1]==="."?Li:d[1]==="?"?Mi:d[1]==="@"?ji:Ht}),i.removeAttribute(u)}else u.startsWith(C)&&(a.push({type:6,index:n}),i.removeAttribute(u));if(bs.test(i.tagName)){const u=i.textContent.split(C),c=u.length-1;if(c>0){i.textContent=Ot?Ot.emptyScript:"";for(let h=0;h<c;h++)i.append(u[h],ut()),M.nextNode(),a.push({type:2,index:++n});i.append(u[c],ut())}}}else if(i.nodeType===8)if(i.data===vs)a.push({type:2,index:n});else{let u=-1;for(;(u=i.data.indexOf(C,u+1))!==-1;)a.push({type:7,index:n}),u+=C.length-1}n++}}static createElement(t,e){const s=H.createElement("template");return s.innerHTML=t,s}};function Z(r,t,e=r,s){var i,n;if(t===K)return t;let o=s!==void 0?(i=e._$Co)==null?void 0:i[s]:e._$Cl;const l=dt(t)?void 0:t._$litDirective$;return(o==null?void 0:o.constructor)!==l&&((n=o==null?void 0:o._$AO)==null||n.call(o,!1),l===void 0?o=void 0:(o=new l(r),o._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=o:e._$Cl=o),o!==void 0&&(t=Z(r,o._$AS(r,t.values),o,s)),t}let Ni=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??H).importNode(e,!0);M.currentNode=i;let n=M.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let p;a.type===2?p=new fe(n,n.nextSibling,this,t):a.type===1?p=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(p=new Hi(n,this,t)),this._$AV.push(p),a=s[++l]}o!==(a==null?void 0:a.index)&&(n=M.nextNode(),o++)}return M.currentNode=H,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},fe=class Ss{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),dt(t)?t===v||t==null||t===""?(this._$AH!==v&&this._$AR(),this._$AH=v):t!==this._$AH&&t!==K&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ti(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==v&&dt(this._$AH)?this._$AA.nextSibling.data=t:this.T(H.createTextNode(t)),this._$AH=t}$(t){var e;const{values:s,_$litType$:i}=t,n=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=ie.createElement(As(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)==null?void 0:e._$AD)===n)this._$AH.p(s);else{const o=new Ni(n,this),l=o.u(this.options);o.p(s),this.T(l),this._$AH=o}}_$AC(t){let e=ze.get(t.strings);return e===void 0&&ze.set(t.strings,e=new ie(t)),e}k(t){$s(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new Ss(this.S(ut()),this.S(ut()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}},Ht=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=v}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=Z(this,t,e,0),o=!dt(t)||t!==this._$AH&&t!==K,o&&(this._$AH=t);else{const l=t;let a,p;for(t=n[0],a=0;a<n.length-1;a++)p=Z(this,l[s+a],e,a),p===K&&(p=this._$AH[a]),o||(o=!dt(p)||p!==this._$AH[a]),p===v?t=v:t!==v&&(t+=(p??"")+n[a+1]),this._$AH[a]=p}o&&!i&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Li=class extends Ht{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}},Mi=class extends Ht{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==v)}},ji=class extends Ht{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??v)===K)return;const s=this._$AH,i=t===v&&s!==v||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==v&&(s===v||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}},Hi=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}};const De=Ct.litHtmlPolyfillSupport;De==null||De(ie,fe),(Ct.litHtmlVersions??(Ct.litHtmlVersions=[])).push("3.1.3");const Ii=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new fe(t.insertBefore(ut(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let q=class extends V{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ii(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return K}};q._$litElement$=!0,q.finalized=!0,(Pe=globalThis.litElementHydrateSupport)==null||Pe.call(globalThis,{LitElement:q});const Fe=globalThis.litElementPolyfillSupport;Fe==null||Fe({LitElement:q});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.5");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const zi={attribute:!0,type:String,converter:Pt,reflect:!1,hasChanged:pe},Di=(r=zi,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.P(o,void 0,r),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function ws(r){return(t,e)=>typeof e=="object"?Di(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,o?{...s,wrapped:!0}:s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function xs(r){return ws({...r,state:!0,attribute:!1})}function Fi(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function Vi(r){throw new Error('Could not dynamically require "'+r+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Ps={};(function(r){var t=function(){var e=function(u,c,h,d){for(h=h||{},d=u.length;d--;h[u[d]]=c);return h},s=[1,9],i=[1,10],n=[1,11],o=[1,12],l=[5,11,12,13,14,15],a={trace:function(){},yy:{},symbols_:{error:2,root:3,expressions:4,EOF:5,expression:6,optional:7,literal:8,splat:9,param:10,"(":11,")":12,LITERAL:13,SPLAT:14,PARAM:15,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",11:"(",12:")",13:"LITERAL",14:"SPLAT",15:"PARAM"},productions_:[0,[3,2],[3,1],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[7,3],[8,1],[9,1],[10,1]],performAction:function(c,h,d,g,m,y,Ft){var E=y.length-1;switch(m){case 1:return new g.Root({},[y[E-1]]);case 2:return new g.Root({},[new g.Literal({value:""})]);case 3:this.$=new g.Concat({},[y[E-1],y[E]]);break;case 4:case 5:this.$=y[E];break;case 6:this.$=new g.Literal({value:y[E]});break;case 7:this.$=new g.Splat({name:y[E]});break;case 8:this.$=new g.Param({name:y[E]});break;case 9:this.$=new g.Optional({},[y[E-1]]);break;case 10:this.$=c;break;case 11:case 12:this.$=c.slice(1);break}},table:[{3:1,4:2,5:[1,3],6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},{1:[3]},{5:[1,13],6:14,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},{1:[2,2]},e(l,[2,4]),e(l,[2,5]),e(l,[2,6]),e(l,[2,7]),e(l,[2,8]),{4:15,6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},e(l,[2,10]),e(l,[2,11]),e(l,[2,12]),{1:[2,1]},e(l,[2,3]),{6:14,7:5,8:6,9:7,10:8,11:s,12:[1,16],13:i,14:n,15:o},e(l,[2,9])],defaultActions:{3:[2,2],13:[2,1]},parseError:function(c,h){if(h.recoverable)this.trace(c);else{let d=function(g,m){this.message=g,this.hash=m};throw d.prototype=Error,new d(c,h)}},parse:function(c){var h=this,d=[0],g=[null],m=[],y=this.table,Ft="",E=0,Se=0,Ws=2,we=1,Ys=m.slice.call(arguments,1),_=Object.create(this.lexer),R={yy:{}};for(var Vt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,Vt)&&(R.yy[Vt]=this.yy[Vt]);_.setInput(c,R.yy),R.yy.lexer=_,R.yy.parser=this,typeof _.yylloc>"u"&&(_.yylloc={});var Bt=_.yylloc;m.push(Bt);var Gs=_.options&&_.options.ranges;typeof R.yy.parseError=="function"?this.parseError=R.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var Js=function(){var D;return D=_.lex()||we,typeof D!="number"&&(D=h.symbols_[D]||D),D},A,U,w,qt,z={},At,P,xe,Et;;){if(U=d[d.length-1],this.defaultActions[U]?w=this.defaultActions[U]:((A===null||typeof A>"u")&&(A=Js()),w=y[U]&&y[U][A]),typeof w>"u"||!w.length||!w[0]){var Wt="";Et=[];for(At in y[U])this.terminals_[At]&&At>Ws&&Et.push("'"+this.terminals_[At]+"'");_.showPosition?Wt="Parse error on line "+(E+1)+`:
`+_.showPosition()+`
Expecting `+Et.join(", ")+", got '"+(this.terminals_[A]||A)+"'":Wt="Parse error on line "+(E+1)+": Unexpected "+(A==we?"end of input":"'"+(this.terminals_[A]||A)+"'"),this.parseError(Wt,{text:_.match,token:this.terminals_[A]||A,line:_.yylineno,loc:Bt,expected:Et})}if(w[0]instanceof Array&&w.length>1)throw new Error("Parse Error: multiple actions possible at state: "+U+", token: "+A);switch(w[0]){case 1:d.push(A),g.push(_.yytext),m.push(_.yylloc),d.push(w[1]),A=null,Se=_.yyleng,Ft=_.yytext,E=_.yylineno,Bt=_.yylloc;break;case 2:if(P=this.productions_[w[1]][1],z.$=g[g.length-P],z._$={first_line:m[m.length-(P||1)].first_line,last_line:m[m.length-1].last_line,first_column:m[m.length-(P||1)].first_column,last_column:m[m.length-1].last_column},Gs&&(z._$.range=[m[m.length-(P||1)].range[0],m[m.length-1].range[1]]),qt=this.performAction.apply(z,[Ft,Se,E,R.yy,w[1],g,m].concat(Ys)),typeof qt<"u")return qt;P&&(d=d.slice(0,-1*P*2),g=g.slice(0,-1*P),m=m.slice(0,-1*P)),d.push(this.productions_[w[1]][0]),g.push(z.$),m.push(z._$),xe=y[d[d.length-2]][d[d.length-1]],d.push(xe);break;case 3:return!0}}return!0}},p=function(){var u={EOF:1,parseError:function(h,d){if(this.yy.parser)this.yy.parser.parseError(h,d);else throw new Error(h)},setInput:function(c,h){return this.yy=h||this.yy||{},this._input=c,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var c=this._input[0];this.yytext+=c,this.yyleng++,this.offset++,this.match+=c,this.matched+=c;var h=c.match(/(?:\r\n?|\n).*/g);return h?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),c},unput:function(c){var h=c.length,d=c.split(/(?:\r\n?|\n)/g);this._input=c+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-h),this.offset-=h;var g=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),d.length-1&&(this.yylineno-=d.length-1);var m=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:d?(d.length===g.length?this.yylloc.first_column:0)+g[g.length-d.length].length-d[0].length:this.yylloc.first_column-h},this.options.ranges&&(this.yylloc.range=[m[0],m[0]+this.yyleng-h]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(c){this.unput(this.match.slice(c))},pastInput:function(){var c=this.matched.substr(0,this.matched.length-this.match.length);return(c.length>20?"...":"")+c.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var c=this.match;return c.length<20&&(c+=this._input.substr(0,20-c.length)),(c.substr(0,20)+(c.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var c=this.pastInput(),h=new Array(c.length+1).join("-");return c+this.upcomingInput()+`
`+h+"^"},test_match:function(c,h){var d,g,m;if(this.options.backtrack_lexer&&(m={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(m.yylloc.range=this.yylloc.range.slice(0))),g=c[0].match(/(?:\r\n?|\n).*/g),g&&(this.yylineno+=g.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:g?g[g.length-1].length-g[g.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+c[0].length},this.yytext+=c[0],this.match+=c[0],this.matches=c,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(c[0].length),this.matched+=c[0],d=this.performAction.call(this,this.yy,this,h,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),d)return d;if(this._backtrack){for(var y in m)this[y]=m[y];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var c,h,d,g;this._more||(this.yytext="",this.match="");for(var m=this._currentRules(),y=0;y<m.length;y++)if(d=this._input.match(this.rules[m[y]]),d&&(!h||d[0].length>h[0].length)){if(h=d,g=y,this.options.backtrack_lexer){if(c=this.test_match(d,m[y]),c!==!1)return c;if(this._backtrack){h=!1;continue}else return!1}else if(!this.options.flex)break}return h?(c=this.test_match(h,m[g]),c!==!1?c:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var h=this.next();return h||this.lex()},begin:function(h){this.conditionStack.push(h)},popState:function(){var h=this.conditionStack.length-1;return h>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(h){return h=this.conditionStack.length-1-Math.abs(h||0),h>=0?this.conditionStack[h]:"INITIAL"},pushState:function(h){this.begin(h)},stateStackSize:function(){return this.conditionStack.length},options:{},performAction:function(h,d,g,m){switch(g){case 0:return"(";case 1:return")";case 2:return"SPLAT";case 3:return"PARAM";case 4:return"LITERAL";case 5:return"LITERAL";case 6:return"EOF"}},rules:[/^(?:\()/,/^(?:\))/,/^(?:\*+\w+)/,/^(?::+\w+)/,/^(?:[\w%\-~\n]+)/,/^(?:.)/,/^(?:$)/],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6],inclusive:!0}}};return u}();a.lexer=p;function f(){this.yy={}}return f.prototype=a,a.Parser=f,new f}();typeof Vi<"u"&&(r.parser=t,r.Parser=t.Parser,r.parse=function(){return t.parse.apply(t,arguments)})})(Ps);function F(r){return function(t,e){return{displayName:r,props:t,children:e||[]}}}var Cs={Root:F("Root"),Concat:F("Concat"),Literal:F("Literal"),Splat:F("Splat"),Param:F("Param"),Optional:F("Optional")},Os=Ps.parser;Os.yy=Cs;var Bi=Os,qi=Object.keys(Cs);function Wi(r){return qi.forEach(function(t){if(typeof r[t]>"u")throw new Error("No handler defined for "+t.displayName)}),{visit:function(t,e){return this.handlers[t.displayName].call(this,t,e)},handlers:r}}var ks=Wi,Yi=ks,Gi=/[\-{}\[\]+?.,\\\^$|#\s]/g;function Ts(r){this.captures=r.captures,this.re=r.re}Ts.prototype.match=function(r){var t=this.re.exec(r),e={};if(t)return this.captures.forEach(function(s,i){typeof t[i+1]>"u"?e[s]=void 0:e[s]=decodeURIComponent(t[i+1])}),e};var Ji=Yi({Concat:function(r){return r.children.reduce((function(t,e){var s=this.visit(e);return{re:t.re+s.re,captures:t.captures.concat(s.captures)}}).bind(this),{re:"",captures:[]})},Literal:function(r){return{re:r.props.value.replace(Gi,"\\$&"),captures:[]}},Splat:function(r){return{re:"([^?]*?)",captures:[r.props.name]}},Param:function(r){return{re:"([^\\/\\?]+)",captures:[r.props.name]}},Optional:function(r){var t=this.visit(r.children[0]);return{re:"(?:"+t.re+")?",captures:t.captures}},Root:function(r){var t=this.visit(r.children[0]);return new Ts({re:new RegExp("^"+t.re+"(?=\\?|$)"),captures:t.captures})}}),Ki=Ji,Zi=ks,Qi=Zi({Concat:function(r,t){var e=r.children.map((function(s){return this.visit(s,t)}).bind(this));return e.some(function(s){return s===!1})?!1:e.join("")},Literal:function(r){return decodeURI(r.props.value)},Splat:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Param:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Optional:function(r,t){var e=this.visit(r.children[0],t);return e||""},Root:function(r,t){t=t||{};var e=this.visit(r.children[0],t);return e?encodeURI(e):!1}}),Xi=Qi,tr=Bi,er=Ki,sr=Xi;$t.prototype=Object.create(null);$t.prototype.match=function(r){var t=er.visit(this.ast),e=t.match(r);return e||!1};$t.prototype.reverse=function(r){return sr.visit(this.ast,r)};function $t(r){var t;if(this?t=this:t=Object.create($t.prototype),typeof r>"u")throw new Error("A route spec is required");return t.spec=r,t.ast=tr.parse(r),t}var ir=$t,rr=ir,nr=rr;const or=Fi(nr);var ar=Object.defineProperty,Rs=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&ar(t,e,i),i};class pt extends q{constructor(t,e,s=""){super(),this._cases=[],this._fallback=()=>nt`
      <h1>Not Found</h1>
    `,this._cases=t.map(i=>({...i,route:new or(i.path)})),this._historyObserver=new G(this,e),this._authObserver=new G(this,s)}connectedCallback(){this._historyObserver.observe(({location:t})=>{console.log("New location",t),t&&(this._match=this.matchRoute(t))}),this._authObserver.observe(({user:t})=>{this._user=t}),super.connectedCallback()}render(){return console.log("Rendering for match",this._match,this._user),nt`
      <main>${(()=>{const e=this._match;if(e){if("view"in e)return this._user?e.auth&&e.auth!=="public"&&this._user&&!this._user.authenticated?(os(this,"auth/redirect"),nt`
              <h1>Redirecting for Login</h1>
            `):e.view(e.params||{}):nt`
              <h1>Authenticating</h1>
            `;if("redirect"in e){const s=e.redirect;if(typeof s=="string")return this.redirect(s),nt`
              <h1>Redirecting to ${s}…</h1>
            `}}return this._fallback({})})()}</main>
    `}updated(t){t.has("_match")&&this.requestUpdate()}matchRoute(t){const{search:e,pathname:s}=t,i=new URLSearchParams(e),n=s+e;for(const o of this._cases){const l=o.route.match(n);if(l)return{...o,path:s,params:l,query:i}}}redirect(t){ce(this,"history/redirect",{href:t})}}pt.styles=bi`
    :host,
    main {
      display: contents;
    }
  `;Rs([xs()],pt.prototype,"_user");Rs([xs()],pt.prototype,"_match");const lr=Object.freeze(Object.defineProperty({__proto__:null,Element:pt,Switch:pt},Symbol.toStringTag,{value:"Module"})),Us=class Ns extends HTMLElement{constructor(){if(super(),jt(Ns.template).attach(this),this.shadowRoot){const t=this.shadowRoot.querySelector("slot[name='actuator']");t&&t.addEventListener("click",()=>this.toggle())}}toggle(){this.hasAttribute("open")?this.removeAttribute("open"):this.setAttribute("open","open")}};Us.template=vt`
    <template>
      <slot name="actuator"><button>Menu</button></slot>
      <div id="panel">
        <slot></slot>
      </div>

      <style>
        :host {
          position: relative;
        }
        #is-shown {
          display: none;
        }
        #panel {
          display: none;

          position: absolute;
          right: 0;
          margin-top: var(--size-spacing-small);
          width: max-content;
          padding: var(--size-spacing-small);
          border-radius: var(--size-radius-small);
          background: var(--color-background-card);
          color: var(--color-text);
          box-shadow: var(--shadow-popover);
        }
        :host([open]) #panel {
          display: block;
        }
      </style>
    </template>
  `;let cr=Us;const hr=Object.freeze(Object.defineProperty({__proto__:null,Element:cr},Symbol.toStringTag,{value:"Module"})),Ls=class Ms extends HTMLElement{constructor(){super(),this._array=[],jt(Ms.template).attach(this),this.addEventListener("input-array:add",t=>{t.stopPropagation(),this.append(js("",this._array.length))}),this.addEventListener("input-array:remove",t=>{t.stopPropagation(),this.removeClosestItem(t.target)}),this.addEventListener("change",t=>{t.stopPropagation();const e=t.target;if(e&&e!==this){const s=new Event("change",{bubbles:!0}),i=e.value,n=e.closest("label");if(n){const o=Array.from(this.children).indexOf(n);this._array[o]=i,this.dispatchEvent(s)}}}),this.addEventListener("click",t=>{ee(t,"button.add")?xt(t,"input-array:add"):ee(t,"button.remove")&&xt(t,"input-array:remove")})}get name(){return this.getAttribute("name")}get value(){return this._array}set value(t){this._array=Array.isArray(t)?t:[t],dr(this._array,this)}removeClosestItem(t){const e=t.closest("label");if(console.log("Removing closest item:",e,t),e){const s=Array.from(this.children).indexOf(e);this._array.splice(s,1),e.remove()}}};Ls.template=vt`
    <template>
      <ul>
        <slot></slot>
      </ul>
      <button class="add">
        <slot name="label-add">Add one</slot>
        <style>
          :host {
            display: contents;
          }
          ul {
            display: contents;
          }
          button.add {
            grid-column: input / input-end;
          }
          ::slotted(label) {
            display: contents;
          }
        </style>
      </button>
    </template>
  `;let ur=Ls;function dr(r,t){t.replaceChildren(),r.forEach((e,s)=>t.append(js(e)))}function js(r,t){const e=r===void 0?"":`value="${r}"`;return vt`
    <label>
      <input ${e} />
      <button class="remove" type="button">Remove</button>
    </label>
  `}const pr=Object.freeze(Object.defineProperty({__proto__:null,Element:ur},Symbol.toStringTag,{value:"Module"}));function It(r){return Object.entries(r).map(([t,e])=>{customElements.get(t)||customElements.define(t,e)}),customElements}var fr=Object.defineProperty,mr=Object.getOwnPropertyDescriptor,gr=(r,t,e,s)=>{for(var i=mr(t,e),n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&fr(t,e,i),i};class Hs extends q{constructor(t){super(),this._pending=[],this._observer=new G(this,t)}get model(){return this._lastModel=this._context?this._context.value:{},this._lastModel}connectedCallback(){var t;super.connectedCallback(),(t=this._observer)==null||t.observe().then(e=>{console.log("View effect (initial)",this,e),this._context=e.context,this._pending.length&&this._pending.forEach(([s,i])=>{console.log("Dispatching queued event",i,s),s.dispatchEvent(i)}),e.setEffect(()=>{var s;if(console.log("View effect",this,e,(s=this._context)==null?void 0:s.value),this._context)console.log("requesting update"),this.requestUpdate();else throw"View context not ready for effect"})})}dispatchMessage(t,e=this){const s=new CustomEvent("mu:message",{bubbles:!0,composed:!0,detail:t});this._context?(console.log("Dispatching message event",s),e.dispatchEvent(s)):(console.log("Queueing message event",s),this._pending.push([e,s]))}ref(t){return this.model?this.model[t]:void 0}}gr([ws()],Hs.prototype,"model");/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wt=globalThis,me=wt.ShadowRoot&&(wt.ShadyCSS===void 0||wt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ge=Symbol(),Ve=new WeakMap;let Is=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==ge)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(me&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Ve.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Ve.set(e,t))}return t}toString(){return this.cssText}};const yr=r=>new Is(typeof r=="string"?r:r+"",void 0,ge),T=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new Is(e,r,ge)},_r=(r,t)=>{if(me)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=wt.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},Be=me?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return yr(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:vr,defineProperty:$r,getOwnPropertyDescriptor:br,getOwnPropertyNames:Ar,getOwnPropertySymbols:Er,getPrototypeOf:Sr}=Object,k=globalThis,qe=k.trustedTypes,wr=qe?qe.emptyScript:"",Jt=k.reactiveElementPolyfillSupport,ct=(r,t)=>r,kt={toAttribute(r,t){switch(t){case Boolean:r=r?wr:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},ye=(r,t)=>!vr(r,t),We={attribute:!0,type:String,converter:kt,reflect:!1,hasChanged:ye};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),k.litPropertyMetadata??(k.litPropertyMetadata=new WeakMap);class B extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=We){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&$r(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=br(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return i==null?void 0:i.call(this)},set(o){const l=i==null?void 0:i.call(this);n.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??We}static _$Ei(){if(this.hasOwnProperty(ct("elementProperties")))return;const t=Sr(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ct("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ct("properties"))){const e=this.properties,s=[...Ar(e),...Er(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Be(i))}else t!==void 0&&e.push(Be(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return _r(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var n;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:kt).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){var n;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const o=s.getPropertyOptions(i),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((n=o.converter)==null?void 0:n.fromAttribute)!==void 0?o.converter:kt;this._$Em=i,this[i]=l.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??ye)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],o)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(e)):this._$EU()}catch(i){throw t=!1,this._$EU(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}B.elementStyles=[],B.shadowRootOptions={mode:"open"},B[ct("elementProperties")]=new Map,B[ct("finalized")]=new Map,Jt==null||Jt({ReactiveElement:B}),(k.reactiveElementVersions??(k.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ht=globalThis,Tt=ht.trustedTypes,Ye=Tt?Tt.createPolicy("lit-html",{createHTML:r=>r}):void 0,zs="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,Ds="?"+O,xr=`<${Ds}>`,I=document,ft=()=>I.createComment(""),mt=r=>r===null||typeof r!="object"&&typeof r!="function",Fs=Array.isArray,Pr=r=>Fs(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",Kt=`[ 	
\f\r]`,ot=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ge=/-->/g,Je=/>/g,L=RegExp(`>|${Kt}(?:([^\\s"'>=/]+)(${Kt}*=${Kt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ke=/'/g,Ze=/"/g,Vs=/^(?:script|style|textarea|title)$/i,Cr=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),b=Cr(1),Q=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),Qe=new WeakMap,j=I.createTreeWalker(I,129);function Bs(r,t){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ye!==void 0?Ye.createHTML(t):t}const Or=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":"",o=ot;for(let l=0;l<e;l++){const a=r[l];let p,f,u=-1,c=0;for(;c<a.length&&(o.lastIndex=c,f=o.exec(a),f!==null);)c=o.lastIndex,o===ot?f[1]==="!--"?o=Ge:f[1]!==void 0?o=Je:f[2]!==void 0?(Vs.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=L):f[3]!==void 0&&(o=L):o===L?f[0]===">"?(o=i??ot,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,p=f[1],o=f[3]===void 0?L:f[3]==='"'?Ze:Ke):o===Ze||o===Ke?o=L:o===Ge||o===Je?o=ot:(o=L,i=void 0);const h=o===L&&r[l+1].startsWith("/>")?" ":"";n+=o===ot?a+xr:u>=0?(s.push(p),a.slice(0,u)+zs+a.slice(u)+O+h):a+O+(u===-2?l:h)}return[Bs(r,n+(r[e]||"<?>")+(t===2?"</svg>":"")),s]};class gt{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[p,f]=Or(t,e);if(this.el=gt.createElement(p,s),j.currentNode=this.el.content,e===2){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=j.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(zs)){const c=f[o++],h=i.getAttribute(u).split(O),d=/([.?@])?(.*)/.exec(c);a.push({type:1,index:n,name:d[2],strings:h,ctor:d[1]==="."?Tr:d[1]==="?"?Rr:d[1]==="@"?Ur:zt}),i.removeAttribute(u)}else u.startsWith(O)&&(a.push({type:6,index:n}),i.removeAttribute(u));if(Vs.test(i.tagName)){const u=i.textContent.split(O),c=u.length-1;if(c>0){i.textContent=Tt?Tt.emptyScript:"";for(let h=0;h<c;h++)i.append(u[h],ft()),j.nextNode(),a.push({type:2,index:++n});i.append(u[c],ft())}}}else if(i.nodeType===8)if(i.data===Ds)a.push({type:2,index:n});else{let u=-1;for(;(u=i.data.indexOf(O,u+1))!==-1;)a.push({type:7,index:n}),u+=O.length-1}n++}}static createElement(t,e){const s=I.createElement("template");return s.innerHTML=t,s}}function X(r,t,e=r,s){var o,l;if(t===Q)return t;let i=s!==void 0?(o=e._$Co)==null?void 0:o[s]:e._$Cl;const n=mt(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=X(r,i._$AS(r,t.values),i,s)),t}class kr{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??I).importNode(e,!0);j.currentNode=i;let n=j.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let p;a.type===2?p=new bt(n,n.nextSibling,this,t):a.type===1?p=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(p=new Nr(n,this,t)),this._$AV.push(p),a=s[++l]}o!==(a==null?void 0:a.index)&&(n=j.nextNode(),o++)}return j.currentNode=I,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class bt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),mt(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==Q&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Pr(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==$&&mt(this._$AH)?this._$AA.nextSibling.data=t:this.T(I.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=gt.createElement(Bs(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(e);else{const o=new kr(i,this),l=o.u(this.options);o.p(e),this.T(l),this._$AH=o}}_$AC(t){let e=Qe.get(t.strings);return e===void 0&&Qe.set(t.strings,e=new gt(t)),e}k(t){Fs(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new bt(this.S(ft()),this.S(ft()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class zt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=$}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=X(this,t,e,0),o=!mt(t)||t!==this._$AH&&t!==Q,o&&(this._$AH=t);else{const l=t;let a,p;for(t=n[0],a=0;a<n.length-1;a++)p=X(this,l[s+a],e,a),p===Q&&(p=this._$AH[a]),o||(o=!mt(p)||p!==this._$AH[a]),p===$?t=$:t!==$&&(t+=(p??"")+n[a+1]),this._$AH[a]=p}o&&!i&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Tr extends zt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}}class Rr extends zt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}}class Ur extends zt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??$)===Q)return;const s=this._$AH,i=t===$&&s!==$||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==$&&(s===$||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Nr{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const Zt=ht.litHtmlPolyfillSupport;Zt==null||Zt(gt,bt),(ht.litHtmlVersions??(ht.litHtmlVersions=[])).push("3.1.3");const Lr=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new bt(t.insertBefore(ft(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class x extends B{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Lr(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return Q}}var Xe;x._$litElement$=!0,x.finalized=!0,(Xe=globalThis.litElementHydrateSupport)==null||Xe.call(globalThis,{LitElement:x});const Qt=globalThis.litElementPolyfillSupport;Qt==null||Qt({LitElement:x});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.5");const Mr={};function jr(r,t,e){switch(r[0]){case"profile/save":Hr(r[1],e).then(i=>t(n=>({...n,profile:i}))).then(()=>{const{onSuccess:i}=r[1];i&&i()}).catch(i=>{const{onFailure:n}=r[1];n&&n(i)});break;case"profile/select":Ir(r[1],e).then(i=>t(n=>({...n,profile:i})));break;case"group/select":zr(r[1],e).then(i=>t(n=>({...n,group:i})));break;default:const s=r[0];throw new Error(`Unhandled Auth message "${s}"`)}}function Hr(r,t){return fetch(`/api/profiles/${r.id}`,{method:"PUT",headers:{"Content-Type":"application/json",...Mt.headers(t)},body:JSON.stringify(r.profile)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return e})}function Ir(r,t){return fetch(`/api/profiles/${r.id}`,{headers:Mt.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return console.log("Profile:",e),e})}function zr(r,t){return fetch(`/api/groups/${r.id}`,{headers:Mt.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return console.log("Group:",e),e})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Dr=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Fr={attribute:!0,type:String,converter:kt,reflect:!1,hasChanged:ye},Vr=(r=Fr,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.P(o,void 0,r),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function S(r){return(t,e)=>typeof e=="object"?Vr(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,o?{...s,wrapped:!0}:s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Br(r){return S({...r,state:!0,attribute:!1})}var qr=Object.defineProperty,Wr=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&qr(t,e,i),i};const Nt=class Nt extends x{constructor(){super(...arguments),this.username="anonymous",this._authObserver=new G(this,"festivous:auth")}render(){return b`
    <header>
        <nav class='nav'>
            <a href="/" class="logo">FESTIVOUS</a>
            <a href="/festival.html">FESTIVALS</a>
            <a href="/rendezvous.html">RENDEZVOUS</a>
            <a href="/group.html">GROUPS</a>
            <drop-down class="right">
                <a name="greeting" slot="actuator"
                    >HELLO, ${this.username}</a>
                <ul>
                    <li>
                    <label @change=${Yr}>
                        <input type="checkbox" autocomplete="off" />
                        LIGHT MODE
                    </label>
                    </li>
                <li><a href="/app/profile/${this.username}">PROFILE</a></li>
                <li><a href="#" @click=${Gr}>SIGN OUT</a></li>
                </ul>
            </drop-down>
        </nav>
    </header>
    `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&(this.username=t.username)})}};Nt.uses=It({"drop-down":hr.Element}),Nt.styles=T`
        :host {
            display: contents;
        }
        .nav{
            display: block;
            a, drop-down {
                padding: var(--body-margin);
                font-family: "Pontano Sans", sans-serif;
                text-decoration: none;
                color: var(--color-font-primary);
                font-weight: var(--font-weight-body);
                font-size: var(--font-size-med);
                cursor: pointer;
            }
            .logo {
                font-family: "Prompt", sans-serif;
                font-weight: var(--font-weight-xlarge);
                font-size: var(--font-size-large);
            }
            .right{
                float: right;
                margin-top: var(--margin-size-neg);
            }
        }
    `;let Rt=Nt;Wr([S()],Rt.prototype,"username");function Yr(r){const e=r.target.checked;as.relay(r,"light-mode",{checked:e}),document.body.classList.toggle("light-mode",e)}function Gr(r){as.relay(r,"auth:message",["auth/signout"])}var Jr=Object.defineProperty,_e=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&Jr(t,e,i),i};const ve=class ve extends x{constructor(){super(...arguments),this.color="white"}render(){return b`
      <div
        class="avatar"
        style="
        ${this.color?`--avatar-backgroundColor: ${this.color};`:""}
        ${this.src?`background-image: url('${this.src}');`:""}
      ">
        ${this.src?"":this.initial||""}
      </div>
    `}};ve.styles=T`
    :host {
      display: contents;
      --avatar-backgroundColor: var(--color-accent);
      --avatar-size: 100px;
    }
    .avatar {
      grid-column: key;
      justify-self: end;
      position: relative;
      width: var(--avatar-size);
      aspect-ratio: 1;
      background-color: var(--avatar-backgroundColor);
      background-size: cover;
      border-radius: 50%;
      text-align: center;
      line-height: var(--avatar-size);
      font-size: calc(0.66 * var(--avatar-size));
      font-family: var(--font-family-display);
      color: var(--color-link-inverted);
      overflow: hidden;
    }
  `;let tt=ve;_e([S()],tt.prototype,"color");_e([S()],tt.prototype,"src");_e([S()],tt.prototype,"initial");var Kr=Object.defineProperty,Zr=Object.getOwnPropertyDescriptor,st=(r,t,e,s)=>{for(var i=s>1?void 0:s?Zr(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&Kr(t,e,i),i};const qs=T`
    slot[name="avatar"] {
      display: block;
      grid-row: 1 / span 4;
    }
    nav {
      display: contents;
      text-align: right;
    }
    nav > * {
      grid-column: controls;
    }
  `,$e=class $e extends x{render(){return console.log(this.username),b`
        <section>
          <slot name="avatar"></slot>
          <h1><slot name="name"></slot></h1>
          <nav>
            <a href="${this.username}/edit" class="edit">Edit</a>
          </nav>
          <dl>
            <dt>Username</dt>
            <dd><slot name="id"></slot></dd>
            <dt>Email</dt>
            <dd><slot name="email"></slot></dd>
            <dt>Address</dt>
            <dd><slot name="address"></slot></dd>
          </dl>
        </section>
      `}};$e.styles=[qs,T`
        * {
          margin: 0;
          box-sizing: border-box;
        }
        section {
          display: grid;
          grid-template-columns: [key] 1fr [value] 3fr [controls] 1fr [end];
          gap: var(--size-spacing-medium)
            var(--size-spacing-xlarge);
          align-items: end;
        }
        h1 {
          grid-row: 4;
          grid-column: value;
        }
        dl {
          display: grid;
          grid-column: key / end;
          grid-template-columns: subgrid;
          gap: 0 var(--size-spacing-xlarge);
          align-items: baseline;
        }
        dt {
          grid-column: key;
          justify-self: end;
          color: var(--color-accent);
          font-family: var(--font-family-display);
        }
        dd {
          grid-column: value;
        }
        ::slotted(ul) {
          list-style: none;
          display: flex;
          gap: var(--size-spacing-medium);
        }
      `];let Ut=$e;st([S()],Ut.prototype,"username",2);const Lt=class Lt extends x{render(){return b`
        <section>
          <slot name="avatar"></slot>
          <h1><slot name="name"></slot></h1>
          <nav>
            <a class="close" href="../profile">Close</a>
            <button class="delete">Delete</button>
          </nav>
          <mu-form .init=${this.init}>
            <label>
              <span>Username</span>
              <input disabled name="id" />
            </label>
            <label>
              <span>Name</span>
              <input name="name" />
            </label>
            <label>
              <span>Email</span>
              <input name="email" />
            </label>
            <label>
              <span>Address</span>
              <input name="address" />
            </label>
            <label>
              <span>Avatar</span>
              <input name="avatar" />
            </label>
          </mu-form>
        </section>
      `}};Lt.uses=It({"mu-form":di.Element,"input-array":pr.Element}),Lt.styles=[qs,T`
        mu-form {
          grid-column: key / end;
        }
        mu-form input {
          grid-column: input;
        }
      `];let yt=Lt;st([S()],yt.prototype,"username",2);st([S({attribute:!1})],yt.prototype,"init",2);const be=class be extends Hs{constructor(){super("festivous:model"),this.edit=!1,this.userid="",this.addEventListener("mu-form:submit",t=>this._handleSubmit(t)),console.log(this.userid)}get profile(){return this.model.profile}attributeChangedCallback(t,e,s){super.attributeChangedCallback(t,e,s),t==="user-id"&&e!==s&&s&&(console.log("Profiler Page:",s),this.dispatchMessage(["profile/select",{id:s}]))}render(){const{avatar:t,name:e,id:s,address:i}=this.profile||{},n=(e||s||"?").slice(0,1),o=b`
        <profile-avatar
          slot="avatar"
          src=${t}
          initial=${n}></profile-avatar>
      `;return console.log(s),this.edit?b`
            <profile-editor
              username=${s}
              .init=${this.profile}
              @mu-form:submit=${l=>this._handleSubmit(l)}>
              ${o}
            </profile-editor>
          `:b`
            <profile-viewer username=${s}>
              ${o}
              <span slot="name">${e}</span>
              <span slot="userid">${s}</span>
              <span slot="address">${i}</span>
            </profile-viewer>
          `}_handleSubmit(t){console.log("Handling submit of mu-form"),this.dispatchMessage(["profile/save",{id:this.id,profile:t.detail,onSuccess:()=>ds.dispatch(this,"history/navigate",{href:`/app/profile/${this.id}`}),onFailure:e=>console.log("ERROR:",e)}])}};be.uses=It({"profile-viewer":Ut,"profile-editor":yt,"profile-avatar":tt});let et=be;st([S({type:Boolean,reflect:!0})],et.prototype,"edit",2);st([S({attribute:"user-id",reflect:!0})],et.prototype,"userid",2);st([Br()],et.prototype,"profile",1);var Qr=Object.defineProperty,Xr=Object.getOwnPropertyDescriptor,Dt=(r,t,e,s)=>{for(var i=s>1?void 0:s?Xr(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&Qr(t,e,i),i};let _t=class extends x{constructor(){super(...arguments),this.groups=[]}connectedCallback(){super.connectedCallback(),this.fetchGroups()}async fetchGroups(){try{const r=await fetch("/api/groups");this.groups=await r.json()}catch(r){console.error("Error fetching groups:",r)}}render(){return b`
      <ul>
        ${this.groups.map(r=>b`
          <li>
            <span>${r.name}</span>
            <a href="/group/${r.id}/edit">Edit</a>
          </li>
        `)}
      </ul>
    `}};_t.styles=T`
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      margin: 0.5em 0;
      padding: 0.5em;
      border: 1px solid #ccc;
    }
  `;Dt([S({type:Array})],_t.prototype,"groups",2);_t=Dt([Dr("group-list")],_t);const Ae=class Ae extends x{connectedCallback(){super.connectedCallback(),this.fetchGroup()}async fetchGroup(){const t=window.location.pathname.split("/").pop();try{const e=await fetch(`/api/groups/${t}`);this.group=await e.json()}catch(e){console.error("Error fetching group:",e)}}async handleSubmit(t){if(t.preventDefault(),!!this.group)try{(await fetch(`/api/groups/${this.group.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.group)})).ok?alert("Group updated successfully"):alert("Error updating group")}catch(e){console.error("Error updating group:",e)}}handleInputChange(t){const e=t.target;if(this.group)if(e.name==="people")try{const s=JSON.parse(e.value);this.group.people=s}catch(s){console.error("Invalid format for people field:",s)}else e.name==="id"?this.group.id=e.value:e.name==="name"&&(this.group.name=e.value)}render(){return this.group?b`
        <form @submit=${this.handleSubmit}>
          <label>
            Name:
            <input name="name" .value=${this.group.name||""} @input=${this.handleInputChange} />
          </label>
          <button type="submit">Save</button>
        </form>
      `:b`<p>Loading...</p>`}};Ae.styles=T`
      form {
        display: flex;
        flex-direction: column;
      }
      label {
        margin-bottom: 0.5em;
      }
      input, button {
        margin-bottom: 1em;
      }
    `;let re=Ae;Dt([S({type:Object})],re.prototype,"group",2);const Ee=class Ee extends x{constructor(){super(...arguments),this.name=""}handleInputChange(t){const e=t.target;this.name=e.value}async handleSubmit(t){t.preventDefault();try{(await fetch("/api/groups",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:this.name})})).ok?(alert("Group added successfully"),this.name=""):alert("Error adding group")}catch(e){console.error("Error adding group:",e)}}render(){return b`
        <form @submit=${this.handleSubmit}>
            <label>
            Name:
            <input name="name" .value=${this.name} @input=${this.handleInputChange} />
            </label>
            <button type="submit">Add Group</button>
        </form>
        `}};Ee.styles=T`
        form {
        display: flex;
        flex-direction: column;
        }
        label {
        margin-bottom: 0.5em;
        }
        input, button {
        margin-bottom: 1em;
        }
    `;let ne=Ee;Dt([S({type:String})],ne.prototype,"name",2);const tn=[{path:"/app/profile/:id/edit",view:r=>b`
      <profile-view edit user-id=${r.id}></profile-view>
    `},{path:"/app/profile/:id",view:r=>b`
      <profile-view user-id=${r.id}></profile-view>
    `},{path:"/app",view:()=>b`
      <landing-view></landing-view>
    `},{path:"/",redirect:"/app"}];It({"mu-history":ds.Provider,"mu-switch":class extends lr.Element{constructor(){super(tn,"festivous:history")}},"mu-auth":Mt.Provider,"mu-store":class extends vi.Provider{constructor(){super(jr,Mr,"festivous:auth")}},"nav-header":Rt,"profile-view":et,"group-view":_t});export{Rt as N,Mt as a,It as d,as as e,en as r,x as s,b as x};
