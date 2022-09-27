import { beforeEach, describe, expect, it } from "vitest";
import type { IWindow } from "happy-dom";
import { html, render } from "lit";

// Import the element
import "../../../src/components/button";
// only import the type of button element so we don't import the file twice
import type { ButtonElement } from "../../../src/components/button";

// declare the global Window object to inherit from IWindow so the happyDom type is recognized on window
declare global {
  interface Window extends IWindow {}
}

describe("button-element", async () => {
  let element: ButtonElement;
  let count = 0;
  const callback = () => count++;

  beforeEach(async () => {
    // render the component
    render(
      html`<button-element @click="${callback}">Hello Vitest</button-element>`,
      document.body
    );

    // wait for happyDom to initialize
    await window.happyDOM.whenAsyncComplete();

    // store initialized state
    element = document.body.querySelector("button-element") as ButtonElement;
  });

  it("renders style", async () => {
    // expect shadowroot
    expect(element.shadowRoot).toBeDefined();

    // get inner div
    const div = element.shadowRoot!.querySelector("button");

    expect(div).toBeDefined();
    expect(div?.classList.contains("button-element")).to.equal(true);
  });

  it("renders inner text", async () => {
    // get inner text
    expect(element).toBeDefined();
    expect(element?.innerText).to.equal("Hello Vitest");
  });

  it("it registers click events", async () => {
    // click button
    expect(element).toBeDefined();

    element.click();

    expect(count).to.equal(1);
  });
});
