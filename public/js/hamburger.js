let menuOpen = false;
let tl;

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  const links = mobileMenu.querySelectorAll("a");

  tl = gsap.timeline({ paused: true });

  tl.to(mobileMenu, {
    y: 0,
    opacity: 1,
    duration: 0.5,
    ease: "power4.out",
    onStart: () => {
      mobileMenu.classList.add("open");
      document.body.classList.add("menu-open");
    },
  });

  tl.to(
    links,
    {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      y: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "back.out(1.7)",
    },
    "-=0.3"
  );

  function toggleMenu() {
    menuOpen = !menuOpen;
    if (menuOpen) {
      tl.play();
      animateBurger(true);
    } else {
      tl.reverse().eventCallback("onReverseComplete", () => {
        mobileMenu.classList.remove("open");
        document.body.classList.remove("menu-open");
      });
      animateBurger(false);
    }
  }

  burger.addEventListener("click", toggleMenu);

  links.forEach((link) =>
    link.addEventListener("click", () => {
      if (menuOpen) toggleMenu();
    })
  );

  function animateBurger(open) {
    const [line1, line2, line3] = burger.children;

    if (open) {
      line1.style.transform = "translateY(8px) rotate(45deg)";
      line2.style.opacity = "0";
      line3.style.transform = "translateY(-8px) rotate(-45deg)";
    } else {
      line1.style.transform = "translateY(0) rotate(0)";
      line2.style.opacity = "1";
      line3.style.transform = "translateY(0) rotate(0)";
    }
  }
});

// ✅ Fix menu-reset bij resize
window.addEventListener("resize", () => {
  const isDesktop = window.innerWidth > 768;
  if (isDesktop && menuOpen && tl) {
    tl.reverse().eventCallback("onReverseComplete", () => {
      document.getElementById("mobileMenu").classList.remove("open");
      document.body.classList.remove("menu-open");
      document.getElementById("burger").children[0].style.transform = "translateY(0) rotate(0)";
      document.getElementById("burger").children[1].style.opacity = "1";
      document.getElementById("burger").children[2].style.transform = "translateY(0) rotate(0)";
      menuOpen = false;
    });
  }
});
