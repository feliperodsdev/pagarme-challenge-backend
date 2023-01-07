-- DropForeignKey
ALTER TABLE "payables" DROP CONSTRAINT "payables_transaction_id_fkey";

-- AddForeignKey
ALTER TABLE "payables" ADD CONSTRAINT "payables_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
