const fs = require('fs')
let caminhoArquivo = './2305.js'
let conteudo = 'Olá mundo!'



fs.writeFile( caminhoArquivo, conteudo, (err, dados) => {
	if(err) throw err
	console.log('O arquivo foi salvo com sucesso!')
})



const fs = require('fs')
let caminhoArquivo = './2305.js'
let codificacao = 'utf8'

fs.readFile( caminhoArquivo, codificacao, (err, dados) => {
	if (err) throw err
	console.log(dados)
})