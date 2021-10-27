const io = require("socket.io-client");
const SOCKET_ADDRESS =
  process.env.SOCKET_ADDRESS || "http://192.168.0.132:8080";
const socket = io(SOCKET_ADDRESS);
var gpio = require("gpio");

const express = require("express");
const app = express();
const port = 80;

socket.on("toggle", (data) => {
  console.log(data);
  toogleData(data);
});

var gpio24 = gpio.export(24, {
  direction: gpio.DIRECTION.OUT,
});
var gpio25 = gpio.export(25, {
  direction: gpio.DIRECTION.OUT,
});

var gpio16 = gpio.export(16, {
  direction: gpio.DIRECTION.IN,
  ready: function () {
    gpio16.on("change", function (val) {
      toogleData("gpio25");
      socket.emit("toggle", "gpio24");
    });
  },
});

var gpio13 = gpio.export(17, {
  direction: gpio.DIRECTION.IN,
  ready: function () {
    gpio13.on("change", function (val) {
      toogleData("gpio24");
      socket.emit("toggle", "gpio24");
    });
  },
});

const datas = {
  gpio24,
  gpio25,
  gpio16,
  gpio13,
};

/**
 *
 * gpio24 1 + 0
 */

function toogleData(key, initialValue) {
  if (datas[key]) {
    if (initialValue !== undefined) {
      datas[key].set(Number(initialValue));
      return;
    }
    const newValue = datas[key].value === 1 ? 0 : 1;
    datas[key].set(newValue);
  }
}

app.get("/start", (req, res) => {
  if (req.query.id) {
    toogleData("gpio" + req.query.id, req.query.value);
  }
  res.json({});
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
