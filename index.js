document.addEventListener('DOMContentLoaded',() => {
    const API_KEY = 'api_key=988e17afa010ca134f38ace964916dd5';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;
}) 

// Fetch the movie date from the API
function fetchMovies(url){
    fetch(url)
    .then((response)=> response.json())
    .then(data => displayMovies(data.results))
    .catch(error => console.log('Error:,error'))
}