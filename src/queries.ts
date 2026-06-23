export interface GetByTextOptions {
  exact?: boolean;
  selector?: string;
}

function normalizeText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function matchesText(node: Node, text: string, exact: boolean): boolean {
  if (node.nodeType !== Node.TEXT_NODE) return false;
  const content = normalizeText(node.textContent ?? "");
  if (exact) return content === text;
  return content.includes(text);
}

function getTextMatcher(
  text: string | RegExp,
  exact: boolean
): (node: Node) => boolean {
  if (typeof text === "string") {
    return (node) => matchesText(node, text, exact);
  }
  return (node) => {
    if (node.nodeType !== Node.TEXT_NODE) return false;
    return text.test(node.textContent ?? "");
  };
}

function getContainer(
  container: Element | Document = document.body
): Element | Document {
  return container;
}

function throwMultiple(name: string, value: string | RegExp) {
  const label = typeof value === "string" ? `"${value}"` : value.toString();
  throw new Error(`Found multiple elements with ${name}: ${label}`);
}

function throwNotFound(name: string, value: string | RegExp) {
  const label = typeof value === "string" ? `"${value}"` : value.toString();
  throw new Error(`Unable to find an element with ${name}: ${label}`);
}

function collectTextNodes(root: Element | Document): Text[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    nodes.push(node as Text);
  }
  return nodes;
}

function findElementsByText(
  container: Element | Document,
  text: string | RegExp,
  options: GetByTextOptions = {}
): HTMLElement[] {
  const exact = options.exact ?? false;
  const selector = options.selector ?? "*";
  const matcher = getTextMatcher(text, exact);
  const nodes = collectTextNodes(container);
  const elements: HTMLElement[] = [];
  for (const node of nodes) {
    const el = node.parentElement;
    if (!el) continue;
    if (selector !== "*" && !el.matches(selector)) continue;
    if (matcher(node)) {
      elements.push(el);
    }
  }
  return elements;
}

export function getByText(
  container: Element | Document,
  text: string | RegExp,
  options?: GetByTextOptions
): HTMLElement {
  const elements = findElementsByText(container, text, options);
  if (elements.length === 0) throwNotFound("text", text);
  if (elements.length > 1) throwMultiple("text", text);
  return elements[0];
}

export function queryByText(
  container: Element | Document,
  text: string | RegExp,
  options?: GetByTextOptions
): HTMLElement | null {
  const elements = findElementsByText(container, text, options);
  if (elements.length === 0) return null;
  if (elements.length > 1) throwMultiple("text", text);
  return elements[0];
}

export function getAllByText(
  container: Element | Document,
  text: string | RegExp,
  options?: GetByTextOptions
): HTMLElement[] {
  const elements = findElementsByText(container, text, options);
  if (elements.length === 0) throwNotFound("text", text);
  return elements;
}

export function getByRole(
  container: Element | Document = document.body,
  role: string
): HTMLElement {
  const elements = getAllByRole(container, role);
  if (elements.length > 1) throwMultiple("role", role);
  return elements[0];
}

export function getAllByRole(
  container: Element | Document = document.body,
  role: string
): HTMLElement[] {
  const root = getContainer(container);
  const elements = Array.from(
    root.querySelectorAll(`[role="${role}"], ${role}`)
  ) as HTMLElement[];
  if (elements.length === 0) throwNotFound("role", role);
  return elements;
}

export function queryByRole(
  container: Element | Document = document.body,
  role: string
): HTMLElement | null {
  const root = getContainer(container);
  const elements = Array.from(
    root.querySelectorAll(`[role="${role}"], ${role}`)
  ) as HTMLElement[];
  if (elements.length > 1) throwMultiple("role", role);
  return elements[0] ?? null;
}

export function getByTestId(
  container: Element | Document = document.body,
  testId: string
): HTMLElement {
  const root = getContainer(container);
  const element = root.querySelector(`[data-testid="${testId}"]`) as HTMLElement | null;
  if (!element) throwNotFound("data-testid", testId);
  return element as HTMLElement;
}

export function queryByTestId(
  container: Element | Document = document.body,
  testId: string
): HTMLElement | null {
  const root = getContainer(container);
  return (root.querySelector(`[data-testid="${testId}"]`) as HTMLElement) ?? null;
}

export function getAllByTestId(
  container: Element | Document = document.body,
  testId: string
): HTMLElement[] {
  const root = getContainer(container);
  const elements = Array.from(
    root.querySelectorAll(`[data-testid="${testId}"]`)
  ) as HTMLElement[];
  if (elements.length === 0) throwNotFound("data-testid", testId);
  return elements;
}

export function getByLabelText(
  container: Element | Document = document.body,
  label: string | RegExp
): HTMLElement {
  const root = getContainer(container);
  const labels = Array.from(root.querySelectorAll("label, [aria-label]"));
  const exact = typeof label === "string";
  const matches = labels.filter((el) => {
    const text = el.getAttribute("aria-label") ?? el.textContent ?? "";
    const normalized = normalizeText(text);
    if (exact) return normalized === label;
    return label.test(normalized);
  });
  if (matches.length === 0) throwNotFound("label", label);
  if (matches.length > 1) throwMultiple("label", label);
  const matched = matches[0];
  if (matched.tagName === "LABEL") {
    const htmlFor = matched.getAttribute("for");
    if (htmlFor) {
      const control = root.querySelector(`[id="${htmlFor}"]`) as HTMLElement | null;
      if (control) return control;
    }
  }
  return matched as HTMLElement;
}

export function getByPlaceholderText(
  container: Element | Document = document.body,
  placeholder: string | RegExp
): HTMLElement {
  const root = getContainer(container);
  const elements = Array.from(
    root.querySelectorAll("[placeholder]")
  ) as HTMLElement[];
  const exact = typeof placeholder === "string";
  const matches = elements.filter((el) => {
    const text = el.getAttribute("placeholder") ?? "";
    if (exact) return text === placeholder;
    return placeholder.test(text);
  });
  if (matches.length === 0) throwNotFound("placeholder", placeholder);
  if (matches.length > 1) throwMultiple("placeholder", placeholder);
  return matches[0];
}

export function getByDisplayValue(
  container: Element | Document = document.body,
  value: string | RegExp
): HTMLElement {
  const root = getContainer(container);
  const elements = Array.from(
    root.querySelectorAll("input, textarea, select")
  ) as HTMLInputElement[];
  const exact = typeof value === "string";
  const matches = elements.filter((el) => {
    const text = el.value;
    if (exact) return text === value;
    return value.test(text);
  });
  if (matches.length === 0) throwNotFound("display value", value);
  if (matches.length > 1) throwMultiple("display value", value);
  return matches[0];
}
