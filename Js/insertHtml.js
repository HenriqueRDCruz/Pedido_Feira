function insertHtml() {
    const productDivs = document.querySelectorAll('#produtos div.produto');

    let allFilled = true;
    productDivs.forEach(div => {
        const inputNome = div.querySelector('input[name^="produto_"]');
        const inputQuantidade = div.querySelector('input[name^="quantidade_"]');
        const inputUnidadeMedida = div.querySelector('select[name^="unidade_medida_"]');
        const inputValor = div.querySelector('input[name^="valor_produto_"]');

        // Verificar se todos os campos estão preenchidos corretamente
        if (inputNome.value === '' || inputQuantidade.value === '' || inputUnidadeMedida.value === '' || inputValor.value === '') {
            allFilled = false;
        }
    });

    if (!allFilled) {
        document.getElementById('alerta').style.display = 'block';
        document.getElementById('alerta').textContent = 'Por favor, preencha todos os campos de produto antes de adicionar outro.';
        return;
    }

    const numProdutos = productDivs.length;
    if (numProdutos >= 10) {
        document.getElementById('alerta').style.display = 'block';
        document.getElementById('alerta').textContent = 'Você atingiu o limite máximo de 10 produtos.';
        return;
    }

    document.getElementById('alerta').style.display = 'none';

    const div = document.createElement("div");
    div.classList.add('produto');

    const index = numProdutos + 1;
    const inputNomeId = `produto_${index}`;
    const inputQuantidadeId = `quantidade_${index}`;
    const inputUnidadeMedidaId = `unidade_medida_${index}`;
    const inputValorProdutoId = `valor_produto_${index}`;
    const inputObservacaoId = `observacao_${index}`;

    div.innerHTML = `

    <div class="form-group">
        <input type="hidden" name="linhaPedido${index}" value="----------------------------------------------">
    </div>

    <div class="form-group">
        <label for="${inputNomeId}">Produto:</label>
        <input type="varchar" class="form-control" id="${inputNomeId}" name="produto_${index}" placeholder="INSIRA O PRODUTO" required>
        <div class="invalid-feedback">INSIRA O PRODUTO</div>
    </div>
    
    <div class="form-group">
        <label for="${inputObservacaoId}">OBSERVAÇÃO:</label>
        <input type="varchar" class="form-control" id="${inputObservacaoId}" name="observacao_${index}" placeholder="INSIRA OBSERVAÇÕES">
    </div>

    <div class="form-group">
        <label for="${inputQuantidadeId}">QUANTIDADE :</label>
        <input type="double" class="form-control" id="${inputQuantidadeId}" name="quantidade_${index}" placeholder="INSIRA A QUANTIDADE" required>
        <div class="invalid-feedback">INSIRA A QUANTIDADE</div>
    </div>

    <div class="form-group">
        <label for="${inputUnidadeMedidaId}">UNIDADE DE MEDIDA:</label>
        <select name="unidade_medida_${index}" id="${inputUnidadeMedidaId}" class="form-control" required>
            <option value="" disabled selected hidden>ESCOLHA UMA OPÇÃO</option>
            <option value="MT">MT</option>
            <option value="PAR">PAR</option>
            <option value="PLACA">PLACA</option>
        </select>
        <div class="invalid-feedback">ESCOLHA UMA UNIDADE DE MEDIDA</div>
    </div>

    
    <div class="form-group">
        <label for="${inputValorProdutoId}">VALOR PRODUTO:</label>
        <input type="double" class="form-control" id="${inputValorProdutoId}" name="valor_produto_${index}" placeholder="INSIRA O VALOR DO PRODUTO" required>
        <div class="invalid-feedback">INSIRA O VALOR DO PRODUTO</div>
    </div>

    <div class="form-group">
        <button type="button" class="btn btn-danger" onclick="removeInsert(this)">REMOVER</button>
        <button type="button" class="btn btn-primary" onclick="insertHtml()">Adicionar</button>
    </div>
    `;

    document.getElementById("produtos").appendChild(div);

    startScanner();
}