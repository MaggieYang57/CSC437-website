import{a as b,u as G,f as L,s as u,O as M,d as y,b as A,x as n,i as c,e as k,c as N,g as R,V as F,h as D,j as J,_ as q}from"./lit-element-QqaPSkLF.js";const B={};function Z(r,t,e){switch(console.log("MESSAGE"),console.log(r),r[0]){case"profile/save":H(r[1],e).then(a=>t(o=>({...o,profile:a}))).then(()=>{const{onSuccess:a}=r[1];a&&a()}).catch(a=>{const{onFailure:o}=r[1];o&&o(a)});break;case"profile/select":K(r[1],e).then(a=>t(o=>({...o,profile:a})));break;case"group/select":Q(r[1],e).then(a=>t(o=>({...o,group:a})));break;default:const s=r[0];throw new Error(`Unhandled Auth message "${s}"`)}}function H(r,t){return fetch(`/api/profiles/${r.profile.id}`,{method:"PUT",headers:{"Content-Type":"application/json",...b.headers(t)},body:JSON.stringify(r.profile)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return e})}function K(r,t){return fetch(`/api/profiles/${r.id}`,{headers:b.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return console.log("Profile:",e),e})}function Q(r,t){return fetch(`/api/groups/user/${r.id}`,{headers:b.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return console.log("Group:",e),e})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const W=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const X={attribute:!0,type:String,converter:G,reflect:!1,hasChanged:L},Y=(r=X,t,e)=>{const{kind:s,metadata:a}=e;let o=globalThis.litPropertyMetadata.get(a);if(o===void 0&&globalThis.litPropertyMetadata.set(a,o=new Map),o.set(e.name,r),s==="accessor"){const{name:i}=e;return{set(p){const x=t.get.call(this);t.set.call(this,p),this.requestUpdate(i,x,r)},init(p){return p!==void 0&&this.P(i,void 0,r),p}}}if(s==="setter"){const{name:i}=e;return function(p){const x=this[i];t.call(this,p),this.requestUpdate(i,x,r)}}throw Error("Unsupported decorator location: "+s)};function l(r){return(t,e)=>typeof e=="object"?Y(r,t,e):((s,a,o)=>{const i=a.hasOwnProperty(o);return a.constructor.createProperty(o,i?{...s,wrapped:!0}:s),i?Object.getOwnPropertyDescriptor(a,o):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function V(r){return l({...r,state:!0,attribute:!1})}var ee=Object.defineProperty,te=(r,t,e,s)=>{for(var a=void 0,o=r.length-1,i;o>=0;o--)(i=r[o])&&(a=i(t,e,a)||a);return a&&ee(t,e,a),a};const w=class w extends u{constructor(){super(...arguments),this.username="anonymous",this._authObserver=new M(this,"festivous:auth")}render(){return n`
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
                    <label @change=${re}>
                        <input type="checkbox" autocomplete="off" />
                        LIGHT MODE
                    </label>
                    </li>
                <li><a href="/app/profile/${this.username}">PROFILE</a></li>
                <li><a href="#" @click=${ae}>SIGN OUT</a></li>
                </ul>
            </drop-down>
        </nav>
    </header>
    `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&(this.username=t.username)})}};w.uses=y({"drop-down":A.Element}),w.styles=c`
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
    `;let m=w;te([l()],m.prototype,"username");function re(r){const e=r.target.checked;k.relay(r,"light-mode",{checked:e}),document.body.classList.toggle("light-mode",e)}function ae(r){k.relay(r,"auth:message",["auth/signout"])}var se=Object.defineProperty,z=(r,t,e,s)=>{for(var a=void 0,o=r.length-1,i;o>=0;o--)(i=r[o])&&(a=i(t,e,a)||a);return a&&se(t,e,a),a};const _=class _ extends u{constructor(){super(...arguments),this.color="white"}render(){return n`
      <div
        class="avatar"
        style="
        ${this.color?`--avatar-backgroundColor: ${this.color};`:""}
        ${this.src?`background-image: url('${this.src}');`:""}
      ">
        ${this.src?"":this.initial||""}
      </div>
    `}};_.styles=c`
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
  `;let d=_;z([l()],d.prototype,"color");z([l()],d.prototype,"src");z([l()],d.prototype,"initial");var oe=Object.defineProperty,ie=Object.getOwnPropertyDescriptor,f=(r,t,e,s)=>{for(var a=s>1?void 0:s?ie(t,e):t,o=r.length-1,i;o>=0;o--)(i=r[o])&&(a=(s?i(t,e,a):i(a))||a);return s&&a&&oe(t,e,a),a};const I=c`
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
  `,j=class j extends u{render(){return console.log(this.username),n`
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
      `}};j.styles=[I,c`
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
      `];let $=j;f([l()],$.prototype,"username",2);const O=class O extends u{render(){return n`
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
      `}};O.uses=y({"mu-form":N.Element,"input-array":R.Element}),O.styles=[I,c`
        mu-form {
          grid-column: key / end;
        }
        mu-form input {
          grid-column: input;
        }
      `];let g=O;f([l()],g.prototype,"username",2);f([l({attribute:!1})],g.prototype,"init",2);const E=class E extends F{constructor(){super("festivous:model"),this.edit=!1,this.userid="",this.addEventListener("mu-form:submit",t=>this._handleSubmit(t))}get profile(){return this.model.profile}attributeChangedCallback(t,e,s){super.attributeChangedCallback(t,e,s),t==="user-id"&&e!==s&&s&&(console.log("Profiler Page:",s),this.dispatchMessage(["profile/select",{id:s}]))}render(){const{avatar:t,name:e,id:s,address:a}=this.profile||{},o=(e||s||"?").slice(0,1),i=n`
        <profile-avatar
          slot="avatar"
          src=${t}
          initial=${o}></profile-avatar>
      `;return console.log(s),this.edit?n`
            <profile-editor
              username=${s}
              .init=${this.profile}
              @mu-form:submit=${p=>this._handleSubmit(p)}>
              ${i}
            </profile-editor>
          `:n`
            <profile-viewer username=${s}>
              ${i}
              <span slot="name">${e}</span>
              <span slot="userid">${s}</span>
              <span slot="address">${a}</span>
            </profile-viewer>
          `}_handleSubmit(t){console.log("Handling submit of mu-form"),this.dispatchMessage(["profile/save",{id:this.id,profile:t.detail,onSuccess:()=>D.dispatch(this,"history/navigate",{href:`/app/profile/${t.detail.id}`}),onFailure:e=>console.log("ERROR:",e)}])}};E.uses=y({"profile-viewer":$,"profile-editor":g,"profile-avatar":d});let h=E;f([l({type:Boolean,reflect:!0})],h.prototype,"edit",2);f([l({attribute:"user-id",reflect:!0})],h.prototype,"userid",2);f([V()],h.prototype,"profile",1);var ne=Object.defineProperty,le=Object.getOwnPropertyDescriptor,S=(r,t,e,s)=>{for(var a=s>1?void 0:s?le(t,e):t,o=r.length-1,i;o>=0;o--)(i=r[o])&&(a=(s?i(t,e,a):i(a))||a);return s&&a&&ne(t,e,a),a};let v=class extends u{constructor(){super(...arguments),this.groups=[]}connectedCallback(){super.connectedCallback(),this.fetchGroups()}async fetchGroups(){try{const r=await fetch("/api/groups");this.groups=await r.json()}catch(r){console.error("Error fetching groups:",r)}}render(){return n`
      <ul>
        ${this.groups.map(r=>n`
          <li>
            <span>${r.name}</span>
            <a href="/group/${r.id}/edit">Edit</a>
          </li>
        `)}
      </ul>
    `}};v.styles=c`
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      margin: 0.5em 0;
      padding: 0.5em;
      border: 1px solid #ccc;
    }
  `;S([l({type:Array})],v.prototype,"groups",2);v=S([W("group-list")],v);const U=class U extends u{connectedCallback(){super.connectedCallback(),this.fetchGroup()}async fetchGroup(){const t=window.location.pathname.split("/").pop();try{const e=await fetch(`/api/groups/${t}`);this.group=await e.json()}catch(e){console.error("Error fetching group:",e)}}async handleSubmit(t){if(t.preventDefault(),!!this.group)try{(await fetch(`/api/groups/${this.group.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.group)})).ok?alert("Group updated successfully"):alert("Error updating group")}catch(e){console.error("Error updating group:",e)}}handleInputChange(t){const e=t.target;if(this.group)if(e.name==="people")try{const s=JSON.parse(e.value);this.group.people=s}catch(s){console.error("Invalid format for people field:",s)}else e.name==="id"?this.group.id=e.value:e.name==="name"&&(this.group.name=e.value)}render(){return this.group?n`
        <form @submit=${this.handleSubmit}>
          <label>
            Name:
            <input name="name" .value=${this.group.name||""} @input=${this.handleInputChange} />
          </label>
          <button type="submit">Save</button>
        </form>
      `:n`<p>Loading...</p>`}};U.styles=c`
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
    `;let C=U;S([l({type:Object})],C.prototype,"group",2);const T=class T extends u{constructor(){super(...arguments),this.name=""}handleInputChange(t){const e=t.target;this.name=e.value}async handleSubmit(t){t.preventDefault();try{(await fetch("/api/groups",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:this.name})})).ok?(alert("Group added successfully"),this.name=""):alert("Error adding group")}catch(e){console.error("Error adding group:",e)}}render(){return n`
        <form @submit=${this.handleSubmit}>
            <label>
            Name:
            <input name="name" .value=${this.name} @input=${this.handleInputChange} />
            </label>
            <button type="submit">Add Group</button>
        </form>
        `}};T.styles=c`
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
    `;let P=T;S([l({type:String})],P.prototype,"name",2);const pe=[{path:"/app/profile/:id/edit",view:r=>n`
      <profile-view edit user-id=${r.id}></profile-view>
    `},{path:"/app/profile/:id",view:r=>n`
      <profile-view user-id=${r.id}></profile-view>
    `},{path:"/app/profile/anonymous",redirect:"/login.html"},{path:"/app/profile/login.html",redirect:"/login.html"},{path:"/app",view:()=>n`
      <landing-view></landing-view>
    `},{path:"/",redirect:"/app"}];y({"mu-auth":b.Provider,"mu-store":class extends J.Provider{constructor(){super(Z,B,"festivous:auth")}},"mu-history":D.Provider,"mu-switch":class extends q.Element{constructor(){super(pe,"festivous:history","festivous:auth")}},"nav-header":m,"profile-view":h,"group-view":v});y({"mu-auth":b.Provider,"nav-header":m});window.relayEvent=k.relay;
