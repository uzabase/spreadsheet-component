import { createRoot, Root } from "react-dom/client";
import { Spreadsheet } from "react-spreadsheet";
import style from "./index.css?inline";

// SSRでは無視してほしい
if ("customElements" in globalThis) {
  class SpreadSheet extends HTMLElement {
    root: Root;
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.root = createRoot(this.shadowRoot!);
      const stylesheet = new CSSStyleSheet();
      stylesheet.replaceSync(style);
      this.shadowRoot!.adoptedStyleSheets = [stylesheet];
    }

    static get observedAttributes() {
      return ["data", "columns"];
    }

    attributeChangedCallback() {
      this.render();
    }

    get data(): Record<string, any>[] {
      return JSON.parse(this.getAttribute("data") ?? "[]");
    }

    get columns(): string[] {
      return JSON.parse(this.getAttribute("columns") ?? "[]");
    }

    connectedCallback() {
      console.log("Render");
      this.render();
    }

    disconnectedCallback() {
      console.log("Unmount");
      this.root.unmount();
    }

    render() {
      const data = this.data.map(row => this.columns.map(col => ({ value: row[col] })));
      this.root.render(
        <Spreadsheet data={data} columnLabels={this.columns} />
      );
    }
  }

  globalThis.customElements.define("spread-sheet", SpreadSheet);
}
