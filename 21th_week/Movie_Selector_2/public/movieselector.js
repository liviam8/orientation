// import { genres, movies } from './movies.js';
let genres = [];
let movies = [];

const readGenres = async() => {
    const resource = '/api/genre';
    const response = await fetch(resource);
    const data = await response.json();

    if (!response.ok) {
        console.log(`GET ${resource}`, data.message);
        return;
    }

    genres = data.genreSelector;
}

const readMovies = async(genre) => {
    const resource = '/api/movie/'+genre;
    const response = await fetch(resource);
    const data = await response.json();

    if (!response.ok) {
        console.log(`GET ${resource}`, data.message);
        return;
    }

    movies = data.movieSelector;
}


async function createMovieList(genre) {

    await readMovies(genre);
    let selectedMovies = movies;
    // if (genre) {
    //     selectedMovies = movies.filter((movie) => movie.genres.includes(genre));
    // }

    let newElems = '<option value="">Select a movie</option>';
    selectedMovies.forEach((item) => {
        newElems += `<option value="${item.movie}">${item.movie}</option>`;
    });

    return newElems;
}

document.addEventListener('DOMContentLoaded', async () => {
    const genreSelect = document.querySelector('#genre-select');
    const movieSelect = document.querySelector('#movie-select');
    await readGenres();

    genres.forEach((item) => {
        const newOption = `<option value="${item.genre}">${item.genre}</option>`;
        genreSelect.innerHTML += newOption;
    });

    //movieSelect.innerHTML = createMovieList();

    genreSelect.onchange = async () => {
        movieSelect.innerHTML = await createMovieList(genreSelect.value);
        //titleElem.textContent = '-';
    }

    movieSelect.onchange = () => {
        const titleElem = document.querySelector('#selected-movie');
        titleElem.textContent = movieSelect.value || '-';
    };
});