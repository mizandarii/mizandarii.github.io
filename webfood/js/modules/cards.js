import { getResource } from '../services/services';

function cards() {
    // Klass, mis esindab menüükaarti
    // Класс, представляющий карточку меню
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src; 
            this.alt = alt; 
            this.title = title; 
            this.descr = descr;
            this.price = price; 
            this.classes = classes.length ? classes : ["menu__item"];
            // Vanemelement, kuhu kaart lisatakse
            // Родительский элемент, куда будет добавлена карточка
            this.parent = document.querySelector(parentSelector); 
            // Koefitsient valuutavahetuseks
            //коэффициент для конвертации валют
            this.transfer = 1; 
            this.changeToUSD(); 
        }

        // Muudab hinna USA dollariteks
        // Преобразует цену в доллары на основе установленного курса
        changeToUSD() {
            this.price = this.price * this.transfer; 

        }

        // Loob kaardi ja lisab selle DOM-i
        // Создаёт карточку и добавляет её в DOM
        render() {
            const element = document.createElement('div'); 
            this.classes.forEach(className => element.classList.add(className)); 

            // Määrab kaardi sisu (HTML), kasutades dünaamilisi andmeid
            // Устанавливает содержимое карточки с использованием динамических данных
            element.innerHTML = `
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-decr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> евро/день:</div>
                </div>
            `;

            // Lisab loodud elemendi vanemelemendile
            // Добавляет созданный элемент в родительский элемент
            this.parent.append(element); 
        }
    }

    // Andmete toomine serverist ja tõrgete käsitlemine
    // Получение данных с сервера и обработка ошибок
    getResource('http://localhost:300/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                // Loob iga toote jaoks uue menüükaardi ja renderdab selle
                // Создаёт новую карточку меню для каждого товара и отображает её
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
            });
        })
        .catch(error => {
            // Käitleb viga, kui andmete toomine ebaõnnestub
            // Обрабатывает ошибку при неудачном получении данных
            console.error("Failed to fetch menu items:", error);
        });
}

export default cards;
