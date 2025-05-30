// gsapp.js
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.gsap-fade').forEach(el => {
  gsap.from(el, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    scrollTrigger: el
  });
});

gsap.utils.toArray('.gsap-up').forEach(el => {
  gsap.from(el, {
    opacity: 0,
    y: 50,
    duration: 0.6,
    scrollTrigger: el
  });
});

gsap.utils.toArray('.gsap-left').forEach(el => {
  gsap.from(el, {
    opacity: 0,
    x: -60,
    duration: 0.7,
    scrollTrigger: el
  });
});

gsap.utils.toArray('.gsap-right').forEach(el => {
  gsap.from(el, {
    opacity: 0,
    x: 60,
    duration: 0.7,
    scrollTrigger: el
  });
});
