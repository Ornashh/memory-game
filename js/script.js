$(document).ready(function() {

	let cards = $('.card-inner');
	let cardOuter = $('.card-outer');
	let clicked = false;
	let lock = false;
	let firstCard;
	let secondCard;
	let counter = 0;

	function randomPos() {
		for (var i = 0; i < cardOuter.length; i++) {
			let random = Math.floor(Math.random() * cardOuter.length);
			$(cardOuter[i]).css('order', random);
		}
	}

	function reset() {
		clicked = false;
		lock = false;
		firstCard = null;
		secondCard = null;
	}

	function matched() {
		$(firstCard).off();
		$(secondCard).off();
		reset();
	}

	function unmatched() {
		lock = true;
		setTimeout(() => {
			$(firstCard).removeClass('flip');
			$(secondCard).removeClass('flip');
			reset();
		}, 700);
	}

	function check() {
		let checkCards = $(firstCard).data('social') === $(secondCard).data('social');
		if (checkCards) {
			matched();
		} else {
			unmatched();
		}
	}

	for (var i = 0; i < cards.length; i++) {
		randomPos();
		$(cards[i]).on('click', function() {
			if (lock) return;
			if (this === firstCard) return;

			$(this).addClass('flip');

			if (!clicked) {
				clicked = true;
				firstCard = this;
				return;
			}
			secondCard = this;
			check();

		});
	}

});
