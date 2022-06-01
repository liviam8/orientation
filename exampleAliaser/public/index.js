
const $URL = document.querySelector('#URL');
const $alias = document.querySelector('#alias');

const $URLError = document.querySelector('.URL.error');
const $form = document.querySelector('form');

console.log($URL);
console.dir($URL);
console.log($URL.value);

// const URLRegex = /[A-z]+/;

// $URL.addEventListener('keyup', (event) => {
//     // URLRegex.test(event.target.value);
//     if (!event.target.value.match(URLRegex)) {
//         console.log('wrong input');
//     } else if (event.target.value.length < 3) {
//         console.log('Your alias is too short!');
//         $URLError.classList.remove('hidden');
//     } else {
//         console.log('All right');
//         $URLError.classList.add('hidden');
//     }
// });

$form.addEventListener('submit', (event) => {
    event.preventDefault();
    if ($URL.value.length < 3) {
        console.log('Something went wrong')
    } else {
        fetch('/api/links',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({ "URL": $URL.value, 
                                   "alias": $alias.value })
        })
        .then((data) =>{
            console.log('aliased - ' + data);
        })
        .catch((message)=>{
            
            console.log('Error happend: ' +message `Your ${alias.value} is already in use!`);
      

        });
        console.log(`Your URL is aliased to ${alias} `);
    }
});


