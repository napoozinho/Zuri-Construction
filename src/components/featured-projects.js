import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper from "swiper";

gsap.registerPlugin(ScrollTrigger);

const component = document.querySelector(
  "[data-component='featured-projects']",
);

if (!!component) {
  const images = component.querySelectorAll("[data-featured-projects='image']");
  const metadatas = component.querySelectorAll(
    "[data-featured-projects='metadata']",
  );

  images.forEach((image) => {
    gsap.set(image, { clipPath: "inset(100% 0% 0% 0%)", scale: 1.1 });
  });

  metadatas.forEach((metadata) => {
    const location = metadata.childNodes[0];
    const date = metadata.childNodes[1];
    location.textContent += `, ${date.textContent}`;
    date.remove();
  });

  const slider = component.querySelector(".swiper");
  const swiper = new Swiper(slider, {
    slidesPerView: "auto",
    watchSlidesProgress: true,
    on: {
      init: function (e) {
        const visibleSlides = e.visibleSlides;
        let images = [];
        visibleSlides.forEach((slide) => {
          slide.dataset.rendered = "true";
          const image = slide.querySelector("[data-featured-projects='image']");
          if (!image) return;
          images.push(image);
        });

        const tl = gsap.timeline({ paused: true });
        tl.to(images, {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 2,
          ease: "expo.inOut",
          stagger: 0.1,
        });
        ScrollTrigger.create({
          trigger: images[0],
          start: "50% bottom",
          onEnter: () => tl.play(),
        });
      },
      slideChange: function (e) {
        const visibleSlides = e.visibleSlides;
        visibleSlides.forEach((slide) => {
          if (slide.dataset.rendered) return;
          slide.dataset.rendered = "true";
          const image = slide.querySelector("[data-featured-projects='image']");
          if (!image) return;
          const tl = gsap.timeline();
          tl.to(image, {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1,
            ease: "expo.inOut",
          });
        });
      },
    },
  });
}
