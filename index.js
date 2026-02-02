const hamburger = document.getElementById("hamburger");
const header = document.querySelector("header");

hamburger.addEventListener("click", () => {
  header.classList.toggle("menu-open");
});
const links = document.querySelectorAll(".menu-overlay a");

links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

const arrow = document.querySelector(".arrow");
const featured = document.querySelector(".mobile");

arrow.addEventListener("click", () => {
  featured.scrollIntoView({ behavior: "smooth" });
});

const strelica = document.querySelector(".strelica");
const hero = document.querySelector(".hero");

strelica.addEventListener("click", () => {
  hero.scrollIntoView({ behavior: "smooth" });
});

const previewButtons = document.querySelectorAll(".preview-btn");

previewButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const section = btn.closest("header, footer, .mobile");

    const radovi = section.querySelector(".radovi, .wradovi");
    const videoWrapper = section.querySelector(".video-wrapper");
    const video = videoWrapper.querySelector("video");
    const closeBtn = section.querySelector(".close-video");

    if (radovi) radovi.style.display = "none";
    btn.style.display = "none";

    videoWrapper.style.display = "flex";
    setTimeout(() => videoWrapper.classList.add("active"), 10);

    const mobileSections = document.querySelectorAll("main .mobile");

    const fastIndexes = [0, 2];
    const speed30 = [4, 5, 6];
    fastIndexes.forEach((index) => {
      const section = mobileSections[index];
      if (!section) return;

      const videos = section.querySelectorAll("video");

      videos.forEach((video) => {
        video.playbackRate = 2.4;
      });
    });

    speed30.forEach((index) => {
      const section = mobileSections[index];
      if (!section) return;

      section.querySelectorAll("video").forEach((video) => {
        video.playbackRate = 1.1;
      });
    });

    video.play();

    closeBtn.onclick = () => {
      video.pause();
      video.currentTime = 0;
      videoWrapper.classList.remove("active");

      setTimeout(() => {
        videoWrapper.style.display = "none";
        if (radovi) radovi.style.display = "";
        btn.style.display = "inline-block";
      }, 300);
    };
  });
});
const snapSections = document.querySelectorAll(".mobile");

let isScrolling = false;

window.addEventListener(
  "wheel",
  (e) => {
    if (isScrolling) return;

    const current = [...snapSections].find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top >= -10 && rect.top <= 10;
    });

    if (!current) return;

    let target;

    if (e.deltaY > 0) {
      target = snapSections[[...snapSections].indexOf(current) + 1];
    } else {
      target = snapSections[[...snapSections].indexOf(current) - 1];
    }

    if (target) {
      isScrolling = true;
      scrollToSection(target);
      setTimeout(() => {
        isScrolling = false;
      }, 700);
    }
  },
  { passive: true },
);
