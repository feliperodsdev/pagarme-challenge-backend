import {
  IgetTransactionsRepository,
  TransactionReturn,
} from "../../services/getTransactions";

export class inMemoryDbGetTransaction implements IgetTransactionsRepository {
  public transactions: TransactionReturn[] = [
    {
      id: 1,
      value: 100,
      desc: "idk",
      payment_method: 1,
      card_number: "1457",
      owner_card: "felipe",
      expiration_date_card: "01-25",
      cvv: 542,
    },
  ];
  async getTransactions(): Promise<TransactionReturn[]> {
    return this.transactions;
  }
}
