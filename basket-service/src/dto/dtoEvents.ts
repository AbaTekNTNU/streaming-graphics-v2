import fetch from "node-fetch";
import * as process from "process";

const bffUrl = process.env.BFF_URL ?? "http://localhost:4000";

console.log(`Using BFF URL: ${bffUrl}`);

const sendMessage = (type: string, message: object) => {
  try {
    fetch(`${bffUrl}/basket`, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        type,
        payload: message,
      }),
    });
  } catch (e) {
    console.log("pushing data failing");
  }
};

export { sendMessage };
