const io = require("socket.io-client");

const socket = io("http://localhost:8080");

socket.on("toggle", (data) => {
  console.log(data);
});