const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verificarToken = require('../middleware/verificartoken');
require('dotenv').config();

const prisma = new PrismaClient();

// Criar funcionarios
router.post('/login', async (req, res) => {
  const {  nome, matricula } = req.body;


  console.log('Login attempt:', { nome, matricula });

  try {
    const funcionarios = await prisma.funcionarios.findUnique({ where: { matricula } });
    if (!funcionarios) return res.status(404).json({ error: 'Usuário não encontrado' });
    console.log('Funcionário encontrado:', funcionarios);
    const matriculaConfere = await bcrypt.compare(matricula, funcionarios.matricula);
    console.log('Matrícula conferida:', matriculaConfere);
    if (!matriculaConfere) return res.status(401).json({ error: 'matricula incorreta' });

    // Gerar token JWT
    const token = jwt.sign({ id: funcionarios.id, nome: funcionarios.nome }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      message: 'Login realizado com sucesso',
      token,
      funcionarios: { id: funcionarios.id, nome: funcionarios.nome, cargo: funcionarios.cargo, matricula: funcionarios.matricula },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
    const { nome, cargo, matricula } = req.body;
    const hashedPassword = await bcrypt.hash(matricula, 10);
    try {
        const funcionarios = await prisma.funcionarios.create({
            data: { nome, cargo, matricula: hashedPassword } 
        });
        res.json(funcionarios);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});




router.get('/', verificarToken, async (req, res) => {
  const funcionarioss = await prisma.funcionarios.findMany();
  res.json(funcionarioss);
});

// 🔎 LISTAR POR ID
router.get('/:id', verificarToken, async (req, res) => {
  const id = Number(req.params.id);
  const funcionarios = await prisma.funcionarios.findUnique({ where: { id } });
  if (!funcionarios) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(funcionarios);
});

// 🔄 ATUALIZAR usuário
router.put('/:id', verificarToken, async (req, res) => {
  const { id } = req.params;
  const { nome, cargo, matricula  } = req.body;
  const hashedPassword = await bcrypt.hash(matricula, 10);
  try {
    const funcionarios = await prisma.funcionarios.update({
      where: { id: parseInt(id) },
      data: { nome, cargo, matricula  },
    });
    res.json(funcionarios);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✏️ ATUALIZAR com PATCH
router.patch('/:id', verificarToken, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const updatedfuncionarios = await prisma.funcionarios.update({
      where: { id },
      data: req.body,
    });
    res.json(updatedfuncionarios);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ❌ DELETAR usuário
router.delete('/:id', verificarToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.funcionarios.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'funcionario deletado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
