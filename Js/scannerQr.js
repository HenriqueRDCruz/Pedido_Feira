var html5QrCode;

function onScanSuccess(decodedText, decodedResult) {
    console.log(`Scan result: ${decodedText}`, decodedResult);

    const lastProductDiv = document.querySelector('#produtos div.produto:last-child');
    const inputNome = lastProductDiv.querySelector('input[name^="produto_"]');
    if (inputNome) {
        inputNome.value = decodedText;
    } else {
        console.error('Campo de produto não encontrado.');
    }

    stopScanner();
}

function onScanFailure(error) {
    console.warn(`QR code scan error: ${error}`);
}

function startScanner() {
    if (!html5QrCode) {
        html5QrCode = new Html5Qrcode("qr-reader");
    }

    const config = { fps: 10, qrbox: 250, facingMode: { exact: "environment" } };

    html5QrCode.start(
        { facingMode: "environment" },
        config,
        onScanSuccess,
        onScanFailure
    ).catch(err => {
        console.error(`Unable to start scanning, error: ${err}`);
    });
}

function stopScanner() {
    if (html5QrCode) {
        html5QrCode.stop().then(ignore => {
            console.log("QR Code scanning stopped.");
            html5QrCode.clear();
        }).catch(err => {
            console.error(`Unable to stop scanning, error: ${err}`);
        });
    }
}