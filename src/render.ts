import { mount } from "@deijose/nix-js";
import type { NixComponent, NixTemplate } from "@deijose/nix-js";
import { registerCleanup, cleanup } from "./cleanup.js";
import {
  getByText,
  queryByText,
  getAllByText,
  getByRole,
  getAllByRole,
  queryByRole,
  getByTestId,
  queryByTestId,
  getAllByTestId,
  getByLabelText,
  getByPlaceholderText,
  getByDisplayValue,
  type GetByTextOptions,
} from "./queries.js";

export interface RenderOptions {
  container?: HTMLElement;
  attach?: boolean;
}

export interface RenderResult {
  container: HTMLElement;
  unmount: () => void;
  getByText: (text: string | RegExp, options?: GetByTextOptions) => HTMLElement;
  queryByText: (
    text: string | RegExp,
    options?: GetByTextOptions
  ) => HTMLElement | null;
  getAllByText: (
    text: string | RegExp,
    options?: GetByTextOptions
  ) => HTMLElement[];
  getByRole: (role: string) => HTMLElement;
  getAllByRole: (role: string) => HTMLElement[];
  queryByRole: (role: string) => HTMLElement | null;
  getByTestId: (testId: string) => HTMLElement;
  queryByTestId: (testId: string) => HTMLElement | null;
  getAllByTestId: (testId: string) => HTMLElement[];
  getByLabelText: (label: string | RegExp) => HTMLElement;
  getByPlaceholderText: (placeholder: string | RegExp) => HTMLElement;
  getByDisplayValue: (value: string | RegExp) => HTMLElement;
}

export function render(
  component: NixTemplate | NixComponent,
  options: RenderOptions = {}
): RenderResult {
  const container = options.container ?? document.createElement("div");
  const attach = options.attach ?? true;

  if (attach && !container.parentNode) {
    document.body.appendChild(container);
  }

  const handle = mount(component, container);

  const unmount = () => {
    handle.unmount();
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  };

  registerCleanup(unmount);

  return {
    container,
    unmount,
    getByText: (text, options) => getByText(container, text, options),
    queryByText: (text, options) => queryByText(container, text, options),
    getAllByText: (text, options) => getAllByText(container, text, options),
    getByRole: (role) => getByRole(container, role),
    getAllByRole: (role) => getAllByRole(container, role),
    queryByRole: (role) => queryByRole(container, role),
    getByTestId: (testId) => getByTestId(container, testId),
    queryByTestId: (testId) => queryByTestId(container, testId),
    getAllByTestId: (testId) => getAllByTestId(container, testId),
    getByLabelText: (label) => getByLabelText(container, label),
    getByPlaceholderText: (placeholder) =>
      getByPlaceholderText(container, placeholder),
    getByDisplayValue: (value) => getByDisplayValue(container, value),
  };
}

export { cleanup };
