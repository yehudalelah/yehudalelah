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