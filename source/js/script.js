/*  Главное меню  */
const navMain = document.querySelector(`.main-nav`);
const navToggle = navMain.querySelector(`.main-nav__toggle`);

//  Скрытие меню при инициализации JS
navMain.classList.remove(`main-nav--nojs`);
navMain.classList.add(`main-nav--closed`);
navMain.classList.remove(`main-nav--opened`);

//  Нажатие кнопки открытия/закрытия меню
navToggle.addEventListener(`click`, function() {
  if (navMain.classList.contains(`main-nav--closed`)) {
    navMain.classList.remove(`main-nav--closed`);
    navMain.classList.add(`main-nav--opened`);
  } else {
    navMain.classList.add(`main-nav--closed`);
    navMain.classList.remove(`main-nav--opened`);
  }
});


/*  Окно добавления в корзину  */
const addCartButtons = document.querySelectorAll(`.add-cart-js`);
const addCartModal = document.querySelector(`.modal--add-cart`);
const siteWrapper = document.querySelector(`.site-wrapper`);


const onAddCartModalClose = () => {
  if (addCartModal.classList.contains(`modal-show`)) {
    addCartModal.classList.remove(`modal-show`);
    siteWrapper.classList.remove(`site-wrapper--modal`);
  }
}

siteWrapper.addEventListener(`click`, () => {
  if (siteWrapper.classList.contains(`site-wrapper--modal`) && addCartModal) {
    console.log(`click`);
    //onAddCartModalClose();
  }
});

addCartButtons.forEach((addCartBtn) => {
  addCartBtn.addEventListener(`click`, (event) => {
    event.preventDefault();
    siteWrapper.classList.add(`site-wrapper--modal`);
    addCartModal.classList.add(`modal-show`);
  })
});

addCartModal.addEventListener(`submit`, (event) => {
  // event.preventDefault();
  onAddCartModalClose();
});

window.addEventListener(`keydown`, function (event) {
  if (event.key === `Escape`) {
    event.preventDefault();
    onAddCartModalClose();
  }
});
