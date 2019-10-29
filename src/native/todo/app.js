import './todo.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
  :host {
    display: block;
    font-family: Helvetica;
    font-weight: bold;
  }
  h1 {
    color: black;
    text-align: center;
    font-size: 50px;
  }
  form {
    text-align: center;
    margin-bottom: 20px;
  }
  </style>
  <h1>Todo App</h1>
  <form>
    <input type="text"></input>
    <button type="button">submit</button>
  </form>
  <div id="container"></div>
`;

class App extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));
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
    this._container = this._shadowRoot.getElementById('container');
    this.submitBtn = this._shadowRoot.querySelector('button');
    this.submitBtn.addEventListener('click', () => this._add());
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    this._container.innerHTML = '';
    this._todoList.forEach(item=> {
      const todoElm = document.createElement('x-todo');
      todoElm.addEventListener('onToggle', () => todoElm.checked = !todoElm.checked);
      todoElm.addEventListener('onRemove', () => {
        console.log("Remove");
      });
      todoElm.label = item.label;
      todoElm.checked = item.checked;
      this._container.appendChild(todoElm);
    });
  }

  _add() {
    const inputElm = this._shadowRoot.querySelector('input');
    this._todoList.push({label: inputElm.value, checked: false});
    inputElm.value = '';
    this._render();
  }
}

window.customElements.define('x-app', App);
