//metodo.js
const http = require('http');
const porta = 8080
let objeto = require('./exe1.js')

const servidor = http.createServer((req, res) => {
    res.setHeader('content-type', 'application/json; charset = utf-8')

    if(req.url == '/'){
        res.statusCode = 200
        res.write(JSON.stringify({pagina: 'Home', autor: 'Káthia'}))
    }else if(req.url == '/cleitinho'){
        res.statusCode = 200
        res.write(JSON.stringify({pagina: 'sobre', autor: 'Káthia', conteudo: objeto}))
    }else{
        res.statusCode = 404
        res.write(JSON.stringify({erro: 'Página não encontrada'}))
    }
    
    res.end()
})

servidor.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`))