import type { TemplateResult } from "lit";
import { html, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";

import css from "./styles.css?inline";

@customElement("button-element")
export class ButtonElement extends LitElement {
  public static styles = [unsafeCSS(css)];

  protected render(): TemplateResult {
    return html`<button class="button-element"><slot></slot></button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "button-element": ButtonElement;
  }
}
