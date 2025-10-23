const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbzqf-xh7q2wr2bPKMN_NC5n2LR4U5ePmaG66PKatetpxMt5u1lSKu7k1B5Arf5BlrTMNg/exec";

document.addEventListener('DOMContentLoaded', () => {
    handleMainContentChange();
});

function handleMainContentChange() {
}

const form = document.getElementById('subscribeForm');
const submitFormBtn = document.getElementById('submit-form-btn');
const submitBtnText = document.getElementById('submit-btn-text');
const formsRespondandCount = document.getElementById('forms-respondant-count');

if (form) {
    form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitFormBtn.disabled = true;
    submitFormBtn.classList.add('loading');
    submitBtnText.textContent = 'Enviando...';

    const data = {
        name: form.name.value,
        email: form.email.value
    };

    try {
        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.status === 'success') {
            if (formsRespondandCount) {
                const currentCount = parseInt(formsRespondandCount.textContent) || 0;
                formsRespondandCount.textContent = currentCount + 1;
            }
            alert('Obrigado pelo cadastro!');
            form.reset();
        } else {
            alert('Erro ao cadastrar: ' + result.message);
        }
    } catch (err) {
        alert('Erro na conexão: ' + err.message);
    } finally {
        submitFormBtn.disabled = false;
        submitFormBtn.classList.remove('loading');
        submitBtnText.textContent = 'Enviar';
    }
    });
}
