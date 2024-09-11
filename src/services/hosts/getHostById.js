import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getHostById = async ( id ) => {

    const host = await prisma.host.findUnique({
        where: {
            id
        },
        include: {
            listings: true
        }
    });

    return host;
};

export default getHostById;