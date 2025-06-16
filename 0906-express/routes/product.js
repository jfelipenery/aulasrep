const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Criar produtos


router.post('/', async (req, res) => {
    const { name, description, price, stock, user_id } = req.body; // user_id virá do corpo da requisição
    try {
        // Primeiro, verifique se o usuário existe
        const user = await prisma.user.findUnique({
            where: { id: user_id }
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' }); // O erro original dizia 'produto não encontrado', mas é sobre o usuário
        }

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                stock,
                user: {
                    connect: {
                        id: user_id // Conecta o produto ao usuário existente
                    }
                }
            }
        });
        res.json(product);
    } catch (error) {
        // É útil logar o erro completo para depuração
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

// Listar produtos
router.get('/', async (req, res) => {
    const products = await prisma.product.findMany();
    res.json(products);
});
// Listar por ID
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return res.status(404).json({ error: 'produto não encontrado' });
  res.json(product);
});


// Atualizar usuário
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, createdAT, updatedAT } = req.body;
    try {
        const product = await prisma.product.update({
            where: { id: parseInt(id) },
            data: { name, description, price, stock, createdAT, updatedAT }
        });
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// atualizar com Patch
router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const updatedproduct = await prisma.product.update({
    where: { id },
    data: req.body
  });
  res.json(updatedproduct);
});


// Deletar usuário
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.product.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'produto deletado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
