function updateRecipient() {
    var para = document.getElementById("representante_para").value;
    var emailDestinatario = {
        "A1": "exemple@exemple.com.br", // ADICIONE O EMAIL DESTINATARIO
        "A2": "exemple@exemple.com.br",
        "A3": "exemple@exemple.com.br"
    }[para];

    document.querySelector('input[name="recipient"]').value = emailDestinatario;
}
