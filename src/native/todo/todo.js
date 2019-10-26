const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      font-family: Helvetica;
      font-weight: bold;
    }
  </style>
  <label></label>
`;

class HTMLTodoElement extends HTMLElement {
  static get observedAttributes() {
    return ['label'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name){
      case 'label':
        this._label = newValue;
        break;
    }
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._label =  '';
    this._labelElm = this._shadowRoot.querySelector('label');
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    this._labelElm.innerHTML = this._label;
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(val) {
    if (val) {
      this.setAttribute('label', val);
    } else {
      this.removeAttribute('label');
    }
  }
}

window.customElements.define('x-todo', HTMLTodoElement);
