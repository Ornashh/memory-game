let cards = document.querySelectorAll('.card-inner');
let cardOuter = document.querySelectorAll('.card-outer');
let startBtn = document.querySelector('.start-btn');
let recordsBtn = document.querySelector('.records-btn');
let closeBtn = document.querySelector('.close-btn');
let records = document.querySelector('.records');
let recordsList = document.querySelector('.records-list');
let win = document.querySelector('.win');
let timer = document.querySelector('.timer');
let sec = 0;
let min = 0;
let interval = false;
let clicked = false;
let lock = false;
let firstCard;
let secondCard;
let counter = 0;

function time() {
	sec++;
	timer.textContent = getTime();
	if (sec == 59) {
		sec = 0;
		min++;
	}
}

function getTime() { 
	return (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
}

function randomPos() {
	for (var i = 0; i < cardOuter.length; i++) {
		let random = Math.floor(Math.random() * cardOuter.length);
		cardOuter[i].style.order = random;
	}
}

function reset() {
	clicked = false;
	lock = false;
	firstCard = null;
	secondCard = null;
}

function matched() {
	firstCard.removeEventListener('click', start);
	secondCard.removeEventListener('click', start);
	reset();
	counter++;
	if (counter == 6) {
		counter = 0;
		win.style.transform = 'scale(1)';
		startBtn.style.display = 'block';
		recordsBtn.style.display = 'block';
		let li = document.createElement('li');
		li.innerText = getTime();
		recordsList.appendChild(li);
		clearInterval(interval);
		interval = false;
	}
}

function unmatched() {
	lock = true;
	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
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
	if (lock) 
		return;
	if (this === firstCard) 
		return;

	this.classList.add('flip');

	if (!clicked) {
		clicked = true;
		firstCard = this;
		return;
	}
	secondCard = this;
	check();
}

startBtn.addEventListener('click', function() {
	min = 0;
	sec = 0;
	if (!interval) {
		interval = setInterval(time, 1000);
	}
	win.style.transform = 'scale(0)';
	startBtn.style.display = 'none';
	recordsBtn.style.display = 'none';
	records.classList.remove('activeRecords');
	randomPos();
	cards.forEach(function(card) {
		card.classList.add('flip');
		setTimeout(() => {
			card.classList.remove('flip');
		}, 800);
		card.addEventListener('click', start);
	});
});


closeBtn.addEventListener('click', function() {
	records.classList.remove('activeRecords');
});

recordsBtn.addEventListener('click', function() {
	records.classList.toggle('activeRecords');
});