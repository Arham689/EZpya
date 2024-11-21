import prisma from '@repo/db/client';

async function addBalances() {
  await prisma.balance.create({
    data: {
      userId: 1, // Replace with actual user ID
      amount: 10000,
      locked: 2000,
    },
  });

  await prisma.balance.create({
    data: {
      userId: 2, // Replace with actual user ID
      amount: 5000,
      locked: 1000,
    },
  });

  console.log('Balances added!');
}

addBalances()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
    process.exit(1);
  });
