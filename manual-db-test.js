const prisma = require("./configs/PrismaClient")();

async function main() {
  const folder = await prisma.folder.findMany({});
  console.log(folder);
}

main().then(() => {
  prisma.$disconnect();
});
