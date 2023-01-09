import { Transaction } from "@prisma/client";
import { HttpResponse, ok, serverError } from "../helpers";

export interface IgetTransactionsService {
  execute(): Promise<HttpResponse<TransactionReturn[] | string>>;
}

export interface TransactionReturn {
  id: number;
  value: number;
  desc: string;
  payment_method: number;
  card_number: string;
  owner_card: string;
  expiration_date_card: string;
  cvv: number;
}

export interface IgetTransactionsRepository {
  getTransactions(): Promise<TransactionReturn[]>;
}

export class getTransaction implements IgetTransactionsService {
  constructor(
    private readonly getTransactionRespository: IgetTransactionsRepository
  ) {}
  async execute(): Promise<HttpResponse<TransactionReturn[] | string>> {
    try {
      const list = await this.getTransactionRespository.getTransactions();

      return ok<TransactionReturn[]>(list);
    } catch (e) {
      return serverError();
    }
  }
}
