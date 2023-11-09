import { PrismaClient } from "@prisma/client";

const createBooking = async (
    userId,
    propertyId,
    checkinDate,
    checkoutDate,
    numberOfGuests,
    totalPrice,
    bookingStatus
) => {
    const prisma = new PrismaClient();
    const booking = await prisma.booking.create({
        data: {
            // userId: {
            //     connect: { id: userId }
            // },
            // propertyId: {
            //     connect: { id: propertyId }
            // },
            userId,
            propertyId,
            checkinDate,
            checkoutDate,
            numberOfGuests,
            totalPrice,
            bookingStatus,
        }
    })


    // I get an error when trying to connect to 'user' and 'property'

    // const newBooking = {
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
    //     bookingStatus
    // };

    // const booking = await prisma.booking.create({
    //     data: newBooking,
    // });

    return booking;
};

export default createBooking;