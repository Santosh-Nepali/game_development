"use strict";

const form = document.querySelector("#signupForm");
const ageBox = document.querySelector("#age");
const message = document.querySelector("#message");

// Friendly message if the age box is not ticked
ageBox.addEventListener("invalid", function () {
    ageBox.setCustomValidity("You must be at least 13 years old to sign up.");
});

// Clear the custom message as soon as the box is changed
ageBox.addEventListener("change", function () {
    ageBox.setCustomValidity("");
});

form.addEventListener("submit", function (event) {
    event.preventDefault();   // no server yet, so stay on this page
    const firstName = document.querySelector("#firstName").value.trim();
    message.textContent = "Thanks, " + firstName + "! Your account form was submitted.";
    form.reset();
});
