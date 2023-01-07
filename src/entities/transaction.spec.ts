import { enumCard, Transaction } from "./Transaction";
import { describe, expect, it } from "vitest";

describe("Create Transaction", () => {
  it("Should be able to create an transaction", () => {
    const transaction = new Transaction({
      value: 57,
      desc: "sei la",
      payment_method: enumCard.CREDIT_CARD,
      card_number: "5502550255021457",
      owner_card: "Felipe",
      expiration_date_card: "01-23",
      cvv: 547,
    });
    expect(transaction).toBeInstanceOf(Transaction);
    expect(transaction.getCardNumber).toEqual("1457");
  });
});
