const express = require('express');
const tarefasRoutes = require('../api/routes/tarefasRoutes');
const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.json({ message: 'API de Tarefas OK' });
});

app.use('/tarefas', tarefasRoutes);


app.use((err, req, res, next) => {
  console.error(err);
  if (!res.headersSent) {
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
  }
});


if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}



module.exports = app;