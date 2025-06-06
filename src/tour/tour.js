import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";
import steps from "./steps.tour";
import { CONSUMPTION_FIELDS, GENERIC_FIELDS } from "@/lib/constant";
import { mockFormDataResponse } from "@/redux/features/form/formData.slice";

// 🔊 Speak the tutorial text using Web Speech API
const speakText = (text) => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel(); // Cancel previous speech
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

const selectDropdownValue = (inputEl, fieldName) => {
  return new Promise((resolve, reject) => {
    inputEl.dispatchEvent(
      new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    let attempts = 0;
    const maxAttempts = 20;

    const trySelectOption = () => {
      const listbox = document.querySelector('[role="listbox"]');
      if (!listbox) {
        return attempts++ < maxAttempts
          ? requestAnimationFrame(trySelectOption)
          : reject(`Listbox not found for ${fieldName}`);
      }

      const options = Array.from(listbox.querySelectorAll('[role="option"]'));
      if (options.length === 0) return reject(`No options for ${fieldName}`);

      options[0].click();

      const waitUntilClosed = () => {
        if (document.querySelector('[role="listbox"]')) {
          return requestAnimationFrame(waitUntilClosed);
        }
        resolve();
      };

      waitUntilClosed();
    };

    trySelectOption();
  });
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
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      setter?.call(inputEl, value);
      inputEl.dispatchEvent(new Event("input", { bubbles: true }));
      inputEl.dispatchEvent(new Event("change", { bubbles: true }));
    } else if (role === "combobox" && ariaHasPopup === "listbox") {
      try {
        await selectDropdownValue(inputEl, field.name);
      } catch (err) {
        console.warn(`Dropdown selection failed for ${field.name}:`, err);
      }
    }
  }
};

const handleElementAction = async (el, id) => {
  const tag = el.tagName.toLowerCase();
  const role = el.getAttribute("role");
  const ariaHasPopup = el.getAttribute("aria-haspopup");
  console.log({
    id,
    tag,
    role,
    ariaHasPopup,
  });
  if (["instanceTypeTargetFrom", "instanceTypeTargetTo"].includes(id)) {
    await selectDropdownValue(el, "instanceType");
  } else if (id === "tableCell_0_maxCpuUtilization_cell") {
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )?.set;
    setter?.call(el, 35);
  } else if (tag === "input") {
    const name = el.getAttribute("name");
    const value = mockFormDataResponse[name];
    if (value !== undefined) {
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      setter?.call(el, value);
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    } else {
      el?.click();
    }
  } else if (tag === "a") {
    const href = el.getAttribute("href");
    href ? (window.location.href = href) : console.warn("No href on <a>.");
  } else if (tag === "button" || el?.click) {
    el.click();
  } else if (role === "combobox" && ariaHasPopup === "listbox") {
    const mouseDownEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    el.dispatchEvent(mouseDownEvent);
  } else if (tag === "div") {
    if (role === "table-container") {
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft < maxScrollLeft) {
        el.scrollBy({ left: 200, behavior: "smooth" });
      }
    }
    if (role === "GenericMetadataForm") await processFields(GENERIC_FIELDS);
    if (role === "ConsumptionMetadataForm")
      await processFields(CONSUMPTION_FIELDS);
  } else if (tag === "td") {
    el.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
  }
};

const tour = new Shepherd.Tour({
  defaultStepOptions: {
    cancelIcon: { enabled: true },
    classes: "shepherd-theme-arrows",
    scrollTo: { behavior: "smooth", block: "center" },
  },
});

// 🔁 Add all steps
steps().forEach((step) => {
  const buttons = [
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
  ];

  const stepConfig = {
    id: step.id,
    text: step.text,
    attachTo: step.attachTo,
    buttons,
    beforeShowPromise: () =>
      new Promise((resolve) => {
        const checkExist = setInterval(() => {
          const el = document.querySelector(step.attachTo.element);
          if (el) {
            clearInterval(checkExist);
            highlightElement(step.attachTo.element);
            speakText(step.text); // 🔊 Speak when showing the popup
            resolve();
          }
        }, 100);
      }),
    when: {
      hide: () => {
        removeHighlight(step.attachTo.element);
        window.speechSynthesis.cancel(); // stop any ongoing speech when step is hidden
      },
    },
  };

  tour.addStep(stepConfig);
});

export default tour;
