/*  Главное меню  */
var navMain = document.querySelector('.main-nav');
var navToggle = navMain.querySelector('.main-nav__toggle');

//  Скрытие меню при инициализации JS
navMain.classList.remove('main-nav--nojs');
navMain.classList.add('main-nav--closed');
navMain.classList.remove('main-nav--opened');

//  Нажатие кнопки открытия/закрытия меню
navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});
