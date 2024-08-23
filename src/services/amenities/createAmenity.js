import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createAmenity = async ( name ) => {

    return prisma.amenity.create({
        data: {
            name
        }
    });
};

export default createAmenity;