gsap.registerPlugin(TextPlugin);

document.addEventListener('DOMContentLoaded', () => {
  const titleElement = document.getElementById('page-title');
  const rawText = titleElement.dataset.title || 'Welkom';
  // Check op streepje, neem alles na het eerste koppelteken of de hele string
  const processedText = rawText.includes('-')
    ? rawText.split('-').slice(1).join('-').trim()
    : rawText;

  const fullText = processedText.toUpperCase(); // Altijd in hoofdletters

  // Maak typ-streepje aan
  const cursor = document.createElement('span');
  cursor.classList.add('typing-cursor');
  cursor.textContent = '|';

  // Voeg typ-streepje toe naast tekst
  titleElement.innerHTML = '<span id="typewriter-text"></span>';
  titleElement.appendChild(cursor);

  const textSpan = document.getElementById('typewriter-text');

  // GSAP typewriter animatie
  const tl = gsap.timeline({
    onComplete: () => {
      cursor.remove(); // Verwijder streepje als klaar
    }
  });

  for (let i = 0; i <= fullText.length; i++) {
    tl.to(textSpan, {
      duration: 0.15,
      textContent: fullText.slice(0, i),
      ease: 'none',
      overwrite: 'auto'
    });
  }
});
