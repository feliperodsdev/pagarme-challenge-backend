import { enumStatus, Payable } from "../../entities/Payable";
import { Transaction } from "../../entities/Transaction";
import { prisma } from "../../prismaClient";
import { ICreateTransactionRepository } from "../../services/createTransaction";

export class PrismaCreateTransaction implements ICreateTransactionRepository {
  async createTransaction(transaction: Transaction): Promise<void> {
    let payment;
    if (transaction.getProps.payment_method == 1) {
      payment = enumStatus.WAITING_FUNDS;
    } else payment = enumStatus.PAID;
    const payable = new Payable({
      totalValue: transaction.getProps.value,
      status: payment,
    });

    await prisma.transaction.create({
      data: {
        card_number: transaction.getProps.card_number,
        cvv: transaction.getProps.cvv,
        expiration_date_card: transaction.getProps.expiration_date_card,
        value: transaction.getProps.value,
        owner_card: transaction.getProps.owner_card,
        desc: transaction.getProps.desc,
        payment_method: transaction.getProps.payment_method,
        payables: {
          create: {
            fee: payable.getProps.fee ?? 0,
            status: payable.getProps.status,
            total_value: payable.getProps.totalValue,
            value: payable.getProps.value ?? 0,
            payment_date: payable.getProps.date ?? "null",
          },
        },
      },
    });
  }
}
