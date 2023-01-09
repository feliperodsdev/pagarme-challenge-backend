import { prisma } from "../../prismaClient";
import { IgetSaldoRepository, IsaldoInfo } from "../../services/getAmount";

export class PrismaGetSaldo implements IgetSaldoRepository {
  async get(): Promise<IsaldoInfo> {
    const saldoDebit = await prisma.payable.findMany({
      where: {
        status: 2,
      },
    });
    const available = saldoDebit.reduce(function (accumulator, object) {
      return accumulator + object.value;
    }, 0);

    const saldoCredit = await prisma.payable.findMany({
      where: {
        status: 1,
      },
    });
    const waiting_funds = saldoCredit.reduce(function (accumulator, object) {
      return accumulator + object.value;
    }, 0);

    return {
      available,
      waiting_funds,
    };
  }
}
