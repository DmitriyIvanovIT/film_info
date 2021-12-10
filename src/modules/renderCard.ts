import {ITrendingResult} from "@/lib/api.services";

const listCard: HTMLElement | null = document.querySelector('.other-films__list');

const createCard = (data: ITrendingResult): HTMLElement => {
  const card = document.createElement('li'),
    link = document.createElement('a'),
    img = document.createElement('img');

  card.className = 'other-films__item';
  link.className = 'other-films__link';
  img.className = 'other-films__img';

  link.dataset.rating = String(data.vote_average);
  link.target = '_blank';
  img.src = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`;
  img.alt = `постер ${data.name || data.title}`;

  link.append(img);
  card.append(link);

  return card;
}

const renderCard = async (arr: ITrendingResult[]): Promise<void> => {
  (listCard as HTMLElement).textContent = '';

  const cards = arr.map((item: ITrendingResult) => createCard(item));

  (listCard as HTMLElement).append(...cards);
}

export default renderCard;
