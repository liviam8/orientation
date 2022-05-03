import { genres, movies } from './movies.js';

function createMovieList(genre) {
    let selectedMovies = movies;
    if (genre) {
        selectedMovies = movies.filter((movie) => movie.genres.includes(genre));
    }

    let newElems = '<option value="">Select a movie</option>';
    selectedMovies.forEach((movie) => {
        newElems += `<option value="${movie.title}">${movie.title}</option>`;
    });

    return newElems;
}

document.addEventListener('DOMContentLoaded', () => {
    const genreSelect = document.querySelector('#genre-select');
    const movieSelect = document.querySelector('#movie-select');

    genres.forEach((genre) => {
        const newOption = `<option value="${genre}">${genre}</option>`;
        genreSelect.innerHTML += newOption;
    });

    movieSelect.innerHTML = createMovieList();

    genreSelect.onchange = () => {
        movieSelect.innerHTML = createMovieList(genreSelect.value);
        titleElem.textContent = '-';
    }

    movieSelect.onchange = () => {
        const titleElem = document.querySelector('#selected-movie');
        titleElem.textContent = movieSelect.value || '-';
    };
});