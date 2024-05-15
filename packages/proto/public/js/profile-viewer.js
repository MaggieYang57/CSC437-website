import { prepareTemplate } from "./template.js";
import { loadJSON } from "./json-element.js";
import { Auth, Observer } from "@calpoly/mustang";
import "./restful-form.js";
import "./input-array.js";

export class ProfileViewElement extends HTMLElement {
  static observedAttributes = ["src", "mode"];

  get src() {
    return this.getAttribute("src");
  }

  get srcCollection() {
    const path = this.src.split("/");
    const collection = path.slice(0, -1);
    return collection.join("/");
  }

  get mode() {
    return this.getAttribute("mode");
  }

  set mode(m) {
    return this.setAttribute("mode", m);
  }

  static styles = `
    :host {
      --display-new-button: inline-block;
      --display-edit-button: inline-block;
      --display-close-button: none;
      --display-delete-button: none;
    }
    :host([mode="edit"]) {
      --display-new-button: none;
      --display-edit-button: none;
      --display-close-button: inline-block;
      --display-delete-button: inline-block;
    }
    :host([mode="new"]) {
      --display-new-button: none;
      --display-edit-button: none;
      --display-close-button: inline-block;
    }
    * {
      margin: 0;
      box-sizing: border-box;
    }
    section {
      display: grid;
      grid-template-columns: [key] 1fr [value] 3fr [controls] 1fr [end];
      gap: var(--margin-size-small) var(--margin-size-med);
      align-items: end;
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
      display: contents;
      text-align: right;
    }
    nav > * {
      grid-column: controls;
    }
    nav > .new {
      display: var(--display-new-button);
    }
    nav > .edit {
      display: var(--display-edit-button);
    }
    nav > .close {
      display: var(--display-close-button);
    }
    nav > .delete {
      display: var(--display-delete-button);
    }
    restful-form {
      display: none;
      grid-column: key / end;
    }
    restful-form input {
      grid-column: input;
    }
    restful-form[src] {
      display: block;
    }
    dl {
      display: grid;
      grid-column: key / end;
      grid-template-columns: subgrid;
      gap: 0 var(--margin-size-med);
      align-items: baseline;
    }
    restful-form[src] + dl {
      display: none;
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
  `;

  static template = prepareTemplate(`
  <template>
  <section>
    <slot name="avatar"></slot>
    <h1><slot name="name"></slot></h1>
      <nav>
        <button class="new"
          onclick="relayEvent(event,'profile-view:new-mode')"
        >New…</button>
        <button class="edit"
          onclick="relayEvent(event,'profile-view:edit-mode')"
        >Edit</button>
        <button class="close"
          onclick="relayEvent(event,'profile-view:view-mode')"
        >Close</button>
        <button class="delete"
          onclick="relayEvent(event,'profile-view:delete')"
          >Delete</button
        >
      </nav>
      <restful-form>
        <label>
          <span>Username</span>
          <input name="id"/>
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
          <span>Groups</span>
          <input-array name="groups">
            <span slot="label-add">Add a group</span>
          </input-array>
        </label>
        <label>
          <span>Festivals</span>
          <input-array name="festivals">
            <span slot="label-add">Add a festival</span>
          </input-array>
        </label>
      </restful-form>
      <dl>
        <dt>Username</dt>
        <dd><slot name="id"></slot></dd>
        <dt>Name</dt>
        <dd><slot name="name"></slot></dd>
        <dt>Email</dt>
        <dd><slot name="email"></slot></dd>
        <dt>Address</dt>
        <dd><slot name="address"></slot></dd>
        <dt>Groups</dt>
        <dd><slot name="groups"></slot></dd>
        <dt>Festivals</dt>
        <dd><slot name="festivals"></slot></dd>
      </dl>
    </section>
    <style>${ProfileViewElement.styles}</style>
    </template>
    `);

  get form() {
    return this.shadowRoot.querySelector("restful-form");
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      ProfileViewElement.template.cloneNode(true)
    );

    this.addEventListener(
      "profile-view:edit-mode",
      (event) => (this.mode = "edit")
    );

    this.addEventListener(
      "profile-view:view-mode",
      (event) => (this.mode = "view")
    );

    this.addEventListener(
      "profile-view:new-mode",
      (event) => (this.mode = "new")
    );

    this.addEventListener("profile-view:delete", (event) => {
      event.stopPropagation();
      deleteResource(this.src).then(() => (this.mode = "new"));
    });

    this.addEventListener("restful-form:created", (event) => {
      console.log("Created a profile", event.detail);
      const userid = event.detail.created.userid;
      this.mode = "view";
      this.setAttribute(
        "src",
        `${this.srcCollection}/${userid}`
      );
    });

    this.addEventListener("restful-form:updated", (event) => {
      console.log("Updated a profile", event.detail);
      this.mode = "view";
      console.log("LOading JSON", this.authorization);
      loadJSON(this.src, this, renderSlots, this.authorization);
    });
  }

  _authObserver = new Observer(this, "festivous:auth");

  get authorization() {
    console.log("Authorization for user, ", this._user);
    return (
      this._user?.authenticated && {
        Authorization: `Bearer ${this._user.token}`
      }
    );
  }

  connectedCallback() {
    this._authObserver.observe().then((obs) => {
      obs.setEffect(({ user }) => {
        console.log("Setting user as effect of change", user);
        this._user = user;
        if (this.src) {
          console.log("LOading JSON", this.authorization);
          loadJSON(
            this.src,
            this,
            renderSlots,
            this.authorization
          );
        }
      })
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(
      `Atribute ${name} changed from ${oldValue} to`,
      newValue
    );
    switch (name) {
      case "src":
        if (
          newValue &&
          this.mode !== "new" &&
          this.authorization
        ) {
          console.log("Loading JSON", this.authorization);
          loadJSON(
            this.src,
            this,
            renderSlots,
            this.authorization
          );
        }
        break;
      case "mode":
        if (newValue === "edit" && this.src) {
          this.form.removeAttribute("new");
          this.form.setAttribute("src", this.src);
        }
        if (newValue === "view") {
          this.form.removeAttribute("new");
          this.form.removeAttribute("src");
        }
        if (newValue === "new") {
          const newSrc = `${this.srcCollection}/$new`;
          this.replaceChildren();
          this.form.setAttribute("new", "new");
          this.form.setAttribute("src", newSrc);
        }
        break;
    }
  }
}

customElements.define("profile-view", ProfileViewElement);

function renderSlots(json) {
  console.log("RenderingSlots:", json);
  const entries = Object.entries(json);
  const slot = ([key, value]) => {
    let type = typeof value;

    if (type === "object") {
      if (Array.isArray(value)) type = "array";
    }

    if (key === "avatar") {
      type = "avatar";
    }

    switch (type) {
      case "array":
        return `<ul slot="${key}">
          ${value.map((s) => `<li>${s}</li>`).join("")}
          </ul>`;
      case "avatar":
        return `<profile-avatar slot="${key}"
          color="${json.color}"
          src="${value}">
        </profile-avatar>`;
      default:
        return `<span slot="${key}">${value}</span>`;
    }
  };

  return entries.map(slot).join("\n");
}

function deleteResource(src) {
  return fetch(src, { method: "DELETE" })
    .then((res) => {
      if (res.status != 204)
        throw `Deletion failed: Status ${res.status}`;
    })
    .catch((err) =>
      console.log("Error deleting resource:", err)
    );
}

export class ProfileAvatarElement extends HTMLElement {
  get src() {
    return this.getAttribute("src");
  }

  get color() {
    return this.getAttribute("color");
  }

  get avatar() {
    return this.shadowRoot.querySelector(".avatar");
  }

  static template = prepareTemplate(`
    <template>
      <div class="avatar">
      </div>
      <style>
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
      </style>
    </template>
    `);

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      ProfileAvatarElement.template.cloneNode(true)
    );
  }

  connectedCallback() {
    // console.log("Avatar connected", this);
    this.style.setProperty(
      "--avatar-backgroundColor",
      this.color
    );
    this.avatar.style.setProperty(
      "background-image",
      `url('${this.src}')`
    );
  }

  attributeChangedCallback(name, from, to) {
    switch (name) {
      case "color":
        this.style.setProperty("--avatar-backgroundColor", to);
        break;
      case "src":
        this.avatar.style.setProperty(
          "background-image",
          `url(${to})`
        );
        break;
    }
  }
}

customElements.define("profile-avatar", ProfileAvatarElement);