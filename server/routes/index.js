import { Router } from "express";
import Bot from "../controllers/bot";

const botRouter = Router();

botRouter.use("/ebot", botRouter);
botRouter.post("/api", Bot.MessageResponse);

export default botRouter;
