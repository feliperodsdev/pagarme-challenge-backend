import { HttpRequest, HttpResponse } from "../helpers";
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
        return {
          statusCode: 400,
          data: "Body not found",
        };
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
          return {
            statusCode: 400,
            data: `${field} is required`,
          };
        }
      }

      this.createTransactionRepository.createTransaction(
        new Transaction(HttpRequest.body)
      );

      return {
        statusCode: 201,
        data: "Created",
      };
    } catch (e) {
      return {
        statusCode: 500,
        data: "Server Error",
      };
    }
  }
}
