const mysql = require('mysql')
const express = require('express')
const app = express()
const porta = process.env.PORT || 3000
console.log(porta)

const rota = require('./script')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'loginteste',
    user: 'root',
    password: 'vol4815162342'
})

var databaseConnectionStatus = ''

connection.connect((err) => {
    if (err) {
        // databaseConnectionStatus = '<p>erro na conexão</p>' //tentar usar o ejs(template engine).
        console.log('erro na conexao ao banco de dados: ' + err)
    } else {
        // databaseConnectionStatus = '<p>conectado com sucesso</p>'
        console.log('conectado com sucesso ao banco de dados')
    }
})

app.use(express.urlencoded()) // cria um middleware nesta aplicação node
app.use('/crud', rota) // o padrao '/' do arquivo 'rota' sera o '/crud' aqui.

app.get('/', (req, res) => {
    res.sendFile('./lvl0.html', { root: __dirname }) //__dirname pega o diretório atual.
})

// app.get('/', (req, res) => {
//     res.send(`
//     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" Dintegrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
// 		<div class="container">
// 			<h1 class="text-center mt-3 mb-3">Submit Form Data in Node.js</h1>
// 			<div class="card">
// 				<div class="card-header">Sample Form</div>
// 				<div class="card-body">
// 					<form method="POST" action="/">
// 						<div class="mb-3">
// 							<label>First Name</label>
// 							<input type="text" name="first_name" id="first_name" class="form-control" />
// 						</div>
// 						<div class="mb-3">
// 							<label>Last Name</label>
// 							<input type="text" name="last_name" id="last_name" class="form-control" />
// 						</div>
// 						<div class="mb-3">
// 		                	<label>Email Address</label>
// 		                	<input type="text" name="email_address" id="email_address" class="form-control" />
// 		                </div>
// 		                <div class="mb-3">
// 		                	<input type="submit" name="submit_button" class="btn btn-primary" value="Add" />
// 		                </div>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
//     `)
// })

app.post('/', (req, res) => {
    res.send(req.body) // pega o conteudo do formulário.
})

app.listen(porta, () => { console.log('ouvindo porta: ' + porta) })
