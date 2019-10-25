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
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  li {
    font-size: 24px;
    color: gray;
  }
  </style>
  <h1>Todo App</h1>
  <form>
    <input type="text"></input>
    <button type="button">submit</button>
  </form>
  <ul></ul>
`;

class App extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._todoList = [];
    this.submitBtn = this._shadowRoot.querySelector('button');
    this.submitBtn.addEventListener('click', () => this._add());
    this.todoListElm = this._shadowRoot.querySelector('ul');
  }

  _render() {
    this.todoListElm.innerHTML = '';
    this._todoList.forEach(item => {
      const todoElm = document.createElement('li');
      todoElm.innerHTML = item.label;
      this.todoListElm.appendChild(todoElm);
    });
  }

  _add() {
    const inputElm = this._shadowRoot.querySelector('input');
    this._todoList.push({label: inputElm.value, isChecked: false});
    inputElm.value = '';
    this._render();
  }
}

window.customElements.define('x-app', App);
