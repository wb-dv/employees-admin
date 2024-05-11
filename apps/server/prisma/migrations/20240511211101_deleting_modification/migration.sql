-- DropForeignKey
ALTER TABLE "Worker" DROP CONSTRAINT "Worker_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Worker" DROP CONSTRAINT "Worker_departamentId_fkey";

-- DropForeignKey
ALTER TABLE "Worker" DROP CONSTRAINT "Worker_jobTitleId_fkey";

-- AlterTable
ALTER TABLE "Worker" ALTER COLUMN "jobTitleId" DROP NOT NULL,
ALTER COLUMN "departamentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Worker" ADD CONSTRAINT "Worker_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Worker" ADD CONSTRAINT "Worker_jobTitleId_fkey" FOREIGN KEY ("jobTitleId") REFERENCES "JobTitle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Worker" ADD CONSTRAINT "Worker_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "Departament"("id") ON DELETE SET NULL ON UPDATE CASCADE;
