import { describe, expect, it } from "vitest";
import {
  createTransaction,
  ICreateTransactionRepository,
} from "./createTransaction";
import { enumCard, Transaction } from "../entities/Transaction";

describe("Using creaTransactionService", () => {
  it("Should return statusCode 201", async () => {
    class respositoryTest implements ICreateTransactionRepository {
      createTransaction(transaction: Transaction) {
        console.log(transaction);
      }
    }
    const serviceCreate = new createTransaction(new respositoryTest());
    const response = await serviceCreate.execute({
      body: {
        value: 100,
        desc: "idk",
        payment_method: enumCard.CREDIT_CARD,
        expiration_date_card: "01-25",
        cvv: 542,
        owner_card: "felipe",
        card_number: "5503550355031457",
      },
    });

    expect(response.statusCode).toEqual(201);
    expect(response.data).toEqual("Created");
  });
});
