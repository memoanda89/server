const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");
var cors = require("cors");
const myMessage = [];
const contador = 0;
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = http.createServer(this.app);
    this.io = socketio(this.server, {
      /** configuraiocnes */
    });
    this.sockets = new Sockets(this.io, myMessage, contador);
  }
  middlewares() {
    this.app.use(express.static(path.join(__dirname, "../dist/chatPrueba")));
    this.app.use(express.json());
    this.app.use(cors());
    this.app.get("/getTotalUsers", (req, res) => {
      res.json({
        total: this.sockets.getUserOnline(),
      });
    });
  }

  execute() {
    this.middlewares();
    this.server.listen(this.port, () => {
      console.log("Server corriendo en el puerto", this.port);
    });
  }
}
module.exports = Server;
