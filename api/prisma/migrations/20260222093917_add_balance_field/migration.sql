-- CreateTable
CREATE TABLE "monitored_wallets" (
    "id" SERIAL NOT NULL,
    "address" VARCHAR(42) NOT NULL,
    "label" VARCHAR(100),
    "balance" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "monitored_wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" BIGSERIAL NOT NULL,
    "hash" VARCHAR(66) NOT NULL,
    "from_address" VARCHAR(42) NOT NULL,
    "to_address" VARCHAR(42) NOT NULL,
    "value" DECIMAL(78,0) NOT NULL,
    "block_number" BIGINT NOT NULL,
    "block_timestamp" TIMESTAMPTZ(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "monitored_wallets_address_key" ON "monitored_wallets"("address");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_hash_key" ON "transactions"("hash");

-- CreateIndex
CREATE INDEX "idx_tx_from" ON "transactions"("from_address");

-- CreateIndex
CREATE INDEX "idx_tx_timestamp" ON "transactions"("block_timestamp" DESC);

-- CreateIndex
CREATE INDEX "idx_tx_to" ON "transactions"("to_address");
