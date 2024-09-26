function updateRecipient() {
    var para = document.getElementById("representante_para").value;

    var emailDestinatario = {
        "Jaqueline": "exemple@exemple.com.br",  // Defina o email destinatario
        "Rosana": "exemple@exemple.com.br",
        "Priscila": "exemple@exemple.com.br"
    }[para];

    document.querySelector('input[name="recipient"]').value = emailDestinatario;
}