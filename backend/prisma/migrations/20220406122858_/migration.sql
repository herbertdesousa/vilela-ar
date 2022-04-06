-- CreateTable
CREATE TABLE "DocumentBlock" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "price" INTEGER,
    "description" TEXT,
    "documentRefBlockNameId" TEXT,

    CONSTRAINT "DocumentBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentRefBlockName" (
    "name" TEXT NOT NULL,

    CONSTRAINT "DocumentRefBlockName_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentRefBlockName_name_key" ON "DocumentRefBlockName"("name");

-- AddForeignKey
ALTER TABLE "DocumentBlock" ADD CONSTRAINT "DocumentBlock_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentBlock" ADD CONSTRAINT "DocumentBlock_documentRefBlockNameId_fkey" FOREIGN KEY ("documentRefBlockNameId") REFERENCES "DocumentRefBlockName"("name") ON DELETE SET NULL ON UPDATE CASCADE;
