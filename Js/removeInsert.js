function removeInsert(button) {
    const produtoDiv = button.closest('.produto');

    produtoDiv.remove();

    const numProdutos = document.querySelectorAll('#produtos div.produto').length;

    if (numProdutos === 0){
        const originalButton = document.getElementById('originalButton');
        originalButton.style.display = 'inline-block';
    }

    stopScanner();
}