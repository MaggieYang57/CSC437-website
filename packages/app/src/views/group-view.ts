import { LitElement, css, html } from 'lit';
import { EditableCard } from '../components/card-display';
import { define, View } from '@calpoly/mustang';
import { property, state } from 'lit/decorators.js';
import { Group } from 'server/models';
import { Msg } from '../messages';
import { Model } from '../model';
import { KebabMenu } from '../components/kebab-menu';

const groupStyles = css`
    * {
        margin: 0rem;
        box-sizing: border-box;
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
    .names {
        font-weight: var(--font-weight-med);
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
    .header {
        position: relative;
        width: var(--full-width);
        h2 {
            float:left;
            margin: 0;
        }
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
    
`

class GroupViewer extends LitElement {
    // @state() private items: Array<{id: string, name: string, people: string[]}> = [];

    static uses = define({
        "edit-card": EditableCard,
        "kebab-menu": KebabMenu
      });

    // fetchData() {
    //     // Simulating data fetching. Replace this with actual API call.
    //     const data = new Promise(resolve => {
    //       setTimeout(() => {
    //         resolve([
    //           { id: "test", name: "test group", people: ["bonnie"] },
    //           // Add more objects as needed
    //         ]);
    //       }, 1000);
    //     });
    
    //     this.items = data as Array<{id: string, name: string, people: string[]}>;
    //   }

    // render() {
    //     return html`
    //     <div class="card-view">
    //         <edit-card apiEndpoint="/api/groups/test"></edit-card>
    //     </div>
    //     `;
    //   }
    
    render() {
        return html`
        <h1> GROUPS </h1>
        <div class="card">
        <div class="container" style="background-color: var(--color-card-first); width: 100%;">
            <div class="header">
            <h2>SLOmies</h2>
            <kebab-menu>
                <div>Edit Name</div>
                <div>Add Member</div>
                <div>Remove Member</div>
            </kebab-menu>
            </div>
            <ul class="names">
            <li>John Do</li>
            <li>Mary Lee</li>
            <li>Sophia Chen</li>
            <li>Bonnie Brown</li>
            </ul>
        </div>
        </div>
        <div class="card">
        <div class="container" style="background-color: var(--color-card-second); width: 100%;">
            <div class="header">
            <h2>Three Blind Mice</h2>
            <kebab-menu>
                <div>Edit Name</div>
                <div>Add Member</div>
                <div>Remove Member</div>
            </kebab-menu>
            </div>
            <ul class="names">
            <li>Remy Randeuto</li>
            <li>Stuart Mouserton</li>
            <li>Bonnie Brown</li>
            </ul>
        </div>
        </div>
        <div class="card">
        <div class="container" style="background-color: var(--color-card-third); width: 100%;">
            <div class="header">
            <h2>The Best Group</h2>
            <kebab-menu>
                <div>Edit Name</div>
                <div>Add Member</div>
                <div>Remove Member</div>
            </kebab-menu>
            </div>
            <ul class="names">
            <li>Maxine Ly</li>
            <li>Irene Chen</li>
            <li>Mona Makam</li>
            <li>Bonnie Brown</li>
            </ul>
        </div>
        </div>
        <button class="add-button">CREATE +</button>
        `
    }

    static styles = [
        groupStyles
    ];
  }
  
  export class GroupViewElement extends View<Model, Msg> {
    static uses = define({
      "group-viewer": GroupViewer,
    });
  
    @property({ type: Boolean, reflect: true })
    edit = false;
  
    @property({ attribute: "user-id", reflect: true })
    userid = "";
  
    @state()
    get group(): Group | undefined {
      return this.model.group;
    }
  
    constructor() {
      super("festivous:model");
    }
  
    attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string
    ) {
      super.attributeChangedCallback(name, oldValue, newValue);
      if (
        name === "user-id" &&
        oldValue !== newValue &&
        newValue
      ) {
        console.log("Group Page:", newValue); // need this dispatch to actually populate element with group data
        this.dispatchMessage([
          "group/select",
          { id: newValue }
        ]);
      }
    }
  
    render() {
      return html`
            <group-viewer></group-viewer>
          `;
    }
  
    // _handleSubmit(event: Form.SubmitEvent<Profile>) {
    //   console.log("Handling submit of mu-form");
    //   this.dispatchMessage([
    //     "profile/save",
    //     {
    //       id: this.id,
    //       profile: event.detail,
    //       onSuccess: () =>
    //         History.dispatch(this, "history/navigate", {
    //           href: `/app/profile/${event.detail.id}`
    //         }),
    //       onFailure: (error: Error) =>
    //         console.log("ERROR:", error)
    //     }
    //   ]);
    // }
}