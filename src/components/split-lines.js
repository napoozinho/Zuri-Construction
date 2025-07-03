import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const splitLinesElements = document.querySelectorAll("[data-split-lines=' ']");

let split = SplitText.create(splitLinesElements, {
  type: "lines",
  mask: "lines",
  linesClass: "line",
  aria: "none",
});

splitLinesElements.forEach((textElement) => {
  let lines = textElement.querySelectorAll(".line");
  let tl = gsap.timeline({ paused: true });
  tl.from(lines, {
    yPercent: 100,
    duration: 1.5,
    ease: "expo.out",
    stagger: {
      amount: 0.3,
    },
    delay: 0.3,
  });

  ScrollTrigger.create({
    trigger: textElement,
    start: "50% bottom",
    onEnter: () => tl.play(),
  });
});
