const superscriptWrapper = document.querySelectorAll("[data-superscript]");
const numberOfProjects = document.querySelectorAll("[data-project]").length;

if (superscriptWrapper.length > 0 && numberOfProjects > 0) {
  superscriptWrapper.forEach((superscript) => {
    const texts = superscript.querySelectorAll("p");
    texts.forEach((text) => {
      text.innerHTML += `<sup>(${numberOfProjects})</sup>`;
    });
  });
}
