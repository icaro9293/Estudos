const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('listar dados')
})

app.get('/add', (req, res) => {
    res.send('adicionar dados')
})

module.exports = app


