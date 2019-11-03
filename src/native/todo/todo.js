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
    this._shadowRoot.appendChild(this._template().content.cloneNode(true));
    this._label =  '';
    this._index = 0;
    this._checked =  false;
    this._checkBoxElm = this._shadowRoot.querySelector('input');
    const toggleListener = this._dispatchToggle.bind(this);
    this._checkBoxElm.addEventListener('click', toggleListener);
    this._checkBoxElm.clearListner = () => this._checkBoxElm.removeEventListener('click', toggleListener);
    this._removeElm = this._shadowRoot.querySelector('button');
    const removeListener = this._dispatchRemove.bind(this);
    this._removeElm.addEventListener('click', this._dispatchRemove.bind(this));
    this._removeElm.clearListner = () => this._removeElm.removeEventListener('click', removeListener);
    this._labelElm = this._shadowRoot.querySelector('label');
  }

  connectedCallback() {
    this._render();
  }

  disconnectedCallback() {
    this._checkBoxElm.clearListner();
    this._removeElm.clearListner();
  }

  _template() {
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
    return template;
  }

  _render() {
    this._labelElm.innerHTML = this._label;
    this._checkBoxElm.checked = this._checked;
    this._labelElm.style.textDecoration = this._checked ? 'line-through'  : 'none';
  }

  _dispatchToggle() {
    this.dispatchEvent(new CustomEvent('onToggle', { detail: this._index }));
  }

  _dispatchRemove() {
    this.dispatchEvent(new CustomEvent('onRemove', { detail: this._index }));
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
      this.setAttribute('checked', '');
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
