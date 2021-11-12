#!/usr/bin/env node
// Fichero src/index.js

// Importamos los dos módulos de NPM necesarios para trabajar
const express = require("express");
const cors = require("cors");

// Creamos el servidor
const server = express();

// Configuramos el servidor
server.use(cors());
server.use(express.json({ limit: '50mb' }));
server.set('view engine', 'ejs');

// Arrancamos el servidor en el puerto indicado o en 3000
const serverPort = process.env.PORT || 3000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// Endpoints
server.get("/", showParams);
server.post("/", showParams);
server.put("/", showParams);
server.delete("/", showParams);


// Common functions
function showParams(req, res) {
  console.log(req.query);
  console.log(req.body);
  console.log(req.method);

  res.render('showParams', {
    method: req.method,
    queryParams: req.query,
    bodyParams: req.body
  })
}