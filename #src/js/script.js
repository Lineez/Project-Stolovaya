'use strict'
@@include('./_dynamicAdaptiv.js');
@@include('./_popup.js');
@@include('./_swiper.js');
const da = new DynamicAdapt('max'); da.init();
// Меню
const burger = document.querySelector('.top-header__burger');
const menu = document.querySelector('.top-header__ul');

burger.addEventListener('click', () => {
	burger.classList.toggle('active');
	menu.classList.toggle('active');
})


// Почта
const mail = document.querySelector('.top-header__li_mail');
const mailSpan = document.querySelector('.top-header__li_mail span');

mail.addEventListener('click', (e) => {
	mailSpan.classList.toggle('active');
	if(phonePopup.classList.contains('active')) {
		phonePopup.classList.remove('active');
	}
});

// Телефон
const phone = document.querySelector('.top-header__li_phone');
const phonePopup = document.querySelector('.top-header__phone-container');
const phoneClose = document.querySelector('.phone__close');

phone.addEventListener('click', (e) => {
	phonePopup.classList.toggle('active');
	if(mailSpan.classList.contains('active')) {
		mailSpan.classList.remove('active');
	}
})

phoneClose.addEventListener('click', (e) => {
	phonePopup.classList.remove('active');
})


// При клике на все (выбор категории поиска)

const spans = document.querySelectorAll('.search-header__selected');
const categories = document.querySelectorAll('.search-header__category');
const inputs = document.querySelectorAll('.search-header__category input');

// Выбор категорий товаров в поиске
spans.forEach((span) => {
	span.addEventListener('click', (e) => {
		categories.forEach((category) => {
			category.classList.toggle('active');
			span.classList.toggle('active');
			inputs.forEach(input => {
				input.addEventListener('click', () => {
					span.innerHTML = input.value;
					span.classList.remove('active');
					category.classList.remove('active');
				})
			});
		})
	})
})

//===============================================

// Оборудование
const equipmentsLink = document.querySelector('.header__equipment');
const equipmentsGoods = document.querySelector('.header__wrap_bottom');

if(equipmentsLink) {
	equipmentsLink.addEventListener('click', () => {
		equipmentsGoods.classList.toggle('active');
	})
}