import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper from "swiper";

gsap.registerPlugin(ScrollTrigger);

const component = document.querySelector("[data-component='team']");

if (!!component) {
  const images = component.querySelectorAll("[data-team='image']");

  images.forEach((image) => {
    gsap.set(image, { scale: 1.1 });
  });

  const slider = component.querySelector(".swiper");
  const swiper = new Swiper(slider, {
    slidesPerView: "auto",
    watchSlidesProgress: true,
    on: {
      init: function (e) {
        const allSlides = e.slides;
        const visibleSlides = e.visibleSlides;
        gsap.set(allSlides, { clipPath: "inset(100% 0% 0% 0%)" });
        let images = [];
        visibleSlides.forEach((slide) => {
          slide.dataset.rendered = "true";
          const image = slide.querySelector("[data-team='image']");
          if (!image) return;
          images.push(image);
        });

        if (window.innerWidth > 991) {
          visibleSlides.push(allSlides[2]);
        }

        const tl = gsap.timeline({ paused: true });
        tl.to(visibleSlides, {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 2,
          ease: "expo.out",
          stagger: 0.1,
          delay: 0.3,
        });
        tl.to(
          images,
          {
            scale: 1,
            duration: 2,
            ease: "expo.out",
            stagger: 0.1,
            delay: 0.3,
          },
          0,
        );

        ScrollTrigger.create({
          trigger: visibleSlides[0],
          start: "90% bottom",
          onEnter: () => tl.play(),
        });
      },
      slideChange: function (e) {
        const visibleSlides = e.visibleSlides;
        visibleSlides.forEach((slide) => {
          if (slide.dataset.rendered) return;
          slide.dataset.rendered = "true";
          const tl = gsap.timeline();
          tl.to(slide, {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1,
            ease: "expo.out",
          });
        });
      },
    },
  });
}
