export { render, cleanup } from "./render.js";
export type { RenderOptions, RenderResult } from "./render.js";

export { fireEvent } from "./fire-event.js";
export type { EventInit } from "./fire-event.js";

export { screen } from "./screen.js";
export type { GetByTextOptions } from "./screen.js";

export { waitFor } from "./wait-for.js";
export type { WaitForOptions } from "./wait-for.js";

export {
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
} from "./queries.js";
export type { GetByTextOptions as QueryTextOptions } from "./queries.js";
