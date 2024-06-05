import{a as z,u as Z,f as X,s as h,O as W,d as u,b as K,x as s,i as p,e as T,c as V,g as tt,V as L,h as J,j as rt,_ as et}from"./lit-element-QqaPSkLF.js";const ot={};function at(o,r,t){switch(console.log("MESSAGE"),console.log(o),o[0]){case"profile/save":it(o[1],t).then(e=>r(a=>({...a,profile:e}))).then(()=>{const{onSuccess:e}=o[1];e&&e()}).catch(e=>{const{onFailure:a}=o[1];a&&a(e)});break;case"profile/select":nt(o[1],t).then(e=>r(a=>({...a,profile:e})));break;case"group/select":st(o[1],t).then(e=>r(a=>({...a,group:e})));break;default:const i=o[0];throw new Error(`Unhandled Auth message "${i}"`)}}function it(o,r){return fetch(`/api/profiles/${o.profile.id}`,{method:"PUT",headers:{"Content-Type":"application/json",...z.headers(r)},body:JSON.stringify(o.profile)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return t})}function nt(o,r){return fetch(`/api/profiles/${o.id}`,{headers:z.headers(r)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Profile:",t),t})}function st(o,r){return console.log("here"),fetch(`/api/groups/user/${o.id}`,{headers:z.headers(r)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Group:",t),t})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const dt={attribute:!0,type:String,converter:Z,reflect:!1,hasChanged:X},lt=(o=dt,r,t)=>{const{kind:i,metadata:e}=t;let a=globalThis.litPropertyMetadata.get(e);if(a===void 0&&globalThis.litPropertyMetadata.set(e,a=new Map),a.set(t.name,o),i==="accessor"){const{name:n}=t;return{set(l){const y=r.get.call(this);r.set.call(this,l),this.requestUpdate(n,y,o)},init(l){return l!==void 0&&this.P(n,void 0,o),l}}}if(i==="setter"){const{name:n}=t;return function(l){const y=this[n];r.call(this,l),this.requestUpdate(n,y,o)}}throw Error("Unsupported decorator location: "+i)};function d(o){return(r,t)=>typeof t=="object"?lt(o,r,t):((i,e,a)=>{const n=e.hasOwnProperty(a);return e.constructor.createProperty(a,n?{...i,wrapped:!0}:i),n?Object.getOwnPropertyDescriptor(e,a):void 0})(o,r,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function m(o){return d({...o,state:!0,attribute:!1})}var ct=Object.defineProperty,pt=(o,r,t,i)=>{for(var e=void 0,a=o.length-1,n;a>=0;a--)(n=o[a])&&(e=n(r,t,e)||e);return e&&ct(r,t,e),e};const S=class S extends h{constructor(){super(...arguments),this.username="anonymous",this._authObserver=new W(this,"festivous:auth")}render(){return s`
    <header>
        <nav class='nav'>
            <a href="/" class="logo">FESTIVOUS</a>
            <a href="/app/festival">FESTIVALS</a>
            <a href="/app/group">GROUPS</a>
            <drop-down class="right">
                <a name="greeting" slot="actuator"
                    >HELLO, ${this.username}</a>
                <ul>
                    <li>
                    <label @change=${ht}>
                        <input type="checkbox" autocomplete="off" />
                        LIGHT MODE
                    </label>
                    </li>
                <li><a href="/app/profile/${this.username}">PROFILE</a></li>
                <li><a href="#" @click=${ut}>SIGN OUT</a></li>
                </ul>
            </drop-down>
        </nav>
    </header>
    `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:r})=>{r&&(this.username=r.username)})}};S.uses=u({"drop-down":K.Element}),S.styles=p`
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
    `;let w=S;pt([d()],w.prototype,"username");function ht(o){const t=o.target.checked;T.relay(o,"light-mode",{checked:t}),document.body.classList.toggle("light-mode",t)}function ut(o){T.relay(o,"auth:message",["auth/signout"]),window.location.pathname="/login.html"}var vt=Object.defineProperty,B=(o,r,t,i)=>{for(var e=void 0,a=o.length-1,n;a>=0;a--)(n=o[a])&&(e=n(r,t,e)||e);return e&&vt(r,t,e),e};const I=class I extends h{constructor(){super(...arguments),this.color="white"}render(){return s`
      <div
        class="avatar"
        style="
        ${this.color?`--avatar-backgroundColor: ${this.color};`:""}
        ${this.src?`background-image: url('${this.src}');`:""}
      ">
        ${this.src?"":this.initial||""}
      </div>
    `}};I.styles=p`
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
  `;let v=I;B([d()],v.prototype,"color");B([d()],v.prototype,"src");B([d()],v.prototype,"initial");var gt=Object.defineProperty,ft=Object.getOwnPropertyDescriptor,b=(o,r,t,i)=>{for(var e=i>1?void 0:i?ft(r,t):r,a=o.length-1,n;a>=0;a--)(n=o[a])&&(e=(i?n(r,t,e):n(e))||e);return i&&e&&gt(r,t,e),e};const Y=p`
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
    `,R=class R extends h{render(){return console.log(this.username),s`
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
      `}};R.styles=[Y];let $=R;b([d()],$.prototype,"username",2);const A=class A extends h{render(){return s`
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
      `}};A.uses=u({"mu-form":V.Element,"input-array":tt.Element}),A.styles=[Y];let k=A;b([d()],k.prototype,"username",2);b([d({attribute:!1})],k.prototype,"init",2);const F=class F extends L{constructor(){super("festivous:model"),this.edit=!1,this.userid="",this.addEventListener("mu-form:submit",r=>this._handleSubmit(r))}get profile(){return this.model.profile}attributeChangedCallback(r,t,i){super.attributeChangedCallback(r,t,i),r==="user-id"&&t!==i&&i&&(console.log("Profiler Page:",i),this.dispatchMessage(["profile/select",{id:i}]))}render(){const{avatar:r,name:t,id:i,email:e,address:a}=this.profile||{},n=(t||i||"?").slice(0,1),l=s`
        <profile-avatar
          slot="avatar"
          src=${r}
          initial=${n}></profile-avatar>
      `;return console.log(i),this.edit?s`
            <profile-editor
              username=${i}
              .init=${this.profile}
              @mu-form:submit=${y=>this._handleSubmit(y)}>
              ${l}
            </profile-editor>
          `:s`
            <profile-viewer username=${i}>
              ${l}
              <span slot="name">${t}</span>
              <span slot="id">${i}</span>
              <span slot="email">${e}</span>
              <span slot="address">${a}</span>
            </profile-viewer>
          `}_handleSubmit(r){console.log("Handling submit of mu-form"),this.dispatchMessage(["profile/save",{id:this.id,profile:r.detail,onSuccess:()=>J.dispatch(this,"history/navigate",{href:`/app/profile/${r.detail.id}`}),onFailure:t=>console.log("ERROR:",t)}])}};F.uses=u({"profile-viewer":$,"profile-editor":k,"profile-avatar":v});let g=F;b([d({type:Boolean,reflect:!0})],g.prototype,"edit",2);b([d({attribute:"user-id",reflect:!0})],g.prototype,"userid",2);b([m()],g.prototype,"profile",1);var mt=Object.defineProperty,M=(o,r,t,i)=>{for(var e=void 0,a=o.length-1,n;a>=0;a--)(n=o[a])&&(e=n(r,t,e)||e);return e&&mt(r,t,e),e};const U=class U extends h{constructor(){super(...arguments),this.apiEndpoint="",this.username="",this.item={id:"",name:"",people:[]},this.isEditing=!1,this.tempItem={id:"",name:"",people:[]},this._authObserver=new W(this,"festivous:auth")}connectedCallback(){super.connectedCallback(),this.fetchData(),this._authObserver.observe(({user:r})=>{r&&(this.username=r.username)})}async fetchData(){try{const r=await fetch(this.apiEndpoint);if(!r.ok)throw new Error("Network response was not ok");const t=await r.json();console.log(t),this.item=t}catch(r){console.error("Fetch error:",r)}}toggleEdit(){this.isEditing=!this.isEditing,this.isEditing&&(this.tempItem={...this.item})}saveEdit(){this.item={...this.tempItem},this.isEditing=!1}cancelEdit(){this.isEditing=!1}handleInputChange(r){const t=r.target;this.tempItem={...this.tempItem,[t.name]:t.value}}render(){return s`
        <div class="card">
          ${this.isEditing?s`
            <input type="text" name="id" .value="${this.tempItem.id}" @input="${this.handleInputChange}" />
            <input type="text" name="name" .value="${this.tempItem.name}" @input="${this.handleInputChange}" />
            <input type="text" name="people" .value="${this.tempItem.people}" @input="${this.handleInputChange}" />
            <button class="save-button" @click="${this.saveEdit}">Save</button>
            <button class="cancel-button" @click="${this.cancelEdit}">Cancel</button>
          `:s`
            <h2>${this.item.id}</h2>
            <div class="name">${this.item.name}</div>
            <div class="people">${this.item.people}</div>
            <button class="edit-button" @click="${this.toggleEdit}">Edit</button>
          `}
        </div>
      `}};U.styles=p`
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
    `;let c=U;M([d({type:String,reflect:!0})],c.prototype,"apiEndpoint");M([d()],c.prototype,"username");M([m()],c.prototype,"item");M([m()],c.prototype,"isEditing");M([m()],c.prototype,"tempItem");var bt=Object.defineProperty,yt=(o,r,t,i)=>{for(var e=void 0,a=o.length-1,n;a>=0;a--)(n=o[a])&&(e=n(r,t,e)||e);return e&&bt(r,t,e),e};const N=class N extends h{constructor(){super(),this.open=!1,this.addEventListener("click",()=>this.toggle())}render(){return s`
        <slot name="actuator">
            <img src="../../public/images/kebab-menu.svg" width="30px"/>
        </slot>
        <div id="panel">
            <slot></slot>
        </div>
        `}toggle(){this.open=!this.open}};N.styles=p`
        :host {
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer;
        }
        #panel {
            display: none;
            position: absolute;
            right: 0;
            width: max-content;
            padding: var(--button-padding);
            box-shadow: var(--box-shadow-dark);
            border-radius: var(--border-radius-small);
            background: var(--color-font-primary);
            text-align: center;
        }
        :host([open]) #panel {
            display: block;
        }
    `;let P=N;yt([d({type:Boolean,reflect:!0})],P.prototype,"open");var wt=Object.defineProperty,kt=Object.getOwnPropertyDescriptor,j=(o,r,t,i)=>{for(var e=i>1?void 0:i?kt(r,t):r,a=o.length-1,n;a>=0;a--)(n=o[a])&&(e=(i?n(r,t,e):n(e))||e);return i&&e&&wt(r,t,e),e};const xt=p`
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
    .names {
        font-weight: var(--font-weight-med);
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
    .header {
        position: relative;
        width: var(--full-width);
        h2 {
            float:left;
            margin: 0;
        }
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
    
`,E=class E extends h{render(){return s`
        <h1> GROUPS </h1>
        <div class="card">
        <div class="container" style="background-color: var(--color-card-first); width: 100%;">
            <div class="header">
            <h2>SLOmies</h2>
            <kebab-menu>
                <div>Edit Name</div>
                <div>Add Member</div>
                <div>Remove Member</div>
            </kebab-menu>
            </div>
            <ul class="names">
            <li>John Do</li>
            <li>Mary Lee</li>
            <li>Sophia Chen</li>
            <li>Bonnie Brown</li>
            </ul>
        </div>
        </div>
        <div class="card">
        <div class="container" style="background-color: var(--color-card-second); width: 100%;">
            <div class="header">
            <h2>Three Blind Mice</h2>
            <kebab-menu>
                <div>Edit Name</div>
                <div>Add Member</div>
                <div>Remove Member</div>
            </kebab-menu>
            </div>
            <ul class="names">
            <li>Remy Randeuto</li>
            <li>Stuart Mouserton</li>
            <li>Bonnie Brown</li>
            </ul>
        </div>
        </div>
        <div class="card">
        <div class="container" style="background-color: var(--color-card-third); width: 100%;">
            <div class="header">
            <h2>The Best Group</h2>
            <kebab-menu>
                <div>Edit Name</div>
                <div>Add Member</div>
                <div>Remove Member</div>
            </kebab-menu>
            </div>
            <ul class="names">
            <li>Maxine Ly</li>
            <li>Irene Chen</li>
            <li>Mona Makam</li>
            <li>Bonnie Brown</li>
            </ul>
        </div>
        </div>
        <button class="add-button">CREATE +</button>
        `}};E.uses=u({"edit-card":c,"kebab-menu":P}),E.styles=[xt];let _=E;const H=class H extends L{constructor(){super("festivous:model"),this.edit=!1,this.userid=""}get group(){return this.model.group}attributeChangedCallback(r,t,i){super.attributeChangedCallback(r,t,i),r==="user-id"&&t!==i&&i&&(console.log("Group Page:",i),this.dispatchMessage(["group/select",{id:i}]))}render(){return s`
            <group-viewer></group-viewer>
          `}};H.uses=u({"group-viewer":_});let f=H;j([d({type:Boolean,reflect:!0})],f.prototype,"edit",2);j([d({attribute:"user-id",reflect:!0})],f.prototype,"userid",2);j([m()],f.prototype,"group",1);const zt=p`
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
    a {
        text-decoration: none;
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
    `,q=class q extends L{render(){return s`
          <h1>YOUR FESTIVALS</h1>
          <a href="https://coachella.com/">
          <div class="card" style="background-image: url(../images/ferris-wheel.jpg);">
            <div class="overlay festival">
              <h2 class="dates">4.12.24 - 4.14.24</h2>
              <h2>COACHELLA</h2>
            </div>
          </div>
          </a>
          <a href="https://lasvegas.electricdaisycarnival.com/">
          <div class="card" style="background-image: url(../images/edc.jpg);">
            <div class="overlay festival">
              <h2 class="dates">5.17.24 - 5.19.24</h2>
              <h2>EDC LV</h2>
            </div>
          </div>
          </a>
          <a href="https://electricforest.com/">
          <div class="card" style="background-image: url(../images/electric-forest.jpeg);">
            <div class="overlay festival">
              <h2 class="dates">6.20.24 - 6.23.24</h2>
              <h2>ELECTRIC FOREST</h2>
            </div>
          </div>
          </a>
          <button class="add-button">ADD +</button>
        `}};q.styles=[zt];let D=q;var Mt=Object.defineProperty,Q=(o,r,t,i)=>{for(var e=void 0,a=o.length-1,n;a>=0;a--)(n=o[a])&&(e=n(r,t,e)||e);return e&&Mt(r,t,e),e};const G=class G extends h{constructor(){super(),this.href="",this.open=!1}render(){return s`
          <button id="view-button" on>View</button>
          <div class="loaded-container"></div>
        `}firstUpdated(){var t;this.href=this.getAttribute("href"),this.open=this.hasAttribute("open"),this.open&&this.loadDetails();const r=(t=this.shadowRoot)==null?void 0:t.querySelector("#view-button");r&&r.addEventListener("click",()=>this.toggle()),this.addEventListener("drop-down:open",()=>this.loadDetails())}toggle(){var t,i;const r=(t=this.shadowRoot)==null?void 0:t.querySelector("#view-button");if(r)if(this.hasAttribute("open")){this.removeAttribute("open"),this.dispatchEvent(new CustomEvent("drop-down:close"));const e=(i=this.shadowRoot)==null?void 0:i.querySelector(".loaded-container");e&&(e.innerHTML=""),r.innerHTML="View"}else this.setAttribute("open",""),this.dispatchEvent(new CustomEvent("drop-down:open")),r.innerHTML="Close"}loadDetails(){this.href&&fetch(this.href).then(r=>{if(r.status!==200)throw`Status: ${r.status}`;return r.text()}).then(r=>this.addFragment(r))}addFragment(r){var i;const t=(i=this.shadowRoot)==null?void 0:i.querySelector(".loaded-container");t&&(t.innerHTML=r)}};G.styles=p`
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
    `;let x=G;Q([d({type:String})],x.prototype,"href");Q([d({type:Boolean,reflect:!0})],x.prototype,"open");var $t=Object.defineProperty,Pt=(o,r,t,i)=>{for(var e=void 0,a=o.length-1,n;a>=0;a--)(n=o[a])&&(e=n(r,t,e)||e);return e&&$t(r,t,e),e};const Ct=p`
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
    table {
        width: 100%;
        margin: var(--margin-size-med) auto;
      }
      th, td {
        border: 1px solid var(--color-font-primary);
        padding: var(--padding-size-small);
        text-align: left;
      }
      th {
        background-color: var(--color-background-primary);
        color: var(--color-font-primary);
      }
      td {
        background-color: var(--color-font-primary);
        color: var(--color-background-primary);
      }  
    `,O=class O extends L{constructor(){super(...arguments),this.tableView=!1}toggleView(){this.tableView=!this.tableView}loadDetails(r){if(r)try{fetch(r).then(t=>{if(t.status!==200)throw`Status: ${t.status}`;return t.text()})}catch(t){return console.error("Fetch error:",t),"Error loading details"}return"No details available"}render(){return s`
        <h1> RENDEZVOUS </h1>
        <label>
            <input type="checkbox" @change="${this.toggleView}" ?checked="${this.tableView}">
            Table View
        </label>
        ${this.tableView?this.renderTableView():this.renderCardView()}
        <button class="add-button">ADD +</button>
        `}renderCardView(){return s`
        <div class="card" style="background-image: url(./images/coachella-map.jpeg);">
            <div class="container">
              <h2 class="dates">4.12.24 - 4.14.24</h2>
              <h2>COACHELLA</h2>
              <h3>SLOmies</h3>
              <expand-info href='./data/rendezvous/coachella.html'>
              </expand-info>
            </div>
          </div>
          <div class="card" style="background-image: url(./images/edc-map.jpeg);">
            <div class="container">
              <h2 class="dates">5.17.24 - 5.19.24</h2>
              <h2>EDC LV</h2>
              <h3>The Best Group</h3>
              <expand-info href='./data/rendezvous/edc.html'>
              </expand-info>
            </div>
          </div>
        `}renderTableView(){return s`
        <table>
        <thead>
            <tr>
            <th>Festival</th>
            <th>Date</th>
            <th>Rendezvous</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td rowspan="17">COACHELLA</td>
                <td rowspan="1">4.11.24</td>
                <td rowspan="1"><code>3:00 PM</code><p>    Check-in @ AirBnb</p></td>
            </tr>
            <tr>
                <!-- Nothing in column 1 -->
                <td rowspan="5">4.12.24</td>
                <td><code>10:00 AM</code><p>    Head out</p></td>
            </tr>
            <tr>
                <td><code>1:00 PM</code><p>    Meet at Coachella Stage</p></td>
            </tr>
                <td><code>6:00 PM</code><p>    Meet at Terrace</p></td>
            <tr>
                <td> <code>9:00 PM</code><p>    Meet at Sahara</p></td>
            </tr>
            <tr>
                <td><code>2:00 AM</code><p>    Meet at Ferris Wheel</p></td>
            </tr>
            <tr>
                <!-- Nothing in column 1 -->
                <td rowspan="5">4.13.24</td>
                <td><code>12:00 PM</code><p>    Head out</p></td>
            </tr>
            <tr>
                <td><code>1:00 PM</code><p>    Meet at Dolab</p></td>
            </tr>
            <tr>
                <td><code>5:00 PM</code><p>    Meet at Astronaut</p></td>
            </tr>
            <tr>
                <td><code>9:00 PM</code><p>    Meet at Sahara</p></td>
            </tr>
            <tr>
                <td><code>2:00 AM</code><p>    Meet at Coachella Stage</p></td>
            </tr>
            <tr>
                <!-- Nothing in column 1 -->
                <td rowspan="5">4.14.24</td>
                <td><code>10:00 AM</code><p>    Head out</p></td>
            </tr>
            <tr>
                <td><code>1:00 PM</code><p>    Meet at Terrace</p></td>
            </tr>
            <tr>
                <td><code>6:00 PM</code><p>    Meet at Beer Barn</p></td>
            </tr>
            <tr>
                <td> <code>9:00 PM</code><p>    Meet at Coachella Stage</p></td>
            </tr>
            <tr>
                <td><code>2:00 AM</code><p>    Meet at Ferris Wheel</p></td>
            </tr>
            <tr>
                <!-- Nothing in column 1 -->
                <td rowspan="1">4.15.24</td>
                <td><code>11:00 AM</code><p>    Checkout of Airbnb</p></td>
            </tr>




            <tr>
                <td rowspan="16">EDC</td>
                <td rowspan="2">5.16.24</td>
                <td rowspan="1"><code>3:00 PM</code><p>    Check-in @ AirBnb</p></td>
            </tr>
            <tr>
                <td><code>5:00 PM</code><p>    Bonnie arrives @ airport</p></td>
            </tr>
            <tr>
                <!-- Nothing in column 1 -->
                <td rowspan="4">5.17.24</td>
                <td><code>6:00 AM</code><p>    Head out</p></td>
            </tr>
            <tr>
                <td><code>9:00 PM</code><p>     Meet at Cosmic Meadow</p></td>
            </tr>
                <td><code>12:00 PM</code><p>    Meet at Neon Garden</p></td>
            <tr>
                <td> <code>3:00 PM</code><p>    Meet at Carnival Square</p></td>
            </tr>
            <tr>
                <!-- Nothing in column 1 -->
                <td rowspan="5">5.18.24</td>
                <td><code>1:00 PM</code><p>    Lunch at AYCE BBQ</p></td>
            </tr>
            <tr>
                <td><code>7:00 PM</code><p>    Head out</p></td>
            </tr>
            <tr>
                <td><code>9:00 PM</code><p>    Meet at Polygon Park</p></td>
            </tr>
            <tr>
                <td><code>11:00 AM</code><p>    Meet at Waste land</p></td>
            </tr>
            <tr>
                <td><code>2:00 AM</code><p>    Meet at Carnival Square</p></td>
            </tr>
            <tr>
                <!-- Nothing in column 1 -->
                <td rowspan="5">5.19.24</td>
                <td><code>6:00 PM</code><p>    Head out</p></td>
            </tr>
            <tr>
                <td><code>9:00 PM</code><p>    Meet at Downtown EDC</p></td>
            </tr>
            <tr>
                <td><code>11:00 AM</code><p>    Meet at Circuit Grounds</p></td>
            </tr>
            <tr>
                <td> <code>3:00 AM</code><p>    Meet at Kinetic Field</p></td>
            </tr>
            <tr>
                <td><code>4:00 AM</code><p>    Meet at Super Shot</p></td>
            </tr>
        </tbody>
        </table>
        `}};O.uses=u({"expand-info":x}),O.styles=[Ct];let C=O;Pt([m()],C.prototype,"tableView");const St=[{path:"/app/festival",view:()=>s`
      <festival-view></festival-view>
    `},{path:"/app/group",view:()=>s`
      <group-view></group-view>
    `},{path:"/app/profile/:id",view:o=>s`
      <profile-view user-id=${o.id}></profile-view>
    `},{path:"/app/profile/:id/edit",view:o=>s`
      <profile-view edit user-id=${o.id}></profile-view>
    `},{path:"/app/profile/anonymous",redirect:"/login.html"},{path:"/app/profile/login.html",redirect:"/login.html"},{path:"/app",view:()=>s`
      <rendezvous-view></rendezvous-view>
    `},{path:"/",redirect:"/app"}];u({"mu-auth":z.Provider,"mu-store":class extends rt.Provider{constructor(){super(at,ot,"festivous:auth")}},"mu-history":J.Provider,"mu-switch":class extends et.Element{constructor(){super(St,"festivous:history","festivous:auth")}},"nav-header":w,"rendezvous-view":C,"profile-view":g,"group-view":f,"festival-view":D,"edit-card":c});u({"mu-auth":z.Provider,"nav-header":w});window.relayEvent=T.relay;
