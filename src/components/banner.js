import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const component = document.querySelector("[data-component='banner']");

if (!!component) {
  const headingWrapper = component.querySelector(
    "[data-banner='heading-wrapper']",
  );
  const heading = headingWrapper ? headingWrapper.firstChild : null;

  const textWrapper = component.querySelector("[data-banner='text-wrapper']");
  const text = textWrapper ? textWrapper.firstChild : null;

  const buttonWrapper = component.querySelector(
    "[data-banner='button-wrapper']",
  );

  let headingSplit = heading
    ? SplitText.create(heading, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
        aria: "none",
      })
    : null;

  let textSplit = text
    ? SplitText.create(text, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
        aria: "none",
      })
    : null;

  const tl = gsap.timeline({ paused: true });
  if (heading) {
    tl.from(heading.querySelectorAll(".line"), {
      yPercent: 100,
      duration: 1.5,
      ease: "expo.out",
      stagger: {
        amount: 0.3,
      },
      delay: 0.3,
    });
  }
  if (text) {
    tl.from(
      text.querySelectorAll(".line"),
      {
        yPercent: 100,
        duration: 1.5,
        ease: "expo.out",
        stagger: {
          amount: 0.3,
        },
      },
      "-=1.5",
    );
  }
  if (buttonWrapper) {
    tl.from(
      buttonWrapper,
      {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.5,
        ease: "expo.out",
      },
      "-=1.5",
    );
  }

  ScrollTrigger.create({
    trigger: component,
    start: "top bottom",
    onEnter: () => tl.play(),
  });
}
