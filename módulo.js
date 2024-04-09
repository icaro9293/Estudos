import cadastros, * as lista from './Javascript/banco.js'
let contato = {
    getTodosContatos: function () {
        return cadastros
    },

    getContato: function (i) {
        return cadastros[i]
    },
    addContato: function (novoContato, DOM) {
        DOM.innerHTML = ''
        cadastros.push(novoContato)
        console.log(cadastros)
        cadastros.map((el) => {
            const div = document.createElement('div')
            div.setAttribute('class', 'contatos')
            const p_nome = document.createElement('p')
            p_nome.innerHTML = el.Cnome
            const p_tel = document.createElement('p')
            p_tel.innerHTML = el.Ctel
            const p_email = document.createElement('p')
            p_email.innerHTML = el.Cemail
            div.appendChild(p_nome)
            div.appendChild(p_tel)
            div.appendChild(p_email)
            DOM.appendChild(div)
        })
    }
}

export default contato