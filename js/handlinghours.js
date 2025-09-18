// js/handlinghours.js
// Updates all the stats on the page using the pilotHours object from hours.js

document.addEventListener("DOMContentLoaded", () => {
  // Loop through all the keys in pilotHours
  Object.keys(pilotHours).forEach(type => {
    // Find the stat div that matches the data-type
    const statDiv = document.querySelector(`.stat[data-type="${type}"]`);
    if (statDiv) {
      // Update the number inside the div
      statDiv.querySelector(".num").textContent = pilotHours[type].toFixed(1);
    }
  });
});
