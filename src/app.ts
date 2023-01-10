import express from "express";
import { transactionRouter } from "./routers/transaction";
export const app = express();
import cron from "node-cron";
import { PrismaUpdatePayable } from "./repositories/Transaction/PrismaUpdatePayables";
const updatePayblesRepository = new PrismaUpdatePayable();

app.use(express.json());

app.use("/transactions", transactionRouter);

const main = () => {
  try {
    cron.schedule("0 0 * * *", function () {
      updatePayblesRepository.update();
      console.log("Running task at midnight.");
    });
    app.listen(3333, () => console.log("Running"));
  } catch (e) {
    console.log(e);
  }
};

main();
