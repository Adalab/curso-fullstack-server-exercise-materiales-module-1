#!/usr/bin/env node
// Fichero src/index.js

// Importamos los dos módulos de NPM necesarios para trabajar
const express = require('express');
const cors = require('cors');

// Creamos el servidor
const server = express();

// Configuramos el servidor
server.use(cors());
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded());
server.set('view engine', 'ejs');

// Arrancamos el servidor en el puerto indicado o en 3000
const serverPort = process.env.PORT || 3000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// Endpoints
server.get('/', showParams);
server.post('/', showParams);
server.put('/', showParams);
server.delete('/', showParams);


// Common functions
function showParams(req, res) {
  console.log(req.headers);

  let dataOrigin = req.headers['content-type'];
  if( dataOrigin === 'application/x-www-form-urlencoded' ) {
    dataOrigin = 'Formulario web';
  }
  else if( dataOrigin === 'application/json' ) {
    dataOrigin = 'Fetch que envía datos json';
  }

  res.render('showParams', {
    method: req.method,
    dataOrigin: dataOrigin,
    referer: req.headers['referer'],
    queryParams: req.query,
    bodyParams: req.body
  });
}

server.get("/test", (req, res) => {
  res.render("test");
});