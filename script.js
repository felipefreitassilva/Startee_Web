document.addEventListener('DOMContentLoaded', () => {
    handleMainContentChange();
});

function handleMainContentChange() {
    const btnHome = document.getElementById('btnHome');
    const btnInfo = document.getElementById('btnInfo');
    const pitch = document.getElementById('pitch');
    const info = document.getElementById('info');
    
    // Oculta a área de info inicialmente
    info.style.display = 'none';
    
    btnHome.addEventListener('click', () => {
        pitch.style.display = 'flex';
        info.style.display = 'none';
        btnHome.classList.add('active');
        btnInfo.classList.remove('active');
    });
    
    btnInfo.addEventListener('click', () => {
        pitch.style.display = 'none';
        info.style.display = 'flex';
        btnInfo.classList.add('active');
        btnHome.classList.remove('active');
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
        const response = await fetch('https://script.google.com/macros/s/AKfycbwzIEcOUuiWOx9z7xAeV-l18KGbbKvzZ-pbLwbxZnPJja9V3iyrDrCRDxGwbudNoMEn/exec', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.status === 'success') {
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
