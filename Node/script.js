(async () => {
    const db = require('./rotas')
    console.log('selecionar todos os clientes')
    const clientes = await db.todosClientes()
    console.log(clientes)
})()
