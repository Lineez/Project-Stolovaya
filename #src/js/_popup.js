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
}