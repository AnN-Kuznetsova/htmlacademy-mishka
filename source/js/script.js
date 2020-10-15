/*  Главное меню  */
var navMain = document.querySelector('.main-nav');
var navToggle = navMain.querySelector(".main-nav__toggle");

//  Скрытие меню при инициализации JS
navMain.classList.remove("main-nav--nojs");
navMain.classList.add("main-nav--closed");
navMain.classList.remove("main-nav--opened");

//  Нажатие кнопки открытия/закрытия меню
navToggle.addEventListener("click", function() {
  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.add("main-nav--opened");
  } else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.remove("main-nav--opened");
  }
});


/*  Окно добавления в корзину  */
var addCartButtons = document.querySelectorAll(".add-cart-js");
var addCartModal = document.querySelector(".modal--add-cart");
var siteWrapper = document.querySelector(".site-wrapper");


var onAddCartModalClose = function() {
  if (addCartModal.classList.contains("modal-show")) {
    addCartModal.classList.remove("modal-show");
    siteWrapper.classList.remove("site-wrapper--modal");
  }
}

siteWrapper.addEventListener("click", function() {
  if (siteWrapper.classList.contains("site-wrapper--modal") && addCartModal) {
    onAddCartModalClose();
  }
}, true);

addCartButtons.forEach(function(addCartBtn) {
  addCartBtn.addEventListener("click", function(event) {
    event.preventDefault();
    siteWrapper.classList.add("site-wrapper--modal");
    addCartModal.classList.add("modal-show");
  })
});

addCartModal.addEventListener("submit", function(event) {
  // event.preventDefault();
  onAddCartModalClose();
});

window.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    event.preventDefault();
    onAddCartModalClose();
  }
});
