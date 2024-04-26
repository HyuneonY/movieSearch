const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTBiZGI0MTcyNDI5MDk1ODVhODEyODY3OWU3ODFkZiIsInN1YiI6IjY2MjhmMjExNjJmMzM1MDE0YmQ4YjZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E8cOCIVz4qZaUEUmqWl0rIFVjNzHOjE0XSm4viBCZfQ'
    }
};

const fetchMovieData = async () => {
    try {
        const res = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
        const json = await res.json();
        return json;

    } catch (err) {
        console.log(err);
    }
}

async function showMovie() {
    const json = await fetchMovieData();
    let search = document.getElementById("search-input").value.toLowerCase();
    json.results.forEach((movie) => {
        if (movie.title.toLowerCase().includes(search)) {
            movieCard(movie);
        }
    });
    focusCursor();
}

function movieCard(movie) {
    let template = `<div class="col" onclick = "alert('영화 id: ${movie.id}')">
                  <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
                  <p class="movieName">${movie.title}</p>
                  <p class="movieSum">${movie.overview}</p>
                  <p class="movieRate">평점 ${movie.vote_average}</p>
                </div>`;

    document
        .querySelector('.card-list')
        .insertAdjacentHTML('beforeend', template);
}

function remove_cards() {
    const cardlist = document.getElementById('cards');

    cardlist.innerHTML = "";
}

function searchMovie() {
    remove_cards();
    showMovie();
}

async function language(clicked_id) {
    remove_cards();
    const json = await fetchMovieData();
    const languagejson = await json.results.filter(movie => movie["original_language"] === clicked_id);

    languagejson.forEach((movie) => {
        movieCard(movie);
    });
    focusCursor();
}

function focusCursor() {
    document.getElementById('search-input').focus();
    document.getElementById('search-input').value = null;
}
showMovie();




