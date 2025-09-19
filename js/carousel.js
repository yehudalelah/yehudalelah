/* === Flown Aircraft Carousel === */
const aircraftCards = document.querySelectorAll('.aircraft-card');
let currentIndex = 0;

function updateCarousel() {
    aircraftCards.forEach((card, i) => {
        card.classList.remove('active', 'prev', 'next');
        if (i === currentIndex) {
            card.classList.add('active');
        } else if (i === (currentIndex - 1 + aircraftCards.length) % aircraftCards.length) {
            card.classList.add('prev');
        } else if (i === (currentIndex + 1) % aircraftCards.length) {
            card.classList.add('next');
        }
    });
}

document.querySelector('.carousel-btn.left').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + aircraftCards.length) % aircraftCards.length;
    updateCarousel();
});

document.querySelector('.carousel-btn.right').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % aircraftCards.length;
    updateCarousel();
});

updateCarousel(); // init