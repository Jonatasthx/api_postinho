const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let pacientes = [
  { ficha: 1, dados: { nome: 'maria do rosario', status: 'atendido(a)' } },
  { ficha: 2, dados: { nome: 'bob da silva', status: 'em espera' } },
  { ficha: 3, dados: { nome: 'Thx So Much', status: 'atendido(a)' } }
];

// get - listar todos
app.get('/pacientes', (req, res) => {
  res.json(pacientes);
});

// get - buscar por ficha
app.get('/pacientes/:ficha', (req, res) => {
  const ficha = parseInt(req.params.ficha);
  const paciente = pacientes.find(i => i.ficha === ficha);
  if (paciente) {
    res.json(paciente);
  } else {
    res.status(404).json({ error: 'Paciente não encontrado' });
  }
});

// post - adicionar novo paciente
app.post('/pacientes', (req, res) => {
  const { nome, status } = req.body;

  if (!nome || !status) {
    return res.status(400).json({ error: 'Nome e status são obrigatórios' });
  }

  const novoPaciente = {
    ficha: pacientes.length + 1,
    dados: { nome, status }
  };

  pacientes.push(novoPaciente);
  res.status(201).json(novoPaciente);
});




app.listen(port, () => {
  console.log(`Servidor em execução: http://localhost:${port}`);
});
