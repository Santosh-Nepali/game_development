"use strict";

/*
  High score board: shows the top 10 players on the wooden board.

  Each score is an object:  { name: "Maria", score: 4820, gold: 312 }

  Where the scores come from (first one found wins):
    1. your Flask backend:  GET /api/highscores  ->  JSON list of scores
    2. localStorage key "miner-highscores" (a JSON list, saved by the game)
    3. SAMPLE_SCORES below, so the board is never empty while you build the game.
       Delete SAMPLE_SCORES once your backend works.
*/

const MAX_ROWS = 10;

const SAMPLE_SCORES = [
    { name: "Maria",   score: 4820, gold: 312 },
    { name: "Ahmed",   score: 4310, gold: 280 },
    { name: "Olga",    score: 3975, gold: 255 },
    { name: "Pekka",   score: 3120, gold: 201 },
    { name: "Viivi",   score: 2860, gold: 176 },
    { name: "Mary",    score: 2430, gold: 150 },
    { name: "Juho",    score: 1990, gold: 122 },
    { name: "Aino",    score: 1540, gold: 97 },
    { name: "Leo",     score: 1105, gold: 64 },
    { name: "Nora",    score: 760,  gold: 41 }
];

async function loadScores() {
    // 1. backend
    try {
        const response = await fetch("/highscores");
        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
                return data;
            }
        }
    } catch (error) {
        // no backend running: try the next source
    }

    // 2. localStorage
    try {
        const saved = JSON.parse(localStorage.getItem("miner-highscores"));
        if (Array.isArray(saved) && saved.length > 0) {
            return saved;
        }
    } catch (error) {
        // ignore and use the sample data
    }

    // 3. sample data
    return SAMPLE_SCORES;
}

function toWholeNumber(value) {
    const number = Number.parseInt(value, 10);
    return Number.isFinite(number) && number >= 0 ? number : 0;
}

// clean up the data, sort from best to worst and keep the top 10
function prepareScores(list) {
    return list
        .filter(item => item && typeof item === "object")
        .map(item => ({
            name:  String(item.name ?? "").trim().slice(0, 20) || "Miner",
            score: toWholeNumber(item.score),
            gold:  toWholeNumber(item.gold)
        }))
        .sort((a, b) => b.score - a.score || b.gold - a.gold)
        .slice(0, MAX_ROWS);
}

function makeCell(role, className, text) {
    const cell = document.createElement("div");
    cell.setAttribute("role", role);
    cell.className = className;
    const span = document.createElement("span");
    span.textContent = text;          // textContent, so names can never run as HTML
    cell.appendChild(span);
    return cell;
}

function drawBoard(scores) {
    const table = document.querySelector("#scoreTable");
    table.replaceChildren();

    // Header row for screen readers only (the visible header is part of the image)
    const header = document.createElement("div");
    header.setAttribute("role", "row");
    header.className = "visually-hidden";
    ["Rank", "Name", "Score", "Gold"].forEach(function (label) {
        const cell = document.createElement("div");
        cell.setAttribute("role", "columnheader");
        cell.textContent = label;
        header.appendChild(cell);
    });
    table.appendChild(header);

    for (let i = 0; i < MAX_ROWS; i++) {
        const entry = scores[i];
        const row = document.createElement("div");
        row.setAttribute("role", "row");
        row.className = "row";
        row.dataset.rank = i + 1;

        if (!entry) {
            row.setAttribute("aria-hidden", "true");   // empty slot on the board
        } else {
            const rank = makeCell("cell", "visually-hidden", String(i + 1));
            row.appendChild(rank);
            row.appendChild(makeCell("cell", "cell cell-name", entry.name));
            row.appendChild(makeCell("cell", "cell cell-score", entry.score.toLocaleString()));
            row.appendChild(makeCell("cell", "cell cell-gold", entry.gold.toLocaleString()));
        }
        table.appendChild(row);
    }
}

loadScores().then(function (list) {
    drawBoard(prepareScores(list));
});
