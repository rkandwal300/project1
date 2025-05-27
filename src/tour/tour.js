import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";

const tour = new Shepherd.Tour({
  defaultStepOptions: {
    cancelIcon: { enabled: true },
    classes: "shepherd-theme-arrows",
    scrollTo: { behavior: "smooth", block: "center" },
  },
});

export default tour;
