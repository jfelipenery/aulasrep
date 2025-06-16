// criando servidor HTTP simples


// const http = require('http');
// const porta = 8080 

// http.createServer((req, res) => {
//     res.write('Hello World!');
//     res.end();  
// }).listen(porta);


// const http = require('http');
// const porta = 8081 

// http.createServer((requisicao, resposta) => {
// 		resposta.writeHead(200, {'Content-Type': 'text/html'});
//     resposta.write('<p>Hello World! lorem</p>');
//     resposta.end();  
// }).listen(porta);


//arquivo objeto.js


let objeto = {
    nome: 'Cleitinho',
    idade: 13,
    cidade: 'Recife',
    cor: 'laranja e branco',
    falar: function() { return 'miau miau'} 
}

module.exports = objeto