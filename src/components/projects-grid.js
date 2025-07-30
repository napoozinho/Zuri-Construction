import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

const component = document.querySelector("[data-component='projects']");

if (!!component) {
  const items = component.querySelectorAll("[data-projects='item']");
  const images = component.querySelectorAll("[data-projects='image']");
  const metadatas = component.querySelectorAll("[data-projects='metadata']");
  const initialBlur = 5;
  CustomEase.create("custom-ease", "0.62, 0.05, 0.01, 0.99");

  images.forEach((image) => {
    gsap.set(image, {
      scale: 1.1,
      webkitFilter: `blur(${initialBlur}px)`,
      filter: `blur(${initialBlur}px)`,
    });
  });

  metadatas.forEach((metadata) => {
    const location = metadata.childNodes[0];
    const date = metadata.childNodes[1];
    location.textContent += `, ${date.textContent}`;
    date.remove();
  });

  gsap.set(items, { clipPath: "inset(100% 0% 0% 0%)" });

  items.forEach((item, index) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        start: "25% bottom",
      },
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.5,
      delay: Math.random() * 0.25,
      ease: "custom-ease",
    });

    gsap.to(item.querySelector("[data-projects='image']"), {
      scrollTrigger: {
        trigger: item,
        start: "25% bottom",
      },
      clipPath: "inset(0% 0% 0% 0%)",
      webkitFilter: `blur(0px)`,
      filter: `blur(0px)`,
      scale: 1,
      duration: 1.5,
      ease: "custom-ease",
      delay: Math.random() * 0.25,
    });
  });
}
