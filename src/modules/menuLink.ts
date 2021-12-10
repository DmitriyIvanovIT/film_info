import {getPopular, getTop} from "@/lib/api.services";
import renderCard from "@/modules/renderCard";
import renderVideo from "@/modules/renderVideo";

const title: HTMLElement | null = document.querySelector('.other-films__title');
const filmWeek: HTMLElement | null = document.querySelector('.film-week');
const getNav: NodeListOf<HTMLElement> | null = document.querySelectorAll('.get-nav');

const enum MenuLinkItems {
  linkTriends = 'get-nav__link_triends',
  popularMovies = 'get-nav__link_popular-movies',
  popularTv = 'get-nav__link_popular-tv',
  topMovies = 'get-nav__link_top-movies',
  topTv = 'get-nav__link_top-tv',
}

const menuLink = () => {
  getNav?.forEach((nav: HTMLElement) => {
    nav.addEventListener('click', (e: MouseEvent) => {
      const target: HTMLElement | null = (e.target as HTMLElement).closest('.get-nav__link');

      if (target) {
        e.preventDefault();

        if (target.classList.contains(MenuLinkItems.linkTriends)) {
          (filmWeek as HTMLElement).removeAttribute('style');
          (title as HTMLElement).innerHTML = 'Другие фильмы <span class="other-films__title-add">на Methed Cinema</span>'
        } else {
          (title as HTMLElement).textContent =  target.textContent;
          (filmWeek as HTMLElement).style.display = 'none';
        }

        switch (target.classList[2]) {
          case MenuLinkItems.linkTriends: return renderVideo();
          case MenuLinkItems.popularMovies: return getPopular('movie')
            .then(
              (data) => renderCard(data)
            );
          case MenuLinkItems.popularTv: return getPopular('tv')
            .then(
              (data) => renderCard(data)
            );
          case MenuLinkItems.topMovies: return getTop('movie')
            .then(
              (data) => renderCard(data)
            );
          case MenuLinkItems.topTv: return getTop('tv')
            .then(
              (data) => renderCard(data)
            );
        }
      }
    })
  });
}

export default menuLink;
