import { PrismaClient } from "@prisma/client";

const createProperty = async (
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
    hostId,
    rating,
) => {
    const prisma = new PrismaClient();
    const property = await prisma.property.create({
        data: {
            title,
            description,
            location,
            pricePerNight,
            bedroomCount,
            bathRoomCount,
            maxGuestCount,
            hostId,
            rating,
        }
    })


    // I get an error when trying to connect to 'user' and 'property'

    // const newProperty = {
    //     userId: {
    //         connect: { id: userId }
    //     },
    //     propertyId: {
    //         connect: { id: propertyId }
    //     },
    //     checkinDate,
    //     checkoutDate,
    //     numberOfGuests,
    //     totalPrice,
    //     PropertyStatus
    // };

    // const Property = await prisma.Property.create({
    //     data: newProperty,
    // });

    return property;
};

export default createProperty;