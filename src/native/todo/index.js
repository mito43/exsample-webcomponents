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
    this._totoList = [];
    this.submitBtn = this._shadowRoot.querySelector('button');
    this.submitBtn.addEventListener('click', this._add.bind(this));
  }

  connectedCallback() {
    console.log('Custom element added to page.');
  }

  disconnectedCallback() {
    console.log('Custom element removed from page.');
  }

  adoptedCallback() {
    console.log('Custom element moved to new page.');
  }

  _add(e) {
    console.log('Click');
  }
}


window.customElements.define('x-app', App);
