function checkForm() {
    const formulario = document.getElementById('formulario');

    if (!formulario) {
        console.error("O formulário com o ID 'formulario' não foi encontrado.");
        return;
    }

    const camposObrigatorios = formulario.querySelectorAll('[required]');

    const numProdutos = document.querySelectorAll('#produtos div.produto').length;

    let formValido = true;

    camposObrigatorios.forEach(campo => {
        if (campo.tagName === 'SELECT') {
            if (!campo.value || campo.value === '') {
                formValido = false;
                const divFormGroup = campo.closest('.input-group');
                const feedback = divFormGroup.querySelector('.invalid-feedback');
                feedback.style.display = 'block';
            } else {
                const divFormGroup = campo.closest('.input-group');
                const feedback = divFormGroup.querySelector('.invalid-feedback');
                feedback.style.display = 'none';
            }
        } else {
            if (!campo.value.trim()) {
                formValido = false;
                const divFormGroup = campo.closest('.input-group');
                const feedback = divFormGroup.querySelector('.invalid-feedback');
                feedback.style.display = 'block';
            } else {
                const divFormGroup = campo.closest('.input-group');
                const feedback = divFormGroup.querySelector('.invalid-feedback');
                feedback.style.display = 'none';
            }
        }
    });

    if (numProdutos > 0 && formValido) {
        formulario.submit();
    } else {
        if (numProdutos === 0) {
            alert('Adicione pelo menos um produto antes de enviar o formulário.');
        } else {
            alert('Preencha todos os campos obrigatórios antes de enviar o formulário.');
        }
    }
}