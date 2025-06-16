const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Criar cursos
router.post('/', async (req, res) => {
    const { titulo, cargaHoraria, nivel } = req.body;
    try {
        const cursos = await prisma.cursos.create({
            data: { titulo, cargaHoraria, nivel  }
        });
        res.json(cursos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Listar usuários
router.get('/', async (req, res) => {
    const cursos = await prisma.cursos.findMany();
    res.json(cursos);
});
// Listar por ID
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const curso = await prisma.curso.findUnique({ where: { id } });
  if (!curso) return res.status(404).json({ error: 'curso não encontrado' });
  res.json(curso);
});


// Atualizar usuário
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, cargaHoraria, nivel } = req.body;
    try {
        const curso = await prisma.curso.update({
            where: { id: parseInt(id) },
            data: { titulo, cargaHoraria, nivel  }
        });
        res.json(curso);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// atualizar com Patch
router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const updatedcurso = await prisma.curso.update({
    where: { id },
    data: req.body
  });
  res.json(updatedcurso);
});


// Deletar usuário
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.curso.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'curso deletado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
