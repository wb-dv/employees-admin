-- CreateEnum
CREATE TYPE "JobValue" AS ENUM ('director', 'financeDirector', 'technialDirector', 'marketingDirector', 'headOfHR', 'manager', 'teamLeader', 'juniorDeveloper', 'developer', 'seniorDeveloper', 'accountant', 'seniorAccountant', 'chiefAccountant', 'markentingAndAdvertisingManager', 'assistantOfMarketing', 'brandAmbassador', 'juniorAnalyst', 'analyst', 'seniorAnalyst', 'seoSpecialist', 'targetAdvertisingSpecialist', 'copywriter', 'hrManager', 'hrInspector', 'recruiter');

-- CreateEnum
CREATE TYPE "GroupValue" AS ENUM ('management', 'development', 'marketing', 'accounting', 'hr');

-- CreateTable
CREATE TABLE "Worker" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "jobTitleId" "JobValue" NOT NULL,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobTitle" (
    "value" "JobValue" NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "JobTitle_pkey" PRIMARY KEY ("value")
);

-- CreateTable
CREATE TABLE "Group" (
    "value" "GroupValue" NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("value")
);

-- CreateTable
CREATE TABLE "_GroupToWorker" (
    "A" "GroupValue" NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_GroupToJobTitle" (
    "A" "GroupValue" NOT NULL,
    "B" "JobValue" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Worker_phone_key" ON "Worker"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Worker_email_key" ON "Worker"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToWorker_AB_unique" ON "_GroupToWorker"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToWorker_B_index" ON "_GroupToWorker"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToJobTitle_AB_unique" ON "_GroupToJobTitle"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToJobTitle_B_index" ON "_GroupToJobTitle"("B");

-- AddForeignKey
ALTER TABLE "Worker" ADD CONSTRAINT "Worker_jobTitleId_fkey" FOREIGN KEY ("jobTitleId") REFERENCES "JobTitle"("value") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToWorker" ADD CONSTRAINT "_GroupToWorker_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("value") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToWorker" ADD CONSTRAINT "_GroupToWorker_B_fkey" FOREIGN KEY ("B") REFERENCES "Worker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToJobTitle" ADD CONSTRAINT "_GroupToJobTitle_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("value") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToJobTitle" ADD CONSTRAINT "_GroupToJobTitle_B_fkey" FOREIGN KEY ("B") REFERENCES "JobTitle"("value") ON DELETE CASCADE ON UPDATE CASCADE;
