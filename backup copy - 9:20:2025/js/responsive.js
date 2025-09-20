function moveAsideUnderSummary() {
    if (window.innerWidth <= 880) {
        const grid = document.querySelector('.grid');
        const main = grid.querySelector('main');
        const summaryCard = main.querySelector('.card:first-child');
        const aside = grid.querySelector('aside');

        // Insert aside after Summary
        summaryCard.after(aside);
    } else {
        // Optional: move aside back to original position on larger screens
        const grid = document.querySelector('.grid');
        const main = grid.querySelector('main');
        const aside = grid.querySelector('aside');
        grid.appendChild(aside);
    }
}

window.addEventListener('resize', moveAsideUnderSummary);
window.addEventListener('load', moveAsideUnderSummary);