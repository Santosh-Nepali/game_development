// Game state and display values.
const initialState = {
  coins: 850,
  bombs: 3,
  winch: 1,
  hook: 1,
  time: 80,
  paused: false,
};

const state = { ...initialState };
const element = (id) => document.getElementById(id);
let timerStarted = false;
let toastTimeout;

function render() {
  element('coins').textContent = state.coins;
  element('bombs').textContent = `x${state.bombs}`;
  element('winch-price').textContent = 600 * state.winch;
  element('hook-price').textContent = 400 * state.hook;

  const minutes = String(Math.floor(state.time / 60)).padStart(2, '0');
  const seconds = String(state.time % 60).padStart(2, '0');
  element('time').textContent = `${minutes}:${seconds}`;
}

function showMessage(text) {
  const toast = element('toast');
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2200);
}

// Shop and inventory controls.
function buy(item) {
  const prices = {
    bomb: 300,
    winch: 600 * state.winch,
    hook: 400 * state.hook,
  };
  const cost = prices[item];

  if (state.coins < cost) {
    showMessage('Not enough coins');
    return;
  }

  state.coins -= cost;
  if (item === 'bomb') {
    state.bombs += 1;
  } else {
    state[item] += 1;
  }

  render();
  showMessage(item === 'bomb' ? 'Dynamite purchased' : `${item.toUpperCase()} upgraded`);
}

document.querySelectorAll('[data-buy]').forEach((button) => {
  button.addEventListener('click', () => buy(button.dataset.buy));
});
element('use').addEventListener('click', () => showMessage('No targets in the mine yet'));

// Pause, settings and restart.
function openMenu(id) {
  state.paused = true;
  element(id).showModal();
}

function closeMenu(id) {
  element(id).close();
  state.paused = false;
}

element('pause').addEventListener('click', () => openMenu('pause-menu'));
element('settings').addEventListener('click', () => openMenu('settings-menu'));
element('resume').addEventListener('click', () => closeMenu('pause-menu'));
element('close-settings').addEventListener('click', () => closeMenu('settings-menu'));

document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.addEventListener('close', () => { state.paused = false; });
});

element('restart').addEventListener('click', () => {
  Object.assign(state, initialState);
  timerStarted = false;
  render();
  closeMenu('pause-menu');
});

document.addEventListener('keydown', (event) => {
  if (event.code !== 'Space' || event.target !== document.body) return;
  event.preventDefault();

  if (element('pause-menu').open) {
    closeMenu('pause-menu');
  } else if (!element('settings-menu').open) {
    openMenu('pause-menu');
  }
});

// Timer is started explicitly when the gameplay logic is connected.
window.miniminer = {
  state,
  render,
  startTimer() { timerStarted = true; },
  stopTimer() { timerStarted = false; },
};

setInterval(() => {
  if (!timerStarted || state.paused || state.time <= 0) return;
  state.time -= 1;
  render();
  if (state.time === 0) showMessage('Time is up!');
}, 1000);

render();
