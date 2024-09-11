import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const getProperties = async ( location, pricePerNight, amenities ) => {

    const priceFilter = pricePerNight
    ? new Prisma.Decimal(pricePerNight)
    : undefined;

    const amenitiesArray = Array.isArray(amenities)
    ? amenities
    : amenities
    ? [amenities]
    : [];

    return prisma.property.findMany({
        where:{
            ...(location && { location }),
            ...(priceFilter && { pricePerNight: priceFilter }),
            ...(amenitiesArray.length > 0 && {
                amenities: {
                  some: {
                    name: {
                      in: amenitiesArray,
                    },
                  },
                },
              }),
            }
   });
}

export default getProperties;