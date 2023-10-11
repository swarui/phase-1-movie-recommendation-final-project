document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "api_key=988e17afa010ca134f38ace964916dd5";
  const BASE_URL = "https://api.themoviedb.org/3";
  const API_URL =
    BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
  const IMG_URL = "https://image.tmdb.org/t/p/w500";
  const searchURL = BASE_URL + "/search/movie?" + API_KEY;
});

// Fetch the movie date from the API
function fetchMovies(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayMovies(data.results))
    .catch((error) => console.log("Error:,error"));
}

// Show the respective movies on my page
const displayMovies = (movies) => {
  const movieList = document.getElementById("movie-list");
  movieList.innerHTML = ""; // Executes or removes the previous movie list
  movies.forEach((movie) => {
    const movieCard = createMovieCard(movie);
    movieList.appendChild(movieCard);
  });
};
// Movie card
const createMovieCard = (movie) => {
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");
  movieCard.id = `movie-$(movie.id)`;

  const title = document.createElement("h3");
  title.textContent = movie.title;

  const image = document.createElement("img");
  image.src = IMG_PATH + movie.poster_path;
  image.alt = movie.title;

  const likeButton = document.createElement("button");
  likeButton.textContent = "Like";
  likeButton.addEventListener("click", () => {
    likeMovie(movie.id);
  });

  movieCard.appendChild(title);
  movieCard.appendChild(image);
  movieCard.appendChild(likeButton);

  movieCard.addEventListener('click', () =>{
    fetchMovieDetails(movie.id);
  });

  return movieCard
};
