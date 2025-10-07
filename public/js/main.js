// Zorg dat GSAP en ScrollTrigger geladen zijn
gsap.registerPlugin(ScrollTrigger);

// Animatie helper functie
function fadeIn(direction = "up", duration = 1) {
  const elements = document.querySelectorAll(`.fade-in-${direction}`);
  elements.forEach(el => {
    let x = 0, y = 0;

    if(direction === "left") x = -100;
    if(direction === "right") x = 100;
    if(direction === "up") y = 100;
    if(direction === "down") y = -100;

    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 80%", // wanneer 80% van viewport
        toggleActions: "play none none none"
      },
      opacity: 0,
      x: x,
      y: y,
      duration: duration,
      ease: "power2.out"
    });
  });
}

// Roep animaties aan
fadeIn("left");
fadeIn("right");
fadeIn("up");
fadeIn("down");
