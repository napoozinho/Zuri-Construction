import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { supportsHover } from "../utils";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const component = document.querySelector("[data-component='testimonials']");

if (!!component) {
  let covers = Array.from(
    component.querySelectorAll("[data-testimonials='cover']"),
  );
  let thumbnails = Array.from(
    component.querySelectorAll("[data-testimonials='thumbnail']"),
  );
  let testimonials = Array.from(
    component.querySelectorAll("[data-testimonials='testimonial']"),
  );
  let metadatas = Array.from(
    component.querySelectorAll("[data-testimonials='metadata']"),
  );

  // remove projects with empty testimonials
  const idsToRemove = testimonials
    .filter((testimonial) => testimonial.firstChild.textContent.trim() === "")
    .map((testimonial) => testimonial.dataset.id);

  covers = filterAndRemove(covers);
  thumbnails = filterAndRemove(thumbnails);
  testimonials = filterAndRemove(testimonials);
  metadatas = filterAndRemove(metadatas);

  function filterAndRemove(array) {
    return array.filter((el) => {
      const shouldRemove = idsToRemove.includes(el.dataset.id);
      if (shouldRemove) el.remove();
      return !shouldRemove;
    });
  }

  // initial states
  covers.forEach((cover, index) => {
    if (index === 0) return;
    cover.classList.add("hide");
  });

  if (thumbnails[0]) thumbnails[0].classList.add("is-active");

  testimonials.forEach((testimonial, index) => {
    const textElement = testimonial.firstChild;
    textElement.textContent = `“${textElement.textContent}”`;
    if (index === 0) {
      SplitText.create(textElement, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
        aria: "none",
      });
      return;
    }
    testimonial.classList.add("hide");
  });

  metadatas.forEach((metadata, index) => {
    if (index === 0) return;
    metadata.classList.add("hide");
  });

  // reveal animation
  const tl = gsap.timeline({ paused: true });
  tl.from(thumbnails, {
    yPercent: 300,
    opacity: 0,
    duration: 1,
    ease: "expo.out",
    stagger: {
      amount: 0.2,
      from: "end",
    },
  })
    .from(
      testimonials[0].querySelectorAll(".line"),
      {
        yPercent: 100,
        duration: 1,
        ease: "expo.out",
        stagger: {
          amount: 0.2,
        },
      },
      "-=1",
    )
    .from(
      metadatas[0].childNodes[0],
      {
        yPercent: 100,
        duration: 1,
        ease: "expo.out",
      },
      "-=1",
    );
  ScrollTrigger.create({
    trigger: component,
    start: "bottom bottom",
    onEnter: () => {
      tl.play();
    },
  });

  // hover animation
  if (supportsHover) {
    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("mouseenter", (e) => {
        const target = e.currentTarget;
        if (target.classList.contains("is-active")) return;

        thumbnails.forEach((thumbnail) =>
          thumbnail.classList.remove("is-active"),
        );
        target.classList.add("is-active");

        const id = target.dataset.id;

        showOnlyWithId(covers);
        showOnlyWithId(testimonials);
        showOnlyWithId(metadatas);

        function showOnlyWithId(nodeList) {
          nodeList.forEach((el) => {
            el.classList.toggle("hide", el.dataset.id !== id);
          });
        }
      });
    });
  } else {
    component.addEventListener("click", (e) => {
      const thumbnail = e.target.closest("[data-testimonials='thumbnail']");
      if (!thumbnail || !component.contains(thumbnail)) return;
      const targetId = thumbnail.dataset.id;
      if (!thumbnail.classList.contains("is-active")) {
        e.preventDefault();
        thumbnails.forEach((thumbnail) =>
          thumbnail.classList.remove("is-active"),
        );
        covers.forEach((cover) => {
          cover.classList.toggle("hide", cover.dataset.id !== targetId);
        });
        testimonials.forEach((testimonial) => {
          testimonial.classList.toggle(
            "hide",
            testimonial.dataset.id !== targetId,
          );
        });
        metadatas.forEach((metadata) => {
          metadata.classList.toggle("hide", metadata.dataset.id !== targetId);
        });
        thumbnails.forEach((thumbnail) =>
          thumbnail.classList.remove("is-active"),
        );
        thumbnail.classList.add("is-active");
      }
    });
  }
}
