const cardsEl = document.querySelectorAll(".card-inner");
const cardOuterEl = document.querySelectorAll(".card-outer");
const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const recordsBtn = document.querySelector(".records-btn");
const closeBtn = document.querySelector(".close-btn");
const recordsEl = document.querySelector(".records");
const recordsListEl = document.querySelector(".records-list");
const winEl = document.querySelector(".win");
const timerEl = document.querySelector(".timer");

let sec = 0;
let min = 0;
let interval = false;
let clicked = false;
let lock = false;
let firstCard = null;
let secondCard = null;
let counter = 0;

function time() {
  sec++;
  timerEl.textContent = getTime();
  if (sec == 59) {
    sec = 0;
    min++;
  }
}

function getTime() {
  return (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
}

function randomPos() {
  for (var i = 0; i < cardOuterEl.length; i++) {
    let random = Math.floor(Math.random() * cardOuterEl.length);
    cardOuterEl[i].style.order = random;
  }
}

function reset() {
  clicked = false;
  lock = false;
  firstCard = null;
  secondCard = null;
}

function matched() {
  firstCard.removeEventListener("click", start);
  secondCard.removeEventListener("click", start);
  reset();

  counter++;

  if (counter == 6) {
    counter = 0;

    winEl.classList.add("show-win");
    startBtn.textContent = "Start";
    stopBtn.disabled = true;

    let li = document.createElement("li");
    li.innerText = getTime();
    recordsListEl.appendChild(li);

    clearInterval(interval);
    interval = false;
  }
}

function unmatched() {
  lock = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    reset();
  }, 500);
}

function check() {
  let checkCards = firstCard.dataset.language === secondCard.dataset.language;

  if (checkCards) {
    matched();
  } else {
    unmatched();
  }
}

function start() {
  if (lock) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!clicked) {
    clicked = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  check();
}

startBtn.addEventListener("click", function () {
  counter = 0;

  sec = -1;
  min = 0;

  if (!interval) {
    interval = setInterval(time, 1000);
  }

  winEl.classList.remove("show-win");
  startBtn.textContent = "Reset";
  stopBtn.disabled = false;

  recordsEl.classList.remove("show-records");

  randomPos();
  cardsEl.forEach((card) => {
    card.classList.add("flip");
    setTimeout(() => {
      card.classList.remove("flip");
    }, 1000);
    card.addEventListener("click", start);
  });
});

stopBtn.addEventListener("click", function () {
  reset();

  counter = 0;

  sec = -1;
  min = 0;

  clearInterval(interval);
  interval = false;

  timerEl.textContent = "00:00";
  startBtn.textContent = "Start";

  cardsEl.forEach(function (card) {
    card.classList.remove("flip");
    card.removeEventListener("click", start);
  });
});

closeBtn.addEventListener("click", function () {
  recordsEl.classList.remove("show-records");
});

recordsBtn.addEventListener("click", function () {
  recordsEl.classList.toggle("show-records");
});
