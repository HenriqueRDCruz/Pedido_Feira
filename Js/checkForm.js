function checkForm() {
    const formulario = document.getElementById('formulario');
    const camposObrigatorios = formulario.querySelectorAll('[required]');

    let formValido = true;

    camposObrigatorios.forEach(campo => {
        if (campo.tagName === 'SELECT') {
            if (!campo.value || campo.value === '') {
                formValido = false;
                const divFormGroup = campo.closest('.form-group');
                const feedback = divFormGroup.querySelector('.invalid-feedback');
                feedback.style.display = 'block';
            } else {
                const divFormGroup = campo.closest('.form-group');
                const feedback = divFormGroup.querySelector('.invalid-feedback');
                feedback.style.display = 'none';
            }
        } else { // Para outros tipos de campos
            if (!campo.value.trim()) {
                formValido = false;
                const divFormGroup = campo.closest('.form-group');
                const feedback = divFormGroup.querySelector('.invalid-feedback');
                feedback.style.display = 'block';
            } else {
                const divFormGroup = campo.closest('.form-group');
                const feedback = divFormGroup.querySelector('.invalid-feedback');
                feedback.style.display = 'none';
            }
        }
    });

    if (formValido) {
        formulario.submit(); // Envie o formulário se todos os campos estiverem válidos
    }
}