import { LitElement, html, css } from 'lit-element';
import './todo.js';

class App extends LitElement {
  static get properties() {
    return {
      _todoList: { type: Array }
    }
  }

  constructor() {
    super();
    this._todoList = [
      {
        label: 'TaskA',
        checked: false,
      },
      {
        label: 'TaskB',
        checked: true,
      },
      {
        label: 'TaskC',
        checked: false,
      }
    ];
  }

  firstUpdated() {
    this._inputElm = this.shadowRoot.querySelector('input');
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: Helvetica;
        font-weight: bold;
        color: black;
      }
      h1 {
        text-align: center;
        font-size: 50px;
      }
      form {
        text-align: center;
        margin-bottom: 20px;
      }
      #container x-todo {
        text-align: center;
      }
    `;
  }

  render() {
    return html`
      <h1>Todo App</h1>
      <form>
        <input type="text"></input>
        <button type="button" @click=${this._add}>submit</button>
      </form>
      <div id="container">
        ${this._todoList.map((item, index) => html`
          <x-todo
            ?checked=${item.checked}
            .index=${index}
            label=${item.label}
            @onToggle=${this._toggle}
            @onRemove=${this._remove}>
          </x-todo>
          `
        )}
      </div>
    `;
  }

  _add() {
    this._todoList = [...this._todoList, { label: this._inputElm.value, checked: false }];
    this._inputElm.value = '';
  }

  _toggle(e) {
    this._todoList = this._todoList.map((item, index) => {
      return index === e.detail ? {...item, checked: !item.checked} : item;
    });
  }

  _remove(e) {
    this._todoList = this._todoList.filter((todo, index) => {
      return index !== e.detail;
    });
  }
}

window.customElements.define('x-app', App);
