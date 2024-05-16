import { Auth, Observer } from "@calpoly/mustang";
import { prepareTemplate } from "./template.js";
import { addFragment } from "./fragment-loader.js";
import "./drop-down.js";

export class NavHeaderElement extends HTMLElement {
  static template = prepareTemplate(`
    <template>
        <header>
            <nav class='nav'>
                <a href="/index.html" class="logo">FESTIVOUS</a>
                <a href="/festival.html">FESTIVALS</a>
                <a href="/rendezvous.html">RENDEZVOUS</a>
                <a href="/group.html">GROUPS</a>
                <a href="/login.html" class="right" id="profile-link">PROFILE</a>
            </nav>
        </header>
      <style>
        :host {
            display: contents;
        }
        .nav{
            display: block;
            a {
                padding: var(--body-margin);
                font-family: "Pontano Sans", sans-serif;
                text-decoration: none;
                color: var(--color-font-primary);
                font-weight: var(--font-weight-body);
                font-size: var(--font-size-med);
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
      </style>
    </template>
  `);

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
        NavHeaderElement.template.cloneNode(true)
    );
    if (localStorage.getItem('mu:auth:jwt')) {
        console.log('hereeee')
        this.shadowRoot.querySelector("#profile-link").setAttribute("href", "/profile");
    }
  }

  _authObserver = new Observer(this, "festivous:auth");

  connectedCallback() {
    this._authObserver.observe().then((obs) => {
      obs.setEffect(({ user }) => {
        if (user) {
          const { username } = user;
          this.replaceChildren();
          addFragment(
            `<span slot="greeting">Hello, ${username}</span>`,
            this
          );
        }
      });
    });
  }
}

customElements.define("nav-header", NavHeaderElement);