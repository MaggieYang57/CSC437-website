
export class KebabMenu extends HTMLElement {
    parser = new DOMParser();

    static template = prepareTemplate(`<template>
    <slot name="actuator">
        <object data="./images/kebab-menu.svg" width="30px"></object>
    </slot>
    <div id="panel">
        <slot></slot>
    </div>
    <style> /* styling */ </style>
    </template>`);
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).appendChild(
        DropDownElement.template.cloneNode(true)
        );
        
        this.button = this.shadowRoot.querySelector("slot[name='actuator']")
        this.panel = this.shadowRoot.querySelector("#panel")

        this.button.addEventListener("click", () => this.toggle());
    }

    toggle() {
        if (this.panel.hasAttribute('open')) {
            this.panel.removeAttribute('open');
        } else {
            this.panel.setAttribute('open', '');
        }
    }

    // loadDetails(href, container) {
    //     console.log("Loading details from:", href);
    //     fetch(href)
    //     .then((response) => {
    //       if (response.status !== 200) {
    //         throw `Status: ${response.status}`;
    //       }
    //       return response.text();
    //     })
    //     .then((htmlString) => this.addFragment(htmlString, container))
    //     .catch((error) =>
    //       this.addFragment(
    //         `<p class="error">
    //         Failed to fetch ${href}: ${error}
    //         </p>`,
    //         container
    //       )
    //     );
    // }

    // addFragment(htmlString, container) {
    //     const doc = this.parser.parseFromString(htmlString, "text/html");
    //     const fragment = Array.from(doc.body.childNodes);
    //     container.append(...fragment);
    // }
}

customElements.define("kebab-menu", KebabMenu);