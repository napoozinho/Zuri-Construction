const splitLinesElements = document.querySelectorAll(
  "[data-split-lines='true']",
);

let split = SplitText.create("[data-split-lines='true']", {
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
    duration: 2,
    ease: "power4.inOut",
    stagger: {
      amount: 0.3,
    },
  });

  ScrollTrigger.create({
    trigger: textElement,
    start: "50% bottom",
    onEnter: () => tl.play(),
  });
});
