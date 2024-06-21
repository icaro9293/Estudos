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
const campoTipo = document.getElementById('itipo')
const campoStatus = document.getElementById('istatus')
const btnAddTel = document.getElementById('addTel')
const campoFoto = document.getElementById('ifoto')
const imagem = document.getElementById('imagem')




btnAddTel.addEventListener('click', (evt) => {
    const valorDigitado = campoTel.value
    const div = document.createElement('div')
    div.setAttribute('class', 'tel')
    div.innerHTML = valorDigitado
    divTel.appendChild(div)

    const lixeira = document.createElement('img')
    lixeira.setAttribute('src', '../../imgs/lixeira.svg')
    lixeira.setAttribute('class', 'delTel')
    divTel.appendChild(lixeira)
    lixeira.addEventListener('click', (evt) => {
        const alvo1 = evt.target.previousElementSibling
        const alvo2 = evt.target
        alvo1.remove()
        alvo2.remove()
    })
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
            if (c3.innerHTML == '1') {
                c3.innerHTML += ': Super usuário'
            } else if (c3.innerHTML == '2') {
                c3.innerHTML += ': Administrador'
            } else if (c3.innerHTML == '3') {
                c3.innerHTML += ': Colaborador'
            }
            linha.appendChild(c3)

            const c4 = document.createElement('div')
            c4.setAttribute('class', 'colunaDados c4')
            c4.innerHTML = e.c_status_usuario
            linha.appendChild(c4)

            const c5 = document.createElement('div')
            c5.setAttribute('class', 'colunaDados c5')
            c5.innerHTML = 'C R U D'
            linha.appendChild(c5)

            dados.appendChild(linha)
        })
    })

btnCriar.addEventListener('click', (evt) => {
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
            } else {
                alert('erro ao inserir colaborador')
            }
        })

    janelaPopup.classList.add('ocultar')
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