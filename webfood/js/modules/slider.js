function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
    let offset = 0;
    let slideIndex = 1;

    // Valib vajalikud elemendid
    // Выбираем необходимые элементы
    const slides = document.querySelectorAll(slide),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        slider = document.querySelector(container),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field);
    
    // Saadakse õigesti wrapper'i laius
    // Получаем корректную ширину обертки слайдов
    const width = getComputedStyle(slidesWrapper).width;

    // Värskendab kogu ja praeguse slaidi loendurid
    // Обновляем счетчики общего и текущего слайда
    total.textContent = slides.length < 10 ? `0${slides.length}` : slides.length;
    current.textContent = `0${slideIndex}`;

    // Seadistab slaidide väljale stiilid
    // Устанавливаем стили для slidesField
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    // Peidab ülejääva sisu
    // Скрываем переполнение
    slidesWrapper.style.overflow = 'hidden';

    // Määrab iga slaidi laiuse
    // Устанавливаем ширину каждого слайда
    slides.forEach(slide => {
        slide.style.width = width; // Tagab, et laius on string koos 'px'
        // Обеспечиваем ширину как строку с 'px'
    });

    slider.style.position = 'relative'; // Seab liuguri positsiooni
    // Устанавливаем относительное позиционирование для слайдера

    // Loob indikaatorid (täpid)
    // Создаем индикаторы (точки)
    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators); // Lisab indikaatorid liugurile
    // Добавляем индикаторы в слайдер

    // Loome iga slaidi jaoks täpi ja lisame selle indikaatorite hulka
    // Создаем точку для каждого слайда и добавляем их в индикаторы
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i === 0) {
            dot.style.opacity = 1; // Esimene täpp on aktiivne
            // Первая точка активна
        }
        indicators.append(dot); // Lisame täpi indikaatoritele
        // Добавляем точку в индикаторы
        dots.push(dot); // Salvesta täppide massiivi
        // Сохраняем точки в массив
    }

    // Nuppude sündmuste kuulajad (järgmine ja eelmine)
    // Обработчики событий кнопок (вперед и назад)
    next.addEventListener('click', () => {
        // Kontrollib, kas oleme jõudnud viimasele slaidile ja alustab otsast peale
        // Проверяем, если достигнут последний слайд, возвращаемся к первому
        if (offset === deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width); // Liigutab slaidi edasi
            // Перемещаем слайд вперед
        }

        slidesField.style.transform = `translateX(-${offset}px)`; // Liigutab slaidide väljale vastavalt nihkele
        // Перемещаем поле слайдов в зависимости от смещения

        slideIndex = slideIndex === slides.length ? 1 : slideIndex + 1; // Uuendab slaidi indeksit
        // Обновляем индекс слайда

        current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex; // Värskendab praegust loendurit
        // Обновляем текущий счетчик
        updateDots(); // Värskendab täppide olekut
        // Обновляем состояние точек
    });

    prev.addEventListener('click', () => {
        // Kontrollib, kas oleme esimesel slaidil ja liigutab viimasele
        // Проверяем, если на первом слайде, перемещаемся на последний
        if (offset === 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width); // Liigutab slaidi tagasi
            // Перемещаем слайд назад
        }

        slidesField.style.transform = `translateX(-${offset}px)`; // Nihutab slaide vastavalt
        // Перемещаем поле слайдов

        slideIndex = slideIndex === 1 ? slides.length : slideIndex - 1; // Uuendab slaidi indeksit
        // Обновляем индекс слайда

        current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex; // Uuendab praegust loendurit
        // Обновляем текущий счетчик
        updateDots(); // Värskendab täppide olekut
        // Обновляем состояние точек
    });

    // Täppide klikisündmuse kuulajad
    // Обработчики событий клика на точки
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to'); // Saab slaidi, millele klikiti
            // Получаем слайд, на который кликнули
            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1); // Arvutab nihke vastavalt klikitud slaidile
            // Вычисляем смещение в зависимости от слайда
            slidesField.style.transform = `translateX(-${offset}px)`; // Nihutab slaide
            // Перемещаем поле слайдов
            current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex; // Uuendab praegust loendurit
            // Обновляем текущий счетчик
            updateDots(); // Värskendab täppide olekut
            // Обновляем состояние точек
        });
    });

    // Abifunktsioon täppide läbipaistvuse uuendamiseks
    // Вспомогательная функция для обновления прозрачности точек
    function updateDots() {
        dots.forEach(dot => dot.style.opacity = ".5"); // Seab kõik täpid passiivseks
        // Устанавливаем все точки неактивными
        dots[slideIndex - 1].style.opacity = 1; // Seab aktiivse täpi läbipaistvuse
        // Устанавливаем активную точку
    }

    // Funktsioon, mis eemaldab stringist kõik mitte-numbrilised sümbolid
    // Функция для удаления всех нечисловых символов из строки
    function deleteNotDigits(str) {
        return +String(str).replace(/\D/g, ''); // Muudab stringi numbriks ja eemaldab mittenumbrilised sümbolid
        // Преобразуем строку в число, удаляя все нечисловые символы
    }
}

export default slider;
