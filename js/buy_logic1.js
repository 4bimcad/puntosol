document.getElementById('submitButton').addEventListener('click', function () {
    const form = document.getElementById('myForm');
    const formData = new FormData(form);

    // Відправляємо данні форми через fetch
    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                // Успішна відправка форми
                console.log('El formulario ha sido enviado exitosamente.');

                // Чистимо форму
                form.reset();

                // Клікаємо на посилання купівлі
                document.getElementById('buyLink').click();

                // Поновлюємо сторінку піл модальним вікном
                setTimeout(() => {
                    window.location.hash = "#buy"; // Переставляємо сторінку на модельне вікно
                }, 100);
            } else {
                alert('Error al enviar el formulario. intentar otra vez.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al enviar el formulario. intentar otra vez.');
        });
});
