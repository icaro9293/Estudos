import CaixaMSG, * as classe from "./módulo.js"

const botao1 = document.getElementById('ibotao1')


const config = {
    titulo: 'Título da caixa de mensagem',
    texto: 'Mensagem padrão',
    cor: 'lightblue',
    tipo: 'sn' // ok ou sn
}

botao1.addEventListener('click', (evt) => {
    CaixaMSG.mostarCaixa(config)
})



