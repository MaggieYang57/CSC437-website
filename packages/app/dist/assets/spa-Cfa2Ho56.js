import{a as y,u as L,f as M,s as h,O as T,d as m,b as A,x as n,i as k,e as C,c as R,g as G,V as q,h as D,j as B,_ as N}from"./lit-element-QqaPSkLF.js";const J={};function Z(a,e,t){switch(console.log("MESSAGE"),console.log(a),a[0]){case"profile/save":H(a[1],t).then(r=>e(i=>({...i,profile:r}))).then(()=>{const{onSuccess:r}=a[1];r&&r()}).catch(r=>{const{onFailure:i}=a[1];i&&i(r)});break;case"profile/select":K(a[1],t).then(r=>e(i=>({...i,profile:r})));break;case"group/select":Q(a[1],t).then(r=>e(i=>({...i,group:r})));break;default:const o=a[0];throw new Error(`Unhandled Auth message "${o}"`)}}function H(a,e){return fetch(`/api/profiles/${a.profile.id}`,{method:"PUT",headers:{"Content-Type":"application/json",...y.headers(e)},body:JSON.stringify(a.profile)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return t})}function K(a,e){return fetch(`/api/profiles/${a.id}`,{headers:y.headers(e)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Profile:",t),t})}function Q(a,e){return fetch(`/api/groups/user/${a.id}`,{headers:y.headers(e)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Group:",t),t})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const W={attribute:!0,type:String,converter:L,reflect:!1,hasChanged:M},X=(a=W,e,t)=>{const{kind:o,metadata:r}=t;let i=globalThis.litPropertyMetadata.get(r);if(i===void 0&&globalThis.litPropertyMetadata.set(r,i=new Map),i.set(t.name,a),o==="accessor"){const{name:s}=t;return{set(d){const v=e.get.call(this);e.set.call(this,d),this.requestUpdate(s,v,a)},init(d){return d!==void 0&&this.P(s,void 0,a),d}}}if(o==="setter"){const{name:s}=t;return function(d){const v=this[s];e.call(this,d),this.requestUpdate(s,v,a)}}throw Error("Unsupported decorator location: "+o)};function l(a){return(e,t)=>typeof t=="object"?X(a,e,t):((o,r,i)=>{const s=r.hasOwnProperty(i);return r.constructor.createProperty(i,s?{...o,wrapped:!0}:o),s?Object.getOwnPropertyDescriptor(r,i):void 0})(a,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function E(a){return l({...a,state:!0,attribute:!1})}var Y=Object.defineProperty,V=(a,e,t,o)=>{for(var r=void 0,i=a.length-1,s;i>=0;i--)(s=a[i])&&(r=s(e,t,r)||r);return r&&Y(e,t,r),r};const $=class $ extends h{constructor(){super(...arguments),this.username="anonymous",this._authObserver=new T(this,"festivous:auth")}render(){return n`
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
                    <label @change=${tt}>
                        <input type="checkbox" autocomplete="off" />
                        LIGHT MODE
                    </label>
                    </li>
                <li><a href="/app/profile/${this.username}">PROFILE</a></li>
                <li><a href="#" @click=${et}>SIGN OUT</a></li>
                </ul>
            </drop-down>
        </nav>
    </header>
    `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:e})=>{e&&(this.username=e.username)})}};$.uses=m({"drop-down":A.Element}),$.styles=k`
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
    `;let g=$;V([l()],g.prototype,"username");function tt(a){const t=a.target.checked;C.relay(a,"light-mode",{checked:t}),document.body.classList.toggle("light-mode",t)}function et(a){C.relay(a,"auth:message",["auth/signout"])}var rt=Object.defineProperty,S=(a,e,t,o)=>{for(var r=void 0,i=a.length-1,s;i>=0;i--)(s=a[i])&&(r=s(e,t,r)||r);return r&&rt(e,t,r),r};const P=class P extends h{constructor(){super(...arguments),this.color="white"}render(){return n`
      <div
        class="avatar"
        style="
        ${this.color?`--avatar-backgroundColor: ${this.color};`:""}
        ${this.src?`background-image: url('${this.src}');`:""}
      ">
        ${this.src?"":this.initial||""}
      </div>
    `}};P.styles=k`
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
  `;let p=P;S([l()],p.prototype,"color");S([l()],p.prototype,"src");S([l()],p.prototype,"initial");var at=Object.defineProperty,it=Object.getOwnPropertyDescriptor,f=(a,e,t,o)=>{for(var r=o>1?void 0:o?it(e,t):e,i=a.length-1,s;i>=0;i--)(s=a[i])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&at(e,t,r),r};const F=k`
    * {
        margin: 0;
        box-sizing: border-box;
    }
    section {
        display: grid;
        grid-template-columns: [key] 1fr [value] 3fr [controls] 1fr [end];
        gap: var(--margin-size-small) var(--margin-size-med);
        align-items: end;
        margin: var(--margin-size-med);
    }
    h1 {
        grid-row: 4;
        grid-column: value;
    }
    slot[name="avatar"] {
        display: block;
        grid-row: 1/ span 4;
    }
    nav {
        grid-column: 3;
        grid-row: 3;
        display: grid;
        text-align: right;
        margin-top: var(--margin-size-med);
    }
    nav > a {
        border-radius: var(--border-radius-large);
        border-width: var(--line-width);
        border-style: solid;
        border-color: var(--color-font-primary);
        background-color: transparent;
        padding: var(--button-padding);
        box-shadow: none;
        margin-top: var(--margin-size-small);
        font-size: var(--font-size-body);
        color: var(--color-font-primary);
        transition: var(--transition-default);
        text-decoration: none;
        text-align: center;
    }
    nav > a:hover {
        background-color: var(--color-font-primary);
        color: var(--color-background-primary);
        border-color: var(--color-background-primary);
    }
    nav > * {
        grid-column: controls;
    }
    mu-form {
        grid-column: key / end;
        margin: 0;
    }
    dl {
        display: grid;
        grid-column: key / end;
        grid-template-columns: subgrid;
        gap: 0 var(--margin-size-med);
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
        gap: var(--margin-size-small);
    }
    `,I=class I extends h{render(){return console.log(this.username),n`
        <section>
          <slot name="avatar"></slot>
          <h1><slot name="name"></slot></h1>
          <dl>
            <dt>Username</dt>
            <dd><slot name="id"></slot></dd>
            <dt>Email</dt>
            <dd><slot name="email"></slot></dd>
            <dt>Address</dt>
            <dd><slot name="address"></slot></dd>
          </dl>
          <nav>
            <a href="${this.username}/edit" class="edit">Edit</a>
        </nav>
        </section>
      `}};I.styles=[F];let w=I;f([l()],w.prototype,"username",2);const x=class x extends h{render(){return n`
        <section>
          <slot name="avatar"></slot>
          <h1><slot name="name"></slot></h1>
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
          <nav>
            <a class="close" href="../${this.username}">Close</a>
          </nav>
        </section>
      `}};x.uses=m({"mu-form":R.Element,"input-array":G.Element}),x.styles=[F];let b=x;f([l()],b.prototype,"username",2);f([l({attribute:!1})],b.prototype,"init",2);const _=class _ extends q{constructor(){super("festivous:model"),this.edit=!1,this.userid="",this.addEventListener("mu-form:submit",e=>this._handleSubmit(e))}get profile(){return this.model.profile}attributeChangedCallback(e,t,o){super.attributeChangedCallback(e,t,o),e==="user-id"&&t!==o&&o&&(console.log("Profiler Page:",o),this.dispatchMessage(["profile/select",{id:o}]))}render(){const{avatar:e,name:t,id:o,email:r,address:i}=this.profile||{},s=(t||o||"?").slice(0,1),d=n`
        <profile-avatar
          slot="avatar"
          src=${e}
          initial=${s}></profile-avatar>
      `;return console.log(o),this.edit?n`
            <profile-editor
              username=${o}
              .init=${this.profile}
              @mu-form:submit=${v=>this._handleSubmit(v)}>
              ${d}
            </profile-editor>
          `:n`
            <profile-viewer username=${o}>
              ${d}
              <span slot="name">${t}</span>
              <span slot="id">${o}</span>
              <span slot="email">${r}</span>
              <span slot="address">${i}</span>
            </profile-viewer>
          `}_handleSubmit(e){console.log("Handling submit of mu-form"),this.dispatchMessage(["profile/save",{id:this.id,profile:e.detail,onSuccess:()=>D.dispatch(this,"history/navigate",{href:`/app/profile/${e.detail.id}`}),onFailure:t=>console.log("ERROR:",t)}])}};_.uses=m({"profile-viewer":w,"profile-editor":b,"profile-avatar":p});let u=_;f([l({type:Boolean,reflect:!0})],u.prototype,"edit",2);f([l({attribute:"user-id",reflect:!0})],u.prototype,"userid",2);f([E()],u.prototype,"profile",1);var ot=Object.defineProperty,O=(a,e,t,o)=>{for(var r=void 0,i=a.length-1,s;i>=0;i--)(s=a[i])&&(r=s(e,t,r)||r);return r&&ot(e,t,r),r};const U=class U extends h{constructor(){super(),this.apiEndpoint="",this.item={id:"",name:"",people:[]},this.isEditing=!1,this.tempItem={id:"",name:"",people:[]}}connectedCallback(){this.fetchData()}async fetchData(){fetch(this.apiEndpoint).then(e=>console.log(e.json()));try{const e=await fetch(this.apiEndpoint);if(!e.ok)throw new Error("Network response was not ok");const t=await e.json();console.log(t),this.item=t}catch(e){console.error("Fetch error:",e)}}toggleEdit(){this.isEditing=!this.isEditing,this.isEditing&&(this.tempItem={...this.item})}saveEdit(){this.item={...this.tempItem},this.isEditing=!1}cancelEdit(){this.isEditing=!1}handleInputChange(e){const t=e.target;this.tempItem={...this.tempItem,[t.name]:t.value}}render(){return n`
        <div class="card">
          ${this.isEditing?n`
            <input type="text" name="id" .value="${this.tempItem.id}" @input="${this.handleInputChange}" />
            <input type="text" name="name" .value="${this.tempItem.name}" @input="${this.handleInputChange}" />
            <input type="text" name="people" .value="${this.tempItem.people}" @input="${this.handleInputChange}" />
            <button class="save-button" @click="${this.saveEdit}">Save</button>
            <button class="cancel-button" @click="${this.cancelEdit}">Cancel</button>
          `:n`
            <h2>${this.item.id}</h2>
            <div class="name">${this.item.name}</div>
            <div class="people">${this.item.people}</div>
            <button class="edit-button" @click="${this.toggleEdit}">Edit</button>
          `}
        </div>
      `}};U.styles=k`
      .card {
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
        max-width: 300px;
        position: relative;
      }
  
      .card:hover {
        transform: scale(1.05);
      }
  
      .card img {
        width: 100%;
        height: auto;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
  
      .card h3, .card h2 {
        margin: 0;
      }
      
      .card .date {
        font-weight: bold;
        color: #555;
        margin-bottom: 0.5em;
      }
  
      .card .description {
        margin-top: 1em;
        color: #666;
      }
  
      .edit-button, .save-button, .cancel-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #007BFF;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
      }
  
      .save-button, .cancel-button {
        right: auto;
        left: 10px;
      }
    `;let c=U;O([l({type:String})],c.prototype,"apiEndpoint");O([E()],c.prototype,"item");O([E()],c.prototype,"isEditing");O([E()],c.prototype,"tempItem");const j=class j extends h{connectedCallback(){super.connectedCallback()}render(){return n`
        <div class="card-view">
            <edit-card apiEndpoint='"http://localhost:3000/api/groups/test"'></edit-card>
        </div>
        `}};j.uses=m({"edit-card":c});let z=j;const st=[{path:"/app/group",view:()=>n`
      <group-view></group-view>
    `},{path:"/app/profile/:id",view:a=>n`
      <profile-view user-id=${a.id}></profile-view>
    `},{path:"/app/profile/anonymous",redirect:"/login.html"},{path:"/app/profile/login.html",redirect:"/login.html"},{path:"/app",view:()=>n`
      <landing-view></landing-view>
    `},{path:"/",redirect:"/app"}];m({"mu-auth":y.Provider,"mu-store":class extends B.Provider{constructor(){super(Z,J,"festivous:auth")}},"mu-history":D.Provider,"mu-switch":class extends N.Element{constructor(){super(st,"festivous:history","festivous:auth")}},"nav-header":g,"profile-view":u,"group-view":z});m({"mu-auth":y.Provider,"nav-header":g});window.relayEvent=C.relay;
