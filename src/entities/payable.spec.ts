import { describe, expect, it } from "vitest";
import { enumStatus, Payable } from "./Payable";

describe("Create an Payable", () => {
  it("Should be able to create an Payable with fee 2.5", () => {
    const payable = new Payable({
      totalValue: 50,
      status: enumStatus.WAITING_FUNDS,
    });
    console.log(payable);

    expect(payable.fee).toEqual(2.5);
  });
  it("Should be able to create an Payable with fee 3.0", () => {
    const payable = new Payable({
      totalValue: 100,
      status: enumStatus.PAID,
    });

    console.log(payable);

    expect(payable.fee).toEqual(3.0);
  });
});
