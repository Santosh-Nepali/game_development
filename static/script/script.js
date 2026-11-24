"use strict";

const message = document.querySelector("#message");

// ---------- Sign up page ----------
const signupForm = document.querySelector("#signupForm");

if (signupForm) {
    const ageBox = document.querySelector("#age");

    // Friendly message if the age box is not ticked
    ageBox.addEventListener("invalid", function () {
        ageBox.setCustomValidity("You must be at least 12 years old to sign up.");
    });
    ageBox.addEventListener("change", function () {
        ageBox.setCustomValidity("");
    });

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();   
        
        // when backend implmented we will process the data 

        const firstName = document.querySelector("#firstName").value.trim();
        message.textContent = "Welcome to the mine, " + firstName + "!";
        signupForm.reset();
    });
}

// ---------- Login page ----------
const loginForm = document.querySelector("#loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();   
        
        // later: send the data to the Flask backend with fetch()
        
        message.textContent = "Login form submitted.";
        loginForm.reset();
    });
}
