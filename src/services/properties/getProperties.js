import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getProperties = async () => {

    return prisma.property.findMany({
        include: {
            amenities: true,
        }
   });
}

export default getProperties;