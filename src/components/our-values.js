const component = document.querySelector("[data-component='our-values']");

if (!!component) {
  const section = component.querySelector("section");
  const sectionHeight = section.offsetHeight;
  const screenHeight = window.innerHeight;
  const stickyOffset = sectionHeight - screenHeight;
  section.style.top = `-${stickyOffset}px`;

  const indexes = component.querySelectorAll("[data-our-values='item-index']");
  indexes.forEach((index) => {
    textElement = index.firstChild;
    textElement.textContent = `/ ${textElement.textContent.padStart(3, "0")}`;
  });
}
