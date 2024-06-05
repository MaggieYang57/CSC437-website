import{a as k,u as Z,f as K,s as p,O as G,d as h,b as Q,x as n,i as u,e as A,c as W,g as X,V as E,h as N,j as V,_ as tt}from"./lit-element-QqaPSkLF.js";const rt={};function et(a,r,t){switch(console.log("MESSAGE"),console.log(a),a[0]){case"profile/save":at(a[1],t).then(e=>r(i=>({...i,profile:e}))).then(()=>{const{onSuccess:e}=a[1];e&&e()}).catch(e=>{const{onFailure:i}=a[1];i&&i(e)});break;case"profile/select":ot(a[1],t).then(e=>r(i=>({...i,profile:e})));break;case"group/select":it(a[1],t).then(e=>r(i=>({...i,group:e})));break;default:const o=a[0];throw new Error(`Unhandled Auth message "${o}"`)}}function at(a,r){return fetch(`/api/profiles/${a.profile.id}`,{method:"PUT",headers:{"Content-Type":"application/json",...k.headers(r)},body:JSON.stringify(a.profile)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return t})}function ot(a,r){return fetch(`/api/profiles/${a.id}`,{headers:k.headers(r)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Profile:",t),t})}function it(a,r){return console.log("here"),fetch(`/api/groups/user/${a.id}`,{headers:k.headers(r)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Group:",t),t})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const st={attribute:!0,type:String,converter:Z,reflect:!1,hasChanged:K},nt=(a=st,r,t)=>{const{kind:o,metadata:e}=t;let i=globalThis.litPropertyMetadata.get(e);if(i===void 0&&globalThis.litPropertyMetadata.set(e,i=new Map),i.set(t.name,a),o==="accessor"){const{name:s}=t;return{set(l){const b=r.get.call(this);r.set.call(this,l),this.requestUpdate(s,b,a)},init(l){return l!==void 0&&this.P(s,void 0,a),l}}}if(o==="setter"){const{name:s}=t;return function(l){const b=this[s];r.call(this,l),this.requestUpdate(s,b,a)}}throw Error("Unsupported decorator location: "+o)};function d(a){return(r,t)=>typeof t=="object"?nt(a,r,t):((o,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,s?{...o,wrapped:!0}:o),s?Object.getOwnPropertyDescriptor(e,i):void 0})(a,r,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function z(a){return d({...a,state:!0,attribute:!1})}var dt=Object.defineProperty,lt=(a,r,t,o)=>{for(var e=void 0,i=a.length-1,s;i>=0;i--)(s=a[i])&&(e=s(r,t,e)||e);return e&&dt(r,t,e),e};const O=class O extends p{constructor(){super(...arguments),this.username="anonymous",this._authObserver=new G(this,"festivous:auth")}render(){return n`
    <header>
        <nav class='nav'>
            <a href="/" class="logo">FESTIVOUS</a>
            <a href="/app/festival">FESTIVALS</a>
            <a href="/group.html">GROUPS</a>
            <drop-down class="right">
                <a name="greeting" slot="actuator"
                    >HELLO, ${this.username}</a>
                <ul>
                    <li>
                    <label @change=${ct}>
                        <input type="checkbox" autocomplete="off" />
                        LIGHT MODE
                    </label>
                    </li>
                <li><a href="/app/profile/${this.username}">PROFILE</a></li>
                <li><a href="#" @click=${ht}>SIGN OUT</a></li>
                </ul>
            </drop-down>
        </nav>
    </header>
    `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:r})=>{r&&(this.username=r.username)})}};O.uses=h({"drop-down":Q.Element}),O.styles=u`
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
    `;let y=O;lt([d()],y.prototype,"username");function ct(a){const t=a.target.checked;A.relay(a,"light-mode",{checked:t}),document.body.classList.toggle("light-mode",t)}function ht(a){A.relay(a,"auth:message",["auth/signout"])}var pt=Object.defineProperty,D=(a,r,t,o)=>{for(var e=void 0,i=a.length-1,s;i>=0;i--)(s=a[i])&&(e=s(r,t,e)||e);return e&&pt(r,t,e),e};const T=class T extends p{constructor(){super(...arguments),this.color="white"}render(){return n`
      <div
        class="avatar"
        style="
        ${this.color?`--avatar-backgroundColor: ${this.color};`:""}
        ${this.src?`background-image: url('${this.src}');`:""}
      ">
        ${this.src?"":this.initial||""}
      </div>
    `}};T.styles=u`
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
  `;let v=T;D([d()],v.prototype,"color");D([d()],v.prototype,"src");D([d()],v.prototype,"initial");var ut=Object.defineProperty,vt=Object.getOwnPropertyDescriptor,m=(a,r,t,o)=>{for(var e=o>1?void 0:o?vt(r,t):r,i=a.length-1,s;i>=0;i--)(s=a[i])&&(e=(o?s(r,t,e):s(e))||e);return o&&e&&ut(r,t,e),e};const J=u`
    * {
        margin: 0;
        box-sizing: border-box;
    }
    section {
        display: grid;
        grid-template-columns: [key] 2fr [value] 2fr [controls] 2fr [end];
        gap: var(--margin-size-med);
        align-items: end;
        margin: var(--margin-size-med) auto;
    }
    h1 {
        grid-row: 4;
        grid-column: value;
    }
    slot[name="avatar"] {
        display: grid;
        grid-row: 1/ span 4;
    }
    nav {
        grid-column: 3;
        grid-row: 4;
        display: grid;
        text-align: right;
        margin-top: var(--margin-size-med);
        justify-content: left;
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
    `,U=class U extends p{render(){return console.log(this.username),n`
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
      `}};U.styles=[J];let C=U;m([d()],C.prototype,"username",2);const S=class S extends p{render(){return n`
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
      `}};S.uses=h({"mu-form":W.Element,"input-array":X.Element}),S.styles=[J];let w=S;m([d()],w.prototype,"username",2);m([d({attribute:!1})],w.prototype,"init",2);const M=class M extends E{constructor(){super("festivous:model"),this.edit=!1,this.userid="",this.addEventListener("mu-form:submit",r=>this._handleSubmit(r))}get profile(){return this.model.profile}attributeChangedCallback(r,t,o){super.attributeChangedCallback(r,t,o),r==="user-id"&&t!==o&&o&&(console.log("Profiler Page:",o),this.dispatchMessage(["profile/select",{id:o}]))}render(){const{avatar:r,name:t,id:o,email:e,address:i}=this.profile||{},s=(t||o||"?").slice(0,1),l=n`
        <profile-avatar
          slot="avatar"
          src=${r}
          initial=${s}></profile-avatar>
      `;return console.log(o),this.edit?n`
            <profile-editor
              username=${o}
              .init=${this.profile}
              @mu-form:submit=${b=>this._handleSubmit(b)}>
              ${l}
            </profile-editor>
          `:n`
            <profile-viewer username=${o}>
              ${l}
              <span slot="name">${t}</span>
              <span slot="id">${o}</span>
              <span slot="email">${e}</span>
              <span slot="address">${i}</span>
            </profile-viewer>
          `}_handleSubmit(r){console.log("Handling submit of mu-form"),this.dispatchMessage(["profile/save",{id:this.id,profile:r.detail,onSuccess:()=>N.dispatch(this,"history/navigate",{href:`/app/profile/${r.detail.id}`}),onFailure:t=>console.log("ERROR:",t)}])}};M.uses=h({"profile-viewer":C,"profile-editor":w,"profile-avatar":v});let g=M;m([d({type:Boolean,reflect:!0})],g.prototype,"edit",2);m([d({attribute:"user-id",reflect:!0})],g.prototype,"userid",2);m([z()],g.prototype,"profile",1);var gt=Object.defineProperty,$=(a,r,t,o)=>{for(var e=void 0,i=a.length-1,s;i>=0;i--)(s=a[i])&&(e=s(r,t,e)||e);return e&&gt(r,t,e),e};const F=class F extends p{constructor(){super(...arguments),this.apiEndpoint="",this.username="",this.item={id:"",name:"",people:[]},this.isEditing=!1,this.tempItem={id:"",name:"",people:[]},this._authObserver=new G(this,"festivous:auth")}connectedCallback(){super.connectedCallback(),this.fetchData(),this._authObserver.observe(({user:r})=>{r&&(this.username=r.username)})}async fetchData(){try{const r=await fetch(this.apiEndpoint);if(!r.ok)throw new Error("Network response was not ok");const t=await r.json();console.log(t),this.item=t}catch(r){console.error("Fetch error:",r)}}toggleEdit(){this.isEditing=!this.isEditing,this.isEditing&&(this.tempItem={...this.item})}saveEdit(){this.item={...this.tempItem},this.isEditing=!1}cancelEdit(){this.isEditing=!1}handleInputChange(r){const t=r.target;this.tempItem={...this.tempItem,[t.name]:t.value}}render(){return n`
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
      `}};F.styles=u`
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
    `;let c=F;$([d({type:String,reflect:!0})],c.prototype,"apiEndpoint");$([d()],c.prototype,"username");$([z()],c.prototype,"item");$([z()],c.prototype,"isEditing");$([z()],c.prototype,"tempItem");var ft=Object.defineProperty,mt=Object.getOwnPropertyDescriptor,I=(a,r,t,o)=>{for(var e=o>1?void 0:o?mt(r,t):r,i=a.length-1,s;i>=0;i--)(s=a[i])&&(e=(o?s(r,t,e):s(e))||e);return o&&e&&ft(r,t,e),e};const R=class R extends p{render(){return n`
        <div class="card-view">
            <edit-card apiEndpoint="/api/groups/test"></edit-card>
        </div>
        `}};R.uses=h({"edit-card":c});let L=R;const B=class B extends E{constructor(){super("festivous:model"),this.edit=!1,this.userid=""}get group(){return this.model.group}attributeChangedCallback(r,t,o){super.attributeChangedCallback(r,t,o),r==="user-id"&&t!==o&&o&&(console.log("Group Page:",o),this.dispatchMessage(["group/select",{id:o}]))}render(){return n`
            <group-viewer></group-viewer>
          `}};B.uses=h({"group-viewer":L});let f=B;I([d({type:Boolean,reflect:!0})],f.prototype,"edit",2);I([d({attribute:"user-id",reflect:!0})],f.prototype,"userid",2);I([z()],f.prototype,"group",1);const bt=u`
    * {
    margin: 0rem;
    box-sizing: border-box;
    }
    img {
        max-width: 100%;
    }
    body {
        margin: var(--body-margin);
        background-color: var(--color-background-primary);
        color: var(--color-font-primary);
        font-family: "Pontano Sans", sans-serif;
        font-weight: var(--font-weight-body);
        font-size: var(--font-size-body);
        letter-spacing: var(--line-width);
    }
    h1 {
        font-family: "Prompt", sans-serif;
        font-weight: var(--font-weight-xlarge);
        font-size: var(--font-size-xxlarge);
    }
    h2 {
        font-family: "Prompt", sans-serif;
        font-weight: var(--font-weight-xlarge);
        font-size: var(--font-size-xlarge);
    }
    .card {
        box-shadow: var(--box-shadow-dark);
        background-color: var(--color-font-primary);
        color: var(--color-background-primary);
        display: flex;
        margin: var(--margin-size-med) auto;
        width: var(--card-width);
        height: auto;
        border-radius: var(--border-radius-med);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        overflow: hidden;
    }
    .card:hover {
        box-shadow: var(--box-shadow-light);
    }
    .dates{
        font-size: var(--font-size-large);
    }
    .overlay {
        z-index: 2;
        width: var(--full-width);
        height: var(--full-width);
        position: relative;
        border-radius: var(--border-radius-med);
        overflow: hidden;
        color: var(--color-font-primary);
    }
    .festival {
        padding: var(--margin-size-small);
        background-color: var(--overlay-color-light);
        color: var(--color-background-primary);
    }
    button {
        border-radius: var(--border-radius-large);
        border-width: var(--line-width);
        border-color: var(--color-background-primary);
        border-style: solid;
        background-color: transparent;
        padding: var(--button-padding);
        box-shadow: none;
        margin-top: var(--margin-size-small);
        font-size: var(--font-size-body);
    
        &.add-button {
            border-color: var(--color-font-primary);
            color: var(--color-font-primary);
            margin: var(--margin-size-med) auto;
            left: auto;
            right: auto;
            display: block;
            width: var(--card-width);
            height: auto;
            transition: var(--transition-default);
            font-size: var(--font-size-large);
        }
        &.add-button:hover {
            background-color: var(--color-font-primary);
            color: var(--color-background-primary);
            border-color: var(--color-background-primary);
        }
    }    
    `,q=class q extends E{render(){return n`
          <h1>YOUR FESTIVALS</h1>
          <div class="card" style="background-image: url(../../public/images/ferris-wheel.jpg);">
            <div class="overlay festival">
              <h2 class="dates">4.12.24 - 4.14.24</h2>
              <h2>COACHELLA</h2>
            </div>
          </div>
          <div class="card" style="background-image: url(../../public/images/edc.jpg);">
            <div class="overlay festival">
              <h2 class="dates">5.17.24 - 5.19.24</h2>
              <h2>EDC LV</h2>
            </div>
          </div>
          <div class="card" style="background-image: url(../../public/images/electric-forest.jpeg);">
            <div class="overlay festival">
              <h2 class="dates">6.20.24 - 6.23.24</h2>
              <h2>ELECTRIC FOREST</h2>
            </div>
          </div>
          <button class="add-button">ADD +</button>
        `}};q.styles=[bt];let _=q;var yt=Object.defineProperty,Y=(a,r,t,o)=>{for(var e=void 0,i=a.length-1,s;i>=0;i--)(s=a[i])&&(e=s(r,t,e)||e);return e&&yt(r,t,e),e};const H=class H extends p{constructor(){super(),this.href="",this.open=!1}render(){return n`
          <button id="view-button" on>View</button>
          <div class="loaded-container"></div>
        `}firstUpdated(){var t;this.href=this.getAttribute("href"),this.open=this.hasAttribute("open"),this.open&&this.loadDetails();const r=(t=this.shadowRoot)==null?void 0:t.querySelector("#view-button");r&&r.addEventListener("click",()=>this.toggle()),this.addEventListener("drop-down:open",()=>this.loadDetails())}toggle(){var t,o;const r=(t=this.shadowRoot)==null?void 0:t.querySelector("#view-button");if(r)if(this.hasAttribute("open")){this.removeAttribute("open"),this.dispatchEvent(new CustomEvent("drop-down:close"));const e=(o=this.shadowRoot)==null?void 0:o.querySelector(".loaded-container");e&&(e.innerHTML=""),r.innerHTML="View"}else this.setAttribute("open",""),this.dispatchEvent(new CustomEvent("drop-down:open")),r.innerHTML="Close"}loadDetails(){this.href&&fetch(this.href).then(r=>{if(r.status!==200)throw`Status: ${r.status}`;return r.text()}).then(r=>this.addFragment(r))}addFragment(r){var o;const t=(o=this.shadowRoot)==null?void 0:o.querySelector(".loaded-container");t&&(t.innerHTML=r)}};H.styles=u`
      button {
        color: var(--color-background-primary);
        border-radius: var(--border-radius-large);
        border-width: var(--line-width);
        border-color: var(--color-background-primary);
        border-style: solid;
        background-color: transparent;
        padding: var(--button-padding);
        box-shadow: none;
        margin-top: var(--margin-size-small);
        font-size: var(--font-size-body);
      }
    `;let x=H;Y([d({type:String})],x.prototype,"href");Y([d({type:Boolean,reflect:!0})],x.prototype,"open");const wt=u`
    * {
    margin: 0rem;
    box-sizing: border-box;
    }
    img {
        max-width: 100%;
    }
    body {
        margin: var(--body-margin);
        background-color: var(--color-background-primary);
        color: var(--color-font-primary);
        font-family: "Pontano Sans", sans-serif;
        font-weight: var(--font-weight-body);
        font-size: var(--font-size-body);
        letter-spacing: var(--line-width);
    }
    h1 {
        font-family: "Prompt", sans-serif;
        font-weight: var(--font-weight-xlarge);
        font-size: var(--font-size-xxlarge);
    }
    h2 {
        font-family: "Prompt", sans-serif;
        font-weight: var(--font-weight-xlarge);
        font-size: var(--font-size-xlarge);
    }
    drop-down {
        .line {
            position: absolute;
            width: var(--line-width); 
            height: var(--line-height); 
            background-color: black; 
        }
        
        .loaded-content {
            margin: var(--margin-size-small) 0;
            padding-left: var(--margin-size-small);
            h1 {
                font-size: var(--font-size-xlarge);
            }
            p {
                white-space: pre;
            }
        }
    }
    .card {
        box-shadow: var(--box-shadow-dark);
        background-color: var(--color-font-primary);
        color: var(--color-background-primary);
        display: flex;
        margin: var(--margin-size-med) auto;
        width: var(--card-width);
        height: auto;
        border-radius: var(--border-radius-med);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        overflow: hidden;
    }
    .card:hover {
        box-shadow: var(--box-shadow-light);
    }
    .dates{
        font-size: var(--font-size-large);
    }
    .container {
        padding: var(--margin-size-small) var(--margin-size-med);
        background-color: var(--overlay-color-xlight);
        border-radius: var(--border-radius-med);
        transition: transform 4s ease-in-out; 
        position: relative;
        display: grid;
        width: var(--container-width);
        left: 0;
    }
    button {
        border-radius: var(--border-radius-large);
        border-width: var(--line-width);
        border-color: var(--color-background-primary);
        border-style: solid;
        background-color: transparent;
        padding: var(--button-padding);
        box-shadow: none;
        margin-top: var(--margin-size-small);
        font-size: var(--font-size-body);
    
        &.add-button {
            border-color: var(--color-font-primary);
            color: var(--color-font-primary);
            margin: var(--margin-size-med) auto;
            left: auto;
            right: auto;
            display: block;
            width: var(--card-width);
            height: auto;
            transition: var(--transition-default);
            font-size: var(--font-size-large);
        }
        &.add-button:hover {
            background-color: var(--color-font-primary);
            color: var(--color-background-primary);
            border-color: var(--color-background-primary);
        }
    }    
    `,P=class P extends E{render(){return n`
          <h1> RENDEZVOUS </h1>
          <div class="card" style="background-image: url(./images/coachella-map.jpeg);">
            <div class="container">
              <h2 class="dates">4.12.24 - 4.14.24</h2>
              <h2>COACHELLA</h2>
              <h3>SLOmies</h3>
              <expand-info href='./public/data/rendezvous/coachella.html'>
              </expand-infon>
            </div>
          </div>
          <div class="card" style="background-image: url(./images/edc-map.jpeg);">
            <div class="container">
              <h2 class="dates">5.17.24 - 5.19.24</h2>
              <h2>EDC LV</h2>
              <h3>The Best Group</h3>
              <expand-info href='./public/data/rendezvous/edc.html' />
            </div>
          </div>
          <button class="add-button">ADD +</button>
        `}};P.uses=h({"expand-info":x}),P.styles=[wt];let j=P;const xt=[{path:"/app/festival",view:()=>n`
      <festival-view></festival-view>
    `},{path:"/app/group",view:()=>n`
      <group-view></group-view>
    `},{path:"/app/profile/:id",view:a=>n`
      <profile-view user-id=${a.id}></profile-view>
    `},{path:"/app/profile/anonymous",redirect:"/login.html"},{path:"/app/profile/login.html",redirect:"/login.html"},{path:"/app",view:()=>n`
      <rendezvous-view></rendezvous-view>
    `},{path:"/",redirect:"/app"}];h({"mu-auth":k.Provider,"mu-store":class extends V.Provider{constructor(){super(et,rt,"festivous:auth")}},"mu-history":N.Provider,"mu-switch":class extends tt.Element{constructor(){super(xt,"festivous:history","festivous:auth")}},"nav-header":y,"rendezvous-view":j,"profile-view":g,"group-view":f,"festival-view":_,"edit-card":c});h({"mu-auth":k.Provider,"nav-header":y});window.relayEvent=A.relay;
