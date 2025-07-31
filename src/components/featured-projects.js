import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
Swiper.use([Navigation]);
Swiper.use([Pagination]);

const component = document.querySelector(
  "[data-component='featured-projects']",
);

if (!!component) {
  const images = component.querySelectorAll("[data-featured-projects='image']");
  const metadatas = component.querySelectorAll(
    "[data-featured-projects='metadata']",
  );

  CustomEase.create("custom-ease", "0.62, 0.05, 0.01, 0.99");
  const initialBlur = 5;

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

  const slider = component.querySelector(".swiper");
  const pagination = component.querySelector(
    "[data-slider-controls='pagination']",
  );
  const prevEl = component.querySelector("[data-slider-controls='prev']");
  const nextEl = component.querySelector("[data-slider-controls='next']");

  const swiper = new Swiper(slider, {
    slidesPerView: "auto",
    watchSlidesProgress: true,
    navigation: {
      prevEl,
      nextEl,
    },
    pagination: {
      el: pagination,
      type: "custom",
      renderCustom: function (swiper, current, total) {
        return current + "/" + total;
      },
    },
    on: {
      init: function (e) {
        const allSlides = e.slides;
        const visibleSlides = e.visibleSlides;
        gsap.set(allSlides, { clipPath: "inset(100% 0% 0% 0%)" });
        let images = [];
        visibleSlides.forEach((slide) => {
          slide.dataset.rendered = "true";
          const image = slide.querySelector("[data-featured-projects='image']");
          if (!image) return;
          images.push(image);
        });

        const tl = gsap.timeline({ paused: true });
        tl.to(visibleSlides, {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.5,
          ease: "custom-ease",
          stagger: 0.07,
          delay: 0,
        });
        tl.to(
          images,
          {
            scale: 1,
            webkitFilter: `blur(0px)`,
            filter: `blur(0px)`,
            duration: 1.5,
            ease: "custom-ease",
            stagger: 0.07,
            delay: 0,
          },
          0,
        );

        ScrollTrigger.create({
          trigger: visibleSlides[0],
          start: "25% bottom",
          onEnter: () => tl.play(),
        });
      },
      slideChange: function (e) {
        const visibleSlides = e.visibleSlides;
        visibleSlides.forEach((slide) => {
          if (slide.dataset.rendered) return;
          slide.dataset.rendered = "true";
          const tl = gsap.timeline();
          tl.to(
            slide,
            {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              ease: "custom-ease",
            },
            0,
          );
          tl.to(
            slide.querySelector("[data-featured-projects='image']"),
            {
              webkitFilter: `blur(0px)`,
              filter: `blur(0px)`,
              ease: "custom-ease",
            },
            0,
          );
        });
      },
    },
  });
}
