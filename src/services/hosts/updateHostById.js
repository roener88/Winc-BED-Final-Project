import { PrismaClient } from "@prisma/client";

const updateHostById = async (id, updatedhost) => {
    const prisma = new PrismaClient();
    const host = await prisma.host.updateMany({
        where: { id },
        data: updatedhost,
    });

    return host.count > 0 ? id : null;
};

export default updateHostById;