-- CreateTable
CREATE TABLE "prayer" (
    "id" VARCHAR(30) NOT NULL,
    "interceded_for" VARCHAR(500) NOT NULL,
    "good_work" VARCHAR(500) NOT NULL,
    "bad_work" VARCHAR(500) NOT NULL,
    "good_spirit" VARCHAR(500) NOT NULL,
    "bad_spirit" VARCHAR(500) NOT NULL,
    "good_fam" VARCHAR(500) NOT NULL,
    "bad_fam" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prayer_pkey" PRIMARY KEY ("id")
);
