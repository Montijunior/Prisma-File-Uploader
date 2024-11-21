const prisma = require("./configs/PrismaClient")();

async function main() {
  const folder = await prisma.file.findMany({});
  console.log(folder);
}

main().then(() => {
  prisma.$disconnect();
});
