import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getProperties = async () => {

    return prisma.property.findMany();
}

export default getProperties;