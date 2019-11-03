
import { html, render } from 'lit-html';

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
    render(this._template(), this._shadowRoot, {eventContext: this});
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._label =  '';
    this._index = 0;
    this._checked =  false;
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
          padding: 10px;
        }
        .completed {
          text-decoration: line-through;
        }
      </style>
      <input type="checkbox"
        .checked=${this._checked}
        @change=${this._dispatchToggle}>
      <label class=${this._checked ? 'completed' : ''}>${this._label}</label>
      <button type="button" @click=${this._dispatchRemove}>remove</button>
    `;
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
