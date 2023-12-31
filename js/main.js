const apiKey = '22525f2f85e4c6db678c4d1f7a1e5d8a';
const baseUrl = 'https://api.themoviedb.org/3';
const popularMoviesUrl = `${baseUrl}/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;

fetch(popularMoviesUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar filmes populares');
        }
        return response.json();
    })
    .then(data => {
        if (data.results[0]) {
            const bestMovie = data.results[0];

            const bestBanner = document.getElementById('bestBanner');
            const bestTitle = document.getElementById('bestTitle');
            const bestOverview = document.getElementById('bestOverview');

            bestBanner.src = `https://image.tmdb.org/t/p/original${bestMovie.backdrop_path}`;
            bestBanner.alt = `${bestMovie.title} Poster`;

            bestTitle.textContent = bestMovie.title;
            bestOverview.textContent = bestMovie.overview;
        }

        const popularMovies = data.results.slice(0, 10);

        const moviesContainer = document.getElementById('cardFilme');

        popularMovies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('filme');

            const movieId = movie.id;

            const tituloFilme = document.createElement('div');
            tituloFilme.classList.add('titulo');
            const titulo = document.createElement('h4');
            titulo.textContent = movie.title;
            const nota = document.createElement('p');
            nota.classList.add('nota');
            nota.textContent = movie.vote_average.toFixed(1);

            const moviePoster = document.createElement('img');
            moviePoster.classList.add('poster');
            moviePoster.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
            moviePoster.alt = `${movie.title} Poster`;

            movieCard.dataset.id = movieId;

            movieCard.appendChild(moviePoster);
            movieCard.appendChild(tituloFilme);
            tituloFilme.appendChild(titulo);
            tituloFilme.appendChild(nota);

            movieCard.addEventListener('click', () => {
                var url = `./telas/sinopse.html?idFilme=${encodeURIComponent(movieId)}`;
                window.location.href = url;
            });

            moviesContainer.appendChild(movieCard);
        });
    })
    .catch(error => {
        console.error('Erro:', error);
    });


    function scrolar(direcao) {
        var scrollar = document.getElementById('cardFilme');
        if(direcao.value == 'right'){
            scrollar.scrollBy({
                left: 200, 
                behavior: 'smooth'
            });
        }else{
            scrollar.scrollBy({
                left: -200, 
                behavior: 'smooth'
            });
        }
    }
    function scrolarSearch(direcao) {
        var scrollar = document.getElementById('buscarFilme');
        if(direcao.value == 'right'){
            scrollar.scrollBy({
                left: 200, 
                behavior: 'smooth'
            });
        }else{
            scrollar.scrollBy({
                left: -200, 
                behavior: 'smooth'
            });
        }
    }

function searchMovies() {
    const apiKey = '22525f2f85e4c6db678c4d1f7a1e5d8a';
    const movieName = document.getElementById('searchInput').value;
    const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`;

    fetch(searchMovieUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar filmes');
            }
            return response.json();
        })
        .then(data => {
            const popularMovies = data.results.slice(0, 15);
            
            const moviesContainer = document.getElementById('buscarFilme');
            moviesContainer.innerHTML = '';
            moviesContainer.innerHTML += '<button value="right" onclick="scrolarSearch(this)" class="botaoScroll" style="right: 0;">></button>';
            moviesContainer.innerHTML += '<button value="left" onclick="scrolarSearch(this)" class="botaoScroll" style="left: 0;"><</a>'

            popularMovies.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('filme');

                const movieId = movie.id;

                const tituloFilme = document.createElement('div');
                tituloFilme.classList.add('titulo');
                const titulo = document.createElement('h4');
                titulo.textContent = movie.title;
                const nota = document.createElement('p');
                nota.classList.add('nota');
                nota.textContent = movie.vote_average.toFixed(1);

                const moviePoster = document.createElement('img');
                moviePoster.classList.add('poster');
                moviePoster.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
                moviePoster.alt = `${movie.title} Poster`;

                movieCard.dataset.id = movieId;

                movieCard.appendChild(moviePoster);
                movieCard.appendChild(tituloFilme);
                tituloFilme.appendChild(titulo);
                tituloFilme.appendChild(nota);

                movieCard.addEventListener('click', () => {
                    var url = `./telas/sinopse.html?idFilme=${encodeURIComponent(movieId)}`;
                    window.location.href = url;
                });

                moviesContainer.appendChild(movieCard);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}
