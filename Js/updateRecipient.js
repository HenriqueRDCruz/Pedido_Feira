function updateRecipient() {
    var para = document.getElementById("representante_para").value;
    var emailDestinatario = {
        "Jaqueline": "sistemas@wolfstore.com.br",
        "Rosana": "sistemas2@wolfstore.com.br",
        "Priscila": "sac3@wolfstore.com.br"
    }[para];

    document.querySelector('input[name="recipient"]').value = emailDestinatario;
}