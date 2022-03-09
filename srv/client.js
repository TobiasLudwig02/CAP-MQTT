const mqtt = require("mqtt");
//const axios = require("axios");
//const oauth = require("axios-oauth-client");
//const https = require("https");
//const config = require("../config");
//const credentials = require("./lib/credentials");

module.exports = (endpoint) => {

    //const targetAgent = new https.Agent({ maxSockets: 1 });

    const client = mqtt.connect("mqtt://broker.hivemq.com");

    client.on("connect", () => {
        console.log("[INFO] Connected to MQTT broker");
        client.subscribe("presence");
    });
    client.on("error", (error) => {
        console.error(`[ERROR] Connection couldn't be established: ${error}`);
    });
    client.on("close", () => {
        console.log(`[INFO] Disconnected from MQTT broker`);
    });
    client.on("message", async (topic, message) => {
        console.log(`[INFO] Received MQTT message: "${message}"`);

        // const targetCred = await credentials.get("integration-suite");

        // get bearer token
        //const authResponse = await oauth.client(axios.create(), {
          //  url: config.targetTokenUrl,
            //client_id: targetCred.username,
            //client_secret: targetCred.password,
            //grant_type: "client_credentials"
        //})();

        // invoke integration flow
        //try {
          //  const response = await axios.post(config.targetUrl, message, {
            //    headers: {
              //      "Authorization": `Bearer ${authResponse.access_token}`,
                //    "Content-Type": "text/plain"
              //},

                //httpsAgent: targetAgent
            //});
            //console.log(`[INFO] Successfully invoked integration flow: Received response "${response.data}"`);

  //      } catch (error) {
    //        console.error(`[ERROR] Failed to invoke integration flow: ${error}`);
      //  }
    });

    // OData functions

    endpoint.on("start", () => {
        if (client.connected) {
            return "Service already running";
        }
        client.reconnect();
        return "Service started";
    });

    endpoint.on("stop", () => {
        if (!client.connected) {
            return "Service not running";
        }
        client.end();
        return "Service stopped";
    });

    endpoint.on("isRunning", () => {
        return client.connected;
    });
}