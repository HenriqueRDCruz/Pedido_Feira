function insertHtml() 
{
    const productDivs = document.querySelectorAll('#produtos div.produto');

    let tudoPreenchido = true;

    productDivs.forEach(div => 
    {
        const inputNome             = div.querySelector('input[name^="produto_"]');
        const inputQuantidade       = div.querySelector('input[name^="quantidade_"]');
        const inputUnidadeMedida    = div.querySelector('select[name^="unidade_medida_"]');
        const inputValor            = div.querySelector('input[name^="valor_produto_"]');

        if (inputNome.value         === '' 
        || inputQuantidade.value    === '' 
        || inputUnidadeMedida.value === '' 
        || inputValor.value         === ''
        ){
            tudoPreenchido = false;
        }
    });

    if (!tudoPreenchido) {
        alert('Por favor, preencha todos os campos de produto antes de adicionar outro.')
        return;
    }

    const numProdutos = productDivs.length;

    if (numProdutos >= 10) {
        alert('Você atingiu o limite máximo de 10 produtos.')
        return;
    }

    const div = document.createElement("div");
    div.classList.add('produto');

    const index = numProdutos + 1;

    const inputNomeId           = `produto_${index}`;
    const inputQuantidadeId     = `quantidade_${index}`;
    const inputUnidadeMedidaId  = `unidade_medida_${index}`;
    const inputValorProdutoId   = `valor_produto_${index}`;
    const inputObservacaoId     = `observacao_${index}`;

    div.innerHTML
        = `
            <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label for="${inputNomeId}" class="input-group-text">PROD:</label>
                    </div>
                    <input type="varchar" class="form-control" id="${inputNomeId}" name="produto_${index}" placeholder="INSIRA PRODUTO" maxlength="60" required>
                    <div class="invalid-feedback">INSIRA O PRODUTO</div>
            </div>

            <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label for="${inputObservacaoId}" class="input-group-text">OBS:</label>
                    </div>
                    <input type="varchar" class="form-control" id="${inputObservacaoId}" name="observacao_${index}" placeholder="INSIRA OBSERVAÇÕES" maxlength="60">
            </div>

            <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label for="${inputQuantidadeId}" class="input-group-text">QT:</label>
                    </div>
                    <input  type="double" class="form-control" id="${inputQuantidadeId}" name="quantidade_${index}" placeholder="INSIRA QUANTIDADE" 
                            oninput="this.value = this.value.replace(/[^0-9.,]/g, '');" maxlength="10" required>
                    <div class="invalid-feedback">INSIRA A QUANTIDADE</div>
            </div>

            <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label for="${inputUnidadeMedidaId}" class="input-group-text">UNIDADE:</label>
                    </div>
                    <select name="unidade_medida_${index}" id="${inputUnidadeMedidaId}" class="custom-select" required>
                    <option value="" disabled selected hidden>ESCOLHA UMA OPÇÃO</option>
                    <option value="MT">MT</option>
                    <option value="PAR">PAR</option>
                    <option value="PLACA">PLACA</option>
                    <option value="UNIDADE">UNIDADE</option>
                </select>
                <div class="invalid-feedback">ESCOLHA UMA UNIDADE DE MEDIDA</div>
            </div>

            <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label for="${inputValorProdutoId}" class="input-group-text">VALOR:</label>
                    </div>
                    <input  type="double" class="form-control" id="${inputValorProdutoId}" name="valor_produto_${index}" placeholder="INSIRA VALOR PRODUTO" 
                            oninput="this.value = this.value.replace(/[^0-9.,]/g, '');" maxlength="10" required>
                    <div class="invalid-feedback">INSIRA O VALOR DO PRODUTO</div>
            </div>

            <div class="form-group">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-12 mb-2 mb-md-0">
                        <button type="button" class="btn btn-danger form-control" onclick="removeInsert(this)">REMOVER</button>
                    </div>
                    <div class="col-lg-6 col-md-6 col-12 mb-2 mb-md-0">
                        <button type="button" class="btn btn-primary form-control" onclick="insertHtml()">Adicionar</button>
                    </div>
                </div>
            </div>
    `;

    document.getElementById("produtos").appendChild(div);

    const originalButton            = document.getElementById('originalButton');
    originalButton.style.display    = 'none';

    startScanner();
}