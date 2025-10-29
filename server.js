const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let pacientes = [
  { ficha: 1, dados: { nome: 'maria do rosario', status: 'atendido(a)' } },
  { ficha: 2, dados: { nome: 'bob da silva', status: 'em espera' } },
  { ficha: 3, dados: { nome: 'Thx So Much', status: 'em atendimento' } }
];


// GET - lista todos os pacientes
app.get('/pacientes', (req, res) => {
  if (pacientes.length === 0) {
    console.log('não há pacientes')
    return res.status(404).json({ error: 'Não há pacientes cadastrados' });
  }
  console.log('pacientes listados')
  return res.json(pacientes);
});


// Qtd pacientes 
app.get('/pacientes/count', (req, res) => {
  console.log('quantidade de pacientes foi pega');
  return res.json({ count: pacientes.length });
});


// GET - busca paciente específico
app.get('/pacientes/:ficha', (req, res) => {
  const ficha = parseInt(req.params.ficha);
  const paciente = pacientes.find(i => i.ficha === ficha);

  if (!paciente) {
    console.log('erro')
    return res.status(404).json({ error: 'Paciente não encontrado' });
  }

  res.json(paciente);
});

/*post - adicionar novo paciente*/
app.post('/pacientes', (req, res) => {
  const { nome, status } = req.body;
  if (!nome || !status) {
    console.log('falta de dados')
    return res.status(400).json({ error: 'Nome e status são obrigatórios' });
  }
  let novoPaciente = {
    ficha: pacientes.length + 1,
    dados: { nome, status }
  };
  pacientes.push(novoPaciente);
  console.log('paciente adicionado')
    return res.status(201).json(novoPaciente);
});


// put - atualização do paciente 
app.put('/pacientes/:ficha', (req, res) => {
  const ficha = parseInt(req.params.ficha);
  const { nome, status } = req.body;
  const paciente = pacientes.find(i => i.ficha === ficha);
   if (pacientes.length === 0) {
    return res.status(404).json({ error: 'Não há pacientes cadastrados' });
  }
  if (!paciente) {
    return res.status(404).json({ error: 'Paciente não encontrado' });
  }
  if (nome) paciente.dados.nome = nome;
  if (status) paciente.dados.status = status;
    return res.json({ message: 'Paciente atualizado', paciente });
});


// apagar geral 
app.delete('/pacientes', (req, res) => {
  if (pacientes.length === 0) {
    console.log("Tentaram deletar, mas a lista já estava vazia");
    return res.json({ message: 'Não há pacientes' });
  }

  pacientes = [];
  console.log("Todos os pacientes foram deletados com sucesso");
  console.log('banco de dados zerado')
  return res.json({ message: 'Pacientes deletados' });
});


/*apagar por id*/
app.delete('/pacientes/:ficha', (req, res) => {
  const ficha = parseInt(req.params.ficha);
  const index = pacientes.findIndex(i => i.ficha === ficha);
  if ( index !== -1 ){
    console.log(`paciente ${pacienteApagado} foi deletado`)
const pacienteApagado = pacientes.splice(index, 1);
    
    
    return res.json(pacienteApagado[0]);
    
  }
      return res.status(404).json({ error: 'Paciente não encontrado' });
});

app.listen(port, () => {
  console.log(`Servidor em execução: http://localhost:${port}`);
  console.log(`⠀
⠀⠀⠀⢠⣾⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⣰⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢰⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⣄⣀⣀⣤⣤⣶⣾⣿⣿⣿⡷
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀    Hello, admin!
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀
⣿⣿⣿⡇⠀⡾⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁⠀⠀⠀⠀⠀
⣿⣿⣿⣧⡀⠁⣀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠉⢹⠉⠙⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣀⠀⣀⣼⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠀⠤⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⠿⣿⣿⣿⣿⣿⣿⣿⠿⠋⢃⠈⠢⡁⠒⠄⡀⠈⠁⠀⠀⠀⠀⠀⠀⠀
⣿⣿⠟⠁⠀⠀⠈⠉⠉⠁⠀⠀⠀⠀⠈⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    `)
});