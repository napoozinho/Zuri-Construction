import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const revealLink = document.querySelectorAll("[data-reveal-link=' ']");

revealLink.forEach((LinkElement) => {
  SplitText.create(LinkElement.querySelector("p"), {
    type: "lines",
    mask: "lines",
    linesClass: "line",
    aria: "none",
  });

  const lines = LinkElement.querySelectorAll(".line");
  const underline = LinkElement.querySelectorAll(
    "[class*=underline-link_line]",
  );

  const tl = gsap.timeline({ paused: true });
  tl.from(lines, {
    yPercent: 100,
    duration: 1.5,
    ease: "expo.out",
    stagger: {
      amount: 0.3,
    },
    delay: 1,
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
    trigger: LinkElement,
    start: "50% bottom",
    onEnter: () => tl.play(),
  });
});
