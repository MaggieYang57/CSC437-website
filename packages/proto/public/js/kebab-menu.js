import { prepareTemplate } from "./template.js";

export class KebabMenu extends HTMLElement {
    parser = new DOMParser();

    // <object data="./images/kebab-menu.svg" width="30px"></object> inside slot doesn't work
    // where do i do :hover styling for shadowDom
    static template = prepareTemplate(`<template>
    <slot name="actuator">
        <button>Menu</button
    </slot>
    <div id="panel">
        <slot></slot>
    </div>
    <style>
        :host {
            position: fixed;
            float: right;
            cursor: pointer
        }
        #panel {
            display: none;
            position: left;
            width: max-content;
            padding: 5px 15px;
            border-width: 1px;
            border-color: var(--color-background-primary);
            border-style: solid;
            border-radius: var(--border-radius-small);
            background: var(--color-card-first);
        }
        :host([open]) #panel {
            display: block;
        }
        div:hover{
                background: lighten(grey, 30%);
        }

        object{
            color: var(--color-background-primary)
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