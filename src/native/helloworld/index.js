
class HelloWorld extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <h1 style="color:blue;">Hello! Web Components!</h1>
    `;
  }
}

window.customElements.define('x-helloworld', HelloWorld);
