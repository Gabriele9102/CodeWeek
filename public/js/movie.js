import {q, api_key, movie_detail, original_img_url} from "./main.js"

let movie_id = location.pathname;

console.log(movie_id)

/*------------------------------

    FETCH DETTAGLI FILM/SERIE TV

-------------------------------*/

fetch(`${movie_detail}${movie_id}?` + new URLSearchParams({
    api_key: api_key
})) 
.then(res => res.json())
.then(data =>{
    createInfo(data);
})

const createInfo = (data) => {
    const movieName = q('.movie-name');
    const genred = q('.genred');
    const des = q('.des');
    const rating = q('.rating');
    const backdrop = q('.movie-info');
    
    movieName.textContent = data.title;
    genred.textContent = `${data.release_date.split('-')[0]} | `;
    for(let i = 0; i < data.genres.length; i++){
        genred.innerHTML += data.genres[i].name + formatString(i, data.genres.length);
    }

    des.textContent = data.overview;

    rating.textContent = "Rating: " + data.vote_average;

    backdrop.style.backgroundImage = `url(${original_img_url}${data.backdrop_path})`;
}

const formatString = (currentIndex, maxIndex) => {
    return (currentIndex == maxIndex - 1) ? '' : ', ';
}

/*------------------------------

            FETCH CAST

-------------------------------*/

fetch(`${movie_detail}${movie_id}/credits?` + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
    const cast = document.querySelector('.starring');
    for(let i = 0; i < 7; i++){
        cast.textContent += data.cast[i].name + formatString(i, 7);
    }
})