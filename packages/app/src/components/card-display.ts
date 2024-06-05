import { Auth, Observer } from '@calpoly/mustang';
import { LitElement, html, css } from 'lit';
import { property, state} from "lit/decorators.js";

export class EditableCard extends LitElement {
    @property({ type: String, reflect: true }) apiEndpoint = '';
    @property() username = "";
    @state() private item = { id: '', name: '', people: []};
    @state() private isEditing = false;
    @state() private tempItem = { id: '', name: '', people: []};
  
    static styles = css`
      .card {
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
        max-width: 300px;
        position: relative;
      }
  
      .card:hover {
        transform: scale(1.05);
      }
  
      .card img {
        width: 100%;
        height: auto;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
  
      .card h3, .card h2 {
        margin: 0;
      }
      
      .card .date {
        font-weight: bold;
        color: #555;
        margin-bottom: 0.5em;
      }
  
      .card .description {
        margin-top: 1em;
        color: #666;
      }
  
      .edit-button, .save-button, .cancel-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #007BFF;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
      }
  
      .save-button, .cancel-button {
        right: auto;
        left: 10px;
      }
    `;

    _authObserver = new Observer<Auth.Model>(
        this,
        "festivous:auth"
      );

    connectedCallback() {
      super.connectedCallback();
      this.fetchData();
      this._authObserver.observe(({ user }) => {
        if (user) {
            this.username = user.username;
        }
        });
    }
  
    async fetchData() {
      try {
        const response = await fetch(this.apiEndpoint);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        this.item = data;
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
  
    toggleEdit() {
      this.isEditing = !this.isEditing;
      if (this.isEditing) {
        this.tempItem = { ...this.item };
      }
    }
  
    saveEdit() {
      this.item = { ...this.tempItem };
      this.isEditing = false;
      // You can add code to send the updated data back to the server here.
    }
  
    cancelEdit() {
      this.isEditing = false;
    }
  
    handleInputChange(e: Event) {
      const target = e.target as HTMLInputElement;
      this.tempItem = { ...this.tempItem, [target.name]: target.value };
    }
  
    render() {
      return html`
        <div class="card">
          ${this.isEditing ? html`
            <input type="text" name="id" .value="${this.tempItem.id}" @input="${this.handleInputChange}" />
            <input type="text" name="name" .value="${this.tempItem.name}" @input="${this.handleInputChange}" />
            <input type="text" name="people" .value="${this.tempItem.people}" @input="${this.handleInputChange}" />
            <button class="save-button" @click="${this.saveEdit}">Save</button>
            <button class="cancel-button" @click="${this.cancelEdit}">Cancel</button>
          ` : html`
            <h2>${this.item.id}</h2>
            <div class="name">${this.item.name}</div>
            <div class="people">${this.item.people}</div>
            <button class="edit-button" @click="${this.toggleEdit}">Edit</button>
          `}
        </div>
      `;
    }
  }