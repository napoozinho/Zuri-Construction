import Macy from "macy";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

const component = document.querySelector("[data-component='project-gallery']");

if (!!component) {
  const container = component.querySelector(".w-dyn-items");
  CustomEase.create("custom-ease", "0.62, 0.05, 0.01, 0.99");

  const macy = Macy({
    container: container,
    margin: 16,
    columns: 3,
    breakAt: {
      991: {
        columns: 2,
      },
      767: {
        margin: 8,
      },
    },
  });

  let macyFirstInit = true;
  macy.runOnImageLoad(function (e) {
    if (macyFirstInit) {
      macyFirstInit = false;
      const thumbnails = container.querySelectorAll("img");
      const initialBlur = 5;

      thumbnails.forEach((thumbnail) => {
        gsap.set(thumbnail, {
          clipPath: "inset(100% 0% 0% 0%)",
          scale: 1.1,
          webkitFilter: `blur(${initialBlur}px)`,
          filter: `blur(${initialBlur}px)`,
        });
        gsap.to(thumbnail, {
          scrollTrigger: {
            trigger: thumbnail,
            start: "25% bottom",
          },
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.6,
          webkitFilter: `blur(0px)`,
          filter: `blur(0px)`,
          ease: "custom-ease",
          delay: Math.random() * 0.25,
        });
      });
    }
  });
}
