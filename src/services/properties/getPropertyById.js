import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPropertyById = async ( id ) => {

    const property = await prisma.property.findUnique({
        where: {
            id
        },
        include: {
            amenities: true,
            bookings: true,
            reviews: true,
        }
    });

    return property;
};

export default getPropertyById;