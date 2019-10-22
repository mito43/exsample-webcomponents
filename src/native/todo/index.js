const template = document.createElement('template');
template.innerHTML = `
  <style>
  :host {
    display: block;
  }
  h1 {
    color: black;
    font-family: Helvetica;
    text-align: center;
    font-size: 50px;
  }
  form {
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  </style>
  <h1>Todo App</h1>
  <form>
    <input type="text"></input>
    <button type="button">submit</button>
  </form>
`;

class App extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define('x-app', App);
