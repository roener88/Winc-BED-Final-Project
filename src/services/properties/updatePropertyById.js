import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updatePropertyById = async ( id, title, description, location, pricePerNight, bedroomCount, bathroomCount, maxGuestCount, hostId, rating, amenities ) => {

    const updatedProperty = await prisma.property.updateMany({
        where: {
            id
        },
        data: {
            title, 
            description, 
            location, 
            pricePerNight, 
            bedroomCount, 
            bathroomCount, 
            maxGuestCount, 
            hostId, 
            rating,
            amenities
        }
    });
    
    if( !updatedProperty || updatedProperty.count === 0 ) {
        console.log(`Property with id ${id} was not found`);
    }

    return {
        message: `Property with id ${id} has been updated`
    }
};

export default updatePropertyById;