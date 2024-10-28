function calc() {
    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    // Kontrollib, kas sugu on juba localStorage's olemas, ja määrab selle väärtuse
    // Проверяет, есть ли пол в localStorage, и устанавливает его значение
    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    }else{
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    // Kontrollib, kas ratio on juba localStorage's olemas, ja määrab selle väärtuse
    // Проверяет, есть ли коэффициент в localStorage, и устанавливает его значение
    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    }else{
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    // Arvutab lõpptulemuse vastavalt sisestatud andmetele
    // Рассчитывает итоговый результат на основе введённых данных
    function calcTotal(){
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent = '____';
            return;
        }
        // Arvutab naise jaoks
        // Рассчитывает для женщин
        if (sex === 'female'){
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }else {
            // Arvutab mehe jaoks
            // Рассчитывает для мужчин
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    // Käivitab arvutuse esialgsete väärtustega
    // Запускает расчёт с начальными значениями
    calcTotal();

    // Määrab algsed seaded localStorage põhjal ja lisab aktiivse klassi
    // Устанавливает начальные настройки на основе localStorage и добавляет активный класс
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if(elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            }
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
            }
        });
    }

    // Käivitab algseadete määramise sugule ja koefitsiendile
    // Запускает настройку пола и коэффициента
    initLocalSettings('#gender div', 'calulating__choose-item-active');
    initLocalSettings('.calculating__choose_big div', 'calulating__choose-item-active');

    // Kogub staatilise informatsiooni (nupuvalikud) ja uuendab localStorage väärtusi
    // Собирает статическую информацию (выбор кнопок) и обновляет значения в localStorage
    function getStaticInformation(selector, activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', + e.target.getAttribute('data-ratio'));
                }else{
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                // Arvutab tulemuse uuesti
                // Пересчитывает результат
                calcTotal();
            });
        });
    }

    // Käivitab staatilise informatsiooni kogumise sugule ja koefitsiendile
    // Запускает сбор статической информации для пола и коэффициента
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    // Kogub dünaamilise informatsiooni (kõrgus, kaal, vanus) ja valideerib sisestuse
    // Собирает динамическую информацию (рост, вес, возраст) и валидирует ввод
    function getDynamicInformation(selector){
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            // Kontrollib, kas sisestus ei ole numbriline ja värvib punaseks, kui on viga
            // Проверяет, не является ли ввод нечисловым, и окрашивает красным при ошибке
            if(input.value.match(/\D/g)){
                input.style.border = "1px solid red";
            }else{
                input.style.border = 'none';
            }
            // Määrab väärtuse vastavalt sisestatud andmetele
            // Устанавливает значение в зависимости от введённых данных
            switch(input.getAttribute('id')){
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            // Arvutab tulemuse uuesti
            // Пересчитывает результат
            calcTotal();
        });
    }
    
    // Käivitab dünaamilise informatsiooni kogumise kõrgusele, kaalule ja vanusele
    // Запускает сбор динамической информации для роста, веса и возраста
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

}

export default calc;
