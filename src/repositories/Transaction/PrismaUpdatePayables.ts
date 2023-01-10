import { prisma } from "../../prismaClient";

export interface IPrismaUpdatePayable {
  update(): Promise<void>;
}

export class PrismaUpdatePayable implements IPrismaUpdatePayable {
  async update(): Promise<void> {
    const today = new Date();
    today.setDate(today.getDate());
    console.log(today);
    await prisma.payable.updateMany({
      where: {
        payment_date: today,
      },
      data: { status: 2 },
    });
  }
}
