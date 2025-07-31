const superscriptWrapper = document.querySelectorAll("[data-projects-sup]");
const numberOfProjects = document.querySelectorAll("[data-project]").length;

if (superscriptWrapper.length > 0 && numberOfProjects > 0) {
  superscriptWrapper.forEach((superscript) => {
    const sup = superscript.querySelector("sup");
    sup.textContent = `(${numberOfProjects})`;
  });
}
