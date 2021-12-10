import '@/style/style.css';
import slideMenu from "@/modules/slideMenu";
import renderVideo from "@/modules/renderVideo";
import menuLink from "@/modules/menuLink";

slideMenu(
  {
    openBtn: '.header__burger-btn',
    menu: '.navigation',
    classActive: 'navigation_active',
    closeTrigger: '.navigation__item, .navigation__close'
  }
);

renderVideo();
menuLink();
