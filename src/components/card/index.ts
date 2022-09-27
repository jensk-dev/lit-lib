import type { TemplateResult } from "lit";
import { html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import css from "./styles.css?inline";

@customElement("card-element")
export class CardElement extends LitElement {
  public static styles = [unsafeCSS(css)];

  @property({ type: String })
  public width?: string = "40px";

  @property({ type: String })
  public height?: string = "40px";

  private size: { width?: string; height?: string } = {};

  protected willUpdate(): void {
    this.size.height = this.height;
    this.size.width = this.width;
  }

  protected render(): TemplateResult {
    return html`<div style="${styleMap(this.size)}" class="card-element">
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "card-element": CardElement;
  }
}
