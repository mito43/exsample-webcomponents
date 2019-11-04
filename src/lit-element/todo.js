
import { LitElement, html, css } from 'lit-element';

class HTMLTodoElement extends LitElement {
  static get properties() {
    return {
      label: {
        type: String,
        reflect: true
      },
      checked: {
        type: Boolean,
        reflect: true
      },
      index: {
        type: Number
      }
    }
  }

  constructor() {
    super();
    this.label =  '';
    this.index = 0;
    this.checked =  false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: Helvetica;
        font-weight: bold;
        padding: 10px;
      }
      .completed {
        text-decoration: line-through;
      }
    `;
  }

  render() {
    return html`
      <input type="checkbox"
        .checked=${this.checked}
        @change=${this._dispatchToggle}>
      <label class=${this.checked ? 'completed' : ''}>${this.label}</label>
      <button type="button" @click=${this._dispatchRemove}>remove</button>
    `;
  }

  _dispatchToggle() {
    this.dispatchEvent(new CustomEvent('onToggle', { detail: this.index }));
  }

  _dispatchRemove() {
    this.dispatchEvent(new CustomEvent('onRemove', { detail: this.index }));
  }
}

window.customElements.define('x-todo', HTMLTodoElement);
