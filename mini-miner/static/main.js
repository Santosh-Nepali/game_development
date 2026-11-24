"use strict";

const signupForm = document.querySelector("#signupForm");

// Run Sign Up code only on the Sign Up page
if (signupForm) {
  const ageBox = document.querySelector("#age");
  const message = document.querySelector("#message");

  // Friendly message if the age box is not ticked
  ageBox.addEventListener("invalid", function () {
    ageBox.setCustomValidity("You must be at least 12 years old to sign up.");
  });

  // Clear the custom message as soon as the box is changed
  ageBox.addEventListener("change", function () {
    ageBox.setCustomValidity("");
  });

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault(); // no server yet, so stay on this page
    const firstName = document.querySelector("#firstName").value.trim();
    message.textContent =
      "Thanks, " + firstName + "! Your account form was submitted.";
    signupForm.reset();
  });
}

const loginForm = document.querySelector("#loginForm");

// Run Login code only on the Login page
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const message = document.querySelector("#message");

    // Login successful message
    message.textContent = "You have successfully logged in to the game!";
  });
}

// Help page navigation
const helpSections = document.querySelectorAll(".help-section");
const helpTabs = document.querySelectorAll(".help-tab");

if (helpSections.length > 0) {
  let currentHelp = 0;

  function showHelp(index) {
    helpSections.forEach(function (section) {
      section.classList.remove("active");
    });

    helpTabs.forEach(function (tab) {
      tab.classList.remove("active");
    });

    helpSections[index].classList.add("active");
    helpTabs[index].classList.add("active");
  }

  helpTabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      currentHelp = index;
      showHelp(currentHelp);
    });
  });

  const previousHelp = document.querySelector("#previousHelp");
  const nextHelp = document.querySelector("#nextHelp");

  previousHelp.addEventListener("click", function () {
    currentHelp--;

    if (currentHelp < 0) {
      currentHelp = helpSections.length - 1;
    }

    showHelp(currentHelp);
  });

  nextHelp.addEventListener("click", function () {
    currentHelp++;

    if (currentHelp >= helpSections.length) {
      currentHelp = 0;
    }

    showHelp(currentHelp);
  });
}
