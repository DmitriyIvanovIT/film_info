import { getTrends, ITrendingResult } from "@/lib/api.services";
import renderCard from "./renderCard";

const filmWeek: HTMLElement | null = document.querySelector('.film-week');

const firstRender = (data: ITrendingResult): void => {

  (filmWeek as HTMLElement).innerHTML = `
     <div class="container film-week__container" data-rating="${data.vote_average}">
       <div class="film-week__poster-wrapper">
           <img class="film-week__poster" src="https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${data.backdrop_path || data.poster_path}" alt="постер ${data.name || data.title}">
           <p class="film-week__title_origin">${data.original_name || data.original_title}</p>
       </div>
       <h2 class="film-week__title">${data.name || data.title}</h2>

       ${data.video ? `<a class="film-week__watch-trailer tube" target="_blank" href="https://youtu.be/V0hagz_8L3M" aria-label="смотреть трейлер"></a>` : ''}

     </div>
   `;
};

const renderVideo = async () => {
  const data: ITrendingResult[] = await getTrends();
  const [ firstCard, ...otherCard ] = data;
  otherCard.length = 12;

  console.log(data);

  firstRender(firstCard);
  renderCard(otherCard);
};

export default renderVideo;
