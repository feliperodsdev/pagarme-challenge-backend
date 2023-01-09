import express from "express";
import { transactionRouter } from "./routers/transaction";
export const app = express();

app.use(express.json());

app.use("/transactions", transactionRouter);

const main = () => {
  try {
    app.listen(3333, () => console.log("Running"));
  } catch (e) {
    console.log(e);
  }
};

main();
