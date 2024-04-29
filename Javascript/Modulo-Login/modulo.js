class Login {
    static logado = false
    static nomeLogado = null
    static acessoLogado = null
    static matLogado = null
    static estiloLogin = null
    static callbackOk = null
    static callbackNok = null
    static config = {
        cor: 'blue',
        img: 'logo.png'
    }
    static endpoint = 'https://eb8c89b2-c29f-488b-b36b-d23b1667958d-00-3bbdpmbojcwxo.spock.replit.dev/'
    //https://eb8c89b2-c29f-488b-b36b-d23b1667958d-00-3bbdpmbojcwxo.spock.replit.dev/?matricula=123&senha=321

    static login = (callbackOk, callbackNok, config = null) => {
        if (config != null) {
            this.config = config
        }
        this.callbackOk = () => {
            return callbackOk()
        }
        this.callbackNok = () => {
            return callbackNok()
        }

        this.estiloLogin =
            '.fundoLogin{display: flex;justify-content: center;align-items: center;background-color: rgba(0, 0, 0, 0.75);height: 100vh;width: 100%;position: absolute;top: 0px;left: 0px;}' + '.baseLogin {display: flex;justify-content: center;align-items: stretch;width: 50%;}' +
            '.elementosLogin {display: flex;flex-direction: column;justify-content: flex-start;width: 45%;background-color: lightgray;border-radius: 10px 0px 0px 10px;font-size: larger;padding: 8px;}' +
            '.campoLogin {display: flex;flex-direction: column;margin-bottom: 10px;}' +
            '.campoLogin label {margin-bottom: 5px;}' +
            '.campoLogin input {height: 25px;border-radius: 5px;padding: 5px;}' +
            '.botoesLogin {display: flex;justify-content: center;gap: 18px;}' +
            `button {width: 100%;height: 40px;border-radius: 5px;background-color: ${this.config.cor};color: white;font-weight: bolder;font-size: 15px;cursor: pointer;}` +
            '.logoLogin {display: flex;flex-direction: column;align-items: center;justify-content: center;width: 30%;background-color: white;border-radius: 0px 10px 10px 0px;}' +
            '.logoLogin img {width: 80%;}'
        const estilo = document.createElement('style')
        estilo.setAttribute('id', 'iestiloLogin')
        // estilo.setAttribute('rel', 'stylesheet')
        // estilo.setAttribute('type', 'text/css')
        estilo.innerHTML = this.estiloLogin
        document.head.appendChild(estilo)


        const fundoLogin = document.createElement('div')
        fundoLogin.setAttribute('id', 'fundoLogin')
        fundoLogin.setAttribute('class', 'fundoLogin')
        document.body.prepend(fundoLogin)

        const baseLogin = document.createElement('div')
        baseLogin.setAttribute('id', 'baseLogin')
        baseLogin.setAttribute('class', 'baseLogin')
        fundoLogin.appendChild(baseLogin)

        const elementosLogin = document.createElement('div')
        elementosLogin.setAttribute('id', 'elementosLogin')
        elementosLogin.setAttribute('class', 'elementosLogin')
        baseLogin.appendChild(elementosLogin)
        const campoLogin = document.createElement('div')
        campoLogin.setAttribute('class', 'campoLogin')
        elementosLogin.appendChild(campoLogin)
        const label = document.createElement('label')
        label.setAttribute('for', 'iusername')
        label.innerHTML = 'Username: '
        campoLogin.appendChild(label)
        const input = document.createElement('input')
        input.setAttribute('type', 'text')
        input.setAttribute('id', 'iusername')
        input.setAttribute('name', 'username')
        campoLogin.appendChild(input)

        const campoLogin2 = document.createElement('div')
        campoLogin2.setAttribute('class', 'campoLogin')
        elementosLogin.appendChild(campoLogin2)
        const label2 = document.createElement('label')
        label2.setAttribute('for', 'ipassword')
        label2.innerHTML = 'Password: '
        campoLogin2.appendChild(label2)
        const input2 = document.createElement('input')
        input2.setAttribute('type', 'password')
        input2.setAttribute('id', 'ipassword')
        input2.setAttribute('name', 'password')
        campoLogin2.appendChild(input2)

        const botoesLogin = document.createElement('div')
        botoesLogin.setAttribute('class', 'botoesLogin')
        elementosLogin.appendChild(botoesLogin)
        const btnLogin = document.createElement('button')
        btnLogin.setAttribute('id', 'btnLogin')
        btnLogin.innerHTML = 'Login'
        btnLogin.addEventListener('click', (evt) => {
            this.veririficaLogin()
        })
        botoesLogin.appendChild(btnLogin)
        const btnCancelar = document.createElement('button')
        btnCancelar.setAttribute('id', 'btnCancelar')
        btnCancelar.innerHTML = 'Cancelar'
        btnCancelar.addEventListener('click', (evt) => {
            this.fechar()
        })
        botoesLogin.appendChild(btnCancelar)


        const logoLogin = document.createElement('div')
        logoLogin.setAttribute('id', 'logoLogin')
        logoLogin.setAttribute('class', 'logoLogin')
        baseLogin.appendChild(logoLogin)
        const img = document.createElement('img')
        img.setAttribute('src', this.config.img)
        img.setAttribute('alt', 'LOGO')
        logoLogin.appendChild(img)

    }



    static fechar = () => {
        const fundoLogin = document.querySelector('#fundoLogin')
        fundoLogin.remove()
        const estilo = document.querySelector('#iestiloLogin')
        estilo.remove()
    }

    static veririficaLogin = () => {
        const matricula = document.querySelector('#iusername').value
        const password = document.querySelector('#ipassword').value
        this.endpoint += `?matricula=${matricula}&senha=${password}`

        fetch(this.endpoint)
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                if (res) {
                    this.logado = true
                    this.nomeLogado = res.nome
                    this.acessoLogado = res.acesso
                    this.matLogado = matricula
                    console.log(res)
                    this.callbackOk()
                    this.fechar()
                } else {
                    this.logado = false
                    this.nomeLogado = null
                    this.acessoLogado = null
                    this.matLogado = null
                    console.log(res)
                    this.callbackNok()
                }
            })
    }


}


// export { Login }
//modelos CDN
//https://cdn.jsdelivr.net/gh/   ESSE É O PADRÃO RETIRADO DO JSDELIVR
//https://cdn.jsdelivr.net/gh/conta_github/nome_repositório/arquivo ESSE É O MODELO
//https://github.com/icaro9293/Estudos/blob/main/Javascript/Modulo-Login/modulo.js  ESSE É O LINK DO AR1QUIVO NO GITHUB
//https://cdn.jsdelivr.net/gh/icaro9293/Estudos/Javascript/Modulo-Login/modulo.js
