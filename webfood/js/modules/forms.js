import { closeModal, openModal } from './modal';
import { postData } from '../services/services';

function forms(formsSelector, modalTimerId) {
    // Hangi kõik vormid, mis vastavad valijale
    // Получаем все формы, соответствующие селектору
    const forms = document.querySelectorAll(formsSelector);

    // Sõnumid erinevate seisundite jaoks
    // Сообщения для различных состояний
    const message = {
        // Laadimise animatsioon
        // Анимация загрузки
        loading: 'img/form/spinner.svg', 
        success: 'Aitäh! Võtame teiega peagi ühendust', 
        // Tõrke teade
        // Сообщение об ошибке
        failure: 'Midagi läks valesti...' 
    };

    // Sidumine postData funktsiooniga kõigi vormide jaoks
    // Привязываем функцию отправки данных ко всем формам
    forms.forEach(item => {
        bindPostData(item);
    });

    // Funktsioon vormi andmete sidumiseks ja töötlemiseks
    // Функция для отправки данных формы и их обработки
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 

            // Loob pildi staatuse teate jaoks ja seab laadimisikooni
            // Создаём изображение для сообщения о статусе и устанавливаем иконку загрузки
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
             `;
            form.insertAdjacentElement('afterend', statusMessage); 

            // Kogub vormi andmed
            // Собираем данные формы
            const formData = new FormData(form);

            // Muudab andmed JSON-i vormingusse
            // Преобразуем данные формы в формат JSON
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // Saadab andmed serverisse kasutades postData funktsiooni
            // Отправляем данные на сервер с помощью функции postData
            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data); // Kuvab serverilt saadud andmed
                    // Отображаем данные, полученные с сервера
                    showThanksModal(message.success); // Kuvab õnnestumise sõnumi
                    // Показываем сообщение об успешной отправке
                    statusMessage.remove(); // Eemaldab laadimisikooni
                    // Удаляем иконку загрузки
                }).catch(() => {
                    showThanksModal(message.failure); // Kuvab tõrketeate
                    // Показываем сообщение об ошибке
                }).finally(() => {
                    form.reset(); // Lähtestab vormi
                    // Сбрасываем форму
                });
        });
    }

    // Näitab kohandatud modaalakent vastava sõnumiga
    // Показываем кастомное модальное окно с соответствующим сообщением
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog'); // Hangi eelnev modaalaken
        // Получаем предыдущее модальное окно

        prevModalDialog.classList.add('hide'); // Peidab eelneva modaalakna
        // Скрываем предыдущее модальное окно
        openModal('.modal', modalTimerId); // Avab uue modaalakna
        // Открываем новое модальное окно

        // Loo uus modaalaken ja sisesta sõnum
        // Создаём новое модальное окно и вставляем сообщение
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
         `;
         document.querySelector('.modal').append(thanksModal); // Lisab modaalakna DOM-i
         // Добавляем модальное окно в DOM

         // Eemaldab modaalakna ja taastab eelmise modaalakna pärast 4 sekundit
         // Удаляет модальное окно и восстанавливает предыдущее модальное окно через 4 секунды
         setTimeout(() => {
            thanksModal.remove(); // Eemaldab tänusõnumi modaalakna
            // Удаляем модальное окно с благодарностью
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal'); // Sulgeb modaalakna
            // Закрываем модальное окно
         }, 4000);
    }
}

export default forms;
