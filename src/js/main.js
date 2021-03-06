const movieListElement = document.querySelector('.movieListElement')
function getMovies(inputString) {
  return fetch(`https://www.omdbapi.com/?s=${inputString}&apikey=26dfa6bb`)
    .then(Response => {
      return Response.json();
    })
    .catch(err => {
      console.log(err)
    })
}

function getMovieDetails(id) {
  return fetch(`https://www.omdbapi.com/?i=${id}&apikey=26dfa6bb`)
    .then(Response => {
      return Response.json();
    })
    .catch(err => {
      console.log(err)
    })
}

document.querySelector('.input').addEventListener('keypress', newSearch)
function newSearch(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    let input = document.querySelector('input');
    if (input.value !== '') {
      movieListElement.innerHTML = "";
      getMovies(input.value)
        .then(json => {
          for (const movie of json.Search) {
            getMovieDetails(movie.imdbID)
              .then(json => {
                createAndInsertHTML(movie, json);
              })
          }
        })
      input.value = "";
    }
  }
}



function createAndInsertHTML(movie, json) {
  movieListElement.insertAdjacentHTML('afterbegin',
    `<li>
  <div class="photo-container">
    <div class=contaioner>
      <img class="image" src="${movie.Poster}" alt="">
      </div>
        <div class="overlay">
        <div class="description">
        <p class="title">${json.Title}<br>${json.Ratings[0].Value}</p>
        <p class="description">${json.Plot}</p>
      </div>
    </div>
  </div>
</li>
`)
}