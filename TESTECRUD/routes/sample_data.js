var express = require('express')
var router = express.Router()
var database = require('../database')

router.get('/', (req, res) => {
    res.send('listar dados')
})

router.get('/add', (req, res) => {
    res.send('adicionar dados')
})

module.exports = router