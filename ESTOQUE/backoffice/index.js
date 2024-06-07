const botaoMenu = document.getElementById('bnt_mainMenu')
const btn_paginas = [...document.querySelectorAll('.btn-primary')]

botaoMenu.addEventListener('click', (evt) => {
    document.querySelector('.mainMenu').classList.toggle('expandir')
})

btn_paginas.forEach(e => {
    e.addEventListener('click', (evt) => {
        document.querySelector('.mainMenu').classList.remove('expandir')
    })
})
