const relogio = document.querySelector('#irelogio')
const data = document.getElementById('idata')
const botao1 = document.querySelector('#iativar')
const campo = document.querySelector('#iset')
const botao2 = document.querySelector('#iparar')
const mostrarTempo = document.querySelector('#ialarme')
const main = document.querySelector('#imain')

let dia = new Date().getDate()
console.log(dia)
let mes = (new Date().getMonth()) + 1
console.log(mes)
let ano = new Date().getFullYear()
console.log(ano)
let hoje = `${dia}/${mes}/${ano}`
data.innerHTML = hoje

let tempoAlarme = undefined
let alarmeTocando = false
let alarmeAtivado = false

const somAlarme = new Audio('alarme.mp3')
somAlarme.loop = -1



const mostrarHoras = () => {
    const data = new Date()
    let hora = data.getHours()
    hora = hora < 10 ? `0${hora}` : data.getHours()
    let minutos = data.getMinutes()
    minutos = minutos < 10 ? `0${minutos}` : minutos
    let segundos = data.getSeconds()
    segundos = segundos < 10 ? `0${segundos}` : segundos
    let horaCompleta = `${hora}:${minutos}:${segundos}`
    relogio.innerHTML = horaCompleta
    //a forma abaixo foi como eu fiz:
    // if (alarmeAtivado) { 
    //     console.log('definiu')
    //     console.log(alarmeTocando)
    //     if (data.getTime() > tempoAlarme && alarmeTocando == false) {
    //         alarmeTocando = true
    //     }
    //     if (alarmeTocando == true) {
    //         console.log('alarme tocando')
    //         somAlarme.play()
    //         if (!main.classList.contains('tocando')) {
    //             main.classList.toggle('tocando')
    //         }
    //     } else {
    //         console.log('alarme desligado')

    //     }
    // } else {
    //     console.log('alarme desatiivado')
    // }
    //essa forma é mais simple e efetiva.
    if (alarmeAtivado && !alarmeTocando) {
        if (data.getTime() > tempoAlarme) {
            alarmeTocando = true
            somAlarme.play()
            if (!main.classList.contains('tocando')) {
                main.classList.toggle('tocando')
            }
        }
    }
}


botao1.addEventListener('click', (evt) => {
    const agora = new Date().getTime()
    const agoracorrigido = new Date(agora)
    console.log(agoracorrigido)
    tempoAlarme = agora + (campo.value * 1000) //basta acrescer o timestamp em milisegundos
    const alarme = new Date(tempoAlarme) //pega o timestamp e passa para a data.
    console.log(alarme)
    alarmeAtivado = true
    mostrarTempo.firstElementChild.innerHTML += `${alarme.getHours()}:${alarme.getMinutes()}:${alarme.getSeconds()}`
    campo.value = '0'
})

botao2.addEventListener('click', (evt) => {
    alarmeTocando = false
    alarmeAtivado = false
    somAlarme.pause()
    somAlarme.currentTime = 0
    mostrarTempo.firstElementChild.innerHTML = 'Hora do alarme: '
    main.classList.toggle('tocando')
})

let intervalo = setInterval(mostrarHoras, 1000)



