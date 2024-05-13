import { addFragment } from "./fragment-loader";

export class DropDownElement extends HTMLElement {    
    constructor() {
        super();
        this.parser = new DOMParser();
    }

    connectedCallback() {
        const href = this.getAttribute("href");
        const open = this.hasAttribute("open");
        if (open) {
            this.loadDetails(href, this);
        }
        this.addEventListener("drop-down:open", () => this.loadDetails(href, this));
        const viewButton = this.querySelector('#view-button');
        viewButton.addEventListener("click", () => {
            this.toggle()
        });
    }

    toggle() {
        console.log('called togll')
        if (this.hasAttribute("open")) {
            this.removeAttribute("open");
            this.dispatchEvent(new CustomEvent("drop-down:close"));
            const loadedContainer = this.querySelector(".loaded-container");
            if (loadedContainer) {
                loadedContainer.remove();
            }
        } else {
            this.setAttribute("open", '');
            this.dispatchEvent(new CustomEvent("drop-down:open"));
        }
    }

    loadDetails(href, container) {
        fetch(href)
        .then((response) => {
          if (response.status !== 200) {
            throw `Status: ${response.status}`;
          }
          return response.text();
        })
        .then((htmlString) => addFragment(htmlString, container))
        .catch((error) =>
          addFragment(
            `<p class="error">
            Failed to fetch ${href}: ${error}
            </p>`,
            container
          )
        );
    }
}

customElements.define("drop-down", DropDownElement);