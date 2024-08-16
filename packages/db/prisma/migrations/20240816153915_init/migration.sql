-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hostellers" (
    "id" SERIAL NOT NULL,
    "Fname" TEXT NOT NULL,
    "Lname" TEXT NOT NULL,
    "Rollno" TEXT NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Hostellers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outpass" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rollNo" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "StartTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "outpass_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- AddForeignKey
ALTER TABLE "outpass" ADD CONSTRAINT "outpass_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Hostellers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
