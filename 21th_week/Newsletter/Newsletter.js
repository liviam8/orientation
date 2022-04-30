const $username = document.querySelector('#username');
const $usernameError = document.querySelector('.username.error');
const $form = document.querySelector('form');

console.log($username);
console.dir($username);
console.log($username.value);

const usernameRegex = /[A-z]+/;

$username.addEventListener('keyup', (event) => {
    // usernameRegex.test(event.target.value);
    if (!event.target.value.match(usernameRegex)) {
        console.log('rossz az input');
    } else if (event.target.value.length < 3) {
        console.log('keves karakter');
        $usernameError.classList.remove('hidden');
    } else {
        console.log('minden kiraly');
        $usernameError.classList.add('hidden');
    }
});

$form.addEventListener('submit', (event) => {
    event.preventDefault();
    if ($username.value.length < 3) {
        console.log('hiba tortent')
    } else {
        console.log('submit happened');
    }


});