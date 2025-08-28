const formsRespondandCount = document.getElementById('forms-respondant-count');

let intervalId = null;

async function getRespondantCount() {
    try {
        const response = await fetch(GOOGLE_SHEETS_URL);
        const data = await response.json();
        if (data) {
            formsRespondandCount.textContent = data.rows;
        } else {
            console.error("Error fetching respondent count:", data.message);
        }
    } catch (error) {
        console.error("Error fetching respondent count:", error);
    }
}

function startPolling() {
    if (intervalId) {
        return;
    }
    getRespondantCount();
    intervalId = setInterval(getRespondantCount, 10_000);
}

function stopPolling() {
    clearInterval(intervalId);
    intervalId = null;
}

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        startPolling();
    } else {
        stopPolling();
    }
});

window.addEventListener("focus", startPolling);
window.addEventListener("blur", stopPolling);

if (document.visibilityState === "visible") {
    startPolling();
}
