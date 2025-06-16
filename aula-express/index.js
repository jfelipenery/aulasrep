const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());

const produtos = [
    {id: 1, nome: 'Tênis Nike', preco: 720.00},
    {id: 2, nome: 'Tênis Adidas', preco: 900.00},
    {id: 3, nome: 'Tênis Puma', preco: 650.00},
    {id: 4, nome: 'Tênis Reebok', preco: 500.00},
];


app.get('/', (req, res) => {
    res.send('Olá, muunnndo!');
})

app.get('/usuario', (req, res) => {
    res.send ('hello joão')
})

app.get('/produto', (req, res) => {
    res.send (produtos);})
 
app.get('/produto/:id', (req, res) => {
    const id = req.params.id;
    const produto = produtos.filter((produto) => produto.id == id);
    res.send(produto)
    
});

app.post('/produto', (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const valor = req.body.valor;

    const novoProduto = {id: id, nome: nome, valor: valor};
    produtos.push(novoProduto);
    res.send("produto cadastrado com sucesso!");

});

// método PUT

app.put("/produto/:id", (req, res) => {
  const idParametro = parseInt(req.params.id); // 1. Pegamos o id da URL e transformamos em número

  const {id, nome, valor } = req.body;   // 2. Pegamos os novos dados enviados no corpo da requisição

  const produto = produtos.find((p) => p.id === idParametro); // 3. Procuramos o produto com esse ID

  if (produto) {
    produto.nome = nome;     // 4. Atualizamos o nome do produto

    produto.valor = valor;   // 5. Atualizamos o valor do produto

    produto.id = id;

    res.send("Produto atualizado com sucesso"); // 6. Enviamos mensagem de sucesso
  }
  else {
    res.status(404).send("Produto não encontrado"); // 7. Se não encontrar, avisamos que não existe
  }
});

//metrodo PATCH


app.patch("/produtos/:id", (req, res) => {
  const idParametro = parseInt(req.params.id);
  const produto = produtos.find((p) => p.id === idParametro);

  if (!produto) {
    return res.status(404).send("Produto não encontrado");
  }

  const { id, nome, valor } = req.body;

  if (nome !== undefined) produto.nome = nome;
  if (valor !== undefined) produto.valor = valor;
  if (id !== undefined) produto.id = id;


  res.send("Produto atualizado com sucesso (PATCH)");
});


// método DELETE 

app.delete("/produto/:id", (req, res) => {
  const id = parseInt(req.params.id); // 1. Pegamos o ID da URL
  
  const index = produtos.findIndex((p) => p.id === id); // 2. Procuramos o índice (posição) do produto

  if (index !== -1) {
    produtos.splice(index, 1); // 3. Removemos o produto da lista com splice()
    res.send("Produto removido com sucesso"); // 4. Enviamos mensagem de sucesso
  }
  else {
    res.status(404).send("Produto não encontrado"); // 5. Se não achar, enviamos erro
  }
});



app.listen(port, () => {
    console.log('servidor está funcionando em http://localhost:' + port);
});

