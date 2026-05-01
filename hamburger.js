(function () {
  "use strict";

  /* FORM preferences (choosing what form you want to use or interact with) */

  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileNav = document.getElementById("mobile-nav");
  const navOverlay = document.getElementById("nav-overlay");
  const closeBtn = document.getElementById("mobile-nav-close");

  /* Guard: abort silently if elements are missing */
  if (!hamburgerBtn || !mobileNav || !navOverlay || !closeBtn) {
    console.warn(
      "[hamburger.js] Required elements not found. Check IDs: hamburger-btn, mobile-nav, nav-overlay, mobile-nav-close",
    );
    return;
  }

  /* Collect all focusable elements inside the drawer */
  function getFocusableElements() {
    return Array.from(
      mobileNav.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
  }

  /* OPEN (this part opens the navigation bar */

  function openNav() {
    mobileNav.classList.add("is-open");
    navOverlay.classList.add("is-visible");
    hamburgerBtn.classList.add("is-open");
    document.body.classList.add("nav-open");

    /* ARIA */
    hamburgerBtn.setAttribute("aria-expanded", "true");
    mobileNav.setAttribute("aria-hidden", "false");
    navOverlay.setAttribute("aria-hidden", "false");

    /* Move focus to close button */
    setTimeout(() => closeBtn.focus(), 50);
  }

  /* CLOSE (this part closes the navigation bar) */

  function closeNav() {
    mobileNav.classList.remove("is-open");
    navOverlay.classList.remove("is-visible");
    hamburgerBtn.classList.remove("is-open");
    document.body.classList.remove("nav-open");

    /* ARIA */
    hamburgerBtn.setAttribute("aria-expanded", "false");
    mobileNav.setAttribute("aria-hidden", "true");
    navOverlay.setAttribute("aria-hidden", "true");

    /* Return focus to hamburger button */
    hamburgerBtn.focus();
  }

  /* TOGGLE (handling the toggle menu) */

  function toggleNav() {
    if (mobileNav.classList.contains("is-open")) {
      closeNav();
    } else {
      openNav();
    }
  }

  /* FOCUS TRAP
     Keeps keyboard focus inside the drawer while open */

  function handleKeydown(e) {
    if (!mobileNav.classList.contains("is-open")) return;

    /* Close on Escape */

    if (e.key === "Escape") {
      closeNav();
      return;
    }

    /* Trap Tab focus */

    if (e.key === "Tab") {
      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        /* Shift+Tab: if on first element, wrap to last */
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        /* Tab: if on last element, wrap to first */
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }

  /* CLOSE NAV LINKS
     Close drawer when a mobile nav link is clicked */

  mobileNav.querySelectorAll(".mobile-nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      /* Small delay so navigation has time to fire first */
      setTimeout(closeNav, 120);
    });
  });

  /*  EVENT LISTENERS */

  hamburgerBtn.addEventListener("click", toggleNav);
  closeBtn.addEventListener("click", closeNav);
  navOverlay.addEventListener("click", closeNav);
  document.addEventListener("keydown", handleKeydown);

  /* Close drawer on resize to desktop (≥ 768px) */

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 368 && mobileNav.classList.contains("is-open")) {
      closeNav();
    }
  });
})();

/* this javascript that fix the bug of the hamburger menu that when you click on the hamburger menu it will open the menu but when you click on the hamburger menu again it will not close the menu and you have to click on the close button to close the menu. This javascript will fix that bug by adding a toggle function that will check if the menu is open or not and then it will open or close the menu accordingly. */

(function () {
  "use strict";

  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileNav = document.getElementById("mobile-nav");
  const navOverlay = document.getElementById("nav-overlay");
  const closeBtn = document.getElementById("mobile-nav-close");

  /* Guard: abort silently if elements are missing */
  if (!hamburgerBtn || !mobileNav || !navOverlay || !closeBtn) {
    console.warn(
      "[hamburger.js] Required elements not found. Check IDs: hamburger-btn, mobile-nav, nav-overlay, mobile-nav-close",
    );
    return;
  }

  /* Track scroll position so body:fixed doesn't cause page jump */
  let scrollY = 0;

  /* Collect all focusable elements inside the drawer */
  function getFocusableElements() {
    return Array.from(
      mobileNav.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
  }

  /* OPEN */
  function openNav() {
    /* Save current scroll position before fixing body */
    scrollY = window.scrollY;

    mobileNav.classList.add("is-open");
    navOverlay.classList.add("is-visible");
    hamburgerBtn.classList.add("is-open");

    /* Lock body scroll without causing a page jump:
       set top to negative scrollY so content stays in place visually */
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add("nav-open");

    /* ARIA */
    hamburgerBtn.setAttribute("aria-expanded", "true");
    mobileNav.setAttribute("aria-hidden", "false");
    navOverlay.setAttribute("aria-hidden", "false");

    /* Move focus to close button */
    setTimeout(() => closeBtn.focus(), 50);
  }

  /* CLOSE */
  function closeNav() {
    mobileNav.classList.remove("is-open");
    navOverlay.classList.remove("is-visible");
    hamburgerBtn.classList.remove("is-open");

    /* Remove body lock and restore scroll position */
    document.body.classList.remove("nav-open");
    document.body.style.top = "";

    /* Restore scroll position silently */
    window.scrollTo(0, scrollY);

    /* ARIA */
    hamburgerBtn.setAttribute("aria-expanded", "false");
    mobileNav.setAttribute("aria-hidden", "true");
    navOverlay.setAttribute("aria-hidden", "true");

    /* Return focus to hamburger button */
    hamburgerBtn.focus();
  }

  /* TOGGLE */
  function toggleNav() {
    if (mobileNav.classList.contains("is-open")) {
      closeNav();
    } else {
      openNav();
    }
  }

  /* FOCUS TRAP — keeps keyboard focus inside the drawer while open */
  function handleKeydown(e) {
    if (!mobileNav.classList.contains("is-open")) return;

    if (e.key === "Escape") {
      closeNav();
      return;
    }

    if (e.key === "Tab") {
      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }

  /* Close drawer when a mobile nav link is clicked */
  mobileNav.querySelectorAll(".mobile-nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      setTimeout(closeNav, 120);
    });
  });

  /* Event listeners */
  hamburgerBtn.addEventListener("click", toggleNav);
  closeBtn.addEventListener("click", closeNav);
  navOverlay.addEventListener("click", closeNav);
  document.addEventListener("keydown", handleKeydown);

  /* Close drawer on resize to desktop */
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024 && mobileNav.classList.contains("is-open")) {
      closeNav();
    }
  });
})();
