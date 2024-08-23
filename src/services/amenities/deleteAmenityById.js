import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const deleteAmenityById = async ( id ) => {
    const deletedAmenity = await prisma.amenity.deleteMany({
        where: {
            id
        }
    });

    if(!deletedAmenity || deletedAmenity.count === 0 ) {
        console.log(`User with id ${id} was not deleted`);
    }

    return id;
}

export default deleteAmenityById;