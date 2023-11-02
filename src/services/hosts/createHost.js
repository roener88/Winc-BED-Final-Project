import { PrismaClient } from "@prisma/client";

const createHost = async (name) => {
    const prisma = new PrismaClient();
    const newHost = {
        name,
    };

    const host = await prisma.host.create({
        data: newHost,
    });

    return host;
};

export default createHost;