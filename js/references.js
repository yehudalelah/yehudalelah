// Toggle dropdown
document.querySelectorAll('.ref-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});

// Request button logic
document.querySelectorAll('.request-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        const status = btn.nextElementSibling;

        // UI feedback
        status.textContent = "Request sent. I'll follow up shortly.";
        btn.disabled = true;

        // Opens email client
        window.location.href = `mailto:yehuda.lelah@gmail.com?subject=Reference Request - ${name}&body=Hi Yehuda,%0D%0A%0D%0AI’d like to request contact information for ${name}.`;
    });
});