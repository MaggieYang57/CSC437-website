import { LitElement, html } from 'lit';
// import { state} from "lit/decorators.js";
import { EditableCard } from '../components/card-display';
import { define, Form, View } from '@calpoly/mustang';
import { property, state } from 'lit/decorators.js';
import { Group, Profile } from 'server/models';
import { ProfileAvatarElement } from '../components/profile-avatar';
import { Msg } from '../messages';
import { Model } from '../model';

class GroupViewer extends LitElement {
    // @state() private items: Array<{id: string, name: string, people: string[]}> = [];

    static uses = define({
        "edit-card": EditableCard
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

    render() {
        return html`
        <div class="card-view">
            <edit-card apiEndpoint="/api/groups/test"></edit-card>
        </div>
        `;
      }
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