'use strict'
//===============================================
// Все обьекты открывающие попапы !добавить класс к ссылке, которая откроет попап
const popupLinks = document.querySelectorAll('._popup-link');
const body = document.querySelector('body');
// Все обьекты без дополнительного паддинга !добавить класс к обьекту который не нужно двигать
const popupPadding = document.querySelectorAll('._popup-padding');

// Для фикса двойных нажатий
let unlock = true;
// Фикс скрола, !указать равным transition (transition: all 0.7s ease 0s;)
const timeout = 700;

if (popupLinks.length > 0) {
	for (let i = 0; i < popupLinks.length; i++) {
		const popupLink = popupLinks[i];
		popupLink.addEventListener('click', (e) => {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup);
			e.preventDefault();
		})
	}
}

// Все обьекты закрывающие попапы !добавить класс к ссылке, которая закрое попап
const popupCloseObject = document.querySelectorAll('._popup-close');

if (popupCloseObject.length > 0) {
	for (let i = 0; i < popupCloseObject.length; i++) {
		const el = popupCloseObject[i];
		el.addEventListener('click', (e) => {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		})
	}
}

function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		currentPopup.classList.add('open');
		currentPopup.addEventListener('click', (e) => {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		burger.classList.remove('active');
		if (doUnlock) {
			bodyUnlock();
		}
	}
}


function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (popupPadding.length > 0) {
		for (let i = 0; i < popupPadding.length; i++) {
			const el = popupPadding[i];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	setTimeout(function () {
		if (popupPadding.length > 0) {
			for (let i = 0; i < popupPadding.length; i++) {
				const el = popupPadding[i];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout)

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

// Закрытие по нажатию esc
document.addEventListener('keydown', (e) => {
	if(e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});
//===============================================
// Инициализируем Swiper
// Добавить класс обьекта который будет слайдером
new Swiper('.swiper-container', {

	// // Автовысота
	// autoHeight: true,

	// Отступ между слайдами
	spaceBetween: 0,

	// // Стартовый слайд ( отсчет с нуля )
	// initialSlide: 1,

	// Вкл\откл свайпов на пк
	simulateTouch: true,
	// Курсор перетаскивания
	grabCursor: true,

	// =======================================================================
	// Навигация

	// Стрелки, выводятся в :after
	// navigation: {
	// 	prevEl: '.swiper-button-prev',
	// 	nextEl: '.swiper-button-next',
	// },

	// Мобайл-first подход (min-width: ...)
	// breakpoints: {
	// 	768: {
			
	// 	}
	// },

	// // ========================================================
	// Включить предзагрузку изображений
	preloadImages: false,
	// Ленивая загрузка
	lazy: {
		// Начало загрузки при свайпе
		loadOnTransitionStart: true,
		// Подгружать prev/next картинки
		loadPrevNext: true,
	},

	// Слежка за видимыми слайдами
	watchSlidesProgress: true,
	// Добавление класса видимым сладам
	watchSlidesVisibility: true,


	// // Бесконечность
	loop: true,
	// // Количество?
	// loopedSlides: 2,

	// // Свободный режим
	// freeMode: true,

	// // Скорость переключения слайдов
	speed: 900,

	// Автопрокрутка
	autoplay: {
		// Задержка
		delay: 3500,
		// Закончить на последнем слайде
		stopOnLastSlide: false,
		// откючить после юзера
		disableOnInteraction: false,
	},


	// // Количество выводимых слайдов ( в том числе дробные числа)
	// // если slidesPerView: 'auto', Добваить swiper-slide - width: auto;
	// slidesPerView: 1,
	// // Переключение слайдов при клике ( центрирование среди нескольких слайдов )
	// slideToClickedSlide: true,

	// // Количество пролистываемых слайдов
	// slidesPerGroup: 1,
	// // Активный слайд по центру ( для группы слайдов)
	// centeredSlides: true,

	// // Чувствительность свайпа
	// touchRatio: 1,
	// // Угол срабатывания свайпа
	// touchAngle: 45,


	// // вертикальный слайд \\ явно задать высоту слайдера
	// 	direction: 'vertical',
	// 	freeMode: true,

	// // Мультирядность? явно задать высоту слайдов
	// autoHeight: false,
	// slidesPerColumn: 2,


	// // =======================================================================
	// Пагинация
	pagination: {
		el: '.swiper-pagination',


		// Буллеты
		type: 'bullets',
		// clickable: true,	
		// // Динамические буллеты
		// dynamicBullets: true,
		// // Кастомные буллеты
		// // !!!!!!!Не работает c dynamicBullets
		// renderBullet: function(index, className) {
		// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
		// },


		// // Фракция
		// type: 'fraction',
		// // Кастомная фракция
		// renderFraction: function(currentClass, totalClass) {
		// 	return 'Фото <span class="' + currentClass + '"></span>' + ' из ' + '<span class="' + totalClass + '"></span>';
		// },


	// 	// Прогрессбар
	// 	type: 'progressbar'
	},

	// =======================================================================
	// 	// Скролл
	// 	scrollbar: {
	// 		el: '.swiper-scrollbar',
	// 		// Перетаскивание скролла
	// 		draggable: true,
	// 	},

	// // =======================================================================
	// 	// Навигация по хешу ( добавить атрибут data-hash="foo[i]" к "слайду")
	// 	hashNavigation: {
	// 		// отслеживать ( дает возможность навигации по стрелкам браузера(хешу посещенных слайдов))
	// 		watchState: true,
	// 	},


	// // =======================================================================
	// // Управление клавиатурой
	// keyboard: {
	// 	// Включить
	// 	enabled: true,
	// 	// Только в пределах слайдера (не на всей странице)
	// 	onlyInViewport: true,
	// 	// Включить pageUp\Down
	// 	pageUpDown: true,
	// }

	// // Прокрутка колесом мыши
	// mousewheel: {
	// 	// Чувствительность
	// 	sensitivity: 1,
	// 	// Класс обьекта на котором будет срабатывать ( слайдер? )
	// 	// eventsTarget: '.swiper-container'
	// },

	// // Эффект по умолчанию
	// effect: 'slide',

	// // Эффект прозрачности
	// effect: 'fade',
	// fadeEffect: {
	// 	// Параллельная смена прозрачности
	// 	crossFade: true,
	// },

	// // Эффект переворота
	// effect: 'flip',
	// flipEffect: {
	// 	// Тень
	// 	slideShadows: true,
	// 	// Показ только активного слайда
	// 	limitRotation: true,
	// },

	// Эффект 3д куба
	// effect: 'cube',
	// cubeEffect: {
	// 	slideShadows: true,
	// 	shadow: true,
	// 	shadowOffset: 20,
	// 	shadowScale: 0.95,
	// },

	// Эффект потока
	// effect: 'coverflow',
	// coverFlowEffect: {
	// 	// Угол
	// 	rotate: 20,
	// 	// Наложение
	// 	stretch: 50,
	// 	// Тень
	// 	slideShadows: true,
	// },

});;

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