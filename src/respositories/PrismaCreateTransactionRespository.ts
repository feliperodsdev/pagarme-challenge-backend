import { Transaction } from "../entities/Transaction";
import { prisma } from "../prismaClient";
import { ICreateTransactionRepository } from "../services/createTransaction";

export class PrismaCreateTransaction implements ICreateTransactionRepository {
  async createTransaction(transaction: Transaction): Promise<void> {
    await prisma.transaction.create({ data: transaction.getProps });
  }
}
