import express from "express";
import { transactionRouter } from "./routers/transaction";
export const app = express();

app.use(express.json());

app.use("/transactions", transactionRouter);

app.listen(3333, () => console.log("Running"));
