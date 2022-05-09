let isCatFactRequired;
let isFishSelected;


const favpet = document.querySelectorAll('input[name="favpet"]');
favpet.forEach((elem) => {
	elem.addEventListener ('change', (event) => {
		const signupBTN = document.querySelector('#signup');
		isFishSelected = false
		if (event.target.value === 'fish') {
			isFishSelected = true;
		};


		if (signupBTN.getAttributeNames().includes('disabled')) {
			signupBTN.toggleAttribute('disabled');
		}
	})
});

const catfacts = document.querySelectorAll('input[name="catfacts"]');
catfacts.forEach((option) => {
	option.addEventListener('change', (event) => {
		const catBTN = document.getElementById('cat');
		if (event.target.value === 'yes') {
			catBTN.toggleAttribute('disabled');
			isCatFactRequired = true;
		} else {
			if (!catBTN.getAttributeNames().includes('disabled')) {
				catBTN.toggleAttribute('disabled');
			}
			isCatFactRequired = false;
		}
	});
});
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
	button.addEventListener('click', (event) => {
		event.preventDefault();
		if (
			isFishSelected === true && isCatFactRequired === false
		) {
			alert('Sigh, we still added you to the cat facts list');
		} else {
			alert("Thank you, you've successfully signed up for cat facts");
		}
	});
});