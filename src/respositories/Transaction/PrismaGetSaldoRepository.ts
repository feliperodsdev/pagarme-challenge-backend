import { prisma } from "../../prismaClient";
import { IgetSaldoRepository, IsaldoInfo } from "../../services/getAmount";

export class PrismaGetSaldo implements IgetSaldoRepository {
  async get(): Promise<IsaldoInfo> {
    const saldoDebit = await prisma.payable.findMany({
      where: {
        status: 2,
      },
    });
    let available = 0;
    saldoDebit.forEach((payable) => (available += payable.value));
    console.log(saldoDebit);
    const saldoCredit = await prisma.payable.findMany({
      where: {
        status: 1,
      },
    });
    let credit = 0;
    saldoCredit.forEach((payable) => (credit += payable.value));
    return {
      available: available,
      waiting_funds: credit,
    };
  }
}
