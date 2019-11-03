import { html, render } from 'lit-html';
import './todo.js';

class App extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this.todoList = [
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
    render(this.template, this._shadowRoot, {eventContext: this});
  }

  get template() {
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
        ${this.todoList.map((item, index) => html`
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
    if(inputElm.value.length > 0) {
      this.todoList = [...this._todoList, { label: inputElm.value, checked: false }];
      inputElm.value = '';
    }
  }

  _toggle(e) {
    this.todoList = this._todoList.map((todo, index) => {
      return index === e.detail ? {...todo, checked: !todo.checked} : todo;
    });
  }

  _remove(e) {
    this.todoList = this._todoList.filter((todo, index) => {
      return index !== e.detail;
    });
  }

  set todoList(value) {
    this._todoList = value;
    render(this.template, this._shadowRoot, {eventContext: this});
  }

  get todoList() {
    return this._todoList;
  }
}

window.customElements.define('x-app', App);
