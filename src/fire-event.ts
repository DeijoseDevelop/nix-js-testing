export interface EventInit {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  key?: string;
  code?: string;
  keyCode?: number;
  which?: number;
  target?: { value?: string; checked?: boolean };
}

function assignTargetValue(element: EventTarget, init: EventInit): void {
  const target = init.target;
  if (!target) return;
  const el = element as HTMLInputElement;
  if ("value" in target && target.value !== undefined) {
    el.value = target.value;
  }
  if ("checked" in target && target.checked !== undefined) {
    if ("checked" in el) {
      (el as HTMLInputElement).checked = target.checked;
    }
  }
}

function dispatchEvent(
  element: EventTarget,
  eventName: string,
  init: EventInit = {}
): boolean {
  let event: Event;
  if (["keydown", "keyup", "keypress"].includes(eventName)) {
    const keyboardEvent = new KeyboardEvent(eventName, {
      bubbles: init.bubbles ?? true,
      cancelable: init.cancelable ?? true,
      composed: init.composed ?? true,
      key: init.key,
      code: init.code,
    });
    event = keyboardEvent;
  } else if (eventName === "click") {
    event = new MouseEvent("click", {
      bubbles: init.bubbles ?? true,
      cancelable: init.cancelable ?? true,
      composed: init.composed ?? true,
    });
  } else {
    event = new Event(eventName, {
      bubbles: init.bubbles ?? true,
      cancelable: init.cancelable ?? true,
      composed: init.composed ?? true,
    });
  }

  assignTargetValue(element, init);
  return element.dispatchEvent(event);
}

export const fireEvent = Object.assign(
  (element: EventTarget, eventName: string, init?: EventInit) =>
    dispatchEvent(element, eventName, init),
  {
    click: (element: EventTarget, init?: EventInit) =>
      dispatchEvent(element, "click", init),
    dblClick: (element: EventTarget, init?: EventInit) =>
      dispatchEvent(element, "dblclick", init),
    input: (element: EventTarget, init?: EventInit) =>
      dispatchEvent(element, "input", init),
    change: (element: EventTarget, init?: EventInit) =>
      dispatchEvent(element, "change", init),
    submit: (element: EventTarget, init?: EventInit) =>
      dispatchEvent(element, "submit", init),
    focus: (element: EventTarget, init?: EventInit) =>
      dispatchEvent(element, "focus", init),
    blur: (element: EventTarget, init?: EventInit) =>
      dispatchEvent(element, "blur", init),
    keyDown: (element: EventTarget, init?: EventInit) =>
      dispatchEvent(element, "keydown", init),
    keyUp: (element: EventTarget, init?: EventInit) =>
      dispatchEvent(element, "keyup", init),
    mouseEnter: (element: EventTarget, init?: EventInit) =>
      dispatchEvent(element, "mouseenter", init),
    mouseLeave: (element: EventTarget, init?: EventInit) =>
      dispatchEvent(element, "mouseleave", init),
  }
) as {
  (element: EventTarget, eventName: string, init?: EventInit): boolean;
  click: (element: EventTarget, init?: EventInit) => boolean;
  dblClick: (element: EventTarget, init?: EventInit) => boolean;
  input: (element: EventTarget, init?: EventInit) => boolean;
  change: (element: EventTarget, init?: EventInit) => boolean;
  submit: (element: EventTarget, init?: EventInit) => boolean;
  focus: (element: EventTarget, init?: EventInit) => boolean;
  blur: (element: EventTarget, init?: EventInit) => boolean;
  keyDown: (element: EventTarget, init?: EventInit) => boolean;
  keyUp: (element: EventTarget, init?: EventInit) => boolean;
  mouseEnter: (element: EventTarget, init?: EventInit) => boolean;
  mouseLeave: (element: EventTarget, init?: EventInit) => boolean;
};
