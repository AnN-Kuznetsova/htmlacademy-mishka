//  Определит метод forEach для IE
if (typeof NodeList !== "undefined" && NodeList.prototype && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}


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

if (addCartButtons.length && addCartModal && siteWrapper) {
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
    onAddCartModalClose();
  });

  window.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      onAddCartModalClose();
    }
  });
}



/*  Форма заказа  */
var orderForm = document.querySelector('.order-form');
if (orderForm) {
  var clientNameInput = orderForm.querySelector('#client-name');
  var clientSurnameInput = orderForm.querySelector('#client-surname');
  var clientPatronymicInput = orderForm.querySelector('#client-patronymic');
  var clientTelInput = orderForm.querySelector('#client-tel');
  var clientEmailInput = orderForm.querySelector('#client-email');

  //  Local Storage
  var isStorageSupport = true;
  var storageClientName = '';
  var storageClientSurame = '';
  var storageClientPatronymic = '';
  var storageClientTel = '';
  var storageClientEmail = '';

  try {
    storageClientName = localStorage.getItem('clientName');
    storageClientSurame = localStorage.getItem('clientSurname');
    storageClientPatronymic = localStorage.getItem('clientPatronymic');
    storageClientTel = localStorage.getItem('clientTel');
    storageClientEmail = localStorage.getItem('clientEmail');
  } catch (err) {
    isStorageSupport = false;
  }

  if (storageClientName) {
    clientNameInput.value = storageClientName;
  }
  if (storageClientSurame) {
    clientSurnameInput.value = storageClientSurame;
  }
  if (storageClientPatronymic) {
    clientPatronymicInput.value = storageClientPatronymic;
  }
  if (storageClientTel) {
    clientTelInput.value = storageClientTel;
  }
  if (storageClientEmail) {
    clientEmailInput.value = storageClientEmail;
  }

  orderForm.addEventListener("submit", function (event) {
    if (!clientNameInput.value || !clientSurnameInput.value || !clientTelInput.value || !clientEmailInput.value) {
      event.preventDefault();
    } else {
      if (isStorageSupport) {
        localStorage.setItem('clientName', clientNameInput.value);
        localStorage.setItem('clientSurname', clientSurnameInput.value);
        localStorage.setItem('clientPatronymic', clientPatronymicInput.value);
        localStorage.setItem('clientTel', clientTelInput.value);
        localStorage.setItem('clientEmail', clientEmailInput.value);
      }
    }
  });
}


/*  Карта  */
var mapElement = document.querySelector('#map');

if (mapElement) {
  ymaps.ready(init);

  function init(){
    var coordinats = [59.938631, 30.323055];

    var myMap = new ymaps.Map('map', {
      center: coordinats,
      controls: [],
      zoom: 17
    });

    var myPlacemark = new ymaps.Placemark(
      coordinats,
      {
        balloonContent: 'MISHKA <br/> ул. Большая Конюшенная, 19/8',
        hintContent: 'ул. Большая Конюшенная, 19/8'
      },
      {
        iconLayout: 'default#image',
        iconImageHref: '../img/icon-map-pin.svg',
        iconImageSize: [67, 100],
        iconImageOffset: [-33, -100]
    });
    myMap.geoObjects.add(myPlacemark);

    var zoomControl = new ymaps.control.ZoomControl();
    myMap.controls.add(zoomControl, {
      size: "small",
      float: "none",
      position: {
        bottom: "70px",
        right: "40px"
      }
    });

    var fullscreenControl = new ymaps.control.FullscreenControl();
    myMap.controls.add(fullscreenControl, {
      float: "none",
      position: {
        top: "50px",
        left: "40px"
      }
    });

    var typeSelector = new ymaps.control.TypeSelector();
    myMap.controls.add(typeSelector, {
      float: "none",
      position: {
        top: "50px",
        left: "85px"
      }
    });

    var geolocationControl = new ymaps.control.GeolocationControl();
    myMap.controls.add(geolocationControl, {
      float: "none",
      position: {
        top: "50px",
        left: "190px"
      }
    });
  }
}
