function checkForm() 
{
    const formulario = document.getElementById('formulario');

    if (!formulario) {
        console.error("O formulário com o ID 'formulario' não foi encontrado.");
        return;
    }

    const camposObrigatorios = formulario.querySelectorAll('[required]');

    const numProdutos = document.querySelectorAll('#produtos div.produto').length;

    let formValido = true;

    camposObrigatorios.forEach(campo => 
    {
        if (campo.tagName === 'SELECT') 
        {
            if (!campo.value || campo.value === '') 
            {
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

    if (numProdutos > 0 && formValido) 
    {
        gerarPDF();
        formulario.submit();
        reloadPage();
    } else {
        if (numProdutos === 0) 
        {
            alert('Adicione pelo menos um produto antes de enviar o formulário.');
        } else {
            alert('Preencha todos os campos obrigatórios antes de enviar o formulário.');
        }
    }
}


function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc       = new jsPDF();

    const representanteDe   = document.getElementById("representante").value;
    const cliente           = document.getElementById("cliente").value;
    const oc                = document.getElementById("oc").value;

    const logoImg = 'data:image/jpeg;base64,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////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAADhCSU0EAAAAAAAAAgABOEJJTQQCAAAAAAAEAAAAADhCSU0EMAAAAAAAAgEBOEJJTQQtAAAAAAACAAA4QklNBAgAAAAAABUAAAABAAACQAAAAkAAAAABAAAS6wEAOEJJTQQeAAAAAAAEAAAAADhCSU0EGgAAAAADTQAAAAYAAAAAAAAAAAAAAHcAAAB9AAAADABTAGUAbQAgAFQA7QB0AHUAbABvAC0AMQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAfQAAAHcAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAAHcAAAAAUmdodGxvbmcAAAB9AAAABnNsaWNlc1ZsTHMAAAABT2JqYwAAAAEAAAAAAAVzbGljZQAAABIAAAAHc2xpY2VJRGxvbmcAAAAAAAAAB2dyb3VwSURsb25nAAAAAAAAAAZvcmlnaW5lbnVtAAAADEVTbGljZU9yaWdpbgAAAA1hdXRvR2VuZXJhdGVkAAAAAFR5cGVlbnVtAAAACkVTbGljZVR5cGUAAAAASW1nIAAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAAB3AAAAAFJnaHRsb25nAAAAfQAAAAN1cmxURVhUAAAAAQAAAAAAAG51bGxURVhUAAAAAQAAAAAAAE1zZ2VURVhUAAAAAQAAAAAABmFsdFRhZ1RFWFQAAAABAAAAAAAOY2VsbFRleHRJc0hUTUxib29sAQAAAAhjZWxsVGV4dFRFWFQAAAABAAAAAAAJaG9yekFsaWduZW51bQAAAA9FU2xpY2VIb3J6QWxpZ24AAAAHZGVmYXVsdAAAAAl2ZXJ0QWxpZ25lbnVtAAAAD0VTbGlj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LzEzLTE5OjQ0OjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE3LTA4LTE4VDA5OjI4OjIwLTAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE3LTA4LTE4VDA5OjI4OjIwLTAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxNy0wOC0xOFQwOToyODoyMC0wMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyY2E2ZDNmNS01YmIxLWVlNDktODAxYS0yODE4MTM3NTMzMTciIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo4ZjNiMzczOC04NDEwLTExZTctYmFiNy1hZmQ4ZWUzZjk3OTIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkMWNiZWQ0YS04MDI1LWQ3NDQtOGEzOC1kNzYxMTJlY2ZiMjMiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJBZG9iZSBSR0IgKDE5OTgpIiBkYzpmb3JtYXQ9ImltYWdlL2pwZWciPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmQxY2JlZDRhLTgwMjUtZDc0NC04YTM4LWQ3NjExMmVjZmIyMyIgc3RFdnQ6d2hlbj0iMjAxNy0wOC0xOFQwOToyODoyMC0wMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyY2E2ZDNmNS01YmIxLWVlNDktODAxYS0yODE4MTM3NTMzMTciIHN0RXZ0OndoZW49IjIwMTctMDgtMThUMDk6Mjg6MjAtMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE0IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHJkZjpCYWc+IDxyZGY6bGk+MjcxNDlEOTIzNjc0QkM4ODQwQzM1RjBCOEI3NTg3RkQ8L3JkZjpsaT4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/Pv/iAkBJQ0NfUFJPRklMRQABAQAAAjBBREJFAhAAAG1udHJSR0IgWFlaIAfPAAYAAwAAAAAA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';


    doc.addImage(logoImg, 'JPEG', 11, 5, 25, 25);

    doc.setFontSize(14);
    const textX = 40;
    doc.text(`Representante: ${representanteDe}`, textX, 11);
    doc.text(`Cliente:  ${cliente}`, textX, 19);
    doc.text(`OC: ${oc}`, textX, 27);

    const dataAtual     = new Date();
    const dia           = String(dataAtual.getDate()).padStart(2, '0');
    const mes           = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano           = dataAtual.getFullYear();
    const horas         = String(dataAtual.getHours()).padStart(2, '0');
    const minutos       = String(dataAtual.getMinutes()).padStart(2, '0');
    const segundos      = String(dataAtual.getSeconds()).padStart(2, '0');

    const dataHora      = `${dia}-${mes}-${ano} ${horas}:${minutos}:${segundos}`;

    const textWidth = doc.getTextWidth(dataHora);
    const marginRight = 33;
    const textXRight = doc.internal.pageSize.getWidth() - textWidth - marginRight;
    const textYRight = 11;

    doc.setFontSize(12);
    doc.text(`Data Emissão: ${dataHora}`, textXRight, textYRight);

    doc.line(10, 40, 200, 40);

    const productDivs = document.querySelectorAll('#produtos .produto');
    let yPosition = 45;

    productDivs.forEach((div, index) => 
        {
            const inputNome             = div.querySelector('input[name^="produto_"]').value;
            const inputObservacao       = div.querySelector('input[name^="observacao_"]').value || "N/A";
            const inputQuantidade       = div.querySelector('input[name^="quantidade_"]').value;
            const inputUnidadeMedida    = div.querySelector('select[name^="unidade_medida_"]').value;
            const inputValor            = div.querySelector('input[name^="valor_produto_"]').value;
        
            const maxWidth              = doc.internal.pageSize.getWidth() - 20;
        
            doc.setFontSize(12);
            const produtoTexto          = `Produto ${index + 1}: ${inputNome}`;
            const observacaoTexto       = `Observação: ${inputObservacao}`;
        
            doc.text(produtoTexto, 10, yPosition, { maxWidth: maxWidth });
            yPosition += 5;
        
            doc.text(observacaoTexto, 10, yPosition, { maxWidth: maxWidth });
            yPosition += 1;
        
            const quantidadeTexto       = `Quantidade: ${inputQuantidade}`;
            const unidadeMedidaTexto    = `Unidade de Medida: ${inputUnidadeMedida}`;
        
            const midLineY = yPosition + 5;
            const totalWidth = doc.internal.pageSize.getWidth();
        
            doc.text(quantidadeTexto, 10, midLineY, { maxWidth: (totalWidth - 20) / 2, align: "left" });
            doc.text(unidadeMedidaTexto, totalWidth / 2, midLineY, { maxWidth: (totalWidth - 20) / 2, align: "center" });
        
            yPosition += 10;
        
            const valorTexto = `Valor: ${inputValor}`;
            doc.text(valorTexto, 10, yPosition, { maxWidth: maxWidth });
            yPosition += 6;
        
            doc.line(10, yPosition -4, doc.internal.pageSize.getWidth() - 10, yPosition -4);
            
            yPosition += 1;
        });
        
    doc.save(`pedido_${dataHora}.pdf`);
}