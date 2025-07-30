import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(CustomEase);

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

CustomEase.create("custom-ease", "0.62, 0.05, 0.01, 0.99");
const duration = 1.47;
const stagger = 0.2;

setTimeout(() => {
  revealText.forEach((textElement) => {
    const lines = textElement.querySelectorAll(".line");
    const tl = gsap.timeline({ paused: true });
    const delay = textElement.dataset.delay / 1000 || 0;

    gsap.set(textElement, { autoAlpha: 1 });

    tl.from(
      lines,
      {
        yPercent: 100,
        duration: duration,
        ease: "custom-ease",
        stagger: {
          amount: stagger,
        },
        delay: delay,
      },
      -0.2,
    );

    ScrollTrigger.create({
      trigger: textElement,
      start: "0% 100%",
      onEnter: () => {
        tl.play();
      },
    });
  });
}, 300);
