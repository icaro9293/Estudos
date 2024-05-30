const btn_gravar = document.getElementById('btn_gravar')
const btn_cancelar = document.getElementById('btn_cancelar')
const nome = document.getElementById('inome')
const tel = document.getElementById('itel')
const email = document.getElementById('iemail')

btn_gravar.addEventListener('click', (evt) => {
    const dados = {
        'nome': nome.value,
        'tel': tel.value,
        'email': email.value
    }

    const cabecalho = {
        method: 'POST',
        body: JSON.stringify(dados)
    }

    const endpoint = 'http://127.0.0.1:1880/addcontato'
    fetch(endpoint, cabecalho)
        .then((res) => {
            if (res.status == 200) {
                console.log('ok')
                reset()
            } else {
                console.log('erro ao gravar novo contato')
            }
        })
})

btn_cancelar.addEventListener('click', (evt) => {
    reset()
})

const reset = () => {
    nome.value = ''
    tel.value = ''
    email.value = ''
    nome.focus()
}

