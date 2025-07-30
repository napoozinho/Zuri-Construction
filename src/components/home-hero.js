import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { supportsHover } from "../utils";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(CustomEase);

const component = document.querySelector("[data-component='home-hero']");

if (!!component) {
  const curtain = component.querySelector("[data-home-hero='curtain']");
  const curtainItem = component.querySelectorAll(
    "[data-home-hero='curtain-item']",
  );
  const heading = component.querySelector("h1");
  const covers = component.querySelectorAll("[data-home-hero='cover']");
  const thumbnails = component.querySelectorAll("[data-home-hero='thumbnail']");
  const metadatas = component.querySelectorAll("[data-home-hero='metadata']");

  CustomEase.create("custom-ease", "0.62, 0.05, 0.01, 0.99");

  SplitText.create(heading, {
    type: "lines",
    mask: "lines",
    linesClass: "line",
    aria: "none",
  });
  const headingLines = heading.querySelectorAll(".line");

  // loader animation
  curtainItem.forEach((item, i) => {
    const parent = item.parentElement.parentElement;
    const parentHeight = parent.offsetHeight / 2;
    gsap.set(item, { y: parentHeight });
    if (i === 0) {
      gsap.to(curtainItem, {
        opacity: 1,
        y: 0,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.1,
        delay: 0.25,
        onComplete: () => {
          gsap.to(curtainItem, {
            y: "-300%",
            opacity: 0,
            duration: 0.75,
            ease: "expo.in",
            stagger: 0.1,
          });
        },
      });
    }
  });
  const curtainTimeline = gsap.timeline({});
  curtainTimeline
    .fromTo(
      curtain,
      { height: "100%" },
      {
        height: "0%",
        duration: 2,
        ease: "power4.inOut",
        delay: 1.5,
      },
    )
    .from(
      headingLines,
      {
        yPercent: 100,
        duration: 1.5,
        ease: "custom-ease",
        stagger: {
          amount: 0.3,
        },
      },
      "-=1",
    )
    .from(
      thumbnails,
      {
        yPercent: 300,
        opacity: 0,
        duration: 1.5,
        ease: "custom-ease",
        stagger: {
          amount: 0.3,
          from: "end",
        },
      },
      "-=1.5",
    )
    .from(
      metadatas[0],
      {
        yPercent: 300,
        duration: 1.5,
        ease: "custom-ease",
      },
      "-=1.25",
    );

  // hero initial states
  covers.forEach((cover, i) => {
    if (i === 0) {
      cover.classList.remove("hide");
    } else {
      cover.classList.add("hide");
    }
  });
  metadatas.forEach((metadata, i) => {
    if (i === 0) {
      metadata.classList.remove("hide");
    } else {
      metadata.classList.add("hide");
    }
    const location = metadata.children[2];
    const date = metadata.lastChild;
    if (location && date) {
      location.textContent += `, ${date.textContent}`;
      date.remove();
    }
  });
  thumbnails[0]?.classList.add("is-active");

  // hero hover animations
  if (supportsHover) {
    component.addEventListener(
      "mouseenter",
      (e) => {
        const thumbnail = e.target.closest("[data-home-hero='thumbnail']");
        if (!thumbnail || !component.contains(thumbnail)) return;

        const targetId = thumbnail.dataset.id;

        // Only update if not already active
        if (thumbnail.classList.contains("is-active")) return;

        // Hide all covers and show the one with matching id
        covers.forEach((cover) => {
          cover.classList.toggle("hide", cover.dataset.id !== targetId);
        });

        // Hide all metadata and show the one with matching id
        metadatas.forEach((metadata) => {
          metadata.classList.toggle("hide", metadata.dataset.id !== targetId);
        });

        // Remove is-active from all thumbnails, add to current
        thumbnails.forEach((thumbnail) =>
          thumbnail.classList.remove("is-active"),
        );
        thumbnail.classList.add("is-active");
      },
      true,
    );
  } else {
    component.addEventListener("click", (e) => {
      const thumbnail = e.target.closest("[data-home-hero='thumbnail']");
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
