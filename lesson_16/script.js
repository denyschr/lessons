const form = document.querySelector('#credit-card');

const cardNumber = form.querySelector('#card-number');
const cardHolder = form.querySelector('#card-holder');
const cardValidity = form.querySelector('#card-validity');
const cardCvv = form.querySelector('#card-cvv');
const cardEmail = form.querySelector('#card-email');
const cardAmount = form.querySelector('#card-amount');
const cardButton = form.querySelector('#card-button');

const cardInner = document.querySelector('.card__inner');

const cardNumberText = document.querySelector('#card-number-text');
const cardHolderText = document.querySelector('#card-holder-text');
const cardValidityText = document.querySelector('#card-validity-text');
const cardCvvText = document.querySelector('#card-cvv-text');

const cardNumberValidLength = 19;
const cardHolderValidLength = 1;
const cardValidityValidLength = 5;
const cardCvvValidLength = 3;

cardNumber.addEventListener('input', e => {
	if (!e.target.value) {
		cardNumberText.innerHTML = 'XXXX XXXX XXXX XXXX';
	} else {
		const valueOfInput = e.target.value.replaceAll(" ", "");
		if (e.target.value.length > 14) {
			e.target.value = valueOfInput.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4");
			cardNumberText.innerHTML = valueOfInput.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4");
		} else if (e.target.value.length > 9) {
			e.target.value = valueOfInput.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3");
			cardNumberText.innerHTML = valueOfInput.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3");
		} else if (e.target.value.length > 4) {
			e.target.value = valueOfInput.replace(/(\d{4})(\d{0,4})/, "$1 $2");
			cardNumberText.innerHTML = valueOfInput.replace(/(\d{4})(\d{0,4})/, "$1 $2");
		} else {
			cardNumberText.innerHTML = valueOfInput;
		}
	}
	validateForm();
});

cardNumber.addEventListener('blur', e => {
	const isEmpty = 'Enter card';
	const isIncorrect = 'Wrong card';
	const lengthOfValue = e.target.value.length;
	validateField(cardNumber, isEmpty, isIncorrect, lengthOfValue, cardNumberValidLength);
});

cardHolder.addEventListener('input', e => {
	if (!e.target.value) {
		cardHolderText.innerHTML = 'FULL NAME';
	} else {
		cardHolderText.innerHTML = e.target.value.toUpperCase();
	}
	validateForm();
});

cardHolder.addEventListener('blur', e => {
	const isEmpty = 'Enter your First name and Second name';
	const isIncorrect = null;
	const lengthOfValue = e.target.value.length;
	validateField(cardHolder, isEmpty, isIncorrect, lengthOfValue, cardHolderValidLength);
});

cardValidity.addEventListener('input', e => {
	if (!e.target.value) {
		cardValidityText.innerHTML = 'MM/YY';
	} else {
		const valueOfInput = e.target.value.replace("/", "");
		if (e.target.value.length > 2) {
			e.target.value = valueOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
			cardValidityText.innerHTML = valueOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
		} else {
			cardValidityText.innerHTML = valueOfInput;
		}
	}
	validateForm();
});

cardValidity.addEventListener('blur', e => {
	const isEmpty = 'Enter validity';
	const isIncorrect = 'Invalid validity';
	const lengthOfValue = e.target.value.length;
	validateField(cardValidity, isEmpty, isIncorrect, lengthOfValue, cardValidityValidLength);
});

cardCvv.addEventListener('input', e => {
	e.target.value = e.target.value.replaceAll(/\d/g, '*');
	cardCvvText.innerHTML = e.target.value;
	validateForm();
});

cardCvv.addEventListener('blur', e => {
	const isEmpty = 'Enter CVV';
	const isIncorrect = 'Incorrect CVV';
	const lengthOfValue = e.target.value.length;
	validateField(cardCvv, isEmpty, isIncorrect, lengthOfValue, cardCvvValidLength);
});

cardCvv.addEventListener('focus', () => {
	cardInner.classList.add('active');
});

cardCvv.addEventListener('focusout', () => {
	cardInner.classList.remove('active');
});

cardEmail.addEventListener('input', () => {
	validateForm();
});

cardEmail.addEventListener('blur', e => {
	const isEmpty = 'Enter your email';
	const isIncorrect = 'Incorrect email';
	const outcome = cardEmail.nextElementSibling;
	const reg = /[a-z]{1,255}\d{0,255}@[a-z]{2,15}\.[a-z]{2,4}/;
	if (!reg.test(e.target.value) && e.target.value.length != 0) {
		outcome.textContent = isIncorrect;
		cardEmail.classList.add('has-error');
		cardEmail.classList.remove('is-correct');
		outcome.classList.add('has-error');
	} else if (e.target.value.length == 0) {
		outcome.textContent = isEmpty;
		cardEmail.classList.add('has-error');
		cardEmail.classList.remove('is-correct');
		outcome.classList.add('has-error');
	} else {
		cardEmail.classList.remove('has-error');
		cardEmail.classList.add('is-correct');
		outcome.classList.remove('has-error');
	}
});

cardAmount.addEventListener('input', () => {
	validateForm();
});

cardAmount.addEventListener('blur', e => {
	const isEmpty = 'Enter amount';
	const outcome = cardAmount.nextElementSibling;
	if (+e.target.value === 0 || e.target.value === '.') {
		outcome.textContent = isEmpty;
		cardAmount.classList.add('has-error');
		cardAmount.classList.remove('is-correct');
		outcome.classList.add('has-error');
	} else {
		cardAmount.classList.remove('has-error');
		cardAmount.classList.add('is-correct');
		outcome.classList.remove('has-error');
	}
});

function validateField(field, empty, incorrect, length, validLength) {
	const outcome = field.nextElementSibling;
	if (length < validLength && length != 0) {
		outcome.textContent = incorrect;
		field.classList.add('has-error');
		field.classList.remove('is-correct');
		outcome.classList.add('has-error');
	} else if (length == 0) {
		outcome.textContent = empty;
		field.classList.add('has-error');
		field.classList.remove('is-correct');
		outcome.classList.add('has-error');
	} else {
		field.classList.remove('has-error');
		field.classList.add('is-correct');
		outcome.classList.remove('has-error');
	}
}

function validateForm() {
	const isCardNumberValid = cardNumber.value.length === cardNumberValidLength;
	const isCardHolderValid = cardHolder.value.length >= cardHolderValidLength;
	const isCardValidityValid = cardValidity.value.length === cardValidityValidLength;
	const isCardCvvValid = cardCvv.value.length === cardCvvValidLength;
	const isCardEmailValid = /[a-z]{1,255}\d{0,255}@[a-z]{2,15}\.[a-z]{2,4}/.test(cardEmail.value);
	const isCardAmountValid = +cardAmount.value != 0 && cardAmount.value != '.' && cardAmount.value != '';

	if (isCardNumberValid && isCardHolderValid && isCardValidityValid && isCardCvvValid && isCardEmailValid && isCardAmountValid) {
		cardButton.classList.remove('disabled');
	} else {
		cardButton.classList.add('disabled');
	}
}

function moveToNextField(currentField, nextFieldId) {
	const maxLength = currentField.maxLength;
	if (currentField.value.length === maxLength) {
		setTimeout(() => {
			document.getElementById(nextFieldId).focus();
		}, 300);
	}
}