-- CreateEnum
CREATE TYPE "MailPurpose" AS ENUM ('Registration', 'Promotional', 'Notification');

-- CreateTable
CREATE TABLE "mail" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "purpose" "MailPurpose" NOT NULL,

    CONSTRAINT "mail_pkey" PRIMARY KEY ("id")
);
