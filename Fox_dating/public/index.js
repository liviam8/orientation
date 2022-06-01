const username = document.querySelector('#username');
const nickname = document.querySelector('#nickname');
const year = document.querySelector('#year');
const url = document.querySelector('#url');
// const iam = document.querySelector('input[name=iam]:checked');
// const looking4 = document.querySelector('input[name=looking4]:checked');
const aboutme = document.querySelector('#aboutme');




const usernameError = document.querySelector('.username.error');
const nicknameError = document.querySelector('.nickname.error');

const form = document.querySelector('form');

console.log(username);
console.log(nickname);

console.dir(username);
console.log(username.value);

const usernameRegex = /[A-z]+/;


// $username.addEventListener('keyup', (event) => {
//     // usernameRegex.test(event.target.value);
//     if (!event.target.value.match(usernameRegex)) {
//         console.log('wrong input');
//     } else if (event.target.value.length < 3) {
//         console.log('please provide at least 3 characters');
//         $usernameError.classList.remove('hidden');
//     } else {
//         console.log('all good');
//         $usernameError.classList.add('hidden');
//     }
// });


// $nickname.addEventListener('keyup', (event) => {
//     // usernameRegex.test(event.target.value);
//     if (!event.target.value.match(usernameRegex)) {
//         console.log('rossz az input');
//     } else if (event.target.value.length < 3) {
//         console.log('please provide at least 3 characters');
//         $nicknameError.classList.remove('hidden');
//     } else {
//         console.log('all good');
//         $nicknameError.classList.add('hidden');
//     }
// });

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const now = new Date();

    if (username.value.length < 3) {
        console.log('hiba tortent');
        return false;
    } else if ((now.getFullYear() - parseInt(year.value)) < 18) {
        alert('Not old enough');
        return false;
    }
    else {
        const iam = document.querySelector('input[name=iam]:checked');
        const looking4 = document.querySelector('input[name=looking4]:checked');


        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username.value,
                "nickname": nickname.value,
                "birthyear": year.value,
                "url": url.value,
                "iam": iam.value,
                "looking4": looking4.value,
                "aboutme": aboutme.value
            })


        });
        const data = await response.json();
        if (!response.ok) {
            alert('Hiba');
            return;
        }
        else {window.location.href = '/profile.html'}
    }
});