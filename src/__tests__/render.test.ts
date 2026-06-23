import { describe, it, expect, afterEach } from "vitest";
import { html } from "@deijose/nix-js";
import { render, screen, fireEvent, cleanup } from "../index.js";

afterEach(() => cleanup());

function Hello({ name = "World" }: { name?: string } = {}) {
  return html`
    <div>
      <h1 data-testid="greeting">Hello ${name}</h1>
      <button data-testid="btn">Click me</button>
    </div>
  `;
}

describe("render", () => {
  it("renders a component and queries it", () => {
    const { getByText, getByTestId } = render(Hello({ name: "Nix" }));
    expect(getByText("Click me")).toBeTruthy();
    expect(getByTestId("greeting").textContent).toBe("Hello Nix");
  });

  it("dispatches a click event", () => {
    render(Hello());
    const button = screen.getByTestId("btn");
    fireEvent.click(button);
    expect(button).toBeTruthy();
  });

  it("cleans up after unmount", () => {
    const { container, unmount } = render(Hello());
    expect(document.body.contains(container)).toBe(true);
    unmount();
    expect(document.body.contains(container)).toBe(false);
  });
});
