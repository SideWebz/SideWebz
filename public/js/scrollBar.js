gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
  const progressBar = document.getElementById("scroll-progress");

  if (!progressBar) {
    console.warn("⚠️ #scroll-progress element not found.");
    return;
  }

  // Even wachten op layout zodat ScrollTrigger alles correct meet
  setTimeout(() => {
    const maxScroll = ScrollTrigger.maxScroll(document.documentElement); // ✅ let op: document.documentElement

    if (maxScroll === 0) {
      console.info("🔍 Pagina is niet scrollbaar, progress bar = 100%");
      progressBar.style.width = '100%';
      return;
    }

    ScrollTrigger.create({
      start: 0,
      end: maxScroll,
      onUpdate: self => {
        const progress = self.progress * 100;
        progressBar.style.width = `${progress}%`;
      }
    });

    ScrollTrigger.refresh();
  }, 100);
});
