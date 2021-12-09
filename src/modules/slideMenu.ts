interface ISlideMenu {
  openBtn: string;
  menu: string;
  classActive: string;
  closeTrigger: string;
}

type slideMenuType = (param: ISlideMenu) => void;

const openMenu = (nav: HTMLElement | null, active: string) => {
  nav?.classList.add(active);
};

const closeMenu = (nav: HTMLElement | null, active: string) => {
  nav?.classList.remove(active);
};

const slideMenu: slideMenuType  = ({ openBtn, menu, classActive, closeTrigger }) => {
  const burgerBtn: HTMLElement | null = document.querySelector(openBtn),
  navigation: HTMLElement | null = document.querySelector(menu),
  navigationClose: NodeListOf<HTMLElement> = document.querySelectorAll(closeTrigger);

  burgerBtn?.addEventListener('click', () => openMenu(navigation, classActive));

  navigationClose.forEach((item) => item.addEventListener('click', () => closeMenu(navigation, classActive)));
};

export default slideMenu;
