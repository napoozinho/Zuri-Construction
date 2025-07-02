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
    if (index === 0) return;
    testimonial.classList.add("hide");
  });

  metadatas.forEach((metadata, index) => {
    if (index === 0) return;
    metadata.classList.add("hide");
  });

  // hover animation
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
}
