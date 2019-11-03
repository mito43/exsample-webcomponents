const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      font-family: Helvetica;
      font-weight: bold;
      padding: 10px;
    }
  </style>
  <input type="checkbox">
  <label></label>
  <button type="button">remove</button>
`;

class HTMLTodoElement extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'checked', 'index'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name){
      case 'label':
        this._label = newValue;
        break;
      case 'checked':
        this._checked = this.hasAttribute('checked');
        break;
      case 'index':
        this._index = Number(newValue);
        break;
    }
    this._render();
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._label =  '';
    this._index = 0;
    this._checked =  false;
    this._checkBoxElm = this._shadowRoot.querySelector('input');
    this._checkBoxElm.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('onToggle', { detail: this._index }));
    });
    this._removeElm = this._shadowRoot.querySelector('button');
    this._removeElm.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('onRemove', { detail: this._index }));
    });
    this._labelElm = this._shadowRoot.querySelector('label');
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    this._labelElm.innerHTML = this._label;
    this._checkBoxElm.checked = this._checked;
    this._labelElm.style.textDecoration = this._checked ? 'line-through'  : 'none';
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

  get checked() {
    return this.getAttribute('checked');
  }

  set checked(val) {
    if (val) {
      this.setAttribute('checked', val);
    } else {
      this.removeAttribute('checked');
    }
  }

  get index() {
    return this.getAttribute('index');
  }

  set index(val) {
    if (val) {
      this.setAttribute('index', val);
    } else {
      this.removeAttribute('index');
    }
  }
}

window.customElements.define('x-todo', HTMLTodoElement);
