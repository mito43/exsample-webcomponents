class HelloWorld extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(this._template().content.cloneNode(true));
  }

  _template() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :host {
          display: block;
        }
        h1 {
          color: blue;
          font-family: Helvetica, Arial, sans-serif;
          text-align: center;
          font-weigh: bold;
          font-size: 50px;
        }
      </style>
      <h1>Hello World</h1>
  `;
   return template;
  }
}

window.customElements.define('x-helloworld', HelloWorld);
