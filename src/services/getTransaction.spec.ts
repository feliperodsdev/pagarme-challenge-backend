import { describe, expect, it } from "vitest";
import { inMemoryDbGetTransaction } from "../repositories/Transaction/inMemoryDbGetTransactions";
import { getTransaction } from "./getTransactions";

describe("Get transaction", () => {
  it("Get transactions", async () => {
    const dbMemory = new inMemoryDbGetTransaction();
    const getTransactionService = new getTransaction(dbMemory);
    const result = await getTransactionService.execute();
    expect(result.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          value: 100,
          desc: "idk",
          payment_method: 1,
          card_number: "1457",
          owner_card: "felipe",
          expiration_date_card: "01-25",
          cvv: 542,
        }),
      ])
    );
  });
});
