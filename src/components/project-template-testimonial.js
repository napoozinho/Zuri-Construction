import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const component = document.querySelector(
  "[data-component='project-template-testimonial']",
);

if (!!component) {
  const testimonial = component.querySelector(
    "[data-project-template-testimonial='testimonial']",
  );
  if (testimonial) {
    testimonial.querySelector("p").textContent =
      `“${testimonial.querySelector("p").textContent}”`;
  }
}
