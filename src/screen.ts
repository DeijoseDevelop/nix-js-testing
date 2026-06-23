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

export type { GetByTextOptions };

export const screen = {
  getByText: (text: string | RegExp, options?: GetByTextOptions) =>
    getByText(document.body, text, options),
  queryByText: (text: string | RegExp, options?: GetByTextOptions) =>
    queryByText(document.body, text, options),
  getAllByText: (text: string | RegExp, options?: GetByTextOptions) =>
    getAllByText(document.body, text, options),
  getByRole: (role: string) => getByRole(document.body, role),
  getAllByRole: (role: string) => getAllByRole(document.body, role),
  queryByRole: (role: string) => queryByRole(document.body, role),
  getByTestId: (testId: string) => getByTestId(document.body, testId),
  queryByTestId: (testId: string) => queryByTestId(document.body, testId),
  getAllByTestId: (testId: string) => getAllByTestId(document.body, testId),
  getByLabelText: (label: string | RegExp) =>
    getByLabelText(document.body, label),
  getByPlaceholderText: (placeholder: string | RegExp) =>
    getByPlaceholderText(document.body, placeholder),
  getByDisplayValue: (value: string | RegExp) =>
    getByDisplayValue(document.body, value),
};
