import { searchData } from "@/lib/api.services";
import renderCard from "@/modules/renderCard";

const title: HTMLElement | null = document.querySelector('.other-films__title');
const filmWeek: HTMLElement | null = document.querySelector('.film-week');
const form: HTMLElement | null = document.querySelector('.header__search-form');
const input: HTMLInputElement | null = document.querySelector('.header__search-input');

const search = () => {

  (form as HTMLElement).addEventListener('submit', (e) => {
    e.preventDefault();

    if ((input as HTMLInputElement).value) {
      searchData((input as HTMLInputElement).value)
        .then(data => {
          if (data.length) {
            renderCard(data);
          } else {
            throw 'По данному запросу ничего не найдено'
          }
        })
        .then(() => {
          filmWeek?.remove();
          (title as HTMLElement).textContent = `Результат поиска: ${(input as HTMLInputElement).value}`;
        })
        .catch(err => {
          (title as HTMLElement).textContent = err;
        });
    }
  })
}

export default search;
