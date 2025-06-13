import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";
import steps from "./steps.tour";
import {
  handleElementAction,
  highlightElement,
  removeHighlight,
} from "./actionsHandlers";

let isMuted = false;

const speakText = (text) => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  }
};
function generateButtons(step, currentStepIndex) {
  return [
    {
      text: isMuted
        ? '<i class="material-icons">volume_off</i>'
        : '<i class="material-icons">volume_up</i>',
      action: () => {
        const synth = window.speechSynthesis;
        if (synth.speaking && !synth.paused) {
          synth.pause();
        } else if (synth.paused) {
          synth.resume();
        }

        isMuted = !isMuted;

        const currentStep = tour.getCurrentStep();
        if (currentStep) {
          currentStep.updateStepOptions({
            buttons: generateButtons(step, currentStepIndex),
          });
        }
      },
    },
    {
      text: 'Skip All',
      action: () => {
        removeHighlight(step.attachTo.element);
        window.speechSynthesis.cancel();
        tour.complete();
      },
    },
    // {
    //   text: "Skip",
    //   disabled: !step.isSkip,
    //   secondary: !step.isSkip || step.isEnd,
    //   action: () => {
    //     const currentLabel = step?.label ?? "";
    //     let nextIndex = currentStepIndex + 1;
    //     while (
    //       nextIndex < allSteps.length &&
    //       allSteps[nextIndex].label === currentLabel
    //     ) {
    //       nextIndex++;
    //     }
    //     if (nextIndex < allSteps.length) {
    //       tour.show(nextIndex);
    //     } else {
    //       tour.complete();
    //     }
    //   },
    // },
    {
      text: "Previous",
      disabled: step.isStart,
      secondary: step.isStart,
      action: () => {
        const currentLabel = allSteps[currentStepIndex].label;
        let prevLabelIndex = currentStepIndex - 1;
        while (
          prevLabelIndex >= 0 &&
          allSteps[prevLabelIndex].label === currentLabel
        ) {
          prevLabelIndex--;
        }

        if (prevLabelIndex >= 0) {
          const prevLabel = allSteps[prevLabelIndex].label;
          const firstOccurrence = allSteps.findIndex(
            (s) => s.label === prevLabel
          );
          if (firstOccurrence !== -1) {
            tour.show(firstOccurrence);
          }
        } else {
          tour.show(0);
        }
      },
    },
    {
      text: step.isEnd ? "Finish" : "Next",
      action: async () => {
        const id = step.attachTo.element.replace("#", "");
        const el = document.getElementById(id);
        if (!el) {
          tour.next();
          return;
        }
        try {
          await handleElementAction(el, id);
        } catch (err) {
          console.error(`Error handling action for ${id}:`, err);
          alert(`Action failed for ${id}: ${err.message}`);
        } finally {
          if (step?.action?.next) step.action.next();
          step.isEnd ? tour.complete() : tour.next();
        }
      },
    },
  ];
}

const tour = new Shepherd.Tour({
  defaultStepOptions: {
    cancelIcon: { enabled: true },
    classes: "shepherd-theme-arrows",
    scrollTo: { behavior: "smooth", block: "center" },
  },
  useModalOverlay: true,
});
const allSteps = steps();
allSteps.forEach((step, currentStepIndex) => {
  tour.addStep({
    id: step.id,
    text: step.text,
    attachTo: step.attachTo,

    buttons: generateButtons(step, currentStepIndex),
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

tour.start();
