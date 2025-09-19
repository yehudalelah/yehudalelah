/* === Reference toggles (Craig Simon, Gene Bishop, etc.) === */
document.querySelectorAll('.ref-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling; // the .ref-content div
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});