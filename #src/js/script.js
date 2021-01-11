'use strict'
//===============================================
@@include('./_popup.js');
//===============================================
@@include('./_swiper.js');

//===============================================
// Меню-бургер
const burger = document.querySelector('.header__burger');

burger.addEventListener('click', () => {
	burger.classList.toggle('active');
})

//===============================================
// Корзина
// Смена картинки
const cart = document.querySelector('.cart');
const cartImg = document.querySelector('.cart img');

cart.addEventListener('mouseover', () => {
	cartImg.src = './img/header/cart-white.png'
})
cart.addEventListener('mouseout', () => {
	cartImg.src = './img/header/cart-black.png'
})

//===============================================
// Почта
const mail = document.querySelector('.top-header__li_mail');
const mailSpan = document.querySelector('.top-header__li_mail span');

mail.addEventListener('click', (e) => {
	mailSpan.classList.toggle('active');
	if (phonePopup.classList.contains('active')) {
		phonePopup.classList.remove('active');
	}
});

//===============================================
// Телефон
const phone = document.querySelector('.top-header__li_phone');
const phonePopup = document.querySelector('.top-header__phone-container');
const phoneClose = document.querySelector('.phone__close');

phone.addEventListener('click', (e) => {
	phonePopup.classList.toggle('active');
	if (mailSpan.classList.contains('active')) {
		mailSpan.classList.remove('active');
	}
})

phoneClose.addEventListener('click', (e) => {
	phonePopup.classList.remove('active');
})

//===============================================
// При клике на все (выбор категории поиска)

const viewCategory = document.querySelector('.search-header__selected');
const selectCategory = document.querySelector('.search-header__category');
const inputsCategory = document.querySelectorAll('.search-header__category input');


viewCategory.addEventListener('click', (e) => {
	viewCategory.classList.toggle('active');
	selectCategory.classList.toggle('active');
})

inputsCategory.forEach((el, key) => {
	el.addEventListener('click', () => {
		viewCategory.innerHTML = el.value;
		viewCategory.classList.remove('active');
		selectCategory.classList.remove('active');
	})
})

//===============================================
// Выдача поиска
const searchInput = document.querySelector('.search-header__place input');
const searchList = document.querySelector('.search-header__body');

searchInput.addEventListener('keydown', (e) => {
	searchList.classList.add('active');
	if(searchInput.value == '') {
		searchList.classList.remove('active');
	}
})

//===============================================
// Поиск на мобильных устройствах
const search = document.querySelector('.search-header');
const searchMobile = document.querySelector('.header__search-mobile');
const searcClose = document.querySelector('.search-header__close');

searchMobile.addEventListener('click', () => {
	search.classList.add('active');
})
searcClose.addEventListener('click', () => {
	search.classList.remove('active');
})