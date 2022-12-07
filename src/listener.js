const mqtt = require("mqtt");
const child_process = require("child_process");

const argv = process.argv.slice(2);
const MqttConnectionString = argv[0] || "mqtt://127.0.0.1:1883";
	console.log ("using MQTT-Server"  + MqttConnectionString);
const client = mqtt.connect(MqttConnectionString, {
  clientId: "robotListener",
  client: "ROBOTLISTENER",
});

const topic = "Delta";

client.on("connect", function () {
  console.log("Connection established.");
  client.subscribe(topic,function(err){
    console.log("Recevied Error:" +err);
    
  });
});

client.on("message", function (topic,message){
  const msgString = message.toString();
  console.log("input: "+msgString);
  const [X1,Y1,X2,Y2] = msgString.split(":");
  console.log("X1: ",X1);
  console.log("X2: ",X2);
  console.log("Y1: ",Y1);
  console.log("Y2: ",Y2);
});
