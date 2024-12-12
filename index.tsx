import { createRoot, Root } from "react-dom/client";
import { CellBase, Spreadsheet } from "react-spreadsheet";
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

    get data(): CellBase[][] {
      return JSON.parse(this.getAttribute("data") ?? "[]");
    }

    get columnsLabels(): string[] {
      const attr = this.getAttribute("columns");
      return attr ? JSON.parse(attr) : undefined;
    }

    get rowLabels(): string[] {
      const attr = this.getAttribute("rowLabels");
      return attr ? JSON.parse(attr) : undefined;
    }

    connectedCallback() {
      this.render();
    }

    disconnectedCallback() {
      this.root.unmount();
    }

    handleEvent(type: string) {
      return (e?: any) => {
        this.dispatchEvent(new CustomEvent(type, { detail: e }));
      };
    }

    render() {
      this.root.render(
        <Spreadsheet
          data={this.data}
          columnLabels={this.columnsLabels}
          rowLabels={this.rowLabels}
          onActivate={this.handleEvent("activate")}
          onChange={this.handleEvent("change")}
          onModeChange={this.handleEvent("modechange")}
          onBlur={this.handleEvent("blur")}
          onCellCommit={this.handleEvent("cellcommit")}
          onEvaluatedDataChange={this.handleEvent("evaluateddatachange")}
          onKeyDown={this.handleEvent("keydown")}
          onSelect={this.handleEvent("select")}
        />
      );
    }
  }

  globalThis.customElements.define("spread-sheet", SpreadSheet);
}
