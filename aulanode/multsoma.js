const mult = require('./mult.js');

const horaTrabalhada = 4;
const valorHora = 100;
const salario = mult(horaTrabalhada, valorHora);

console.log(`O salário é: ${salario}`);