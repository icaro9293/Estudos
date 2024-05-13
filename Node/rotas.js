const conectar = async () => {
    // if (global.conexao && global.conexao.state != 'disconected') {
    //     return global.conexao
    // }
    if (conexao && conexao.state != 'disconected') {
        console.log('entrou no if')
        return conexao
    }

    const mysql = require('mysql2/promise')
    //user 'root', password 'vol...', localhost/127.0.0.1, porta '3304', database 'loginteste'.
    const con = mysql.createConnection('mysql://root:vol4815162342@localhost:3306/loginteste')
    console.log('conectado ao banco')
    // global.conexao = con
    var conexao = con
    return con
}

const selectClientes = async () => {
    const con = await conectar()
    const [linhas] = await con.query('SELECT * FROM clientes')
    return linhas
}

const inserirCliente = async (cliente) => {
    const con = await conectar()
    const sql = 'INSERT INTO clientes (nome, sobrenome, email) values (?, ?, ?)'
    const valores = [cliente.nome, cliente.sobrenome, cliente.email]
    await con.query(sql, valores)
}

const atualizaCliente = async (cliente) => {
    const con = await conectar()
    const sql = 'update clientes set nome = ?, sobrenome = ?, email = ? where id = ?'
    const valores = [cliente.nome, cliente.sobrenome, cliente.email, cliente.id]
    await con.query(sql, valores)
}

const removeCliente = async (cliente) => {
    const con = await conectar()
    const sql = 'delete from clientes where id = ?'
    const valores = [cliente.id]
    await con.query(sql, valores)
}

module.exports = { selectClientes, inserirCliente, atualizaCliente, removeCliente }