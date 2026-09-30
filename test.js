import { prisma } from "./lib/prisma";

async function main(){
  const user=await prisma.user.findUnique({where:{email:"test@test.com"}});
  console.log(user);
  await prisma.$disconnect();
}

main();