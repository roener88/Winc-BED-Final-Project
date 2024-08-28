import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getProperties = async ( location, pricePerNight, amenities ) => {

    const amenitiesArray = Array.isArray( amenities ) ? amenities : [amenities];

    return prisma.property.findMany({
        where:{
            location,
            pricePerNight,
            amenities: {
                some: {
                    name: {
                        in: amenitiesArray,
                    },
                },
            },
        },
        include: {
            amenities: true,
        }
   });
}

export default getProperties;