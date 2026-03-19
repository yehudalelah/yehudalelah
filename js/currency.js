document.addEventListener("DOMContentLoaded", () => {
    const stats = document.querySelectorAll(".box1");

    stats.forEach(stat => {
        const lastCurrent = stat.dataset.lastCurrent;
        const periodRaw = stat.dataset.period;
        const years = parseInt(stat.dataset.years) || 0;
        const type = stat.dataset.type || "";

        if (!lastCurrent && !years && !periodRaw) return;

        const numElClass = "days-num";

        // UTC last date
        const lastDate = new Date(`${lastCurrent}T00:00:00Z`);
        const today = new Date();
        const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));

        let expiryDate;

        if (type === "medical" && years > 0) {
            // FAA medical: expires end of month after X calendar months
            const months = years * 12;
            const totalMonths = lastDate.getUTCMonth() + months + 1;

            expiryDate = new Date(Date.UTC(
                lastDate.getUTCFullYear() + Math.floor(totalMonths / 12),
                totalMonths % 12,
                0
            ));

        } else if (years > 0) {
            // Other year-based periods: use last day of month
            const futureYear = lastDate.getUTCFullYear() + years;
            const month = lastDate.getUTCMonth();

            expiryDate = new Date(Date.UTC(futureYear, month + 1, 0));

        } else if (periodRaw && periodRaw.endsWith("m")) {
            // Month-based period (like Flight Review)
            const months = parseInt(periodRaw);
            const totalMonths = lastDate.getUTCMonth() + months + 1;

            expiryDate = new Date(Date.UTC(
                lastDate.getUTCFullYear() + Math.floor(totalMonths / 12),
                totalMonths % 12,
                0
            ));

        } else if (periodRaw) {
            // Day-based period
            const periodDays = parseInt(periodRaw);

            expiryDate = new Date(lastDate.getTime() + periodDays * 24 * 60 * 60 * 1000);
        }

        // Days remaining INCLUDING today
        let daysRemaining = Math.ceil((expiryDate - todayUTC) / (1000 * 60 * 60 * 24)) + 1;
        if (daysRemaining < 0) daysRemaining = 0;

        // Color coding
        let totalPeriodDays = expiryDate && lastDate ?
            Math.ceil((expiryDate - lastDate) / (1000 * 60 * 60 * 24)) :
            0;

        let color = "";

        if (daysRemaining === 0) color = "#bf2828"; // 191 40 40 #bf2828
        else if (daysRemaining <= totalPeriodDays * 0.1) color = "yellow";
        else if (daysRemaining <= totalPeriodDays * 0.5) color = "#f59e0b";
        else color = "#509d2c"; // 80 157 44 #509d2c

        let numEl = stat.querySelector(`.${numElClass}`);

        if (!numEl) {
            numEl = document.createElement("div");
            numEl.classList.add(numElClass);
            stat.prepend(numEl);
        }

        numEl.textContent = `${daysRemaining} Days`;
        numEl.style.color = color;
    });
});