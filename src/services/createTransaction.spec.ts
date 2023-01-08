import { describe, expect, it } from "vitest";
import { createTransaction } from "./createTransaction";
import { enumCard } from "../entities/Transaction";
import { inMemoryDbCreateTransaction } from "../respositories/Transaction/inMemoryDbCreateTransaction";

describe("Using creaTransactionService", () => {
  it("Should return fee=3, totalValue=100 ans statusCode 201", async () => {
    const dbMemory = new inMemoryDbCreateTransaction();
    const serviceCreate = new createTransaction(dbMemory);
    const response = await serviceCreate.execute({
      body: {
        value: 100,
        desc: "idk",
        payment_method: enumCard.DEBIT_CARD,
        expiration_date_card: "01-25",
        cvv: 542,
        owner_card: "felipe",
        card_number: "5503550355031457",
      },
    });

    expect(response.statusCode).toEqual(201);
    expect(response.data).toEqual("Created");
    expect(dbMemory.itemPayable).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fee: 3,
          totalValue: 100,
        }),
      ])
    );
  });
  it("Should return fee=5, totalValue=100 ans statusCode 201", async () => {
    const dbMemory = new inMemoryDbCreateTransaction();
    const serviceCreate = new createTransaction(dbMemory);
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
    expect(dbMemory.itemPayable).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fee: 5,
          totalValue: 100,
        }),
      ])
    );
  });
});
