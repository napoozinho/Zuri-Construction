import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const component = document.querySelector("[data-component='projects']");

if (!!component) {
  const items = component.querySelectorAll("[data-projects='item']");
  const images = component.querySelectorAll("[data-projects='image']");
  const metadatas = component.querySelectorAll("[data-projects='metadata']");

  images.forEach((image) => {
    gsap.set(image, { scale: 1.1 });
  });

  metadatas.forEach((metadata) => {
    const location = metadata.childNodes[0];
    const date = metadata.childNodes[1];
    location.textContent += `, ${date.textContent}`;
    date.remove();
  });

  gsap.set(items, { clipPath: "inset(100% 0% 0% 0%)" });

  items.forEach((item, index) => {
    let stagger = 0 + index * 0.05;
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        start: "60% bottom",
        end: "bottom top",
      },
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 2,
      delay: stagger,
      ease: "expo.out",
    });

    gsap.to(item.querySelector("[data-projects='image']"), {
      scrollTrigger: {
        trigger: item,
        start: "80% bottom",
        end: "bottom top",
      },
      clipPath: "inset(0% 0% 0% 0%)",
      scale: 1,
      duration: 2,
      ease: "expo.out",
      delay: stagger,
    });
  });
}
