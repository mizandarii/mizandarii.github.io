import { getResource } from '../services/services';

function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes.length ? classes : ["menu__item"]; // Default class if none provided
            this.parent = document.querySelector(parentSelector);
            this.transfer = 1; // Can be modified for currency conversion
            this.changeToUSD();
        }

        changeToUSD() {
            this.price = this.price * this.transfer; // Modify this.transfer as needed for currency conversion
        }

        render() {
            const element = document.createElement('div');
            this.classes.forEach(className => element.classList.add(className));

            // Ensure the attributes are wrapped in quotes
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

            this.parent.append(element);
        }
    }

    // Fetch data and handle errors
    getResource('http://localhost:300/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
            });
        })
        .catch(error => {
            console.error("Failed to fetch menu items:", error);
        });
}

export default cards;
