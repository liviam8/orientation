const pwdVisibilityButton = document.querySelector('img');
pwdVisibilityButton.addEventListener('click', (event) => {
	const pwdField = document.querySelector('#password');
	if (pwdField.getAttribute('type') === 'password') {
		pwdField.setAttribute('type', 'text');
	} else {
		pwdField.setAttribute('type', 'password');
	}
});

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
	event.preventDefault();
	console.log('Your login request was submitted');
});