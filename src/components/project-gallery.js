import Macy from "macy";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const component = document.querySelector("[data-component='project-gallery']");

if (!!component) {
  const container = component.querySelector(".w-dyn-items");

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

      thumbnails.forEach((thumbnail) => {
        gsap.set(thumbnail, {
          clipPath: "inset(100% 0% 0% 0%)",
          scale: 1.1,
        });
        gsap.to(thumbnail, {
          scrollTrigger: {
            trigger: thumbnail,
            start: "bottom bottom",
            end: "bottom top",
          },
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 2,
          ease: "expo.out",
          delay: Math.random() * 0.25,
        });
      });
    }
  });
}
