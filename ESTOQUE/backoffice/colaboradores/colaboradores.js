const endpointGetAll = 'http://127.0.0.1:1880/listarall'
const dados = document.querySelector('.dados')
const btnCriar = document.getElementById('btn_create')
const janelaPopup = document.getElementById('janelaPopup')
const btnAdd = document.getElementById('btn_add')
const btnCancelar = document.getElementById('btn_cancelar')
const tiposColab = document.getElementById('itipo')
const divTel = document.getElementById('telefones')
const campoTel = document.getElementById('itel')
const campoNome = document.getElementById('inome')
// const campoTipo = document.getElementById('itipo')
const campoStatus = document.getElementById('istatus')
const btnAddTel = document.getElementById('addTel')
const campoFoto = document.getElementById('ifoto')
const imagem = document.getElementById('imagem')

let modoJanela = 'novo'

const criarModeloTel = (Tel, idtel) => {
    const valorDigitado = Tel //campoTel.value
    const div = document.createElement('div')
    div.setAttribute('class', 'tel')
    div.innerHTML = valorDigitado
    divTel.appendChild(div)

    const lixeira = document.createElement('img')
    lixeira.setAttribute('src', '../../imgs/lixeira.svg')
    lixeira.setAttribute('class', 'delTel')
    lixeira.setAttribute('data-idtel', idtel)
    divTel.appendChild(lixeira)
    lixeira.addEventListener('click', (evt) => {
        const alvo1 = evt.target.previousElementSibling
        const alvo2 = evt.target
        const idAlvo = alvo2.dataset.idtel
        const endpointDelTel = `http://127.0.0.1:1880/deltelefone/${idAlvo}`
        fetch(endpointDelTel)
            .then(res => {
                if (res.status == 200) {
                    alvo1.remove()
                    alvo2.remove()

                }
            })
    })
}

btnAddTel.addEventListener('click', (evt) => {
    criarModeloTel(campoTel.value)
    campoTel.focus()
    campoTel.value = ''
})


fetch(endpointGetAll)
    .then((res) => res.json())
    .then((res) => {
        dados.innerHTML = ''
        res.map((e) => {
            const linha = document.createElement('div')
            linha.setAttribute('class', 'linhadados')

            const c1 = document.createElement('div')
            c1.setAttribute('class', 'colunaDados c1')
            c1.innerHTML = e.n_id_usuario
            linha.appendChild(c1)

            const c2 = document.createElement('div')
            c2.setAttribute('class', 'colunaDados c2')
            c2.innerHTML = e.s_nome_usuario
            linha.appendChild(c2)

            const c3 = document.createElement('div')
            c3.setAttribute('class', 'colunaDados c3')
            c3.innerHTML = e.n_id_tipousuario
            // if (c3.innerHTML == '1') {
            //     c3.innerHTML += ': Super usuário'
            // } else if (c3.innerHTML == '2') {
            //     c3.innerHTML += ': Administrador'
            // } else if (c3.innerHTML == '3') {
            //     c3.innerHTML += ': Colaborador'
            // }
            linha.appendChild(c3)

            const c4 = document.createElement('div')
            c4.setAttribute('class', 'colunaDados c4')
            c4.innerHTML = e.c_status_usuario
            linha.appendChild(c4)

            const c5 = document.createElement('div')
            c5.setAttribute('class', 'colunaDados c5')
            linha.appendChild(c5)

            const imgStatus = document.createElement('img')
            imgStatus.setAttribute('src', '../../imgs/toggleOn.svg')
            imgStatus.setAttribute('class', 'imgFunções')
            c5.appendChild(imgStatus)

            const imgEdit = document.createElement('img')
            imgEdit.setAttribute('src', '../../imgs/editar.svg')
            imgEdit.setAttribute('class', 'imgFunções')
            imgEdit.addEventListener('click', (evt) => {
                modoJanela = 'editar'

                const id = evt.target.parentNode.parentNode.firstElementChild.innerHTML
                const endpointColabId = `http://127.0.0.1:1880/dadoscolab/${id}`
                fetch(endpointColabId)
                    .then(res => res.json())
                    .then((res) => {
                        console.log(res[0].n_id_tipousuario)
                        document.querySelector('.topoJanela').innerHTML = 'Editar colaborador'
                        janelaPopup.classList.remove('ocultar')
                        campoNome.value = res[0].s_nome_usuario
                        campoStatus.value = res[0].c_status_usuario
                        tiposColab.value = res[0].n_id_tipousuario
                        imagem.src = res[0].s_foto_usuario
                    })
                const endpointColabTelefone = `http://127.0.0.1:1880/telefonescolab/${id}`
                fetch(endpointColabTelefone)
                    .then(res => res.json())
                    .then((res) => {
                        divTel.innerHTML = ''
                        res.forEach((tel) => {
                            criarModeloTel(tel.s_numero_telefone, tel.n_id_telefone)

                        })

                    })
            })
            c5.appendChild(imgEdit)

            const imgDeletar = document.createElement('img')
            imgDeletar.setAttribute('src', '../../imgs/lixeira.svg')
            imgDeletar.setAttribute('class', 'imgFunções')
            c5.appendChild(imgDeletar)

            dados.appendChild(linha)
        })
    })

btnCriar.addEventListener('click', (evt) => {
    modoJanela = 'novo'
    document.querySelector('.topoJanela').innerHTML = 'Novo cadastro'
    janelaPopup.classList.remove('ocultar')
    const endpointGetTipos = 'http://127.0.0.1:1880/listartipos'
    fetch(endpointGetTipos)
        .then(res => res.json())
        .then((res) => {
            tiposColab.innerHTML = ''
            res.map((el) => {
                const opt = document.createElement('option')
                opt.setAttribute('value', el.n_id_tipousuario)
                opt.innerHTML = el.s_descricao_tipousuario
                tiposColab.appendChild(opt)
            })
            console.log(res)
        })
})

btnCancelar.addEventListener('click', (evt) => {
    janelaPopup.classList.add('ocultar')
})

btnAdd.addEventListener('click', (evt) => {
    const telefones = [...document.querySelectorAll('.tel')]
    let listaTels = []
    telefones.map((el) => {
        listaTels.push(el.innerHTML)
    })
    console.log(listaTels)
    const dados = {
        s_nome_usuario: campoNome.value,
        n_id_tipousuario: campoTipo.value,
        c_status_usuario: campoStatus.value,
        telefone: listaTels,
        s_foto_usuario: imagem.getAttribute('src') // aqui esta o arquivo em formato base64
    }
    const endpointPostColab = 'http://127.0.0.1:1880/novocolab'
    const cabecalho = {
        method: 'POST',
        body: JSON.stringify(dados)
    }
    fetch(endpointPostColab, cabecalho)
        .then((res) => {
            if (res.status == 200) {
                alert('colaborador inserido com sucesso')
                campoNome.value = ''
                campoTipo.value = ''
                campoStatus.value = ''
                campoFoto.value = ''
                imagem.setAttribute('src', '#')
                campoTel.value = ''
                divTel.innerHTML = ''
            } else {
                alert('erro ao inserir colaborador')
            }
        })

    // janelaPopup.classList.add('ocultar')
})

const converterImagem_b64 = (localDestino, arquivoImg) => {
    const obj = arquivoImg
    const reader = new FileReader()
    reader.addEventListener('load', (evt) => {
        localDestino.src = reader.result // passa o conteudo carregado para o src da imagem.
    })
    if (obj) {
        reader.readAsDataURL(obj) // converte para base 64
    }
}

campoFoto.addEventListener('change', (evt) => {
    converterImagem_b64(imagem, evt.target.files[0])
})