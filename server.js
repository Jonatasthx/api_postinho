const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let pacientes = [
  { ficha: 1, dados: { nome: 'maria do rosario', status: 'atendido(a)' } },
  { ficha: 2, dados: { nome: 'bob da silva', status: 'em espera' } },
  { ficha: 3, dados: { nome: 'Thx So Much', status: 'em atendimento' } }
];


app.get('/pacientes', (req, res) => {
  const { status } = req.query;
  if (status) {
    const filtro = pacientes.filter(p => p.dados.status === status);
    return res.json(filtro);
  } else {
      res.status(404).json({ error: 'não há ninguém' });
  }
});

app.get('/pacientes', (req, res) => {
  res.json(pacientes);
});


app.get('/pacientes/:ficha', (req, res) => {
  const ficha = parseInt(req.params.ficha);
  const paciente = pacientes.find(i => i.ficha === ficha);
  if (paciente) {
     return res.json(paciente);
  } else {
    res.status(404).json({ error: 'Paciente não encontrado' });
  }
});

/*post - adicionar novo paciente*/
app.post('/pacientes', (req, res) => {
  const { nome, status } = req.body;
  if (!nome || !status) {
    res.status(400).json({ error: 'Nome e status são obrigatórios' });
  }
  const novoPaciente = {
    ficha: pacientes.length + 1,
    dados: { nome, status }
  };
  pacientes.push(novoPaciente);
  res.status(201).json(novoPaciente);
});


/* put - atualização do paciente */
app.put('/pacientes/:ficha', (req, res) => {
  const ficha = parseInt(req.params.ficha);
  const { nome, status } = req.body;

  const paciente = pacientes.find(i => i.ficha === ficha);

  if (!paciente) {
    res.status(404).json({ error: 'Paciente não encontrado' });
  }

  if (nome) paciente.dados.nome = nome;
  if (status) paciente.dados.status = status;

  res.json({ message: 'Paciente atualizado', paciente });
});


/*apagar cpf*/
app.delete('/pacientes/:ficha', (req, res) => {
  const ficha = parseInt(req.params.ficha);
  const index = pacientes.findIndex(i => i.ficha === ficha);
  if ( index !== -1 ){
    const pacienteApagado = pacientes.splice(index, 1);
    res.json(pacienteApagado[0]);
  } else {
      res.status(404).json({ error: 'Paciente não encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor em execução: http://localhost:${port}`);
});