import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";
import steps from "./steps.tour";
import { CONSUMPTION_FIELDS, GENERIC_FIELDS } from "@/lib/constant";
import { mockFormDataResponse } from "@/redux/features/form/formData.slice";

// --- Utilities ---

const speakText = (text) => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  }
};

const highlightElement = (selector) => {
  const el = document.querySelector(selector);
  if (el) el.style.border = "2px solid red";
};

const removeHighlight = (selector) => {
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
        console.warn(`Dropdown selection failed for ${field.name}:`, err);
      }
    }
  }
};

// --- Action Handlers ---

const actionHandlers = {
  async instanceType(el) {
    await selectDropdownValue(el, "instanceType");
  },
  tableCell(el) {
    setInputValue(el, 35);
  },
  input(el) {
    const name = el.getAttribute("name");
    const value = mockFormDataResponse[name];
    if (value !== undefined) {
      setInputValue(el, value);
    } else {
      el?.click();
    }
  },
  anchor(el) {
    const href = el.getAttribute("href");
    href ? (window.location.href = href) : console.warn("No href on <a>.");
  },
  async combobox(el) {
    const buttonEl =
      el.querySelector('[role="button"]') ||
      el.querySelector('[aria-haspopup="listbox"]') ||
      el;
    if (!buttonEl)
      return console.warn("No clickable element found inside Select");
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
        el.scrollBy({ left: 200, behavior: "smooth" });
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

const handleElementAction = async (el, id) => {
  const tag = el.tagName.toLowerCase();
  const role = el.getAttribute("role");
  const ariaHasPopup = el.getAttribute("aria-haspopup");

  if (["instanceTypeTargetFrom", "instanceTypeTargetTo"].includes(id)) {
    await actionHandlers.instanceType(el);
  } else if (id === "tableCell_0_maxCpuUtilization_cell") {
    actionHandlers.tableCell(el);
  } else if (tag === "input") {
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

// --- Shepherd Tour Setup ---

const tour = new Shepherd.Tour({
  defaultStepOptions: {
    cancelIcon: { enabled: true },
    classes: "shepherd-theme-arrows",
    scrollTo: { behavior: "smooth", block: "center" },
  },
});

steps().forEach((step) => {
  tour.addStep({
    id: step.id,
    text: step.text,
    attachTo: step.attachTo,
    buttons: [
      {
        text: step.isEnd ? "Finish" : "Next",
        action: async () => {
          const id = step.attachTo.element.replace("#", "");
          const el = document.getElementById(id);
          if (!el) {
            console.warn(`Element #${id} not found.`);
          } else {
            await handleElementAction(el, id);
          }
          if (step?.action?.next) step.action.next();
          tour.next();
        },
      },
    ],
    beforeShowPromise: () =>
      new Promise((resolve) => {
        const checkExist = setInterval(() => {
          const el = document.querySelector(step.attachTo.element);
          if (el) {
            clearInterval(checkExist);
            highlightElement(step.attachTo.element);
            speakText(step.text);
            resolve();
          }
        }, 100);
      }),
    when: {
      hide: () => {
        removeHighlight(step.attachTo.element);
        window.speechSynthesis.cancel();
      },
    },
  });
});

export default tour;
