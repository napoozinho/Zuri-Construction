import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const component = document.querySelector("[data-component='our-values']");

if (!!component) {
  const section = component.querySelector("section");
  const sectionHeight = section.offsetHeight;
  const screenHeight = window.innerHeight;
  const stickyOffset = sectionHeight - screenHeight;
  section.style.top = `-${stickyOffset}px`;

  const indexes = component.querySelectorAll("[data-our-values='item-index']");
  indexes.forEach((index) => {
    textElement = index.firstChild;
    textElement.textContent = `/ ${textElement.textContent.padStart(3, "0")}`;
  });

  const overlay = component.querySelector("[data-our-values='overlay']");

  const scrollConfig = {
    trigger: section,
    start: "bottom bottom",
    scrub: 0.25,
  };

  gsap
    .timeline({ scrollTrigger: { ...scrollConfig, markers: true } })
    .to(section, { yPercent: -25 }, 0)
    .to(overlay, { opacity: 0.7, ease: "power1.in" }, 0);
}
