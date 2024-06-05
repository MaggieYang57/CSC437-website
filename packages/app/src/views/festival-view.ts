import {
    View
  } from "@calpoly/mustang";
  import { css, html } from "lit";
  import { Msg } from "../messages";
  import { Model } from "../model";

  const festivalStyles = css`
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
    .overlay {
        z-index: 2;
        width: var(--full-width);
        height: var(--full-width);
        position: relative;
        border-radius: var(--border-radius-med);
        overflow: hidden;
        color: var(--color-font-primary);
    }
    .festival {
        padding: var(--margin-size-small);
        background-color: var(--overlay-color-light);
        color: var(--color-background-primary);
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

  export class FestivalViewElement extends View<Model, Msg> {
    render() {
        return html`
          <h1>YOUR FESTIVALS</h1>
          <div class="card" style="background-image: url(./images/ferris-wheel.jpg);">
            <div class="overlay festival">
              <h2 class="dates">4.12.24 - 4.14.24</h2>
              <h2>COACHELLA</h2>
            </div>
          </div>
          <div class="card" style="background-image: url(./images/edc.jpg);">
            <div class="overlay festival">
              <h2 class="dates">5.17.24 - 5.19.24</h2>
              <h2>EDC LV</h2>
            </div>
          </div>
          <div class="card" style="background-image: url(./images/electric-forest.jpeg);">
            <div class="overlay festival">
              <h2 class="dates">6.20.24 - 6.23.24</h2>
              <h2>ELECTRIC FOREST</h2>
            </div>
          </div>
          <button class="add-button">ADD +</button>
        `;
    }

    static styles = [
        festivalStyles
    ];
  }
