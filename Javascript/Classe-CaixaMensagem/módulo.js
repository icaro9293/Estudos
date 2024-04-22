class CaixaMSG {
    static div = null
    static destino = null // o destino deve ser definido pois não necessáriamente a mensagem será usada no body.
    static cor = 'lightblue' // cor padrao

    static mostarCaixa = (config) => {
        this.titulo = config.titulo
        this.texto = config.texto
        this.cor = config.cor
        this.tipo = config.tipo
        this.destino = document.body
        this.div = document.createElement('div')
        const estiloDiv = 'display: flex;' + 'justify-content: center;' + 'align-items: center;' + 'position: absolute;' + 'top: 0px;' + 'left: 0px;' + 'width: 100%;' + 'height: 100vh;' + 'background-color: rgba(0, 0, 0, 0.7);'
        this.div.setAttribute('style', estiloDiv)
        this.destino.prepend(this.div)

        const caixa = document.createElement('div')
        const estiloCaixa = 'width: 500px;' + 'height: 300px;' + 'background-color: white;' + 'border-radius: 10px;' + 'display: flex;' + 'flex-direction: column;' + 'justify-content: flex-start;' + 'align-items: flex-start;'
        caixa.setAttribute('style', estiloCaixa)
        this.div.appendChild(caixa)

        const tituloCaixa = document.createElement('div')
        const estiloTitulo = 'width: 100%;' + 'height: 20%;' + 'display: flex;' + 'justify-content: flex-start;' + 'background-color:' + this.cor + ';' + 'color: white;' + 'font-size: 25px;' + 'padding: 5px;' + 'border-radius: 10px 10px 0px 0px ;'
        tituloCaixa.setAttribute('style', estiloTitulo)
        tituloCaixa.innerHTML = this.titulo
        caixa.appendChild(tituloCaixa)

        const textoCaixa = document.createElement('div')
        const estiloTexto = 'width: 100%;' + 'height: 60%;' + 'display: flex;' + 'justify-content: flex-start;' + 'background-color: gray;' + 'color: white;' + 'font-size: 25px;' + 'padding: 5px;'
        textoCaixa.setAttribute('style', estiloTexto)
        textoCaixa.innerHTML = this.texto
        caixa.appendChild(textoCaixa)



        const rodapeCaixa = document.createElement('div')
        const estiloRodape = 'width: 100%;' + 'height: 20%;' + 'display: flex;' + 'justify-content: center;' + 'align-items: center;' + 'background-color:' + this.cor + ';' + 'color: white;' + 'font-size: 25px;' + 'padding: 5px;' + 'border-radius: 0px 0px 10px 10px ;' + 'gap: 12px'
        rodapeCaixa.setAttribute('style', estiloRodape)
        if (this.tipo == 'ok') {
            const botao = document.createElement('button')
            botao.innerHTML = 'OK'
            botao.addEventListener('click', (evt) => {
                this.div.remove()
            })
            rodapeCaixa.appendChild(botao)

        } else if (this.tipo == 'sn') {
            const botaoS = document.createElement('button')
            botaoS.innerHTML = 'SIM'
            const botaoN = document.createElement('button')
            botaoN.innerHTML = 'NÃO'
            botaoS.addEventListener('click', (evt) => {
                console.log('definir ação do botão Sim.')
            })
            botaoN.addEventListener('click', (evt) => {
                // this.corpo.firstElementChild.remove() // caso de algum proble ao remover o primeiro elemento do body, da pra criar uma variavel this.div, na criação da primeira div e remove-la;
                this.div.remove()
            })
            rodapeCaixa.appendChild(botaoS)
            rodapeCaixa.appendChild(botaoN)
        }
        caixa.appendChild(rodapeCaixa)

    }
}



export default CaixaMSG
//ou export {CaixaMSG}