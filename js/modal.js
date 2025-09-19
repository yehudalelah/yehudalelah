/* === Modal references (index.html → <div id="modal">) === */
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalTitle = document.getElementById('modalTitle');
const closeBtn = document.getElementById('closeBtn');

/* === Clicking on a .stat box (Total, PIC, XC, etc. in sidebar) opens modal === */
document.querySelectorAll('.stat').forEach(stat => {
    stat.addEventListener('click', () => {
        const type = stat.dataset.type; // e.g. “Total Time”
        modalTitle.textContent = `${type} Flight Highlights`;
        renderModal(highlights[type] || []);
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
    });
});

/* === Close modal by clicking “Close” button === */
closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
});

/* === Close modal by clicking outside modal-card === */
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
    }
});

/* === Function to render modal flight highlights === */
function renderModal(flights) {
    modalContent.innerHTML = '';
    if (!flights.length) {
        modalContent.textContent = 'No highlights available.';
        return;
    }

    flights.forEach(h => {
        const d = document.createElement('div');
        d.style.padding = '8px 0';
        d.style.borderBottom = '1px solid #f1f5f9';
        d.innerHTML = `
      <div style='display:flex;justify-content:space-between;align-items:center'>
        <div>
          <strong>${h.Date}</strong> — ${h.From} → ${h.To}
          <div class='muted'>${h.AircraftID}</div>
        </div>
        <div style='text-align:right'>
          <div>
            <strong>${h.TotalTime} hrs</strong>
          </div>
          <div class='muted'>
            ${h.Night ? `Night: ${h.Night}` : ''} 
            ${h.IFR ? `IFR: ${h.IFR}` : ''}
          </div>
        </div>
      </div>
    `;
        modalContent.appendChild(d);
    });

    /* Add note at bottom of modal */
    const note = document.createElement('div');
    note.style.marginTop = '10px';
    note.className = 'muted';
    note.textContent = 'These highlights were auto-selected from the uploaded logbook.';
    modalContent.appendChild(note);
}