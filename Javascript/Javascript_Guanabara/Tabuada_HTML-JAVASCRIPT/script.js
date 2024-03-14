function tabuada() {
    var num = window.document.getElementById('inum')
    var tab = window.document.getElementById('itabuada')
    if (Number(num.value.length) == 0) {
        window.alert('digite um numero!!')
    } else {
        var numero = Number(num.value)
        tab.innerHTML = '' //toda vez que chamar a função, a variável tabuada será 'zerada'.
        // var cont = 1
        for (cont = 0; cont <= 10; cont++) {
            var item = window.document.createElement('option') //cria um elemento 'option' via JS, ao inves de adicionar os 10 elementos 'options' via html dentro do 'select', assim o elemento é criado dinamicamente e armazenado na variavel 'item'.
            item.value = `tab${cont}` // Os options possuem um 'value' e um text.
            item.text = `${numero} x ${cont} = ${numero * cont}`//aqui é configurado o texto dessas options, em HTML seria configurado um por 1 dentro de cada option.
            tab.appendChild(item)//aqui o que foi armazenado e formatado em 'item' é adicionado em 'tab', que é a variavel resposavel pelo select.
        }
    }
}