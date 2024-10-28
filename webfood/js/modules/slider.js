function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
    let offset = 0;
    let slideIndex = 1;

    // Select necessary elements
    const slides = document.querySelectorAll(slide),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        slider = document.querySelector(container),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field);
    
    // Get the width of the slidesWrapper correctly
    const width = getComputedStyle(slidesWrapper).width;

    // Update total and current slide counters
    total.textContent = slides.length < 10 ? `0${slides.length}` : slides.length;
    current.textContent = `0${slideIndex}`;

    // Setup slidesField styles
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    // Hide overflow
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width; // Ensure width is a string with 'px'
    });

    slider.style.position = 'relative';

    // Create indicators
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
    slider.append(indicators);

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
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    // Button Click Events
    next.addEventListener('click', () => {
        if (offset === deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        slideIndex = slideIndex === slides.length ? 1 : slideIndex + 1;

        current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;
        updateDots();
    });

    prev.addEventListener('click', () => {
        if (offset === 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        slideIndex = slideIndex === 1 ? slides.length : slideIndex - 1;

        current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;
        updateDots();
    });

    // Dot Click Events
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;
            updateDots();
        });
    });

    // Helper function to update dot opacity
    function updateDots() {
        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex - 1].style.opacity = 1;
    }

    // Function to clean non-digit characters
    function deleteNotDigits(str) {
        return +String(str).replace(/\D/g, ''); // Convert to string and remove non-digits
    }
}

export default slider;
