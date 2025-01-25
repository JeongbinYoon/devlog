-- CreateTable
CREATE TABLE "VisitCount" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "VisitCount_pkey" PRIMARY KEY ("id")
);
