gsap.registerPlugin(ScrollTrigger);

const wheel = document.querySelector('.sticky-circle');

// Cirkel rotatie + sticky pin tijdens scroll
gsap.to(wheel, {
  rotation: 360,
  ease: 'none',
  scrollTrigger: {
    trigger: 'main',
    start: 'top top',
    end: '+=350',
    scrub: 0.3,
    pin: true,
    anticipatePin: 1,
    onLeave: () => {
      // Na 1 rotatie wordt pin losgelaten, de cirkel gaat mee omhoog
      // (geen extra code nodig, pin=true regelt dat)
    },
    onEnterBack: () => {
      // Terug omhoog, cirkel wordt sticky en draait terug
    }
  }
});

// Intro fade-in animatie van de tekst
gsap.from('section.text-center', {
  opacity: 0,
  y: 40,
  duration: 1,
  ease: "power2.out",
  delay: 0.3
});
