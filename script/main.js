document.addEventListener("DOMContentLoaded", () => {
  initThemeSwitcher();
  initBurgerMenu();
  initLanguageSwitcher();

  // Загружаем и инициализируем счетчики только если они есть на странице
  if (document.querySelector(".hero__stats")) {
    initCounterAnimation();
  }

  // Загружаем и инициализируем слайдеры только если они есть на странице
  if (document.querySelector(".hero__services-wrapper")) {
    initServicesSwiper();
  }
});

function initThemeSwitcher() {
  const switchThemeButton = document.getElementById("switchTheme");

  if (switchThemeButton) {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
      switchThemeButton.classList.add("dark");
      
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
      switchThemeButton.classList.remove("dark");
    }

    switchThemeButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      document.body.classList.toggle("light-theme");
      switchThemeButton.classList.toggle("dark");
          switchThemeButton.classList.toggle('fa-moon');
    switchThemeButton.classList.add('animate-toggle');

      if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }
}

function initBurgerMenu() {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".mobile-links");
  const body = document.body;
  const overlay = document.querySelector(".menu-overlay");

  if (burger && menu && overlay) {
    function toggleMobileMenu() {
      menu.classList.toggle("open");
      burger.classList.toggle("open");

      const isMenuOpen = menu.classList.contains("open");
      menu.setAttribute("aria-hidden", !isMenuOpen);

      if (isMenuOpen) {
        overlay.classList.add("active");
        body.style.overflow = "hidden";
        body.classList.add("menu-open");
      } else {
        overlay.classList.remove("active");
        body.style.overflow = "";
        body.classList.remove("menu-open");
      }
    }

    burger.addEventListener("click", toggleMobileMenu);

    document.addEventListener("click", function (event) {
      const menuContainer = document.querySelector(".mobile-menu");
      if (
        !menuContainer.contains(event.target) &&
        menu.classList.contains("open")
      ) {
        toggleMobileMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        if (menu.classList.contains("open")) {
          toggleMobileMenu();
        }
      }
    });
  }
}

function initLanguageSwitcher() {
  const languageToggle = document.getElementById("languageToggle");
  const languageOptions = document.querySelectorAll(".language-option");

  const savedLanguage = localStorage.getItem("language") || "en";
  setLanguage(savedLanguage);

  languageToggle.addEventListener("click", () => {
    let newLanguage = "en"; // Default to English

    if (document.body.classList.contains("en-language")) {
      newLanguage = "ua";
    } else if (document.body.classList.contains("ua-language")) {
      newLanguage = "ru";
    }

    setLanguage(newLanguage);
  });

  function setLanguage(language) {
    languageOptions.forEach((option) => {
      option.classList.remove("active");
    });

    document.body.classList.remove("en-language", "ua-language", "ru-language");
    document.body.classList.add(`${language}-language`);
    languageToggle.classList.add("active");

    document.getElementById(language).classList.add("active");

    localStorage.setItem("language", language);
  }
}

function initCounterAnimation() {
  const statsEl = document.querySelector(".hero__stats");
  const values = document.querySelectorAll(".hero__stats-value");
  let started = false;

  const animateCount = (el) => {
    const target = +el.dataset.target;
    const step = Math.ceil(target / 200);
    let count = 0;

    const update = () => {
      count += step;
      el.textContent = count < target ? count : target;
      if (count < target) {
        requestAnimationFrame(update);
      }
    };
    update();
  };

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          values.forEach(animateCount);
          obs.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  obs.observe(statsEl);
}

function initServicesSwiper() {
  const wrapper = document.querySelector(".hero__services-wrapper");
  if (!wrapper) return;

  const originalSlides = Array.from(wrapper.children);
  const neededClones = 10;
  for (let i = 0; i < neededClones; i++) {
    const slide = originalSlides[i % originalSlides.length].cloneNode(true);
    wrapper.appendChild(slide);
  }

  /* global Swiper */
  new Swiper(".hero__services-slider", {
    loop: true,
    speed: 5000,
    slidesPerView: "auto",
    spaceBetween: 0,
    autoplay: { delay: 0, disableOnInteraction: false },
    allowTouchMove: false,
  });
}


