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

  movieCard.addEventListener("click", () => {
    fetchMovieDetails(movie.id);
  });

  return movieCard;
};

// Fetch movie details
const fetchMovieDetails = (movieId) => {
  const detailsUrl = `https://api.themoviedb.org/3 ${movieId}api_key=988e17afa010ca134f38ace964916dd5`;
  fetch(detailsUrl)
    .then((response) => response.json())
    .then((data) => displayMovieDetails(data))
    .catch((error) => console.log("Error:", error));
};

//Display movie details
const displayMovieDetails = (movie) => {
  const movieInfo = document.getElementById("movie-info");
  movieInfo.innerHTML = "";

  const title = document.createElement("h3");
  title.textContent = movie.title;

  const overview = document.createElement("p");
  overview.textContent = movie.overview;

  movieInfo.appendChild(title);
  movieInfo.appendChild(overview);
};

//  Like the movie
const likeMovie = movieId =>{
    // Make a post request to your server to like it
    fetch(LIKE_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
    },
    body: JSON.stringify({movieId: movieId})

})
.then(response => response.json())
.then(data => {
    // Update the likes on the selected movie
    const movieCard = document.getElementById(`movie-${movieId}`);
    const likeButton = movieCard.querySelector('button');
    likeButton.textContent = `Liked (${data.likes})`;

})
.catch(error => console.log('Error:', error));
};

// Event listener for form submission
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    const searchTerm = searchInput.ariaValueMax.trim();
    if(searchTerm){
        const searchURL = SEARCH_API + searchTerm;
        fetchMovies(searchUrl);

    }
    searchInput.value = '';
});

//Event listener for form submission to add a comment for the movie watched
const commentForm = document.getElementById('comment-form');
const  commentInput = document.getElementById('comment');
const commentList = document.getElementById('comments');

commentForm.addEventListener('submit', e =>{
    e.preventDefault();
    const comment = commentInput.value.trim();
    if(comment){
        addComment(comment);
        commentInput.value = '';
    }
});

// Add a comment for a review after watching the movie
const addComment = comment =>{
    const commentItem = document.createElement('div');
    commentItem.textContent = comment;
    commentList.appendChild(commentItem);
};
