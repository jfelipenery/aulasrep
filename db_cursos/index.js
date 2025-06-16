const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const alunoRoutes = require('./routes/alunos');
const cursoRoutes = require('./routes/cursos');
const userRoutes = require('./routes/user');
const funcionarioRoutes = require('./routes/funcionarios');


dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/cursos', cursoRoutes);
app.use('/alunos', alunoRoutes);
app.use('/users', userRoutes);
app.use('/funcionarios', funcionarioRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
