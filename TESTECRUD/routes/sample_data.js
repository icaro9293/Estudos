var express = require('express')
var router = express.Router()
var database = require('../database')

router.get('/', (req, res) => {
    const sql = 'select * from produto'

    database.query(sql, (err, data) => {
        if (err) {
            throw err
        } else {
            res.render('sample_data', { title: 'crud feito em node.js', action: 'listar', sampleData: data })
        }
    })
})

router.get('/add', (req, res) => {
    res.render('sample_data', { title: 'Inserir dados no banco de dados', action: 'add' })
})

router.post('/add_sample_data', (req, res) => {
    var nome = req.body.nome
    var marca = req.body.marca
    var modelo = req.body.modelo
    var valores = [nome, marca, modelo]
    var sql =
        'insert into produto (n_id_produto, s_nome_produto, s_marca_produto, s_modelo_produto) values (null,?, ?, ?)'

    database.query(sql, valores, (err, data) => {
        if (err) {
            throw err
        } else {
            res.redirect('/sample_data')
        }
    })
})

router.get('/edit/:id', (req, res) => {
    var id = req.params.id

    var sql = 'select * from produto where n_id_produto = ?'
    console.log(id)

    database.query(sql, id, (err, data) => {
        res.render('sample_data', { title: 'editar dados do cliente', action: 'edit', sampleData: data[0] })
    })
})

router.post('/edit/:id', (req, res) => {
    var id = req.params.id
    var nome = req.body.nome
    var marca = req.body.marca
    var modelo = req.body.modelo
    var valores = [nome, marca, modelo, id]

    var sql = 'update produto set s_nome_produto = ?, s_marca_produto = ?, s_modelo_produto = ? where n_id_produto = ? '

    database.query(sql, valores, (err, data) => {
        if (err) {
            throw err
        } else {
            res.redirect('/sample_data')
        }
    })
})

module.exports = router