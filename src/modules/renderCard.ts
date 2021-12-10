import {getVideo, ITrendingResult, IVideoResult} from "@/lib/api.services";

const listCard: HTMLElement | null = document.querySelector('.other-films__list');

const createCard = (data: ITrendingResult, video: IVideoResult | undefined): HTMLElement => {
  const card = document.createElement('li'),
    link = document.createElement('a'),
    img = document.createElement('img');

  if (video) {
    link.href = `https://youtu.be/${video.key}`;
  }

  card.className = 'other-films__item';
  link.className = 'other-films__link tube';
  img.className = 'other-films__img';

  link.dataset.rating = String(data.vote_average);
  img.src = data.poster_path ?
    `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}` :
    '/img/not_poster.jpeg'
  ;
  img.alt = `постер ${data.name || data.title}`;

  link.append(img);
  card.append(link);

  return card;
}

const renderCard = async (arr: ITrendingResult[], type?: 'movie' | 'tv'): Promise<void> => {
  (listCard as HTMLElement).textContent = '';

  Promise.all(
    arr.map(async (item: ITrendingResult) => {
      const typeVideo = item.media_type || type;
      const video = await getVideo(typeVideo, item.id);
      return createCard(item, video[0]);
    })
  )
    .then(cards => (listCard as HTMLElement).append(...cards));

}

export default renderCard;
