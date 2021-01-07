'use strict'
class DynamicAdapt {
  constructor(type) {
    this.type = type;
  }

  init() {
    // массив объектов
    this.оbjects = [];
    this.daClassname = '_dynamic_adapt_';
    // массив DOM-элементов
    this.nodes = [...document.querySelectorAll('[data-da]')];

    // наполнение оbjects объктами
    this.nodes.forEach((node) => {
      const data = node.dataset.da.trim();
      const dataArray = data.split(',');
      const оbject = {};
      оbject.element = node;
      оbject.parent = node.parentNode;
      оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
      оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
      оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.оbjects.push(оbject);
    });

    this.arraySort(this.оbjects);

    // массив уникальных медиа-запросов
    this.mediaQueries = this.оbjects
      .map(({
        breakpoint
      }) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
      .filter((item, index, self) => self.indexOf(item) === index);

    // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске
    this.mediaQueries.forEach((media) => {
      const mediaSplit = media.split(',');
      const matchMedia = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1];

      // массив объектов с подходящим брейкпоинтом
      const оbjectsFilter = this.оbjects.filter(
        ({
          breakpoint
        }) => breakpoint === mediaBreakpoint
      );
      matchMedia.addEventListener('change', () => {
        this.mediaHandler(matchMedia, оbjectsFilter);
      });
      this.mediaHandler(matchMedia, оbjectsFilter);
    });
  }

  // Основная функция
  mediaHandler(matchMedia, оbjects) {
    if (matchMedia.matches) {
      оbjects.forEach((оbject) => {
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.moveTo(оbject.place, оbject.element, оbject.destination);
      });
    } else {
      оbjects.forEach(
        ({ parent, element, index }) => {
          if (element.classList.contains(this.daClassname)) {
            this.moveBack(parent, element, index);
          }
        }
      );
    }
  }

  // Функция перемещения
  moveTo(place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
      destination.append(element);
      return;
    }
    if (place === 'first') {
      destination.prepend(element);
      return;
    }
    destination.children[place].before(element);
  }

  // Функция возврата
  moveBack(parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
      parent.children[index].before(element);
    } else {
      parent.append(element);
    }
  }

  // Функция получения индекса внутри родителя
  indexInParent(parent, element) {
    return [...parent.children].indexOf(element);
  }

  // Функция сортировки массива по breakpoint и place 
  // по возрастанию для this.type = min
  // по убыванию для this.type = max
  arraySort(arr) {
    if (this.type === 'min') {
      arr.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }
          if (a.place === 'first' || b.place === 'last') {
            return -1;
          }
          if (a.place === 'last' || b.place === 'first') {
            return 1;
          }
          return a.place - b.place;
        }
        return a.breakpoint - b.breakpoint;
      });
    } else {
      arr.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }
          if (a.place === 'first' || b.place === 'last') {
            return 1;
          }
          if (a.place === 'last' || b.place === 'first') {
            return -1;
          }
          return b.place - a.place;
        }
        return b.breakpoint - a.breakpoint;
      });
      return;
    }
  }
}
;
const popup = document.querySelector('.popup');
const popupBtn = document.querySelector('.header__search-mobile');
const popupClose = document.querySelector('.popup__close');

if (popup) {
	// Открытие окна
	popupBtn.addEventListener('click', (e) => {
		popup.classList.toggle('active');
	})
	// Закрытие окна по кнопке
	popupClose.addEventListener('click', (e) => {
		popup.classList.remove('active');
	})
	// Закрытие окна по клику вне окна
	popup.addEventListener('click', (e) => {
		if (!e.target.closest('.popup__content')) {
			popup.classList.remove('active');
		}
	})
};
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