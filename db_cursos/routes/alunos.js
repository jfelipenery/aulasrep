const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Criar alunos
router.post('/', async (req, res) => {
    const { nome, email, cursosId } = req.body;
    try {
        const alunos = await prisma.alunos.create({
            data: { nome, email, cursosId  }
        });
        res.json(alunos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Listar usuários
router.get('/', async (req, res) => {
    const alunos = await prisma.alunos.findMany();
    res.json(alunos);
});
// Listar por ID
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const aluno = await prisma.aluno.findUnique({ where: { id } });
  if (!aluno) return res.status(404).json({ error: 'aluno não encontrado' });
  res.json(aluno);
});


// Atualizar usuário
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, cursosId} = req.body;
    try {
        const aluno = await prisma.aluno.update({
            where: { id: parseInt(id) },
            data: { nome, email, cursosId  }
        });
        res.json(aluno);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// atualizar com Patch
router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const updatedaluno = await prisma.aluno.update({
    where: { id },
    data: req.body
  });
  res.json(updatedaluno);
});


// Deletar usuário
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.aluno.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'aluno deletado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
