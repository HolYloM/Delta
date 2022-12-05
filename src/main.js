const fs = require("fs");
const path = require("path");
const mqtt = require("mqtt");
const Queue = require("queue-fifo");
const child_process = require("child_process");

const useLocalHost = false;

const MqttConnectionString = useLocalHost
  ? "mqtt://127.0.0.1:1883"
  : "mqtt://YOUR_CONNECTION_STRING:1883";
const client = mqtt.connect(MqttConnectionString, {
  clientId: "robot",
  client: "ROBOT",
});

const topic = "Delta";

client.on("connect", function () {
  console.log("Connection established.");
});

console.log(`Publishing test message to ${topic}`);
client.publish(topic, "Test message");

const command = "sudo xboxdrv --detach-kernel-driver";
const child = child_process.spawn(command).on("error", (err) => {
  console.error(`Run into error: ${err}`);
});
let lastData = undefined;
child.stdout.on("data", function (data) {
  //Here is where the output goes

  console.log("stdout: " + data);

  data = data.toString();
  if (data !== lastData) {
    client.publish(topic, data);
  }
  lastData = data;
});
