const fs = require('fs')
const arquivo1 = './arquivo1.txt'
// const conteudo1 = 'lorem ipsum dolor sit amet, consectetur adipiscing elit.'
const arquivo2 = './arquivo2.txt'
// const conteudo2 = 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
const arquivoConcatenado = './arquivoConcatenado.txt'

// fs.writeFile( arquivo1 , conteudo1,  (err, dados) => {
//     if (err) throw err
//     console.log('Arquivo criado com sucesso!')
// })

// fs.writeFile( arquivo2 , conteudo2,  (err, dados) => {
//     if (err) throw err
//     console.log('Arquivo criado com sucesso!')
// })
fs.readFile( arquivo1, 'utf8', (err, conteudo1)) => {
    if (err) throw err
    console.log('Conteudo do arquivo 1:', conteudo1)
}

fs.readFile( arquivo2, 'utf8', (err, conteudo2)) => {
    if (err) throw err
    console.log('Conteudo do arquivo 2:', conteudo2)
}


const conteudoFinal = conteudo1 + '\n' + conteudo2
fs.writeFile( arquivoConcatenado , conteudoFinal ,  (err, dados) => {
    if (err) 
    console.log('erro ao criar o arquivo!');
return; 
}

console.log('Arquivo concatenado criado com sucesso!');


);