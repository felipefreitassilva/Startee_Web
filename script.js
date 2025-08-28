const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbzqf-xh7q2wr2bPKMN_NC5n2LR4U5ePmaG66PKatetpxMt5u1lSKu7k1B5Arf5BlrTMNg/exec";

document.addEventListener('DOMContentLoaded', () => {
    handleMainContentChange();
});

function handleMainContentChange() {
    const btnHome = document.getElementById('btnHome');
    const btnInfo = document.getElementById('btnInfo');
    const btnPitch = document.getElementById('btnPitch');
    const pitch = document.getElementById('pitch');
    const info = document.getElementById('info');
    const videoPitch = document.getElementById('video-pitch');

    // Oculta a área de info inicialmente
    info.style.display = 'none';
    videoPitch.style.display = 'none';

    btnHome.addEventListener('click', () => {
        pitch.style.display = 'flex';
        info.style.display = 'none';
        videoPitch.style.display = 'none';
        btnHome.classList.add('active');
        btnInfo.classList.remove('active');
        btnPitch.classList.remove('active');
    });
    
    btnInfo.addEventListener('click', () => {
        pitch.style.display = 'none';
        info.style.display = 'flex';
        videoPitch.style.display = 'none';
        btnInfo.classList.add('active');
        btnHome.classList.remove('active');
        btnPitch.classList.remove('active');
    });

    btnPitch.addEventListener('click', () => {
        pitch.style.display = 'none';
        info.style.display = 'none';
        videoPitch.style.display = 'flex';
        btnPitch.classList.add('active');
        btnHome.classList.remove('active');
        btnInfo.classList.remove('active');
    });
}

const form = document.getElementById('subscribeForm');
const submitFormBtn = document.getElementById('submit-form-btn');
const submitBtnText = document.getElementById('submit-btn-text');
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
            const currentCount = parseInt(formsRespondandCount.textContent) || 0;
            formsRespondandCount.textContent = currentCount + 1;
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
