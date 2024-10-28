function timer(id, deadline) {
    // Funktsioon aja arvutamiseks tähtajani
    // Функция для расчета времени до дедлайна
    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()), // Arvutab aja vahe
            // Рассчитываем разницу во времени
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // Päevade arv
            // Количество дней
            seconds = Math.floor((t / 1000) % 60), // Sekundite arv
            // Количество секунд
            minutes = Math.floor((t / 1000 / 60) % 60), // Minutite arv
            // Количество минут
            hours = Math.floor((t / (1000 * 60 * 60)) % 24); // Tundide arv
            // Количество часов

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }; // Tagastab järelejäänud aja objektina
        // Возвращаем оставшееся время в виде объекта
    }

    // Funktsioon, mis lisab nulli, kui number on väiksem kui 10
    // Функция, добавляющая ноль, если число меньше 10
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return '0' + num; // Lisab nulli
            // Добавляем ноль
        } else {
            return num; // Tagastab numbri ilma muudatusteta
            // Возвращаем число без изменений
        }
    }

    // Funktsioon taimeri seadistamiseks
    // Функция для установки таймера
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector), // Valib taimeri elemendi
            // Выбираем элемент таймера
            days = timer.querySelector('#days'), // Valib päevade välja
            // Выбираем поле для дней
            hours = timer.querySelector('#hours'), // Valib tundide välja
            // Выбираем поле для часов
            minutes = timer.querySelector('#minutes'), // Valib minutite välja
            // Выбираем поле для минут
            seconds = timer.querySelector('#seconds'), // Valib sekundite välja
            // Выбираем поле для секунд
            timeInterval = setInterval(updateClock, 1000); // Uuendab kella iga sekund
            // Обновляем часы каждую секунду

        updateClock(); // Uuendame kella kohe esimesel korral
        // Обновляем часы сразу при запуске

        // Funktsioon kella uuendamiseks
        // Функция для обновления часов
        function updateClock() {
            const t = getTimeRemaining(endtime); // Saab järelejäänud aja
            // Получаем оставшееся время

            // Kuvab päeva, tunni, minuti ja sekundi HTML-is
            // Отображаем дни, часы, минуты и секунды в HTML
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            // Kui aeg on läbi, peatab intervalli
            // Если время вышло, останавливаем интервал
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    // Käivitab taimeri määratud elemendil ja tähtajal
    // Запускаем таймер на заданном элементе с дедлайном
    setClock(id, deadline);
}

export default timer;
