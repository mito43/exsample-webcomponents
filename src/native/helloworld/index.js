
// HTMLElement が html要素の最上位クラスになる
class HelloWorld extends HTMLElement {
  // 初期化処理、 イベントリスナー, ShadowDOMの作成
  // カスタムエレメントのコンストラクタで行う処理(whatwg参考)
  // @see: https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
  constructor() {
    // 上位クラスコンストラクタを呼ぶ、constructor内で一番上にsuper()を記述
    super();
    // Shadow DOMの作成
    // modeをcloseにするとshadowRootが隠れるのでアクセスできず、nullを返す
    const shadowRoot = this.attachShadow({mode: 'open'});
    // 試しにフォントサイズを変数化してみる
    const fontSize = 50;
    shadowRoot.innerHTML = `
      <style>
        /* ホストのスタイルを決める
          ShadowRootの外では使えない
          親ページのルールによる指定の優先度が、要素で定義されている :host ルールよりも高いので、外部のスタイルが優先される
        */
        :host {
          /* カスタムエレメントはデフォルトでinlne要素 */
          display: block;
        }
        /* h1要素に当ててスタイルがここ以外の境界線のの外に出ないかたしかめる */
        h1 {
          color: blue;
          font-family: Helvetica, Arial, sans-serif;
          text-align: center;
          font-weigh: bold;
          font-size: ${fontSize}px;
        }
      </style>
      <h1>Hello!</h1>
    `;
  }
}

// カスタムエレメントの登録
window.customElements.define('x-helloworld', HelloWorld);
