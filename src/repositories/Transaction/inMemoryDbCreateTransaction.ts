import { enumStatus, Payable, propsPayable } from "../../entities/Payable";
import { propsTransaction, Transaction } from "../../entities/Transaction";
import { ICreateTransactionRepository } from "../../services/createTransaction";

export class inMemoryDbCreateTransaction
  implements ICreateTransactionRepository
{
  public items: propsTransaction[] = [];
  public itemPayable: propsPayable[] = [];
  async createTransaction(transaction: Transaction): Promise<void> {
    let payment;
    if (transaction.getProps.payment_method == 1) {
      payment = enumStatus.WAITING_FUNDS;
    } else payment = enumStatus.PAID;
    const payable = new Payable({
      totalValue: transaction.getProps.value,
      status: payment,
    });
    this.items.push(transaction.getProps);
    this.itemPayable.push(payable.getProps);
  }
}
