function updateRecipient() {
    var para = document.getElementById("representante_para").value;

    var emailDestinatario = {
        "Jaqueline": "sac@wolfstore.com.br",
        "Rosana": "sac2@wolfstore.com.br",
        "Priscila": "sac3@wolfstore.com.br"
    }[para];

    document.querySelector('input[name="recipient"]').value = emailDestinatario;
}