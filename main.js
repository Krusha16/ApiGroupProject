
function getMovies(inputString) {
  return fetch(`http://www.omdbapi.com/?s=${inputString}&apikey=26dfa6bb`)
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
      getMovies(input.value)
        .then(json => {
          console.log(json.Search);
          for(const movie of json.Search){
            console.log(movie);
            createAndInsertHTML(movie);
          }
        })
    }
  }
};

const movieListElement = document.querySelector('.movieListElement')

function createAndInsertHTML(movie) {
  movieListElement.insertAdjacentHTML('afterbegin',
    `<li>
  <div class="photo-container">
    <div class="photo">
      <img src="${movie.Poster}" alt="">
    </div>
  </div>
</li>
`)
}


