import express, { json, Router } from "express";
import config from "./config";
import { getMailController } from "./controllers/mailController";
import { getGprcMailClient } from "./client/gprcMailClient";

const app = express();
app.use(json());

// Clients
const grpcMailClient = getGprcMailClient();

// Controllers
const mailController = getMailController(grpcMailClient);

const router = Router();
const routes = {
  mail: "/mail"
};

router.post(routes.mail, mailController.sendEmail);

app.use("/api/v1", router);

// (async function () {
//   const credentials = await nodemailer.createTestAccount();
//   console.log(credentials);
// })();

const apiPort = process.env.PORT || config.api.port;
app.listen(apiPort, () => {
  console.log(`api server is listening at http://localhost:${apiPort}`);
});
