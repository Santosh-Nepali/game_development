"use strict";

const loginForm = document.querySelector("#loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const message = document.querySelector("#message");

        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            message.textContent = data.message;

            if (data.success) {
                window.location.href = "/main-menu";
            }
        })
        .catch(error => {
            console.error("Login error:", error);
            message.textContent = "Something went wrong. Please try again.";
        });
    });
}

const exitButton = document.querySelector(".btn.secondary");

if (exitButton) {
    exitButton.addEventListener("click", function () {
        window.location.href = "/";
    });
}