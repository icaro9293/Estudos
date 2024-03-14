var num = window.document.getElementById('inum')
var lista = window.document.getElementById('ilista')
var resultado = window.document.getElementById('ires')
var valores = []

function isNumero(num) {
    if (Number(num) >= 1 && Number(num) <= 100) {
        return true
    } else {
        return false
    }
}
function inLista(num, lista) {
    if (lista.indexOf(Number(num)) != -1) { //'indexOf retorna a posição do numero em uma lista, caso não a encontra retorna '-1'.'
        return true
    } else {
        return false
    }
}


function adiciona() {
    if (isNumero(num.value) && !inLista(num.value, valores)) {
        valores.push(Number(num.value))//push() adiciona um valor no fim de uma lista.
        var item = window.document.createElement('option')
        item.text = `valor ${num.value} adicionado com sucesso.`
        lista.appendChild(item)
        resultado.innerHTML = ''
    } else {
        window.alert('valor invalido ou ja encontrado na lista.')
    }
    num.value = '' // para apagar o campo de input assim que digitar.
    num.focus() // para dar foco ao campo em seguida.
}

function finaliza() {
    if (valores.length == 0) {
        window.alert('adicione valores antes de finalizar!!')
    } else {
        var total = valores.length
        var maior = valores[0]
        var menor = valores[0]
        var soma = 0
        var media = 0
        for (var pos in valores) {
            if (valores[pos] > maior) {
                maior = valores[pos]
            } else if (valores[pos] < menor) {
                menor = valores[pos]
            }
            soma += valores[pos]
        }
        media = soma / total
        resultado.innerHTML = '' //limpa o resultado.
        resultado.innerHTML += `<p>Ao todo, temos ${total} números cadastrados. </p>`
        resultado.innerHTML += `<p>O maior valor informado foi ${maior}. </p>`
        resultado.innerHTML += `<p>O menor valor informado foi ${menor}. </p>`
        resultado.innerHTML += `<p>A soma dos valores informado foi ${soma}. </p>`
        resultado.innerHTML += `<p>A media dos valores informados foi ${media}. </p>`
    }
}