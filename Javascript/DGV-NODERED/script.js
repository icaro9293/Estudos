const configDGV = {
    endpoint: 'http://127.0.0.1:1880/produto',
    divDestino: 'dados'
}

const DGV = (configDGV) => {
    const dados = document.getElementById(configDGV.divDestino)
    dados.innerHTML = ''
    fetch(configDGV.endpoint)
        .then((res) => {
            return res.json()
        }
        )
        .then((res) => {
            console.log(res)
            res.map((el) => {
                const linhas = document.createElement('div')
                linhas.setAttribute('class', 'linhas')

                const c1 = document.createElement('div')
                c1.setAttribute('class', 'coluna c1')
                c1.innerHTML = el.n_id_produto
                linhas.appendChild(c1)

                const c2 = document.createElement('div')
                c2.setAttribute('class', 'coluna c2')
                c2.innerHTML = el.s_nome_produto
                linhas.appendChild(c2)

                const c3 = document.createElement('div')
                c3.setAttribute('class', 'coluna c3')
                c3.innerHTML = el.s_marca_produto
                linhas.appendChild(c3)

                const c4 = document.createElement('div')
                c4.setAttribute('class', 'coluna c4')
                c4.innerHTML = el.s_modelo_produto
                linhas.appendChild(c4)

                const c5 = document.createElement('div')
                c5.setAttribute('class', 'coluna c5')
                linhas.appendChild(c5)

                const lixeira = document.createElement('img')
                lixeira.setAttribute('src', 'lixeira.svg')
                lixeira.setAttribute('class', 'icons')
                lixeira.addEventListener('click', (evt) => {
                    const id = evt.target.parentNode.parentNode.firstChild.innerHTML
                    const linha = evt.target.parentNode.parentNode
                    const endpoint = `http://127.0.0.1:1880/remover/${id}`
                    fetch(endpoint)
                        .then((res) => {
                            if (res.status == 200) { //para verificar se a operação no endpoint foi bem sucedida.
                                linha.remove()
                            }
                        })
                })

                const edit = document.createElement('img')
                edit.setAttribute('src', 'editar.svg')
                edit.setAttribute('class', 'icons')
                edit.addEventListener('click', (evt) => {
                    document.querySelector('#ijanelaEdit').classList.remove('ocultar')
                    const id = evt.target.parentNode.parentNode.firstChild.innerHTML

                    const endpoint = `http://127.0.0.1:1880/produto/${id}`
                    fetch(endpoint)
                        .then((res) => {
                            return res.json()
                        })
                        .then((res) => {
                            console.log(res)
                            document.querySelector('#v_idEdit').value = res[0].n_id_produto
                            document.querySelector('#v_nomeEdit').value = res[0].s_nome_produto
                            document.querySelector('#v_marcaEdit').value = res[0].s_marca_produto
                            document.querySelector('#v_modeloEdit').value = res[0].s_modelo_produto
                        })
                })

                const visualizar = document.createElement('img')
                visualizar.setAttribute('src', 'visualizar.svg')
                visualizar.setAttribute('class', 'icons')
                visualizar.addEventListener('click', (evt) => {
                    document.querySelector('#ijanela').classList.remove('ocultar')

                    const id = evt.target.parentNode.parentNode.firstChild.innerHTML
                    const endpoint = `http://127.0.0.1:1880/produto/${id}`
                    fetch(endpoint)
                        .then((res) => {
                            return res.json()
                        })
                        .then((res) => {
                            console.log(res)
                            document.querySelector('#v_id').value = res[0].n_id_produto
                            document.querySelector('#v_nome').value = res[0].s_nome_produto
                            document.querySelector('#v_marca').value = res[0].s_marca_produto
                            document.querySelector('#v_modelo').value = res[0].s_modelo_produto
                        })
                })
                c5.appendChild(edit)
                c5.appendChild(visualizar)
                c5.appendChild(lixeira)

                dados.appendChild(linhas)
            })
        })
}

DGV(configDGV)

document.querySelector('.v_btn').addEventListener('click', (evt) => {
    document.querySelector('#ijanela').classList.add('ocultar')
})

document.querySelector('#btn_edit').addEventListener('click', (evt) => {
    const id = document.querySelector('#v_idEdit').value
    const nome = document.querySelector('#v_nomeEdit').value
    const marca = document.querySelector('#v_marcaEdit').value
    const modelo = document.querySelector('#v_modeloEdit').value
    const endpoint = `http://127.0.0.1:1880/updateproduto/${id}/${nome}/${marca}/${modelo}`
    fetch(endpoint)
        .then((res) => {
            console.log(res)
            console.log(res.status)
            if (res.status == 200) {
                document.querySelector('#ijanelaEdit').classList.add('ocultar')
                DGV(configDGV)
            } else {
                console.log('erro')
            }
        })
})


document.querySelector('#btn_cancelar').addEventListener('click', (evt) => {
    document.querySelector('#ijanelaEdit').classList.add('ocultar')
})




