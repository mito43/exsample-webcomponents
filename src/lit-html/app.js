import { html, render } from 'lit-html';
import './todo.js';

class App extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
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

  connectedCallback() {
    render(this._template(), this._shadowRoot, {eventContext: this});
  }

  _template() {
    return html`
      <style>
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
      </style>
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
    const inputElm = this._shadowRoot.querySelector('input');
    this._todoList = [...this._todoList, { label: inputElm.value, checked: false }];
    inputElm.value = '';
    render(this._template(), this._shadowRoot, {eventContext: this});
  }

  _toggle(e) {
    this._todoList = this._todoList.map((item, index) => {
      return index === e.detail ? {...item, checked: !item.checked} : item;
    });
    render(this._template(), this._shadowRoot, {eventContext: this});
  }

  _remove(e) {
    this._todoList = this._todoList.filter((todo, index) => {
      return index !== e.detail;
    });
    render(this._template(), this._shadowRoot, {eventContext: this});
  }
}

window.customElements.define('x-app', App);
