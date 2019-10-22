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
  </style>
  <h1>Todo App</h1>
`;

class App extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define('x-app', App);
