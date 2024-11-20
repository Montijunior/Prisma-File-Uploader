const prisma = require("./configs/PrismaClient")();

async function main() {
  const folder = await prisma.user.findMany();
  console.log(folder);
}

main().then(() => {
  prisma.$disconnect();
});
