

const configDGV = {
    endpoint: 'localhost/3000',
    divDestino: 'dados'
}

const DGV = (configDGV) => {
    const dados = document.getElementById(configDGV.divDestino)

    fetch(configDGV.endpoint)
        .then((res) => {
            console.log(res)
            return res.json()
        })
        .then((res) => {
            console.log(res)
            res.map((el) => {
                const linhas = document.createElement('div')
                linhas.setAttribute('class', 'linhas')

                const c1 = document.createElement('div')
                c1.setAttribute('class', 'coluna c1')
                c1.innerHTML = el.id
                linhas.appendChild(c1)

                const c2 = document.createElement('div')
                c2.setAttribute('class', 'coluna c2')
                c2.innerHTML = el.produto
                linhas.appendChild(c2)

                const c3 = document.createElement('div')
                c3.setAttribute('class', 'coluna c3')
                c3.innerHTML = el.marca
                linhas.appendChild(c3)

                const c4 = document.createElement('div')
                c4.setAttribute('class', 'coluna c4')
                c4.innerHTML = el.modelo
                linhas.appendChild(c4)

                const c5 = document.createElement('div')
                c5.setAttribute('class', 'coluna c5')
                linhas.appendChild(c5)

                const lixeira = document.createElement('img')
                lixeira.setAttribute('src', 'lixeira.svg')
                lixeira.setAttribute('class', 'icons')

                const edit = document.createElement('img')
                edit.setAttribute('src', 'editar.svg')
                edit.setAttribute('class', 'icons')

                const visualizar = document.createElement('img')
                visualizar.setAttribute('src', 'visualizar.svg')
                visualizar.setAttribute('class', 'icons')
                c5.appendChild(edit)
                c5.appendChild(visualizar)
                c5.appendChild(lixeira)

                dados.appendChild(linhas)
            })
        })
}



DGV(configDGV)




