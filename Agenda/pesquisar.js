const campoPesq = document.getElementById('ipesq')
const btnPesq = document.getElementById('btn_pesq')
const resultado = document.getElementById('iresultado')
const dados = document.getElementById('idados')

btnPesq.addEventListener('click', (evt) => {
    const valorDigitado = campoPesq.value
    if (valorDigitado == '') {
        alert('digite algo no campo de pesquisa.')
        campoPesq.focus()
        return;
    }
    const radioSelecionado = document.querySelector('input[type=radio]:checked').value
    console.log(radioSelecionado)
    let endpoint = `http://127.0.0.1:1880/pesquisarcontato/${radioSelecionado}/${valorDigitado}`
    fetch(endpoint)
        .then(res => res.json())
        .then((res) => {
            dados.innerHTML = ''
            res.map((el) => {
                const linha = document.createElement('div')
                linha.setAttribute('class', 'linhaDados')

                const c1 = document.createElement('div')
                c1.setAttribute('class', 'coluna c1')
                c1.innerHTML = el.n_id_contato
                linha.appendChild(c1)

                const c2 = document.createElement('div')
                c2.setAttribute('class', 'coluna c2')
                c2.innerHTML = el.s_nome_contato
                linha.appendChild(c2)

                const c3 = document.createElement('div')
                c3.setAttribute('class', 'coluna c3')
                c3.innerHTML = el.s_telefone_contato
                linha.appendChild(c3)

                const c4 = document.createElement('div')
                c4.setAttribute('class', 'coluna c4')
                c4.innerHTML = el.s_email_contato
                linha.appendChild(c4)

                dados.appendChild(linha)
                campoPesq.value = ''
                campoPesq.focus()
            })
        })
})