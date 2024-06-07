const endpoint = 'http://127.0.0.1:1880/listarall'
const dados = document.querySelector('.dados')
fetch(endpoint)
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