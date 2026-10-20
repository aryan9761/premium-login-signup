const loginTab = document.querySelector("#loginTab");
const signupTab = document.querySelector("#signupTab");
const formTitle = document.querySelector("#formTitle");
const formSubtitle = document.querySelector("#formSubtitle");
const submitText = document.querySelector("#submitText");
const switchCopy = document.querySelector("#switchCopy");
const switchLink = document.querySelector("#switchLink");
const nameField = document.querySelector("#nameField");
const loginOptions = document.querySelector("#loginOptions");
const termsRow = document.querySelector("#termsRow");
const password = document.querySelector("#password");
const togglePassword = document.querySelector("#togglePassword");
const authForm = document.querySelector("#authForm");
const formMessage = document.querySelector("#formMessage");
const themeToggle = document.querySelector("#themeToggle");

let currentMode = "login";

function setMode(mode) {
  currentMode = mode;
  const isSignup = mode === "signup";
  loginTab.classList.toggle("active", !isSignup);
  signupTab.classList.toggle("active", isSignup);
  loginTab.setAttribute("aria-selected", String(!isSignup));
  signupTab.setAttribute("aria-selected", String(isSignup));
  nameField.hidden = !isSignup;
  loginOptions.hidden = isSignup;
  termsRow.hidden = !isSignup;
  formTitle.textContent = isSignup ? "Create Your Account" : "Welcome Back";
  formSubtitle.textContent = isSignup
    ? "Sign up to start your journey with us"
    : "Sign in to your account to continue your journey";
  submitText.textContent = isSignup ? "Create Account" : "Login";
  switchCopy.innerHTML = isSignup
    ? 'Already have an account? <button type="button" id="switchLink">Login</button>'
    : 'Don’t have an account? <button type="button" id="switchLink">Sign Up</button>';
  document.querySelector("#switchLink").addEventListener("click", () => setMode(isSignup ? "login" : "signup"));
  password.autocomplete = isSignup ? "new-password" : "current-password";
  clearMessages();
}

function clearMessages() {
  document.querySelectorAll(".error").forEach((el) => el.textContent = "");
  formMessage.textContent = "";
  formMessage.classList.remove("error-message");
}

loginTab.addEventListener("click", () => setMode("login"));
signupTab.addEventListener("click", () => setMode("signup"));
switchLink.addEventListener("click", () => setMode("signup"));

togglePassword.addEventListener("click", () => {
  const shouldShow = password.type === "password";
  password.type = shouldShow ? "text" : "password";
  togglePassword.setAttribute("aria-label", shouldShow ? "Hide password" : "Show password");
  togglePassword.textContent = shouldShow ? "◎" : "◉";
});

function setError(id, message) {
  document.querySelector(`#${id}Error`).textContent = message;
}

authForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearMessages();

  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const pass = password.value;
  const emailOkay = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  let valid = true;

  if (currentMode === "signup" && name.length < 2) {
    setError("name", "Please enter your name (at least 2 characters).");
    valid = false;
  }
  if (!emailOkay) {
    setError("email", "Please enter a valid email address.");
    valid = false;
  }
  if (pass.length < 8) {
    setError("password", "Password must be at least 8 characters.");
    valid = false;
  }
  if (currentMode === "signup" && !document.querySelector("#terms").checked) {
    setError("terms", "Please accept the terms to continue.");
    valid = false;
  }

  if (!valid) {
    formMessage.textContent = "Please check the highlighted fields.";
    formMessage.classList.add("error-message");
    return;
  }

  // Frontend demo only: this does not create an account or authenticate a user.
  formMessage.textContent = currentMode === "signup"
    ? "Looks good! Demo signup validated — connect a backend to create an account."
    : "Form validated! This is a UI demo; connect a backend for real login.";
});

document.querySelector("#forgotBtn").addEventListener("click", () => {
  clearMessages();
  const email = document.querySelector("#email").value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("email", "Enter your email above, then try Forgot password again.");
    return;
  }
  formMessage.textContent = "Password reset is a demo only. Add a backend to send a reset email.";
});

document.querySelectorAll(".social-btn").forEach((button) => {
  button.addEventListener("click", () => {
    formMessage.classList.add("error-message");
    formMessage.textContent = `${button.dataset.provider} sign-in is a UI demo. OAuth setup is needed for real sign-in.`;
  });
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", document.body.classList.contains("light") ? "Switch to dark theme" : "Switch to light theme");
});
