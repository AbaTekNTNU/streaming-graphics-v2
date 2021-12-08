import fetch from "node-fetch";
import * as process from "process";

const bffUrl = process.env.bffDomain ?? "http://localhost:4000/basket";

const sendMessage = (type: string, message: object) => {
  try {
    fetch(bffUrl, {
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
