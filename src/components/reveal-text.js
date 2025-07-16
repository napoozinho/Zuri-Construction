import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const revealText = document.querySelectorAll("[data-reveal-text='true']");

revealText.forEach((el) => {
  el.innerHTML = el.innerHTML.replace(/\n/g, "<br>");
});

SplitText.create(revealText, {
  autoSplit: true,
  type: "lines",
  mask: "lines",
  linesClass: "line",
  aria: "none",
});

revealText.forEach((textElement) => {
  const lines = textElement.querySelectorAll(".line");
  const tl = gsap.timeline({ paused: true });
  const delay = textElement.dataset.delay / 1000 || 0;

  gsap.set(textElement, { autoAlpha: 1 });

  tl.from(lines, {
    yPercent: 100,
    duration: 1.5,
    ease: "expo.out",
    stagger: {
      amount: 0.3,
    },
    delay: delay,
  });

  ScrollTrigger.create({
    trigger: textElement,
    start: "50% bottom",
    onEnter: () => tl.play(),
  });
});
