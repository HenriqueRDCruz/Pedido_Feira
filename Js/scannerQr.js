let html5QrCode;

function onScanSuccess(decodedText, decodedResult) {
    console.log(`Scan result: ${decodedText}`, decodedResult);

    // Localiza o último produto
    const lastProductDiv = document.querySelector('#produtos div.produto:last-child');

    // Localiza o campo de produto dentro do último item
    const inputNome = lastProductDiv.querySelector('input[name^="produto_"]');

    // Se o campo de produto existir, preenche com o texto do QR Code
    if (inputNome) {
        inputNome.value = decodedText;
    } else {
        console.error('Campo de produto não encontrado.');
    }

    stopScanner();
    startScanner();
}

function onScanFailure(error) {
    console.warn(`QR code scan error: ${error}`);
}

// Função para iniciar o scanner
function startScanner() {
    if (!html5QrCode) {
        html5QrCode = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250
            },
            fps: 20, // Frames por segundo
        });
    }

    // Inicia o scanner
    html5QrCode.render(onScanSuccess, onScanFailure);


    // Oculta o ícone de informações
    const infoIcon = document.querySelector('.html5-qrcode-info-icon');
    if (infoIcon) {
        infoIcon.style.display = 'none';
    }
}

// Função para parar o scanner
function stopScanner() {
    if (html5QrCode) {
        html5QrCode.clear();
        console.log("Scanner parado.");
        document.getElementById('reader').innerHTML = ''; // Limpa o scanner da tela para reiniciar
    }
}
