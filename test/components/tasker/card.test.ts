import { beforeEach, describe, expect, it } from "vitest";
import type { IWindow } from "happy-dom";
import { html, render } from "lit";

// Import the element
import "../../../src/components/card";
// only import the type of button element so we don't import the file twice
import type { CardElement } from "../../../src/components/card";

// declare the global Window object to inherit from IWindow so the happyDom type is recognized on window
declare global {
  interface Window extends IWindow {}
}

describe("card-element", async () => {
  let element: CardElement;

  beforeEach(async () => {
    // render the component
    render(
      html`<card-element .width="${"100px"}"></card-element>`,
      document.body
    );

    // wait for happyDom to initialize
    await window.happyDOM.whenAsyncComplete();

    // store initialized state
    element = document.body.querySelector("card-element") as CardElement;
  });

  it("sets width to provided value", async () => {
    // expect shadowroot
    expect(element.shadowRoot).toBeDefined();

    // get inner div
    const div = element.shadowRoot!.querySelector("div");

    // assert inner div width property
    expect(div).toBeDefined();
    const cssObj = window.getComputedStyle(div!, null);

    expect(cssObj.width).to.equal("100px");
  });

  it("sets height to provided value", async () => {
    // expect shadowroot
    expect(element.shadowRoot).toBeDefined();

    // get inner div
    const div = element.shadowRoot!.querySelector("div");

    // assert inner div height property
    expect(div?.style.height).to.equal("40px");
  });
});
