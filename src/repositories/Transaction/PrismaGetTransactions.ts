import { prisma } from "../../prismaClient";
import {
  IgetTransactionsRepository,
  TransactionReturn,
} from "../../services/getTransactions";

export class PrismaGetTransactions implements IgetTransactionsRepository {
  async getTransactions(): Promise<TransactionReturn[]> {
    const list = await prisma.transaction.findMany();
    return list;
  }
}
