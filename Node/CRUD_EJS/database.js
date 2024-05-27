const mysql = require('mysql')

var con = mysql.createConnection({
    host: 'localhost',
    database: 'loginteste',
    port: 3306,
    user: 'root',
    password: 'vol4815162342'
})

con.connect((err) => {
    if (err) {
        throw err
    } else {
        console.log('conectado com sucesso')
    }
})

module.exports = con
