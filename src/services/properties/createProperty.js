import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createProperty = async ( title, description, location, pricePerNight, bedroomCount, bathroomCount, maxGuestCount, hostId, rating, amenities ) => {

    return prisma.property.create({
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
};

export default createProperty;