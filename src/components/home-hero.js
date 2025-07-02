const component = document.querySelector("[data-component='home-hero']");

window.scrollTo(0, 0);

if (!!component) {
  const curtain = component.querySelector("[data-home-hero='curtain']");
  const curtainItem = component.querySelectorAll(
    "[data-home-hero='curtain-item']",
  );
  const coverItems = component.querySelectorAll("[data-home-hero='cover']");
  const thumbnailItems = component.querySelectorAll(
    "[data-home-hero='thumbnail']",
  );
  const metadataItems = component.querySelectorAll(
    "[data-home-hero='metadata']",
  );

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
  gsap.fromTo(
    curtain,
    { height: "100%" },
    { height: "0%", duration: 2, ease: "power4.inOut", delay: 1.5 },
  );

  // hero initial states
  coverItems.forEach((cover, i) => {
    if (i === 0) {
      cover.classList.remove("hide");
    } else {
      cover.classList.add("hide");
    }
  });
  metadataItems.forEach((metadata, i) => {
    if (i === 0) {
      metadata.classList.remove("hide");
    } else {
      metadata.classList.add("hide");
    }
    const location = metadata.children[1];
    const date = metadata.lastChild;
    if (location && date) {
      location.textContent += `, ${date.textContent}`;
      date.remove();
    }
  });
  thumbnailItems[0]?.classList.add("is-active");

  // hero hover animations
  component.addEventListener(
    "mouseenter",
    (e) => {
      const thumbnail = e.target.closest("[data-home-hero='thumbnail']");
      if (!thumbnail || !component.contains(thumbnail)) return;

      const targetId = thumbnail.dataset.id;

      // Only update if not already active
      if (thumbnail.classList.contains("is-active")) return;

      // Hide all covers and show the one with matching id
      coverItems.forEach((cover) => {
        cover.classList.toggle("hide", cover.dataset.id !== targetId);
      });

      // Hide all metadata and show the one with matching id
      metadataItems.forEach((metadata) => {
        metadata.classList.toggle("hide", metadata.dataset.id !== targetId);
      });

      // Remove is-active from all thumbnails, add to current
      thumbnailItems.forEach((item) => item.classList.remove("is-active"));
      thumbnail.classList.add("is-active");
    },
    true,
  );
}
