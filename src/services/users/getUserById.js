import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUserById = async ( id ) => {

    const user = await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            Review: true,
            bookings: true
        }
    });

    return user;
};

export default getUserById;