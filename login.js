/* TAB SWITCHER (here is where the javascript makes the log in and create account form switch  */

function switchTab(tab) {
  const loginContent = document.getElementById("content-login");
  const registerContent = document.getElementById("content-register");
  const tabLogin = document.getElementById("tab-login");
  const tabRegister = document.getElementById("tab-register");
  const indicator = document.getElementById("tab-indicator");

  if (tab === "login") {
    loginContent.style.display = "block";
    registerContent.style.display = "none";
    tabLogin.classList.add("tab-btn--active");
    tabRegister.classList.remove("tab-btn--active");
    indicator.style.transform = "translateX(0)";
  } else {
    loginContent.style.display = "none";
    registerContent.style.display = "block";
    tabLogin.classList.remove("tab-btn--active");
    tabRegister.classList.add("tab-btn--active");
    indicator.style.transform = "translateX(100%)";
  }
}

/* Password Toggle */

document.querySelectorAll(".toggle-pw").forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = document.getElementById(btn.dataset.target);
    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";
    btn.querySelector(".eye-open").style.display = isHidden ? "none" : "inline";
    btn.querySelector(".eye-closed").style.display = isHidden
      ? "inline"
      : "none";
  });
});

/* Login Validation */

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}
function clearError(id) {
  const el = document.getElementById(id);
  if (el) el.textContent = "";
}

document
  .getElementById("login-email")
  .addEventListener("input", () => clearError("login-email-error"));
document
  .getElementById("login-password")
  .addEventListener("input", () => clearError("login-password-error"));

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError("login-email-error", "Please enter a valid email address.");
    document.getElementById("login-email").classList.add("input-invalid");
    valid = false;
  } else {
    clearError("login-email-error");
    document.getElementById("login-email").classList.remove("input-invalid");
  }

  if (!password) {
    showError("login-password-error", "Please enter your password.");
    document.getElementById("login-password").classList.add("input-invalid");
    valid = false;
  } else {
    clearError("login-password-error");
    document.getElementById("login-password").classList.remove("input-invalid");
  }

  if (!valid) return;

  const btn = document.getElementById("login-submit-btn");
  btn.querySelector(".btn-text").style.display = "none";
  btn.querySelector(".btn-loader").style.display = "flex";
  btn.disabled = true;

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1800);
});

/* Registration validation  */

document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  const fullname = document.getElementById("reg-fullname").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;
  const confirm = document.getElementById("reg-confirm").value;
  const terms = document.getElementById("reg-terms").checked;

  if (!fullname) {
    showError("reg-fullname-error", "Please enter your full name.");
    valid = false;
  } else clearError("reg-fullname-error");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError("reg-email-error", "Please enter a valid email.");
    valid = false;
  } else clearError("reg-email-error");
  if (!password || password.length < 8) {
    showError("reg-password-error", "Password must be at least 8 characters.");
    valid = false;
  } else clearError("reg-password-error");
  if (password !== confirm) {
    showError("reg-confirm-error", "Passwords do not match.");
    valid = false;
  } else clearError("reg-confirm-error");
  if (!terms) {
    showError("reg-terms-error", "You must agree to the terms.");
    valid = false;
  } else clearError("reg-terms-error");

  if (!valid) return;

  const btn = document.getElementById("reg-submit-btn");
  btn.querySelector(".btn-text").style.display = "none";
  btn.querySelector(".btn-loader").style.display = "flex";
  btn.disabled = true;

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1800);
});
