import express from "express";
import { PrismaCreateTransaction } from "../respositories/Transaction/PrismaCreateTransactionAndPayableRespository";
import { PrismaGetSaldo } from "../respositories/Transaction/PrismaGetSaldoRepository";
import { createTransaction } from "../services/createTransaction";
import { getSaldo } from "../services/getSaldo";
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
  const getSaldoService = new getSaldo(getSaldoRepository);

  const response = await getSaldoService.execute();

  res.status(response.statusCode).send(response.data);
});
