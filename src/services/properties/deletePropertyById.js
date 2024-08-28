import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const deletePropertyById = async ( id ) => {
    const deletedProperty = await prisma.property.deleteMany({
        where: {
            id
        }
    });

    if(!deletedProperty || deletedProperty.count === 0 ) {
        console.log(`Property with id ${id} was not deleted`);
        return -1;
    }

    return id;
}

export default deletePropertyById;