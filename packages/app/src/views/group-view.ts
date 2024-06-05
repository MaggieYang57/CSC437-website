import { LitElement, html, css } from 'lit';
import { property, customElement} from "lit/decorators.js";
import { Group } from 'server/models';

@customElement('group-list')
export class GroupViewerElement extends LitElement {
  @property({ type: Array }) groups: Group[] = [];

  static styles = css`
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      margin: 0.5em 0;
      padding: 0.5em;
      border: 1px solid #ccc;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.fetchGroups();
  }

  async fetchGroups() {
    try {
      const response = await fetch('/api/groups');
      this.groups = await response.json();
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }

  render() {
    return html`
      <ul>
        ${this.groups.map(group => html`
          <li>
            <span>${group.name}</span>
            <a href="/group/${group.id}/edit">Edit</a>
          </li>
        `)}
      </ul>
    `;
  }
}

export class GroupEditorElement extends LitElement {
    @property({ type: Object }) group?: Group;
  
    static styles = css`
      form {
        display: flex;
        flex-direction: column;
      }
      label {
        margin-bottom: 0.5em;
      }
      input, button {
        margin-bottom: 1em;
      }
    `;
  
    connectedCallback() {
      super.connectedCallback();
      this.fetchGroup();
    }
  
    async fetchGroup() {
      const id = window.location.pathname.split('/').pop();
      try {
        const response = await fetch(`/api/groups/${id}`);
        this.group = await response.json();
      } catch (error) {
        console.error('Error fetching group:', error);
      }
    }
  
    async handleSubmit(event: Event) {
      event.preventDefault();
      if (!this.group) return;
  
      try {
        const response = await fetch(`/api/groups/${this.group.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.group)
        });
        if (response.ok) {
          alert('Group updated successfully');
        } else {
          alert('Error updating group');
        }
      } catch (error) {
        console.error('Error updating group:', error);
      }
    }
  
    handleInputChange(event: Event) {
      const target = event.target as HTMLInputElement;
      if (this.group) {
        if (target.name === 'people') {
            try {
              const profiles = JSON.parse(target.value) as String[];
              this.group.people = profiles;
            } catch (error) {
              console.error('Invalid format for people field:', error);
            }
        }
        else if (target.name === 'id')
            this.group.id = target.value;
        else if (target.name === 'name')
            this.group.name = target.value;
      }
    }
  
    render() {
      if (!this.group) {
        return html`<p>Loading...</p>`;
      }
  
      return html`
        <form @submit=${this.handleSubmit}>
          <label>
            Name:
            <input name="name" .value=${this.group.name || ''} @input=${this.handleInputChange} />
          </label>
          <button type="submit">Save</button>
        </form>
      `;
    }
  }

export class GroupAdderElement extends LitElement {
    @property({ type: String }) name = '';

    static styles = css`
        form {
        display: flex;
        flex-direction: column;
        }
        label {
        margin-bottom: 0.5em;
        }
        input, button {
        margin-bottom: 1em;
        }
    `;

    handleInputChange(event: Event) {
        const target = event.target as HTMLInputElement;
        this.name = target.value;
    }

    async handleSubmit(event: Event) {
        event.preventDefault();
        try {
        const response = await fetch('/api/groups', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: this.name })
        });
        if (response.ok) {
            alert('Group added successfully');
            this.name = '';
        } else {
            alert('Error adding group');
        }
        } catch (error) {
        console.error('Error adding group:', error);
        }
    }

    render() {
        return html`
        <form @submit=${this.handleSubmit}>
            <label>
            Name:
            <input name="name" .value=${this.name} @input=${this.handleInputChange} />
            </label>
            <button type="submit">Add Group</button>
        </form>
        `;
    }
}