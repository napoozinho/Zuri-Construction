import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const coverImageWrapper = document.querySelectorAll(
  "[data-cover-image='true']",
);

if (coverImageWrapper.length > 0) {
  coverImageWrapper.forEach((wrapper) => {
    const image = wrapper.querySelector("img");
    if (image) {
      if (window.innerWidth > 991) {
        gsap.to(image, {
          scale: 1.2,
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      } else {
        const proxy = { x: 25 };
        gsap.to(proxy, {
          x: 75,
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            onUpdate: () => {
              image.style.objectPosition = `${proxy.x}% 50%`;
            },
          },
        });
      }
    }
  });
}
