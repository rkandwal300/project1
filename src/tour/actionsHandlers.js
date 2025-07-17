import { CONSUMPTION_FIELDS, GENERIC_FIELDS } from "@/lib/constant";
import { mockFormDataResponse } from "@/lib/data";
import { store } from "@/redux/store";

export const highlightElement = (selector) => {
  const el = document.querySelector(selector);
  if (el) el.style.border = "2px solid red";
};

export const removeHighlight = (selector) => {
  const el = document.querySelector(selector);
  if (el) el.style.border = "";
};

const setInputValue = (inputEl, value) => {
  const setter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  )?.set;
  setter?.call(inputEl, value);
  inputEl.dispatchEvent(new Event("input", { bubbles: true }));
  inputEl.dispatchEvent(new Event("change", { bubbles: true }));
};

const selectDropdownValue = async (inputEl, fieldName) => {
  inputEl.dispatchEvent(
    new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  );
  for (let i = 0; i < 20; i++) {
    const listbox = document.querySelector('[role="listbox"]');
    if (listbox) {
      const options = Array.from(listbox.querySelectorAll('[role="option"]'));
      if (options.length) {
        options[0].click();
        // Wait for dropdown to close
        while (document.querySelector('[role="listbox"]')) {
          await new Promise((r) => setTimeout(r, 50));
        }
        return;
      }
      throw new Error(`No options for ${fieldName}`);
    }
    await new Promise((r) => setTimeout(r, 50));
  }
  throw new Error(`Listbox not found for ${fieldName}`);
};

const processFields = async (fields) => {
  for (const field of fields) {
    const id = `${field.name}Target`;
    const inputEl = document.getElementById(id);
    if (!inputEl) continue;
    const role = inputEl.getAttribute("role");
    const ariaHasPopup = inputEl.getAttribute("aria-haspopup");
    const tag = inputEl.tagName.toLowerCase();
    const value = mockFormDataResponse[field.name];

    if (tag === "input" && value !== undefined) {
      setInputValue(inputEl, value);
    } else if (role === "combobox" && ariaHasPopup === "listbox") {
      try {
        await selectDropdownValue(inputEl, field.name);
      } catch (err) {
        alert(`Dropdown selection failed for ${field.name}:`, err);
      }
    }
  }
};

export const actionHandlers = {
  async instanceType(el) {
    await selectDropdownValue(el, "instanceType");
  },
  tableCell(el) {
    setInputValue(el, 35);
  },
  input(el) {
    const name = el.getAttribute("name");
    let value = mockFormDataResponse[name];
    const portfolioList = store
      .getState()
      .instanceList.data.map((instance) => instance.name);

    if (portfolioList.includes(value) && name == "portfolioName") {
      value = "test Portfolio1.2";
    }

    if (value !== undefined) {
      setInputValue(el, value);
    } else {
      el?.click();
    }
  },
  anchor(el) {
    const href = el.getAttribute("href");
    href && (window.location.href = href);
  },
  async combobox(el) {
    const buttonEl =
      el.querySelector('[role="button"]') ||
      el.querySelector('[aria-haspopup="listbox"]') ||
      el;
    if (!buttonEl) {
      return;
    }
    buttonEl.focus();
    setTimeout(() => {
      buttonEl.dispatchEvent(
        new KeyboardEvent("keydown", {
          bubbles: true,
          cancelable: true,
          key: "Enter",
          code: "Enter",
        })
      );
    }, 100);
  },
  async div(el) {
    const role = el.getAttribute("role");
    if (role === "table-container") {
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft < maxScrollLeft) {
        el.scrollBy({ left: 300, behavior: "smooth" });
      }
    }
    if (role === "GenericMetadataForm") await processFields(GENERIC_FIELDS);
    if (role === "ConsumptionMetadataForm")
      await processFields(CONSUMPTION_FIELDS);
  },
  td(el) {
    el.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
  },
  button(el) {
    el.click();
  },
  default(el) {
    if (el?.click) el.click();
  },
};

export const handleElementAction = async (el, id) => {
  const tag = el.tagName.toLowerCase();
  const role = el.getAttribute("role");
  const ariaHasPopup = el.getAttribute("aria-haspopup");

  if (["instanceTypeTargetFrom", "instanceTypeTargetTo"].includes(id)) {
    await actionHandlers.instanceType(el);
  } else if (id === "downloadSelectTemplate") {
    actionHandlers.anchor(el);
    const listbox = document.querySelector('[role="listbox"]');
    if (listbox) {
      listbox.dispatchEvent(
        new KeyboardEvent("keydown", {
          bubbles: true,
          cancelable: true,
          key: "Escape",
          code: "Escape",
        })
      );
    }
  } else if (id === "tableCell_0_maxCpuUtilization_cell") {
    actionHandlers.tableCell(el);
  } else if (tag === "input" ) {
    actionHandlers.input(el);
  } else if (tag === "a") {
    actionHandlers.anchor(el);
  } else if (role === "combobox" && ariaHasPopup === "listbox") {
    await actionHandlers.combobox(el);
  } else if (tag === "div") {
    await actionHandlers.div(el);
  } else if (tag === "td") {
    actionHandlers.td(el);
  } else if (tag === "button") {
    actionHandlers.button(el);
  } else {
    actionHandlers.default(el);
  }
};
