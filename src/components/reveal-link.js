import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const revealLink = document.querySelectorAll("[data-reveal-link='true']");

revealLink.forEach((linkElement) => {
  SplitText.create(linkElement.querySelector("p"), {
    type: "lines",
    mask: "lines",
    linesClass: "line",
    aria: "none",
  });

  const lines = linkElement.querySelectorAll(".line");
  const underline = linkElement.querySelectorAll(
    "[class*=underline-link_line]",
  );
  const delay = linkElement.dataset.delay / 1000 || 0;

  const tl = gsap.timeline({ paused: true });
  tl.from(lines, {
    yPercent: 100,
    duration: 1.5,
    ease: "expo.out",
    stagger: {
      amount: 0.3,
    },
    delay: delay,
  }).from(
    underline,
    {
      scaleX: 0,
      duration: 1,
      ease: "expo.out",
    },
    "-=1",
  );

  ScrollTrigger.create({
    trigger: linkElement,
    start: "50% bottom",
    onEnter: () => tl.play(),
  });
});
