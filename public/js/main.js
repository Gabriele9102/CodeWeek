

/*--------------------------------------------------

                     UTILS

Per velocizzare i processi e scrivere meno codice
--------------------------------------------------*/

const c = (element) => document.createElement(element);
const q = (element) => document.querySelector(element);
const qAll = (element) => document.querySelectorAll(element);
const get_id = (element) => document.getElementById(element);

/*--------------------------------------------------------------

                 API THE MOVIE_DB

Dopo l'iscrizione al sito ho importato la key e i seguenti URL
---------------------------------------------------------------*/

let api_key = "2b9f9ed7a442f4d3c6d2d4f14a8e62dc";

let img_url = "https://image.tmdb.org/t/p/w500";

let original_img_url = "https://image.tmdb.org/t/p/original";

let movie_detail= "https://api.themoviedb.org/3/movie/"

let genres_list_http ="https://api.themoviedb.org/3/genre/movie/list?";


let movie_genres_http ="https://api.themoviedb.org/3/discover/movie?";



/*-------------------------------------
    
            CHIAMATE FETCH

--------------------------------------*/

const header = q(".header");


fetch(genres_list_http + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {data.genres.filter(item =>{
        fetchMoviesListByGenres(item.id, item.name);
    })
});

const fetchMoviesListByGenres = (id, genres) => {
    fetch(movie_genres_http + new URLSearchParams({
        api_key: api_key,
        with_genres: id,
        page: Math.floor(Math.random() * 3) + 1
    }))
    .then(res => res.json())
    .then(data =>{
        makeCategoryEl(`${genres}_movies`, data.results);

    })
}

/*-----------------------------

     CREAZIONE CATEGORIA + CARD

------------------------------*/

const makeCategoryEl = (category, data ) =>{
    header.innerHTML += `
     <div class="movie-list">

        <button class="pre-btn"><img src="img/left-arrow.png" alt="left"></button>

        <h1 class="movie-category">${category.split("_").join(" ")}</h1>
    
        <div class="movie-container" id="${category}"> </div>
   
        <button class="nxt-btn"><img src="img/right-arrow.png" alt="right"></button>

    </div>
    `;
    createCard(category, data)

}

const createCard = (id, data) =>{
    const movieContainer = get_id(id);
    data.map((item, i) =>{
        if(item.backdrop_path == null){
            item.backdrop_path = item.poster_path;
            if(item.backdrop_path == null){
                return;
            }
        } 
        movieContainer.innerHTML += ` 
        <div class="movie" onclick="location.href = '/${item.id}'">
            <img src="${img_url}${item.backdrop_path}" alt="Poster">
            <p class="movie-title">${item.title}</p>
        </div>`;

        if(i == data.length - 1){
            setTimeout(() =>{
                scrolling();
            }, 1000)
        }
    })
}

/*----------------------------

        SCROLLING CARD

------------------------------*/

const scrolling = () => {
    const conainter = [...qAll('.movie-container')];
    const nxtBtn = [...qAll('.nxt-btn')];
    const preBtn = [...qAll('.pre-btn')];

    conainter.forEach((item, i) => {
        let containerDimensions = item.getBoundingClientRect();
        let containerWidth = containerDimensions.width;

        nxtBtn[i].addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        })

        preBtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerWidth;
        })
    })
}

/*-----------------------------------

        Event Listeners Logo/Modale

------------------------------------*/

const logo = q('.logo');

logo.addEventListener('click', () => window.scrollTo({
    
    top: 0,
    behavior: 'smooth',
    
  }));


const modal_try = q('.modal-try');
const try_btn = q('.try-btn');
const send_btn = q('.send');
const span_x = q('.close');

try_btn.addEventListener('click', () => {

    modal_try.style.display = "block"

});

span_x.addEventListener('click', () => {

    modal_try.style.display = "none"
});

send_btn.addEventListener('click', () => {

    modal_try.style.display = "none"
});

window.onclick = function(ev) {
    if (ev.target == modal_try){
        modal_try.style.display = "none"
    }
}



export { q, get_id, api_key,img_url, movie_detail, original_img_url}