let cards = document.querySelectorAll('.card-inner'),
	cardOuter = document.querySelectorAll('.card-outer'),
 	startBtn = document.querySelector('.start-btn'),
 	stopBtn = document.querySelector('.stop-btn'),
 	recordsBtn = document.querySelector('.records-btn'),
 	closeBtn = document.querySelector('.close-btn'),
 	records = document.querySelector('.records'),
 	recordsList = document.querySelector('.records-list'),
 	win = document.querySelector('.win'),
 	timer = document.querySelector('.timer'),
 	sec = 0,
 	min = 0,
 	interval = false,
 	clicked = false,
 	lock = false,
 	firstCard = null,
 	secondCard = null,
 	counter = 0;

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
		startBtn.textContent = 'Start';
		stopBtn.disabled = true;

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
	if (lock) return;
	if (this === firstCard) return;

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
	counter = 0;

	sec = -1;
	min = 0;

	if (!interval) {
		interval = setInterval(time, 1000);
	}

	win.style.transform = 'scale(0)';
	startBtn.textContent = 'Reset';
	stopBtn.disabled = false;

	records.classList.remove('activeRecords');

	randomPos();
	cards.forEach(function(card) {
		card.classList.add('flip');
		setTimeout(() => {
			card.classList.remove('flip');
		}, 1000);
		card.addEventListener('click', start);
	});
});

stopBtn.addEventListener('click', function() {
	reset();

	counter = 0;
	
	sec = -1;
	min = 0;
	
	clearInterval(interval);
	interval = false;

	timer.textContent = '00:00';
	startBtn.textContent = 'Start';

	cards.forEach(function(card) {
		card.classList.remove('flip');
		card.removeEventListener('click', start);
	});
});

closeBtn.addEventListener('click', function() {
	records.classList.remove('activeRecords');
});

recordsBtn.addEventListener('click', function() {
	records.classList.toggle('activeRecords');
});