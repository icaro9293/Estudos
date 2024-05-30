const resultado = document.getElementById('iresultado')
const dados = document.getElementById('idados')

const mostrarDGV = () => {
    let endpoint = `http://127.0.0.1:1880/pesquisarallcontato`
    fetch(endpoint)
        .then(res => res.json())
        .then((res) => {
            dados.innerHTML = ''
            res.map((el) => {
                const linha = document.createElement('div')
                linha.setAttribute('class', 'linhaDados')

                const c1 = document.createElement('div')
                c1.setAttribute('class', 'coluna cg1')
                c1.innerHTML = el.n_id_contato
                linha.appendChild(c1)

                const c2 = document.createElement('div')
                c2.setAttribute('class', 'coluna cg2')
                c2.innerHTML = el.s_nome_contato
                linha.appendChild(c2)

                const c3 = document.createElement('div')
                c3.setAttribute('class', 'coluna cg3')
                c3.innerHTML = el.s_telefone_contato
                linha.appendChild(c3)

                const c4 = document.createElement('div')
                c4.setAttribute('class', 'coluna cg4')
                c4.innerHTML = el.s_email_contato
                linha.appendChild(c4)

                const c5 = document.createElement('div')
                c5.setAttribute('class', 'coluna cg5')

                const imgDelete = document.createElement('img')
                imgDelete.setAttribute('src', './lixeira.svg')

                imgDelete.addEventListener('click', (evt) => {

                })
                c5.appendChild(imgDelete)

                const imgEdit = document.createElement('img')
                imgEdit.setAttribute('src', './editar.svg')

                imgEdit.addEventListener('click', (evt) => {

                })
                c5.appendChild(imgEdit)

                linha.appendChild(c5)

                dados.appendChild(linha)
            })
        })
}

mostrarDGV()