/* === Highlight flights dataset (used for “Selected Flight Highlights” + modal) === */
const highlights = {
    "Total Time": [{
        "Date": "2025-07-20",
        "AircraftID": "N54905",
        "From": "KARA",
        "To": " KARA",
        "TotalTime": 11.2
    }],

    "PIC": [{
        "Date": "2023-10-15",
        "AircraftID": "N5630F",
        "From": "KVNY",
        "To": "KVNY",
        "TotalTime": 6.4
    }],

    "XC": [{
        "Date": "2025-07-03",
        "AircraftID": "N6379G",
        "From": "KSHV",
        "To": "2R5",
        "TotalTime": 4.8,
        "Night": "4.8"
    }],

    "Night": [{
        "Date": "2025-07-03",
        "AircraftID": "N6379G",
        "From": "KSHV",
        "To": "2R5",
        "TotalTime": 4.8,
        "Night": "4.8"
    }],

    "Night XC": [{
        "Date": "2025-07-03",
        "AircraftID": "N6379G",
        "From": "KSHV",
        "To": "2R5",
        "TotalTime": 4.8,
        "Night": "4.8"
    }],

    "Instrument": [{
        "Date": "2025-05-26",
        "AircraftID": "N738YR",
        "From": "KARA",
        "To": "KARA",
        "TotalTime": 5.4
    }],

    "Actual IFR": [{
        "Date": "2025-07-20",
        "AircraftID": "N54905",
        "From": "KARA",
        "To": "KARA",
        "TotalTime": 11.2,
        "IFR": "yes"
    }],

    "Multi-Engine": [{
        "Date": "2023-10-02",
        "AircraftID": "N283MK",
        "From": "KVNY",
        "To": "KVNY",
        "TotalTime": 4.6
    }]
};

/* === Target UL where highlights are inserted (index.html → <ul id="highlights">) === */
const list = document.getElementById('highlights');

/* === Pick 3 sample flights to show in “Selected Flight Highlights” preview === */
const preview = [
    highlights["Total Time"][0],
    highlights["XC"][0],
    highlights["Night"][0]
];

/* === Render preview list items into <ul id="highlights"> === */
preview.forEach(h => {
    const li = document.createElement('li');
    li.className = 'highlight-item'; // CSS style
    li.innerHTML = `
    <div>
      <strong>${h.Date}</strong> — ${h.From} → ${h.To}
      <div class='muted'>${h.AircraftID}</div>
    </div>
    <div class='muted'>${h.TotalTime} hrs</div>
  `;
    list.appendChild(li);
});

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

/* === Reference toggles (Craig Simon, Gene Bishop, etc.) === */
document.querySelectorAll('.ref-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling; // the .ref-content div
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});

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