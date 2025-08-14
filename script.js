const form = document.getElementById('subscribeForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
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
    }
});
