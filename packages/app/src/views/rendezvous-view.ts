import {
    define,
    View
  } from "@calpoly/mustang";
  import { css, html } from "lit";
  import { Msg } from "../messages";
  import { Model } from "../model";
import { ExpandInfoElement } from "../components/expand-info";
import { state } from "lit/decorators.js";

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
    table {
        width: 100%;
        margin: var(--margin-size-med) auto;
      }
      th, td {
        border: 1px solid var(--color-font-primary);
        padding: var(--padding-size-small);
        text-align: left;
      }
      th {
        background-color: var(--color-background-primary);
        color: var(--color-font-primary);
      }
      td {
        background-color: var(--color-font-primary);
        color: var(--color-background-primary);
      }  
    `;

  export class RendezvousViewElement extends View<Model, Msg> {
    static uses = define({
        "expand-info": ExpandInfoElement,
      });

    @state()
    private tableView = false;

    toggleView() {
        this.tableView = !this.tableView; // Toggle between card and table view
    }

    loadDetails(href: string) {
        if (href) {
          try {
            fetch(href)
            .then((response) => {
            if (response.status !== 200) {
                throw `Status: ${response.status}`;
            }
            return response.text();
            })
          } catch (error) {
            console.error("Fetch error:", error);
            return "Error loading details";
          }
        }
        return "No details available";
    }

    render() {
        return html`
          <h1> RENDEZVOUS </h1>
          <label>
            <input type="checkbox" @change="${this.toggleView}" ?checked="${this.tableView}">
            Toggle View
        </label>
          ${this.tableView ? this.renderTableView() : this.renderCardView()}
          <button class="add-button">ADD +</button>
        `;
    }

    renderCardView() {
        return html `
        <div class="card" style="background-image: url(./images/coachella-map.jpeg);">
            <div class="container">
              <h2 class="dates">4.12.24 - 4.14.24</h2>
              <h2>COACHELLA</h2>
              <h3>SLOmies</h3>
              <expand-info href='./data/rendezvous/coachella.html'>
              </expand-info>
            </div>
          </div>
          <div class="card" style="background-image: url(./images/edc-map.jpeg);">
            <div class="container">
              <h2 class="dates">5.17.24 - 5.19.24</h2>
              <h2>EDC LV</h2>
              <h3>The Best Group</h3>
              <expand-info href='./data/rendezvous/edc.html'>
              </expand-info>
            </div>
          </div>
        `
    }

    renderTableView(){
        // const coachellaData = this.loadDetails("./public/data/rendezvous/coachella.html");
        // const edcData = this.loadDetails("./public/data/rendezvous/edc.html");

        return html `
        <table>
        <thead>
            <tr>
            <th>Festival</th>
            <th>Date</th>
            <th>Rendezvous</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td rowspan="17">COACHELLA</td>
                <td rowspan="1">4.11.24</td>
                <td rowspan="1"><code>3:00 PM</code><p>    Check-in @ AirBnb</p></td>
            </tr>
            <tr>
                <!-- Nothing in column 1 -->
                <td rowspan="5">4.12.24</td>
                <td><code>10:00 AM</code><p>    Head out</p></td>
            </tr>
            <tr>
                <td><code>1:00 PM</code><p>    Meet at Coachella Stage</p></td>
            </tr>
                <td><code>6:00 PM</code><p>    Meet at Terrace</p></td>
            <tr>
                <td> <code>9:00 PM</code><p>    Meet at Sahara</p></td>
            </tr>
            <tr>
                <td><code>2:00 AM</code><p>    Meet at Ferris Wheel</p></td>
            </tr>
            <tr>
                <!-- Nothing in column 1 -->
                <td rowspan="5">4.13.24</td>
                <td><code>12:00 PM</code><p>    Head out</p></td>
            </tr>
            <tr>
                <td><code>1:00 PM</code><p>    Meet at Dolab</p></td>
            </tr>
            <tr>
                <td><code>5:00 PM</code><p>    Meet at Astronaut</p></td>
            </tr>
            <tr>
                <td><code>9:00 PM</code><p>    Meet at Sahara</p></td>
            </tr>
            <tr>
                <td><code>2:00 AM</code><p>    Meet at Coachella Stage</p></td>
            </tr>
            <tr>
                <!-- Nothing in column 1 -->
                <td rowspan="5">4.14.24</td>
                <td><code>10:00 AM</code><p>    Head out</p></td>
            </tr>
            <tr>
                <td><code>1:00 PM</code><p>    Meet at Terrace</p></td>
            </tr>
            <tr>
                <td><code>6:00 PM</code><p>    Meet at Beer Barn</p></td>
            </tr>
            <tr>
                <td> <code>9:00 PM</code><p>    Meet at Coachella Stage</p></td>
            </tr>
            <tr>
                <td><code>2:00 AM</code><p>    Meet at Ferris Wheel</p></td>
            </tr>
            <tr>
                <!-- Nothing in column 1 -->
                <td rowspan="1">4.15.24</td>
                <td><code>11:00 AM</code><p>    Checkout of Airbnb</p></td>
            </tr>




            <tr>
                <td rowspan="16">EDC</td>
                <td rowspan="2">5.16.24</td>
                <td rowspan="1"><code>3:00 PM</code><p>    Check-in @ AirBnb</p></td>
            </tr>
            <tr>
                <td><code>5:00 PM</code><p>    Bonnie arrives @ airport</p></td>
            </tr>
            <tr>
                <!-- Nothing in column 1 -->
                <td rowspan="4">5.17.24</td>
                <td><code>6:00 AM</code><p>    Head out</p></td>
            </tr>
            <tr>
                <td><code>9:00 PM</code><p>     Meet at Cosmic Meadow</p></td>
            </tr>
                <td><code>12:00 PM</code><p>    Meet at Neon Garden</p></td>
            <tr>
                <td> <code>3:00 PM</code><p>    Meet at Carnival Square</p></td>
            </tr>
            <tr>
                <!-- Nothing in column 1 -->
                <td rowspan="5">5.18.24</td>
                <td><code>1:00 PM</code><p>    Lunch at AYCE BBQ</p></td>
            </tr>
            <tr>
                <td><code>7:00 PM</code><p>    Head out</p></td>
            </tr>
            <tr>
                <td><code>9:00 PM</code><p>    Meet at Polygon Park</p></td>
            </tr>
            <tr>
                <td><code>11:00 AM</code><p>    Meet at Waste land</p></td>
            </tr>
            <tr>
                <td><code>2:00 AM</code><p>    Meet at Carnival Square</p></td>
            </tr>
            <tr>
                <!-- Nothing in column 1 -->
                <td rowspan="5">5.19.24</td>
                <td><code>6:00 PM</code><p>    Head out</p></td>
            </tr>
            <tr>
                <td><code>9:00 PM</code><p>    Meet at Downtown EDC</p></td>
            </tr>
            <tr>
                <td><code>11:00 AM</code><p>    Meet at Circuit Grounds</p></td>
            </tr>
            <tr>
                <td> <code>3:00 AM</code><p>    Meet at Kinetic Field</p></td>
            </tr>
            <tr>
                <td><code>4:00 AM</code><p>    Meet at Super Shot</p></td>
            </tr>
        </tbody>
        </table>
        `
    }

    static styles = [
        rendezStyles
    ];
  }
