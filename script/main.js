document.addEventListener("DOMContentLoaded", () => {
  initThemeSwitcher();
  initBurgerMenu();
  initLanguageSwitcher();

  if (document.querySelector(".hero__stats")) {
    initCounterAnimation();
  }
});

function initThemeSwitcher() {
  const switchThemeButton = document.getElementById("switchTheme");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    document.body.classList.remove("light-theme");
  } else {
    document.body.classList.add("light-theme");
    document.body.classList.remove("dark-theme");
  }

  if (switchThemeButton) {
    switchThemeButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      document.body.classList.toggle("light-theme");

      const theme = document.body.classList.contains("dark-theme")
        ? "dark"
        : "light";
      localStorage.setItem("theme", theme);
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

    document.addEventListener("click", (event) => {
      const menuContainer = document.querySelector(".mobile-menu");
      if (
        !menuContainer.contains(event.target) &&
        menu.classList.contains("open")
      ) {
        toggleMobileMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("open")) {
        toggleMobileMenu();
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
    let newLanguage = "en";

    if (document.body.classList.contains("en-language")) {
      newLanguage = "ua";
    } else if (document.body.classList.contains("ua-language")) {
      newLanguage = "ru";
    }

    setLanguage(newLanguage);
  });

  function setLanguage(language) {
    languageOptions.forEach((option) => option.classList.remove("active"));

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

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          values.forEach(animateCount);
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(statsEl);
}

document.addEventListener("DOMContentLoaded", () => {
  const serviceLists = document.querySelectorAll(".hero__service-list");

  serviceLists.forEach((serviceList) => {
    const services = serviceList.querySelectorAll(".hero__service");

    services.forEach((service) => {
      const clonedService = service.cloneNode(true);
      serviceList.appendChild(clonedService);
    });

    let currentPosition = 0;
    const moveSpeed = 1;
    const totalWidth = serviceList.scrollWidth;
    const resetThreshold = totalWidth / 2;

    function moveMarquee() {
      currentPosition -= moveSpeed;

      if (Math.abs(currentPosition) >= resetThreshold) {
        currentPosition = 0;
        serviceList.style.transition = "none";
        serviceList.style.transform = `translateX(${currentPosition}px)`;

        setTimeout(() => {
          serviceList.style.transition = "transform 0.5s linear";
        }, 50);
      }

      serviceList.style.transform = `translateX(${currentPosition}px)`;
    }

    function animate() {
      moveMarquee();
      requestAnimationFrame(animate);
    }

    animate();
  });
});
