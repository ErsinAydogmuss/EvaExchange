import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      username: "ersinas",
      name: "Ersin",
      surname: "Aydogmus",
      phone: "05443774658",
      email: "ersin@hotmail.com",
      password: "aQfg523nt48AOFJOk3FH7h-asf",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "alisa",
      name: "Ali",
      surname: "Sayın",
      phone: "05443774657",
      email: "ali@hotmail.com",
      password: "aQfg523nt48AOFJOk3FH7h-asf",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      username: "mehmet",
      name: "Mehmet",
      surname: "Yılmaz",
      phone: "05443774656",
      email: "mehmet@hotmail.com",
      password: "aQfg523nt48AOFJOk3FH7h-asf",
    },
  });

  const user4 = await prisma.user.create({
    data: {
      username: "ayse",
      name: "Ayşe",
      surname: "Kaya",
      phone: "05443774655",
      email: "ayse@gmail.com",
      password: "aQfg523nt48AOFJOk3FH7h-asf",
    },
  });

  const user5 = await prisma.user.create({
    data: {
      username: "fatma",
      name: "Fatma",
      surname: "Yıldız",
      phone: "05443774654",
      email: "fatma@gmail.com",
      password: "aQfg523nt48AOFJOk3FH7h-asf",
    },
  });

  // Create portfolios
  const portfolio1 = await prisma.portfolio.create({
    data: {
      userId: user1.id,
      wallet: 20000,
    },
  });

  const portfolio2 = await prisma.portfolio.create({
    data: {
      userId: user2.id,
      wallet: 15000,
    },
  });

  const portfolio3 = await prisma.portfolio.create({
    data: {
      userId: user3.id,
      wallet: 30000,
    },
  });

  const portfolio4 = await prisma.portfolio.create({
    data: {
      userId: user4.id,
      wallet: 25000,
    },
  });

  const portfolio5 = await prisma.portfolio.create({
    data: {
      userId: user5.id,
      wallet: 35000,
    },
  });

  // Create stocks
  const stock1 = await prisma.stock.create({
    data: {
      symbol: "TSM",
      name: "Taiwan Semiconductor Manufacturing Company Ltd.",
      currentPrice: 50.75,
      price_impact_factor: 0.00123,
    },
  });

  const stock2 = await prisma.stock.create({
    data: {
      symbol: "JPM",
      name: "JP Morgan Chase & Co. Common Stock (JPM)",
      currentPrice: 75.5,
      price_impact_factor: 0.00234,
    },
  });

  const stock3 = await prisma.stock.create({
    data: {
      symbol: "DEF",
      name: "DEF Ltd",
      currentPrice: 100.25,
      price_impact_factor: 0.00345,
    },
  });

  const stock4 = await prisma.stock.create({
    data: {
      symbol: "GHI",
      name: "GHI Co",
      currentPrice: 125.5,
      price_impact_factor: 0.00456,
    },
  });

  const stock5 = await prisma.stock.create({
    data: {
      symbol: "JKL",
      name: "JKL Corp",
      currentPrice: 150.75,
      price_impact_factor: 0.00567,
    },
  });

  // Create transactions
  const transaction1 = await prisma.transaction.create({
    data: {
      quantity: 10,
      price: 50.75,
      totalAmount: 507.5,
      stockId: stock1.id,
      portfolioId: portfolio1.id,
      transactionType: "BUY",
    },
  });

  const transaction2 = await prisma.transaction.create({
    data: {
      quantity: 5,
      price: 75.5,
      totalAmount: 377.5,
      stockId: stock2.id,
      portfolioId: portfolio2.id,
      transactionType: "BUY",
    },
  });

  const transaction3 = await prisma.transaction.create({
    data: {
      quantity: 15,
      price: 100.25,
      totalAmount: 1503.75,
      stockId: stock3.id,
      portfolioId: portfolio3.id,
      transactionType: "BUY",
    },
  });

  const transaction4 = await prisma.transaction.create({
    data: {
      quantity: 20,
      price: 125.5,
      totalAmount: 2510,
      stockId: stock4.id,
      portfolioId: portfolio4.id,
      transactionType: "BUY",
    },
  });

  const transaction5 = await prisma.transaction.create({
    data: {
      quantity: 25,
      price: 150.75,
      totalAmount: 3768.75,
      stockId: stock5.id,
      portfolioId: portfolio5.id,
      transactionType: "BUY",
    },
  });

  const transaction6 = await prisma.transaction.create({
    data: {
      quantity: 5,
      price: 50.75,
      totalAmount: 253.75,
      stockId: stock1.id,
      portfolioId: portfolio1.id,
      transactionType: "SELL",
    },
  });

  const transaction7 = await prisma.transaction.create({
    data: {
      quantity: 2,
      price: 75.5,
      totalAmount: 151,
      stockId: stock2.id,
      portfolioId: portfolio2.id,
      transactionType: "SELL",
    },
  });

  const transaction8 = await prisma.transaction.create({
    data: {
      quantity: 3,
      price: 100.25,
      totalAmount: 300.75,
      stockId: stock3.id,
      portfolioId: portfolio3.id,
      transactionType: "SELL",
    },
  });

  const transaction9 = await prisma.transaction.create({
    data: {
      quantity: 4,
      price: 125.5,
      totalAmount: 502,
      stockId: stock4.id,
      portfolioId: portfolio4.id,
      transactionType: "SELL",
    },
  });

  const transaction10 = await prisma.transaction.create({
    data: {
      quantity: 5,
      price: 150.75,
      totalAmount: 753.75,
      stockId: stock5.id,
      portfolioId: portfolio5.id,
      transactionType: "SELL",
    },
  });

  // Create stock on portfolio
  await prisma.stockOnPortfolio.create({
    data: {
      quantity: 10,
      stockId: stock1.id,
      portfolioId: portfolio1.id,
    },
  });

  await prisma.stockOnPortfolio.create({
    data: {
      quantity: 5,
      stockId: stock2.id,
      portfolioId: portfolio2.id,
    },
  });

  await prisma.stockOnPortfolio.create({
    data: {
      quantity: 15,
      stockId: stock3.id,
      portfolioId: portfolio3.id,
    },
  });

  await prisma.stockOnPortfolio.create({
    data: {
      quantity: 20,
      stockId: stock4.id,
      portfolioId: portfolio4.id,
    },
  });

  await prisma.stockOnPortfolio.create({
    data: {
      quantity: 25,
      stockId: stock5.id,
      portfolioId: portfolio5.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
