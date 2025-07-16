import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const component = document.querySelector(
  "[data-component='project-template-hero']",
);

if (!!component) {
  const metadata = component.querySelector(
    "[data-project-template-hero='metadata']",
  );
  if (metadata) {
    const location = metadata.querySelectorAll("p")[0];
    const date = metadata.querySelectorAll("p")[1];
    location.textContent += `, ${date.textContent}`;
    date.remove();

    // gsap.set(location, {autoAlpha:1})
    // gsap.from(location, {
    //   yPercent: 100,
    //   duration: 1.5,
    //   ease: "expo.out",
    //   delay: 0.6
    // });
  }
}
