// Funktsioon modaalakna sulgemiseks
// Функция для закрытия модального окна
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector); // Leiab modaalakna valitud elemendi
    // Находим модальное окно по селектору

    modal.classList.add('hide'); // Lisab "peidetud" klassi, et akent peita
    // Добавляем класс 'hide', чтобы скрыть окно
    modal.classList.remove('show'); // Eemaldab "näita" klassi
    // Убираем класс 'show'
    document.body.style.overflow = ''; // Lubab uuesti lehe kerimise
    // Включаем прокрутку страницы
}

// Funktsioon modaalakna avamiseks
// Функция для открытия модального окна
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector); // Leiab modaalakna valitud elemendi
    // Находим модальное окно по селектору

    modal.classList.add('show'); // Lisab "näita" klassi, et akent kuvada
    // Добавляем класс 'show', чтобы показать окно
    modal.classList.remove('hide'); // Eemaldab "peidetud" klassi
    // Убираем класс 'hide'
    document.body.style.overflow = 'hidden'; // Keelab lehe kerimise, kui aken on avatud
    // Отключаем прокрутку страницы при открытом модальном окне

    if (modalTimerId) {
        clearInterval(modalTimerId); // Kui on olemas taimer, siis peatab selle
        // Если есть таймер, останавливаем его
    }
}

// Funktsioon modaalakna käivitamiseks koos sündmuste halduritega
// Функция для инициализации модального окна с обработчиками событий
function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector), // Leiab kõik päästikud (nupud), mis avavad modaalakna
        // Находим все триггеры (кнопки), открывающие модальное окно
        modal = document.querySelector(modalSelector); // Leiab modaalakna

    // Lisab igale päästikule klikkimise sündmuse kuulaja, mis avab modaalakna
    // Добавляем каждому триггеру обработчик события клика, который открывает модальное окно
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    // Sulgeb modaalakna, kui klikitakse väljapoole sisu või "sulge" nupule
    // Закрываем модальное окно при клике вне содержимого или на кнопку закрытия
    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });

    // Sulgeb modaalakna, kui vajutatakse "Escape" nuppu
    // Закрываем модальное окно при нажатии клавиши "Escape"
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    // Funktsioon modaalakna kuvamiseks, kui kasutaja kerib lehe lõppu
    // Функция для открытия модального окна при прокрутке страницы до конца
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId); // Avab modaalakna, kui lehe lõpp on saavutatud
            // Открываем модальное окно, если достигнут конец страницы
            window.removeEventListener('scroll', showModalByScroll); // Eemaldab sündmuse kuulaja, et vältida korduvat avanemist
            // Убираем обработчик события, чтобы избежать повторного открытия
        }
    }
    // Lisab kerimise sündmuse kuulaja
    // Добавляем обработчик события прокрутки
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export { closeModal, openModal };
