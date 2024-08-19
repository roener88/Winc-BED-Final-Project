import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getUsers = async ( username, email ) => {

    return prisma.user.findMany({
        where: {
            username,
            email
        }
    });
}

export default getUsers;