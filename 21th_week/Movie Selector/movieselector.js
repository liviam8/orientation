

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
    const selmov = document.getElementById('selectedmovie').innerText = event.target.value;
});

