import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class KebabMenu extends LitElement {

    @property({ type: Boolean, reflect: true }) open = false;

    render() {
        return html`
        <slot name="actuator">
            <img src="../images/kebab-menu.svg" width="30px"/>
        </slot>
        <div id="panel">
            <slot></slot>
        </div>
        `;
    }

    static styles = css`
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
    `;
    
    constructor() {
        super();
        this.addEventListener("click", () => this.toggle());

        // this.attachShadow({ mode: "open" }).appendChild(
        // KebabMenu.template.cloneNode(true)
        // );
        // this.shadowRoot
        // .querySelector("slot[name='actuator']")
        // .addEventListener("click", () => this.toggle());
    }

    toggle() {
        // if (this.hasAttribute("open")) this.removeAttribute("open");
        // else this.setAttribute("open", "open");
        this.open = !this.open;
    }
}
