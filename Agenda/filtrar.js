const resultado = document.getElementById('iresultado')
const dados = document.getElementById('idados')
const janelaEditar = document.getElementById('fundoJanela')
const btn_filtrar = document.getElementById('btn_filtrar')
const id = document.getElementById('id')
const e_nome = document.getElementById('inome')
const e_tel = document.getElementById('itel')
const e_email = document.getElementById('iemail')
const nomeFiltro = document.getElementById('inomeFiltro')


const mostrarDGV = (endpoint) => {
    // let endpoint = `http://127.0.0.1:1880/pesquisarallcontato`
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
                    const id = evt.target.parentNode.parentNode.firstElementChild.innerHTML
                    deletarContato(id)
                })
                c5.appendChild(imgDelete)

                const imgEdit = document.createElement('img')
                imgEdit.setAttribute('src', './editar.svg')

                imgEdit.addEventListener('click', (evt) => {
                    janelaEditar.classList.remove('ocultar')
                    const dados = [...evt.target.parentNode.parentNode.childNodes]
                    id.value = dados[0].innerHTML
                    e_nome.value = dados[1].innerHTML
                    e_tel.value = dados[2].innerHTML
                    e_email.value = dados[3].innerHTML
                })
                c5.appendChild(imgEdit)

                linha.appendChild(c5)

                dados.appendChild(linha)
            })
        })
}

mostrarDGV('http://127.0.0.1:1880/pesquisarallcontato')

const deletarContato = (id) => {
    const endpoint = `http://127.0.0.1:1880/deletecontato/${id}`
    fetch(endpoint)
        .then((res) => {
            if (res.status == 200) {
                console.log('contato deletado com sucesso.')
                mostrarDGV('http://127.0.0.1:1880/pesquisarallcontato')
            } else {
                console.log('erro ao deletar contato.')
            }
        })
}

btn_filtrar.addEventListener('click', (evt) => {
    if (nomeFiltro.value == '') {
        mostrarDGV('http://127.0.0.1:1880/pesquisarallcontato')
    } else {
        mostrarDGV(`http://127.0.0.1:1880/filtrar/${nomeFiltro.value}`)
    }
})