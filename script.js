const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");
const photoTriggers = document.querySelectorAll(".photo-trigger");

if (lightbox && lightboxImage && lightboxClose && photoTriggers.length) {
  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    document.body.style.overflow = "";
  };

  photoTriggers.forEach((trigger) => {
    const image = trigger.querySelector("img");
    if (!image) return;

    trigger.addEventListener("click", () => {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}

const carousel = document.querySelector(".featured-carousel");

if (carousel) {
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const thumbs = Array.from(carousel.querySelectorAll(".carousel-thumb"));
  const arrows = Array.from(carousel.querySelectorAll(".carousel-arrow"));
  let currentSlide = slides.findIndex((slide) => slide.classList.contains("is-active"));

  if (currentSlide < 0) currentSlide = 0;

  const renderCarousel = (index) => {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
    });

    thumbs.forEach((thumb, thumbIndex) => {
      thumb.classList.toggle("is-active", thumbIndex === index);
    });

    currentSlide = index;
  };

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => renderCarousel(index));
  });

  arrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      const direction = arrow.dataset.direction === "next" ? 1 : -1;
      const nextIndex = (currentSlide + direction + slides.length) % slides.length;
      renderCarousel(nextIndex);
    });
  });
}
