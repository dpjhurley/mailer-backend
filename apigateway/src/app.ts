import express, { json, Router } from "express";
import cors from "cors";
import config from "./config";
import { getMailController } from "./controllers/emailController";
import { getGprcMailClient } from "./client/gprcMailClient";
import { sendEmailMiddleware } from "./middleware/emailMiddleware";

const app = express();
app.use(json());
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);

// Clients
const grpcMailClient = getGprcMailClient();

// Controllers
const mailController = getMailController(grpcMailClient);

const router = Router();
const routes = {
  mail: "/mail"
};
router.post(routes.mail, sendEmailMiddleware, mailController.sendEmail);

app.use("/api/v1", router);

const apiPort = config.apiPort;
app.listen(apiPort, () => {
  console.log(`apigateway is listening at http://localhost:${apiPort}`);
});
