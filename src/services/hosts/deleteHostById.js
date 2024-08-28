import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const deleteHostById = async ( id ) => {
    const deletedHost = await prisma.host.deleteMany({
        where: {
            id
        }
    });

    if(!deletedHost || deletedHost.count === 0 ) {
        return -1;
    }

    return id;
}

export default deleteHostById;