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
