const io = require("socket.io-client");
const SOCKET_ADDRESS = process.env.SOCKET_ADDRESS || "http://localhost:8080";
const socket = io(SOCKET_ADDRESS);

socket.on("connection", () => {
  console.log("Connected to ", SOCKET_ADDRESS);
});

socket.on("toggle", (data) => {
  console.log(data);
});
