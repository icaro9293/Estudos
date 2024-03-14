function verificar() {
    var data = new Date()
    var ano = data.getFullYear()
    var fano = window.document.getElementById('iano') //pega o ano que foi registrado.
    var res = window.document.getElementById('res') // div aonde sera mostrado os resultados.
    var imagem = window.document.getElementById('foto')
    if (fano.value.length == 0 || Number(fano.value) > ano) { //verifica se o ano digitado é menor que o ano atual, ou se o campo não esta vazio.
        window.alert('verifique os dados, preencha o campo de ano!')
    } else {
        var fsexo = window.document.getElementsByName('sexo') //o [0] é M e [1] é F.
        var idade = ano - fano.value
        var genero = ''
        if (fsexo[0].checked) {
            genero = 'Homem'
            if (idade >= 0 && idade < 10) {
                imagem.setAttribute('src', 'bebe-m.jpg')
            }
            else if (idade > 10 && idade < 21) {
                imagem.setAttribute('src', 'jovem-m.jpg')
            }
            else if (idade > 21 && idade < 60) {
                imagem.setAttribute('src', 'adulto-m.jpg')
            } else {
                imagem.setAttribute('src', 'idoso-m.jpg')
            }
        } else {
            genero = 'Mulher'
            if (idade >= 0 && idade < 10) {
                imagem.setAttribute('src', 'bebe-f.jpg')
            }
            else if (idade > 10 && idade < 21) {
                imagem.setAttribute('src', 'jovem-f.jpg')
            }
            else if (idade > 21 && idade < 60) {
                imagem.setAttribute('src', 'adulto-f.jpg')
            } else {
                imagem.setAttribute('src', 'idoso-f.jpg')
            }
        }
        res.style.textAlign = 'center'
        res.innerHTML = `genero cadastrado foi: ${genero} com ${idade} anos`
        res.appendChild(imagem)
    }
}