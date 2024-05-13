const conectar = async () => {

    if (conexao && conexao.state != 'disconected') {
        console.log('entrou no if')
        return conexao
    }

    const mysql = require('mysql2/promise')
    const con = mysql.createConnection('mysql://root:vol4815162342@localhost:3306/loginteste')
    console.log('conectado ao banco')
    var conexao = con
    return con
}

const selectClientes = async () => {
    const con = await conectar()
    // const sql = 'SELECT * FROM produto'
    const [linhas] = await con.query('SELECT * FROM produto')
    return linhas
}

module.exports = { selectClientes }