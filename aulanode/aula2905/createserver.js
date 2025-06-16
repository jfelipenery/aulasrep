const http = require('http');
const porta = 8081
let objeto = require('./objeto.js')

const servidor = http.createServer((req, res) => {
    res.setHeader('content-type', 'application/json; charset = utf-8')

    if(req.url == '/'){
        res.statusCode = 200
        res.write(JSON.stringify({pagina: 'Home', autor: 'jfelipe'}))
    }else if(req.url == '/jfelipe'){
        res.statusCode = 200
        res.write(JSON.stringify({pagina: 'sobre', autor: 'jfelipe', conteudo: objeto}))
    }else{
        res.statusCode = 404
        res.write(JSON.stringify({erro: 'Página não encontrada'}))
    }
    
    res.end()
})

servidor.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`))