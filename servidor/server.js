const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

let estadoSistema = {
  luces: [false, false, false, false], 
  puertas: [false, false], 
  elevador: 1,
  viento: 5
};

// 🚀 Ruta para obtener el estado del sistema
app.get("/estado", (req, res) => {
  res.json(estadoSistema);
});

// 🚀 Ruta para actualizar el estado (Solo el admin puede cambiar)
app.post("/actualizar", (req, res) => {
  estadoSistema = req.body;
  io.emit("estadoActualizado", estadoSistema);  // 🔥 Notifica a todos los usuarios
  res.json({ mensaje: "Estado actualizado" });
});

// 🚀 WebSockets para actualizaciones en tiempo real
io.on("connection", (socket) => {
  console.log("Cliente conectado");
  socket.emit("estadoActualizado", estadoSistema); // Enviar estado inicial
  socket.on("disconnect", () => console.log("Cliente desconectado"));
});

// 🚀 Iniciar el servidor
server.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
