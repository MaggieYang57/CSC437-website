
import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";

export class DropDownElement extends LitElement {    
    @property({ type: String }) href: string|null = "";
    @property({ type: Boolean, reflect: true }) open = false;

    constructor() {
        super();
    }

    render() {
        return html`
          <button id="view-button" on>View</button>
          <div class="loaded-container"></div>
        `;
      }
    
    firstUpdated() {
        this.href = this.getAttribute("href");
        this.open = this.hasAttribute("open");
        if (this.open) {
            this.loadDetails();
        }
        const viewButton = this.shadowRoot?.querySelector('#view-button');
        if (viewButton) {
            viewButton.addEventListener("click", () => this.toggle());
        }
        this.addEventListener("drop-down:open", () => this.loadDetails());
    }

    toggle() {
        if (this.hasAttribute("open")) {
            this.removeAttribute("open");
            this.dispatchEvent(new CustomEvent("drop-down:close"));
            const container = this.shadowRoot?.querySelector(".loaded-container");
            if (container) {
                container.innerHTML = "";
            }
        } else {
            this.setAttribute("open", '');
            this.dispatchEvent(new CustomEvent("drop-down:open"));
        }
    }

    loadDetails() {
        console.log('here')
        if (this.href){
        fetch(this.href)
            .then((response) => {
            if (response.status !== 200) {
                throw `Status: ${response.status}`;
            }
            return response.text();
            })
            .then((htmlString) => this.addFragment(htmlString))
        }
    }

    addFragment(htmlString: string) {
        const container = this.shadowRoot?.querySelector(".loaded-container");
        if (container) {
            container.innerHTML = htmlString;
        }
    }
}