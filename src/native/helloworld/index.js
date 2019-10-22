// templateタグはフレームワークにあるテンプレートエンジンのような考え方で、Viewの部分
// ページロード時点ではなく、ランタイム時にインスタンス化でき、レンダリング後にはこのタグは表示されない、
// 又<template>タグの中身はアクティベートされるまでレンダリングされない。(スクリプトや画像リソース等読み込まれない)
const template = document.createElement('template');
template.innerHTML = `
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
    font-size: 50px;
  }
  </style>
  <h1>Hello!</h1>
`;

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
    // ノードを複製
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

// カスタムエレメントの登録、
// 第1引数にターゲットのタグ名、第2引数に挿入するエレメントのクラス
window.customElements.define('x-helloworld', HelloWorld);
