const conectar = () => {

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
    const sql = 'SELECT * FROM produto'
    const [linhas] = await con.query(sql)
    console.log(linhas)
    return linhas
}

// selectClientes()

// const clientes = selectClientes()
// console.log(clientes)

const chamar = async () => {
    await selectClientes()

}

chamar()


module.exports = { selectClientes }