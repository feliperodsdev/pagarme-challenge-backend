import express from "express";
import { PrismaCreateTransaction } from "../repositories/Transaction/PrismaCreateTransactionAndPayableRespository";
import { PrismaGetSaldo } from "../repositories/Transaction/PrismaGetSaldoRepository";
import { PrismaGetTransactions } from "../repositories/Transaction/PrismaGetTransactions";
import { createTransaction } from "../services/createTransaction";
import { getAmount } from "../services/getAmount";
import { getTransaction } from "../services/getTransactions";

export const transactionRouter = express.Router();

transactionRouter.post("/create", async (req, res) => {
  const createTransactionRepository = new PrismaCreateTransaction();
  const createTransactionService = new createTransaction(
    createTransactionRepository
  );
  const response = await createTransactionService.execute(req);

  res.status(response.statusCode).send(response.data);
});

transactionRouter.get("/amount", async (req, res) => {
  const getSaldoRepository = new PrismaGetSaldo();
  const getSaldoService = new getAmount(getSaldoRepository);

  const response = await getSaldoService.execute();

  res.status(response.statusCode).send(response.data);
});

transactionRouter.get("/list", async (req, res) => {
  const getTransactionRepository = new PrismaGetTransactions();
  const getTransactionService = new getTransaction(getTransactionRepository);

  const response = await getTransactionService.execute();

  res.status(response.statusCode).send(response.data);
});
