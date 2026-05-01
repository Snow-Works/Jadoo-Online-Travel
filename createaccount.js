/* -------- Password visibility toggle -------- */
document.querySelectorAll(".toggle-pw").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.target;
    const input = document.getElementById(targetId);
    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";
    btn.querySelector(".eye-open").style.display = isHidden ? "none" : "inline";
    btn.querySelector(".eye-closed").style.display = isHidden
      ? "inline"
      : "none";
  });
});

/* -------- Password strength -------- */
const pwInput = document.getElementById("password");
const pwFill = document.getElementById("pw-fill");
const pwLabel = document.getElementById("pw-label");

pwInput.addEventListener("input", () => {
  const val = pwInput.value;
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  const levels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "#e74c3c", "#f1a501", "#3498db", "#2ecc71"];
  const widths = ["0%", "25%", "50%", "75%", "100%"];

  pwFill.style.width = widths[score];
  pwFill.style.background = colors[score];
  pwLabel.textContent = levels[score];
  pwLabel.style.color = colors[score];
});

/* -------- Form Validation -------- */
const form = document.getElementById("createAccountForm");

function showError(id, msg) {
  const el = document.getElementById(id + "-error");
  if (el) el.textContent = msg;
  const input = document.getElementById(id);
  if (input) input.classList.add("input-invalid");
}

function clearError(id) {
  const el = document.getElementById(id + "-error");
  if (el) el.textContent = "";
  const input = document.getElementById(id);
  if (input) input.classList.remove("input-invalid");
}

["fullname", "email", "password", "confirm-password"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("input", () => clearError(id));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm-password").value;
  const terms = document.getElementById("terms").checked;

  if (!fullname) {
    showError("fullname", "Please enter your full name.");
    valid = false;
  } else clearError("fullname");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError("email", "Please enter a valid email address.");
    valid = false;
  } else clearError("email");
  if (!password || password.length < 8) {
    showError("password", "Password must be at least 8 characters.");
    valid = false;
  } else clearError("password");
  if (password !== confirm) {
    showError("confirm-password", "Passwords do not match.");
    valid = false;
  } else clearError("confirm-password");
  if (!terms) {
    document.getElementById("terms-error").textContent =
      "You must agree to the terms.";
    valid = false;
  } else document.getElementById("terms-error").textContent = "";

  if (!valid) return;

  /* Simulate submission */
  const btn = document.getElementById("submit-btn");
  btn.querySelector(".btn-text").style.display = "none";
  btn.querySelector(".btn-loader").style.display = "flex";
  btn.disabled = true;

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1800);
});
