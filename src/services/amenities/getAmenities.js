import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAmenities = async () => {

    return prisma.amenity.findMany({
        include: {
            properties: true
        }
    });
}

export default getAmenities;