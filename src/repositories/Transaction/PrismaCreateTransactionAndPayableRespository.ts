import { Payable } from "../../entities/Payable";
import { Transaction } from "../../entities/Transaction";
import { prisma } from "../../prismaClient";
import { ICreateTransactionRepository } from "../../services/createTransaction";

export class PrismaCreateTransaction implements ICreateTransactionRepository {
  async createTransaction(transaction: Transaction): Promise<void> {
    const payable = new Payable({
      totalValue: transaction.getProps.value,
      status: ((transaction.getProps.payment_method + 1) % 2) + 1,
    });

    if (
      payable.getProps.fee == undefined ||
      payable.getProps.value == undefined ||
      payable.getProps.date == undefined
    )
      throw new Error("field undef");

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
            fee: payable.getProps.fee,
            status: payable.getProps.status,
            total_value: payable.getProps.totalValue,
            value: payable.getProps.value,
            payment_date: payable.getProps.date,
          },
        },
      },
    });
  }
}
