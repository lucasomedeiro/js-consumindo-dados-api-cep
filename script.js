async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json`);
        var consultaCEPconvertida = await consultaCEP.json();

        if (consultaCEPconvertida.erro) {
            throw Error('CEP não existente!');
        }
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var bairro = document.getElementById('bairro');
        var estado = document.getElementById('estado');

        cidade.value = consultaCEPconvertida.localidade;
        logradouro.value = consultaCEPconvertida.logradouro;
        bairro.value = consultaCEPconvertida.bairro;
        estado.value = consultaCEPconvertida.uf;
        return consultaCEPconvertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`;
        console.log(erro);
    }
}

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));