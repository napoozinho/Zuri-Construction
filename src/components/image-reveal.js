import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = document.querySelectorAll("[data-image-reveal]");

images.forEach((image) => {
  const tl = gsap.timeline({ paused: true });

  tl.fromTo(
    image,
    {
      clipPath: "inset(100% 0% 0% 0%)",
      scale: 1.1,
    },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      scale: 1,
      duration: 2,
      ease: "expo.inOut",
    },
  );

  ScrollTrigger.create({
    trigger: image,
    start: "50% bottom",
    onEnter: () => tl.play(),
  });
});
