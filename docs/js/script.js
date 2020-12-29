'use strict'

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
});


// При клике на все (выбор категории поиска)

const span = document.querySelector('.search-header__selected');
const category = document.querySelector('.search-header__category');
const inputs = document.querySelectorAll('.search-header__category input');


span.addEventListener('click', (e) => {
	category.classList.toggle('active');
	span.classList.toggle('active');
	inputs.forEach(el => {
		el.addEventListener('click', () => {
			span.innerHTML = el.value;
			span.classList.remove('active');
			category.classList.remove('active');
		})
	});
})