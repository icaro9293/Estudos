const http = require('http')
const file = require('fs')
const formidavel = require('formidable')
const porta = process.env.PORT || 3000

const servidor = http.createServer((req, res) => {
    if (req.url == '/enviarFile') {
        const form = new formidavel.IncomingForm()
        form.parse(req, (erro, campos, arquivos) => {
            const urlAntiga = arquivos.filetoupload[0].filepath
            // const nomeFile = arquivos.filetoupload.name
            const urlNova = 'C:/Users/icaro/Desktop/sistemas/' + arquivos.filetoupload[0].originalFilename
            console.log(arquivos)
            file.rename(urlAntiga, urlNova, (erro) => {
                if (erro) throw erro
                res.write('arquivo movido')
                res.end()
            })
        })
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write('<form action="enviarFile" method="post" enctype="multipart/form-data">')
        res.write('<input type="file" name="filetoupload"><br>')
        res.write('<input type="submit" value="Enviar">')
        res.write('</form>')
        res.end()
    }

})
servidor.listen(porta, () => { console.log('servidor rodando') })



