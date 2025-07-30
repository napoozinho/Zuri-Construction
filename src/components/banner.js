import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const component = document.querySelector("[data-component='banner']");

if (!!component) {
  const buttonWrapper = component.querySelector(
    "[data-banner='button-wrapper']",
  );

  const tl = gsap.timeline({ paused: true });
  if (buttonWrapper) {
    tl.from(buttonWrapper, {
      clipPath: "inset(100% 0% 0% 0%)",
      duration: 1,
      ease: "expo.out",
      delay: 0.5,
    });
  }

  ScrollTrigger.create({
    trigger: component,
    start: "top bottom",
    onEnter: () => tl.play(),
  });
}
