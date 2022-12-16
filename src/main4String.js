const mqtt = require("mqtt");
const child_process = require("child_process");

const argv = process.argv.slice(2);
const MqttConnectionString = argv[0] || "mqtt://127.0.0.1:1883";
console.log("using MQTT-Server" + MqttConnectionString);
const client = mqtt.connect(MqttConnectionString, {
  clientId: "robot",
  client: "ROBOT",
});

const topicX1 = "Delta/X1";
const topicY1 = "Delta/Y1";
const topicX2 = "Delta/X2";
const topicY2 = "Delta/Y2";
client.on("connect", function () {
  console.log("Connection established.");
});

console.log(`Publishing test message to ${topicX1}`);
client.publish(topicX1, "Test message");
client.publish(topicY1, "Test message");
client.publish(topicX2, "Test message");
client.publish(topicY2, "Test message");

const child = child_process
  .spawn("xboxdrv", ["--detach-kernel-driver"])
  .on("error", (err) => {
    console.error(`Run into error: ${err}`);
  });
let lastData = undefined;
child.stdout.on("data", function (data) {
  //Here is where the output goes

  //console.log("stdout: " + data);              //uncomment to show all data

  data = data.toString();
  if (data !== lastData) {
    console.log("stdout: " + data); //uncomment to show data only an change
    const regex =
      /X1\:[ ]*([-\d]+)[ ]*Y1\:[ ]*([-\d]+)[ ]*X2\:[ ]*([-\d]+)[ ]*Y2\:[ ]*([-\d]+)[ ]*A\:[ ]*([-\d]+)/gi;
    const matches = regex.exec(data);
    if (!matches) {
      console.log("no match for " + data);
      return;
    }
    //const msg = `${matches[1]}:${matches[2]}:${matches[3]}:${matches[4]}`;
    client.publish(topicX1, `${matches[1]}`);
    client.publish(topicY1, `${matches[2]}`);
    client.publish(topicX2, `${matches[3]}`);
    client.publish(topicY2, `${matches[4]}`);
    client.publish(topicA, `${matches[5]}`);
  }
  lastData = data;
});
