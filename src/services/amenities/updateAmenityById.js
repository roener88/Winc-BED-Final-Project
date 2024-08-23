import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateAmenityById = async ( id, name ) => {

    const updatedAmenity = await prisma.amenity.updateMany({
        where: {
            id
        },
        data: {
            name
        }
    });
    
    if( !updatedAmenity || updatedAmenity.count === 0 ) {
        console.log(`Amenity with id ${id} was not found`);
    }

    return {
        message: `Amenity with id ${id} has been updated`
    }
};

export default updateAmenityById;