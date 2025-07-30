import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
CustomEase.create("custom-ease", "0.62, 0.05, 0.01, 0.99");

const images = document.querySelectorAll("[data-image-reveal]");

images.forEach((image) => {
  const tl = gsap.timeline({ paused: true });
  const initialBlur = 5;

  tl.fromTo(
    image,
    {
      clipPath: "inset(100% 0% 0% 0%)",
      scale: 1.1,
      webkitFilter: `blur(${initialBlur}px)`,
      filter: `blur(${initialBlur}px)`,
    },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      scale: 1,
      duration: 1.5,
      ease: "custom-ease",
      webkitFilter: `blur(0px)`,
      filter: `blur(0px)`,
    },
  );

  ScrollTrigger.create({
    trigger: image,
    start: "25% bottom",
    onEnter: () => tl.play(),
  });
});
