import { define, View } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { Profile } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

class ProfileViewer extends LitElement {
  static styles = css`
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
    display: grid;
    text-align: right;
    margin-top: var(--margin-size-med);
  }
  nav > button {
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
  }
  nav > button:hover {
    background-color: var(--color-font-primary);
    color: var(--color-background-primary);
    border-color: var(--color-background-primary);
  }
  nav > * {
    grid-column: controls;
    margin-bottom: var(--margin-size-med);
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
    margin: 0;
  }
  restful-form input{
    grid-column: input;
    margin-bottom: var(--margin-size-med);
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

  render() {
    return html`
    <section>
    <slot name="avatar"></slot>
    <h1><slot name="name"></slot></h1>
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
      </dl>
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
    </section>
    `;
  }
}

class ProfileAvatarElement extends LitElement {
  @property()
  color: string = "white";

  @property()
  src?: string;

  render() {
    return html`
      <div
        class="avatar"
        style="
        ${this.color
        ? `--avatar-backgroundColor: ${this.color};`
        : ""}
        ${this.src
        ? `background-image: url('${this.src}');`
        : ""}
      "></div>
    `;
  }

  static styles = css`
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
  `;
}

export class ProfileViewElement extends View<Model, Msg> {
  static uses = define({
    "profile-viewer": ProfileViewer,
    "profile-avatar": ProfileAvatarElement
  });

  @property({ attribute: "user-id", reflect: true })
  userid = "";

  @property()
  get profile(): Profile | undefined {
    return this.model.profile;
  }

  constructor() {
    super("festivous:model");
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (
      name === "user-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      console.log("Profiler Page:", newValue);
      this.dispatchMessage([
        "profile/select",
        { userid: newValue }
      ]);
    }
  }

  render() {
    const {
      avatar,
      name,
      id,
      email,
      address,
    } = this.profile || {};

    return html`
      <profile-viewer>
        <profile-avatar
          slot="avatar"
          src=${avatar}></profile-avatar>
        <span slot="name">${name}</span>
        <span slot="id">${id}</span>
        <span slot="email">${email}</span>
        <span slot="address">${address}</span>
      </profile-viewer>
    `;
  }
}