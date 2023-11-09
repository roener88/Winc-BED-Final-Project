import { PrismaClient } from "@prisma/client"
import amenitiesData from "../src/data/amenities.json" assert { type: 'json' }
import bookingsData from "../src/data/bookings.json" assert { type: 'json' }
import hostsData from "../src/data/hosts.json" assert { type: 'json' }
import propertiesData from "../src/data/properties.json" assert { type: 'json' }
import reviewsData from "../src/data/reviews.json" assert { type: 'json' }
import usersData from "../src/data/users.json" assert { type: 'json' }

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] })

async function main() {
    const { amenities } = amenitiesData
    const { bookings } = bookingsData
    const { hosts } = hostsData
    const { properties } = propertiesData
    const { reviews } = reviewsData
    const { users } = usersData

    for (const amenity of amenities) {
        await prisma.amenity.upsert({
            where: { id: amenity.id },
            update: {},
            create: amenity,

            // {
            //     // id: amenity.id,
            //     // name: amenity.name,
            //     ...order,

            //     properties: {
            //         connect: amenity.properties.map((property) => { () })
            //     }
            // }
        });
    }

    for (const booking of bookings) {
        await prisma.booking.upsert({
            where: { id: booking.id },
            update: {},
            create: booking,

            // {
            //     userId: {
            //         connect: { id: booking.userId },
            //     },
            //     propertyId: {
            //         connect: { id: booking.propertyId },
            //     },
            //     checkinDate: booking.checkinDate,
            //     checkoutDate: booking.checkoutDate,
            //     numberOfGuests: booking.numberOfGuests,
            //     totalPrice: booking.totalPrice,
            //     bookingStatus: booking.bookingStatus,

            // }
        });
    }

    for (const host of hosts) {
        await prisma.host.upsert({
            where: { id: host.id },
            update: {},
            create: host,

            // {
            //     id: host.id,
            //     username: host.username,
            //     password: host.password,
            //     name: host.name,
            //     email: host.email,
            //     phoneNumber: host.phoneNumber,
            //     profilePicture: host.profilePicture,
            //     aboutMe: host.aboutMe,
            //     listings: {

            //         connect: host.listings.map((hostId) => id)
            //     },

            // },
        });
    }

    for (const property of properties) {
        await prisma.property.upsert({
            where: { id: property.id },
            update: {},
            create: property,


            // {
            //     id: property.id,
            //     title: property.id,  
            //     description: property.description,
            //     location: property.location , 
            //     pricePerNight: property.pricePerNight,
            //     bedroomCount: property.bedroomCount,
            //     bathRoomCount: property.bathRoomCount,
            //     maxGuestCount: property.maxGuestCount,
            //     hostId: property.hostId,
            //     rating: property.rating,

            //     bookings: {
            //         connect: property.bookings.map((booking) => ({ id: propertyId }))
            //     },

            // }

        });
    }

    for (const review of reviews) {
        await prisma.review.upsert({
            where: { id: review.id },
            update: {},
            create: review,
        });
    }

    for (const user of users) {
        await prisma.user.upsert({
            where: { id: user.id },
            update: {},
            create: user,
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });