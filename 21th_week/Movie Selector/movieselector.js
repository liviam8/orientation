

const genreselect = document.querySelector('select[name="genre"]');
genreselect.addEventListener('change', (event) => {

    console.log (event.target.value);
    console.log('option[class="'+event.target.value+'"]');
    console.log(`option[class="${event.target.value}"]`);

    const allmovies = document.querySelector('select[name="movie"]');
    Array.from(allmovies.options).forEach((option)=>{
        console.log(option.value);
        if(!option.getAttributeNames().includes('disabled')){
            option.setAttribute('hidden','true');
        }
    })

    const movies = document.querySelectorAll('option[class="'+event.target.value+'"]')
    movies.forEach ((option)=> {
        console.log (option.value);
        option.toggleAttribute('hidden');
    })
});


const movieselected = document.querySelector('select[name="movie"]');
movieselected.addEventListener('change', (event) => {
    console.log (event.target.value);
});





// const catfacts = document.querySelectorAll('input[name="catfacts"]');
// catfacts.forEach((option) => {
// 	option.addEventListener('change', (event) => {
// 		const catBTN = document.getElementById('cat');
// 		if (event.target.value === 'yes') {
// 			catBTN.toggleAttribute('disabled');
// 			isCatFactRequired = true;
// 		} else {
// 			if (!catBTN.getAttributeNames().includes('disabled')) {
// 				catBTN.toggleAttribute('disabled');
// 			}
// 			isCatFactRequired = false;
// 		}
// 	});
// });
// const buttons = document.querySelectorAll('button');
// buttons.forEach((button) => {
// 	button.addEventListener('click', (event) => {
// 		event.preventDefault();
// 		if (
// 			document.getElementById('favpet').value === 'goldfish' &&
// 			isCatFactRequired === false
// 		) {
// 			alert('Sigh, we still added you to the cat facts list');
// 		} else {
// 			alert("Thank you, you've successfully signed up for cat facts");
// 		}
// 	});
// });