const conectar = async () => {
    if (global.conexao && global.conexao.state != 'disconected') {
        return global.conexao
    }

    const mysql = require('mysql2/promise')
    const con = mysql.createConnection('mysql://root@localhost:3306/loginteste')
    console.log('conectado ao banco')
    global.conxao = con
    return con
}

const todosClientes = async () => {
    const con = await conectar()
    const [linhas] = await con.query('SELECT * FROM clientes')
    return await linhas
}

module.exports = { todosClientes }