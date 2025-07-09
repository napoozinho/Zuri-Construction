import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navbar = document.querySelector("[data-component='navbar']");

if (!!navbar) {
  const button = navbar.querySelector(".navbar_menu-button");
  let overlay;

  const interval = setInterval(() => {
    overlay = navbar.querySelector(".w-nav-overlay");
    if (overlay) {
      overlay.addEventListener("click", () => {
        button.click();
      });
      clearInterval(interval);
    }
  }, 333);

  const homeHero = document.querySelector("[data-component='home-hero']");
  let isInHomeHero = false;

  if (homeHero) {
    isInHomeHero = true;
    navbar.classList.remove("difference");
    const navbarHeight = navbar.offsetHeight;
    ScrollTrigger.create({
      trigger: homeHero,
      start: "top top",
      end: `bottom top+=${navbarHeight}px`,
      onLeave: () => {
        navbar.classList.add("difference");
        isInHomeHero = false;
      },
      onEnterBack: () => {
        navbar.classList.remove("difference");
        isInHomeHero = true;
      },
    });
  }

  button.addEventListener("click", handleMenu);
  button.addEventListener("keydown", handleMenu);

  function handleMenu(e) {
    if (e.key === "Enter" || e.key === " " || e.type === "click") {
      document.body.classList.toggle("overflow-hidden");
      navbar.classList.toggle("menu-open");
      if (!isInHomeHero) {
        if (navbar.classList.contains("difference")) {
          navbar.classList.toggle("difference");
        } else {
          setTimeout(() => {
            navbar.classList.toggle("difference");
          }, 400);
        }
      }
    }
  }
}
