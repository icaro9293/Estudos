const radioNormal = document.querySelector('#inormal')
const radioMilitar = document.querySelector('#imilitar')
const nome = document.querySelector('#inome')
const portas = document.querySelector('#iportas')
const munição = document.querySelector('#imunição')
const blindagem = document.querySelector('#iblindagem')
const radio = [...document.querySelectorAll('input[name = "tipo"]')] //ou 'input[type = "radio"]'
const botao = document.querySelector('#ibotao')

const resultado = document.querySelector('#iresultado')


//método mais adequado para vários 'radios'.
const selecionado = () => {
    let marcado = radio.filter((el, i) => {
        return el.checked
    })
    return marcado[0]
}

radioNormal.addEventListener('click', (evt) => {
    const marcou = selecionado()
    if (marcou.value == 'militar') {
        munição.removeAttribute('disabled')
        blindagem.removeAttribute('disabled')
    } else {
        munição.setAttribute('disabled', 'disabled')
        blindagem.setAttribute('disabled', 'disabled')
    }
})

radioMilitar.addEventListener('click', (evt) => {
    const marcou = selecionado()
    if (marcou.value == 'militar') {
        munição.removeAttribute('disabled')
        blindagem.removeAttribute('disabled')
    } else {
        munição.setAttribute('disabled', 'disabled')
        blindagem.setAttribute('disabled', 'disabled')
    }
})


//método mais adequado para apenas 2 radios.
// radioMilitar.addEventListener('click', (evt) => {
//     munição.removeAttribute('disabled')
//     blindagem.removeAttribute('disabled')
// })

// radioNormal.addEventListener('click', (evt) => {
//     munição.setAttribute('disabled', 'disabled')
//     blindagem.setAttribute('disabled', 'disabled')
// })

class Carros {
    constructor(nome, portas) {
        this.nome = nome
        this.portas = portas
        this.ligado = false
        this.vel = 0
        this.cor = undefined
    }

    ligar() {
        this.ligado = true
    }
    desligar() {
        this.ligado = false
    }
    setNome(nome) {
        this.nome = nome
    }
    setPortas(portas) {
        this.portas = portas
    }
    setVel(vel) {
        this.vel = vel
    }
    setCor(cor) {
        this.cor = cor
    }
}

class Militar extends Carros {
    constructor(nome, portas, blindagem, munição) {
        super(nome, portas)
        this.blindagem = blindagem
        this.munição = munição
    }

    atirar() {
        if (this.munição > 0) {
            this.munição--
        }
    }
}

let a_carros = [] // da proxima vez, o ideal é fazer funções para definir como os elementos serão adicionados a lista,
//e separadamente funções para a exibição da lista no HTML.

const removerObjetoDaLista = (selecionado) => {
    a_carros = a_carros.filter((el, i) => {
        return el.nome != selecionado
    })
}


const mostrarObjetos = () => {
    resultado.innerHTML = ''
    a_carros.map((el, i) => {
        const div = document.createElement('div')
        div.setAttribute('class', 'carro')
        div.setAttribute('data-name', `${el.nome}`) //dataset é importante para acessar os elements nodes.
        div.innerHTML = `nome: ${el.nome} <br> portas: ${el.portas} <br> blindagem: ${el.blindagem} <br> munição: ${el.munição}`
        //caso eu tivesse feito separadamente a inserção da lista e a exibição da lista, poderia ter feito uma exibição para cada
        //tipo de objeto.
        const remover = document.createElement('button')
        remover.innerHTML = 'REMOVER'
        remover.setAttribute('class', 'button')
        div.appendChild(remover)
        remover.addEventListener('click', (tg) => {
            const selecionado = tg.target.parentElement.dataset.name
            console.log(selecionado)
            removerObjetoDaLista(selecionado)
            console.log(a_carros)
            resultado.removeChild(tg.target.parentElement)
            // mostrarObjetos() posso usar o removeChild para remover o elemento do HTML, ou apenas chamar a função de exibição
            //novamente após o elemento ser removido da lista.
        })
        resultado.appendChild(div)
    })
}



botao.addEventListener('click', (evt) => {
    const marcou = selecionado()
    if (marcou.value == 'normal') {
        const c1 = new Carros(nome.value, portas.value)
        a_carros.push(c1)
        console.log(a_carros)
        nome.value = ''
        portas.value = ''
        nome.focus()
        mostrarObjetos()
    } else {
        const c1 = new Militar(nome.value, portas.value, blindagem.value, munição.value)
        a_carros.push(c1)
        console.log(a_carros)
        nome.value = ''
        portas.value = ''
        nome.focus()
        mostrarObjetos()
    }
})


