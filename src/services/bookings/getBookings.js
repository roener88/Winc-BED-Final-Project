import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getBookings = async ( userId ) => {

    return prisma.booking.findMany({
        where: {
            ...(userId && {userId})
        }
    });
}

export default getBookings;