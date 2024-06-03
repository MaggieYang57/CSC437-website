import {
    define,
    Form,
    History,
    InputArray,
    View
  } from "@calpoly/mustang";
  import { css, html, LitElement } from "lit";
  import { property, state } from "lit/decorators.js";
  import { Profile } from "server/models";
  import { ProfileAvatarElement } from "../components/profile-avatar";
  import { Msg } from "../messages";
  import { Model } from "../model";
  
  const gridStyles = css`
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
  `;
  
  class ProfileViewer extends LitElement {
    @property()
    username?: string;
  
    render() {
        console.log(this.username);
      return html`
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
      `;
    }
  
    static styles = [
      gridStyles,
      css`
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
      `
    ];
  }
  
  class ProfileEditor extends LitElement {
    static uses = define({
      "mu-form": Form.Element,
      "input-array": InputArray.Element
    });
    @property()
    username?: string;
  
    @property({ attribute: false })
    init?: Profile;
  
    render() {
      return html`
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
      `;
    }
  
    static styles = [
      gridStyles,
      css`
        mu-form {
          grid-column: key / end;
        }
        mu-form input {
          grid-column: input;
        }
      `
    ];
  }
  
  export class ProfileViewElement extends View<Model, Msg> {
    static uses = define({
      "profile-viewer": ProfileViewer,
      "profile-editor": ProfileEditor,
      "profile-avatar": ProfileAvatarElement
    });
  
    @property({ type: Boolean, reflect: true })
    edit = false;
  
    @property({ attribute: "user-id", reflect: true })
    userid = "";
  
    @state()
    get profile(): Profile | undefined {
      return this.model.profile;
    }
  
    constructor() {
      super("festivous:model");
      this.addEventListener("mu-form:submit", (event) =>
        this._handleSubmit(event as Form.SubmitEvent<Profile>)
      );
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
          { id: newValue }
        ]);
      }
    }
  
    render() {
      const {
        avatar,
        name,
        id,
        address,
      } = this.profile || {};
      const initial = (name || id || "?").slice(
        0,
        1
      );
  
      const fields = html`
        <profile-avatar
          slot="avatar"
          src=${avatar}
          initial=${initial}></profile-avatar>
      `;
  
      console.log(id)
      return this.edit
        ? html`
            <profile-editor
              username=${id}
              .init=${this.profile}
              @mu-form:submit=${(
          event: Form.SubmitEvent<Profile>
        ) => this._handleSubmit(event)}>
              ${fields}
            </profile-editor>
          `
        : html`
            <profile-viewer username=${id}>
              ${fields}
              <span slot="name">${name}</span>
              <span slot="userid">${id}</span>
              <span slot="address">${address}</span>
            </profile-viewer>
          `;
    }
  
    _handleSubmit(event: Form.SubmitEvent<Profile>) {
      console.log("Handling submit of mu-form");
      this.dispatchMessage([
        "profile/save",
        {
          id: this.id,
          profile: event.detail,
          onSuccess: () =>
            History.dispatch(this, "history/navigate", {
              href: `/app/profile/${event.detail.id}`
            }),
          onFailure: (error: Error) =>
            console.log("ERROR:", error)
        }
      ]);
    }
}