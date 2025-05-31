// Zorg dat DOM geladen is
window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const progressBar = document.getElementById("scrollProgress");

  if (progressBar) {
    gsap.to(progressBar, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });
  } else {
    console.error("scrollProgress element not found!");
  }
});
