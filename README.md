# @deijose/nix-js-testing

Utilidades de testing para [Nix.js](https://github.com/DeijoseDevelop/nix-js). Liviano, tree-shakeable y agnóstico al DOM environment (funciona con `happy-dom`, `jsdom`, etc.).

## Instalación

```bash
npm install -D @deijose/nix-js-testing
```

También necesitas un entorno DOM. Recomendamos `happy-dom`:

```bash
npm install -D happy-dom
```

Y en `vite.config.ts`:

```ts
export default defineConfig({
  test: {
    environment: "happy-dom",
  },
});
```

## Uso

```ts
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@deijose/nix-js-testing";
import { html, signal } from "@deijose/nix-js";

function Counter() {
  const count = signal(0);
  return html`
    <div>
      <span data-testid="count">${count.value}</span>
      <button onclick=${() => count.value++}>Increment</button>
    </div>
  `;
}

describe("Counter", () => {
  it("increments on click", () => {
    const { getByText } = render(Counter());
    const button = getByText("Increment");
    fireEvent.click(button);
    expect(screen.getByTestId("count").textContent).toBe("1");
  });
});
```

## API

### `render(component, options?)`

Monta un componente Nix.js en un contenedor. Retorna queries vinculadas al contenedor y `unmount()`.

```ts
const { container, getByText, unmount } = render(MyComponent());
```

### `screen`

Queries globales sobre `document.body`:

- `screen.getByText`
- `screen.queryByText`
- `screen.getByRole`
- `screen.getByTestId`
- `screen.getByLabelText`
- `screen.getByPlaceholderText`
- `screen.getByDisplayValue`

### `fireEvent`

Dispara eventos DOM:

```ts
fireEvent.click(button);
fireEvent.input(input, { target: { value: "hello" } });
fireEvent.keyDown(input, { key: "Enter" });
fireEvent.submit(form);
```

También puedes usar el genérico:

```ts
fireEvent(element, "custom-event");
```

### `waitFor`

Espera a que una condición se cumpla:

```ts
await waitFor(() => {
  expect(screen.getByText("Loaded")).toBeInTheDocument();
});
```

### `cleanup`

Desmonta todos los componentes renderizados durante el test:

```ts
import { cleanup } from "@deijose/nix-js-testing";

afterEach(() => cleanup());
```

## Características

- **Sin DOM environment empaquetado**: tú eliges `happy-dom` o `jsdom`.
- **Tree-shakeable**: importa solo lo que necesites.
- **Zero peso en producción**: no se incluye en el bundle de la app.
- **API similar a Testing Library**: fácil de adoptar.

## Licencia

MIT
