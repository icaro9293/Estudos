import c from './módulo.js' // como esta como export default não precisa usar o operador '* as'

const nome = document.getElementById('inome')
const telefone = document.getElementById('itel')
const email = document.getElementById('iemail')
const botao = document.getElementById('ibotao')
const campo = document.getElementById('ilista')




botao.addEventListener('click', (evt) => {
    let cadastro = {
        Cnome: nome.value,
        Ctel: telefone.value,
        Cemail: email.value
    }
    c.addContato(cadastro, campo)
})
