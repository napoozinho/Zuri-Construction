import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(CustomEase);

const component = document.querySelector("[data-component='expertise']");

if (!!component) {
  const names = component.querySelectorAll("[data-expertise='name']");
  const summaries = component.querySelectorAll("[data-expertise='summary']");
  const images = component.querySelectorAll("[data-expertise='image']");
  const summariesWrapper = component.querySelector(
    "[data-expertise='summaries-wrapper']",
  );
  const summariesTarget = component.querySelector(
    "[data-expertise='summaries-target']",
  );
  CustomEase.create("custom-ease", "0.62, 0.05, 0.01, 0.99");

  if (window.innerWidth < 992) {
    summariesTarget.append(summariesWrapper);
    const tallestSummary = Math.max(
      ...Array.from(summaries, (el) => el.offsetHeight),
    );
    summaries[0].parentElement.style.paddingBottom = `${tallestSummary}px`;
  }

  let isImageAnimating = false;
  let isSummaryAnimating = false;

  /* names initial states */
  names[0].classList.add("is-active");
  /* images initial states */
  images.forEach((image) => {
    gsap.set(image, { clipPath: "inset(100% 0% 0% 0%)" });
  });
  gsap.to(images[0], {
    scrollTrigger: {
      trigger: images[0].closest(".expertise_visuals_wrapper"),
      start: "50% bottom",
    },
    clipPath: "inset(0% 0% 0% 0%)",
    duration: 1,
    ease: "custom-ease",
  });

  /* summaries initial states */
  summaries.forEach((summary, index) => {
    if (summary.firstElementChild) {
      SplitText.create(summary.firstElementChild, {
        type: "lines",
        mask: "lines",
        aria: "none",
        linesClass: "summary-line",
      });
    }
    let lines = summary.querySelectorAll(".summary-line");
    let tl = gsap.timeline({ paused: true });
    tl.from(lines, {
      yPercent: 100,
      duration: 1,
      ease: "custom-ease",
      stagger: {
        amount: 0.3,
      },
    });
    summary.classList.add("hide");
    if (index == 0) {
      summary.classList.remove("hide");
      tl.play();
    }
  });

  /* hover animations */
  names.forEach((name) => {
    name.addEventListener("mousemove", (e) => {
      if (name.classList.contains("is-active")) return;
      if (isImageAnimating || isSummaryAnimating) return;
      const target = e.currentTarget;
      const id = target.dataset.id;
      animateName(id);
      animateImage(id);
      animateSummary(id);
    });
  });

  function animateName(id) {
    names.forEach((name) => {
      if (name.dataset.id == id) {
        name.classList.add("is-active");
      } else {
        name.classList.remove("is-active");
      }
    });
  }

  function animateImage(id) {
    isImageAnimating = true;
    images.forEach((image) => {
      if (image.dataset.id == id) {
        gsap.to(image, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.75,
          ease: "custom-ease",
          onStart: () => {
            images.forEach((image) => {
              if (image.dataset.id == id) {
                gsap.set(image, { zIndex: 1 });
              } else {
                gsap.set(image, { zIndex: 0 });
              }
            });
          },
          onComplete: () => {
            images.forEach((image) => {
              if (image.dataset.id != id) {
                gsap.set(image, { clipPath: "inset(100% 0% 0% 0%)" });
              }
            });
            isImageAnimating = false;
            animationsEnded();
          },
        });
      }
    });
  }

  function animateSummary(id) {
    isSummaryAnimating = true;
    summaries.forEach((summary) => {
      let lines = summary.querySelectorAll(".summary-line");
      let tl = gsap.timeline();
      if (summary.dataset.id == id) {
        summary.classList.remove("hide");
        tl.to(lines, {
          yPercent: 0,
          duration: 0.5,
          delay: 0.1,
          ease: "custom-ease",
          stagger: {
            amount: 0.1,
          },
          onComplete: () => {
            isSummaryAnimating = false;
            animationsEnded();
          },
        });
      } else {
        tl.to(lines, {
          yPercent: 100,
          duration: 0.5,
          ease: "custom-ease",
          stagger: {
            amount: 0.1,
          },
          onComplete: () => {
            summary.classList.add("hide");
          },
        });
      }
    });
  }

  let mouseX = 0;
  let mouseY = 0;
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animationsEnded() {
    if (isImageAnimating || isSummaryAnimating) return;
    const mouseOnElement = document.elementFromPoint(mouseX, mouseY);
    if (mouseOnElement && mouseOnElement.closest("[data-expertise='name']")) {
      const mouseOnName = mouseOnElement.closest("[data-expertise='name']");
      if (mouseOnName.classList.contains("is-active")) return;
      const id = mouseOnName.dataset.id;
      animateName(id);
      animateImage(id);
      animateSummary(id);
    }
  }
}
