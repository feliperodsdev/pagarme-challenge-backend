import {
  badRequest,
  created,
  HttpRequest,
  HttpResponse,
  serverError,
} from "../helpers";
import { enumCard, Transaction } from "../entities/Transaction";

interface CreateTransactionParams {
  value: number;
  desc: string;
  payment_method: enumCard;
  card_number: string;
  owner_card: string;
  expiration_date_card: string;
  cvv: number;
}

interface IcreateTransactionService {
  execute(
    HttpRequest: HttpRequest<CreateTransactionParams>
  ): Promise<HttpResponse<string | number | undefined>>;
}

export interface ICreateTransactionRepository {
  createTransaction(transaction: Transaction): void;
}

export class createTransaction implements IcreateTransactionService {
  constructor(
    private readonly createTransactionRepository: ICreateTransactionRepository
  ) {}
  async execute(
    HttpRequest: HttpRequest<CreateTransactionParams>
  ): Promise<HttpResponse<string | number | undefined>> {
    try {
      if (!HttpRequest.body) {
        return badRequest<string>(`Body Not Found`);
      }

      const requiredFields = [
        "value",
        "desc",
        "payment_method",
        "card_number",
        "owner_card",
        "expiration_date_card",
        "cvv",
      ];

      for (const field of requiredFields) {
        if (
          !HttpRequest?.body?.[field as keyof CreateTransactionParams] ||
          field.trim() == ""
        ) {
          return badRequest<string>(`${field} Is Required`);
        }
      }

      this.createTransactionRepository.createTransaction(
        new Transaction(HttpRequest.body)
      );

      return created<string>("Created");
    } catch (e) {
      return serverError();
    }
  }
}
