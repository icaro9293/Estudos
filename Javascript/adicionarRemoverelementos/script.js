// parentNode
// childNodes[nodenumber]
// firstChild
//firstElementChild
// lastChild
// nextSibling
// previousSibling
// previousElementSibling

const seleção = document.getElementById('btn3')
const remover = document.getElementById('btn2')
const adicionarA = document.getElementById('btn1')
const adicionarD = document.getElementById('btn1.2')
const secão = document.getElementById('box1')
const nome = document.getElementById('inome')
var indice = 7

const criarCurso = () => {
    try {
        const novoElemento = document.createElement('div')
        novoElemento.setAttribute('class', 'normal')
        novoElemento.setAttribute('id', `a${indice}`)
        const novaLabel = document.createElement('label')
        novaLabel.setAttribute('for', `${indice}`)
        novaLabel.innerHTML = `${nome.value}`
        novoElemento.appendChild(novaLabel)
        const novoInput = document.createElement('input')
        novoInput.setAttribute('id', `${indice}`)
        novoInput.setAttribute('type', 'radio')
        novoInput.setAttribute('name', 'curso')
        novoElemento.appendChild(novoInput)
        indice++
        return novoElemento
    }
    catch (exc) {
        alert('erro')
    }
}

const radioSelecionado = () => {
    const cursos = [...document.querySelectorAll('input[type=radio]')]
    const radio = cursos.filter((el, i, arr) => {
        return el.checked
    })
    return radio[0]
}

adicionarA.addEventListener('click', (tg) => {
    try {
        const novo = criarCurso()
        let selecionado = radioSelecionado()
        console.log(selecionado.parentElement)
        secão.insertBefore(novo, selecionado.parentElement)
    }
    catch (exc) {
        document.alert('erro')
    }
})

adicionarD.addEventListener('click', (tg) => {
    const novo = criarCurso()
    let selecionado = radioSelecionado()
    console.log(selecionado.parentElement.nextElementSibling)
    secão.insertBefore(novo, selecionado.parentElement.nextElementSibling)
})

seleção.addEventListener('click', (tg) => {

    let cursoSelecionado = radioSelecionado()
    console.log(cursoSelecionado)
    if (cursoSelecionado == undefined) {
        window.alert('escolha um curso')
    } else {
        // cursoSelecionado = cursoSelecionado[0]
        window.alert(cursoSelecionado.previousElementSibling.firstChild.textContent)
    }
})

remover.addEventListener('click', () => {
    const cursoSelecionado = radioSelecionado()
    console.log(cursoSelecionado)
    try {
        cursoSelecionado.parentElement.remove()
    } catch (exception) {
        window.alert('selecione um curso')
    }
})








