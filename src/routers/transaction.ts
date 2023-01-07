import express from "express";
import { PrismaCreateTransaction } from "../respositories/PrismaCreateTransactionRespository";
import { createTransaction } from "../services/createTransaction";
export const transactionRouter = express.Router();

transactionRouter.post("/create", async (req, res) => {
  const createTransactionRepository = new PrismaCreateTransaction();
  const createTransactionService = new createTransaction(
    createTransactionRepository
  );
  const response = await createTransactionService.execute(req);
  res.status(response.statusCode).send(response.data);
});
