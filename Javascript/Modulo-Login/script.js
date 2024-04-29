import { Login } from "./modulo.js";
import { CaixaMSG } from '../Módulo-CaixaMensagem/módulo.js'

const configCaixaErro = {
    cor: 'red',
    titulo: 'erro',
    texto: 'usuário ou senha incorretos',
    tipo: 'ok'
}

const configCaixaOk = {
    cor: 'lightblue',
    titulo: 'login',
    texto: 'login efetuado com sucesso',
    tipo: 'ok'
}

const callbackOk = () => {
    CaixaMSG.mostarCaixa(configCaixaOk)
}
const callbackNok = () => {
    CaixaMSG.mostarCaixa(configCaixaErro)
}

const configLogin = {
    cor: 'red',
    img: 'lixeira.png'
}
Login.login(callbackOk, callbackNok, configLogin)



