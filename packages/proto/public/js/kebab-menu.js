import { prepareTemplate } from "./template.js";

export class KebabMenu extends HTMLElement {
    parser = new DOMParser();

    //  inside slot doesn't work
    // where do i do :hover styling for shadowDom
    static template = prepareTemplate(`<template>
    <slot name="actuator">
        <img src="./images/kebab-menu.svg" width="30px"/>
    </slot>
    <div id="panel">
        <slot></slot>
    </div>
    <style>
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
    </style>
    </template>`);
    
    constructor() {
        super();

        this.attachShadow({ mode: "open" }).appendChild(
        KebabMenu.template.cloneNode(true)
        );
        this.shadowRoot
        .querySelector("slot[name='actuator']")
        .addEventListener("click", () => this.toggle());
    }

    toggle() {
        if (this.hasAttribute("open")) this.removeAttribute("open");
        else this.setAttribute("open", "open");
    }
}

customElements.define("kebab-menu", KebabMenu);