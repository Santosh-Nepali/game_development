"use strict";

/*
  The game over page shows three numbers: level reached, final score, target score.
  Where they come from (first one found wins):
    1. the web address, e.g.  gameover.html?level=3&score=120&target=200
    2. sessionStorage key "miner-result", saved by the game when it ends:
         sessionStorage.setItem("miner-result", JSON.stringify({ level: 3, score: 120, target: 200 }));
    3. default values (level 1, score 0, target 0)
*/

function toWholeNumber(value, fallback) {
    const number = Number.parseInt(value, 10);
    return Number.isFinite(number) && number >= 0 ? number : fallback;
}

function readResult() {
    const params = new URLSearchParams(window.location.search);
    let saved = {};

    try {
        saved = JSON.parse(sessionStorage.getItem("miner-result")) || {};
    } catch (error) {
        saved = {};
    }

    return {
        level:  Math.max(1, toWholeNumber(params.get("level")  ?? saved.level,  1)),
        score:  toWholeNumber(params.get("score")  ?? saved.score,  0),
        target: toWholeNumber(params.get("target") ?? saved.target, 0)
    };
}

function showResult(result) {
    const levelEl = document.querySelector("#level");
    const scoreEl = document.querySelector("#score");
    const targetEl = document.querySelector("#target");
    const fillEl = document.querySelector("#progressFill");
    const barEl = document.querySelector(".progress");
    const noteEl = document.querySelector("#note");

    // textContent (not innerHTML) so nothing typed into the address bar can run as code
    levelEl.textContent = result.level;
    targetEl.textContent = result.target.toLocaleString();
}
    /* // progress towards the target, 0 to 100 %
    const percent = result.target > 0
        ? Math.min(100, Math.round((result.score / result.target) * 100))
        : 0;
    barEl.setAttribute("aria-valuenow", percent);

    if (result.target === 0) {
        noteEl.textContent = "Better luck next time, miner!";
    } else if (result.score >= result.target) {
        noteEl.textContent = "You reached the target. Great mining!";
    } else {
        const missing = (result.target - result.score).toLocaleString();
        noteEl.textContent = `${percent}% of the target. Just ${missing} points short!`;
    }
 
    // count the score up from 0 (skipped if the player prefers reduced motion)
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || result.score === 0) {
        scoreEl.textContent = result.score.toLocaleString();
        fillEl.style.width = percent + "%";
        return;
    }

    const duration = 900;
    const start = performance.now();
    fillEl.style.width = percent + "%";

    function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        scoreEl.textContent = Math.round(result.score * progress).toLocaleString();
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}
*/
showResult(readResult());
