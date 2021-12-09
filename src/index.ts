import '@/style/style.css';
import slideMenu from "@/modules/slideMenu";

slideMenu({
  openBtn: '.header__burger-btn',
  menu: '.navigation',
  classActive: 'navigation_active',
  closeTrigger: '.navigation__item, .navigation__close'
}
);
