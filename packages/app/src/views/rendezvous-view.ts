import {
    define,
    View
  } from "@calpoly/mustang";
  import { css, html } from "lit";
  import { Msg } from "../messages";
  import { Model } from "../model";
import { ExpandInfoElement } from "../components/expand-info";

  const rendezStyles = css`
    * {
    margin: 0rem;
    box-sizing: border-box;
    }
    img {
        max-width: 100%;
    }
    body {
        margin: var(--body-margin);
        background-color: var(--color-background-primary);
        color: var(--color-font-primary);
        font-family: "Pontano Sans", sans-serif;
        font-weight: var(--font-weight-body);
        font-size: var(--font-size-body);
        letter-spacing: var(--line-width);
    }
    h1 {
        font-family: "Prompt", sans-serif;
        font-weight: var(--font-weight-xlarge);
        font-size: var(--font-size-xxlarge);
    }
    h2 {
        font-family: "Prompt", sans-serif;
        font-weight: var(--font-weight-xlarge);
        font-size: var(--font-size-xlarge);
    }
    drop-down {
        .line {
            position: absolute;
            width: var(--line-width); 
            height: var(--line-height); 
            background-color: black; 
        }
        
        .loaded-content {
            margin: var(--margin-size-small) 0;
            padding-left: var(--margin-size-small);
            h1 {
                font-size: var(--font-size-xlarge);
            }
            p {
                white-space: pre;
            }
        }
    }
    .card {
        box-shadow: var(--box-shadow-dark);
        background-color: var(--color-font-primary);
        color: var(--color-background-primary);
        display: flex;
        margin: var(--margin-size-med) auto;
        width: var(--card-width);
        height: auto;
        border-radius: var(--border-radius-med);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        overflow: hidden;
    }
    .card:hover {
        box-shadow: var(--box-shadow-light);
    }
    .dates{
        font-size: var(--font-size-large);
    }
    .container {
        padding: var(--margin-size-small) var(--margin-size-med);
        background-color: var(--overlay-color-xlight);
        border-radius: var(--border-radius-med);
        transition: transform 4s ease-in-out; 
        position: relative;
        display: grid;
        width: var(--container-width);
        left: 0;
    }
    button {
        border-radius: var(--border-radius-large);
        border-width: var(--line-width);
        border-color: var(--color-background-primary);
        border-style: solid;
        background-color: transparent;
        padding: var(--button-padding);
        box-shadow: none;
        margin-top: var(--margin-size-small);
        font-size: var(--font-size-body);
    
        &.add-button {
            border-color: var(--color-font-primary);
            color: var(--color-font-primary);
            margin: var(--margin-size-med) auto;
            left: auto;
            right: auto;
            display: block;
            width: var(--card-width);
            height: auto;
            transition: var(--transition-default);
            font-size: var(--font-size-large);
        }
        &.add-button:hover {
            background-color: var(--color-font-primary);
            color: var(--color-background-primary);
            border-color: var(--color-background-primary);
        }
    }    
    `;

  export class RendezvousViewElement extends View<Model, Msg> {
    static uses = define({
        "expand-info": ExpandInfoElement,
      });

    render() {
        return html`
          <h1> RENDEZVOUS </h1>
          <div class="card" style="background-image: url(./images/coachella-map.jpeg);">
            <div class="container">
              <h2 class="dates">4.12.24 - 4.14.24</h2>
              <h2>COACHELLA</h2>
              <h3>SLOmies</h3>
              <expand-info href='./public/data/rendezvous/coachella.html'>
              </expand-infon>
            </div>
          </div>
          <div class="card" style="background-image: url(./images/edc-map.jpeg);">
            <div class="container">
              <h2 class="dates">5.17.24 - 5.19.24</h2>
              <h2>EDC LV</h2>
              <h3>The Best Group</h3>
              <expand-info href='./public/data/rendezvous/edc.html' />
            </div>
          </div>
          <button class="add-button">ADD +</button>
        `;
    }

    static styles = [
        rendezStyles
    ];
  }
