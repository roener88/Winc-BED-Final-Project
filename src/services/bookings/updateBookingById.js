import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateBookingById = async ( id, userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus ) => {

    const updatedBooking = await prisma.booking.updateMany({
        where: {
            id
        },
        data: {
            userId, 
            propertyId, 
            checkinDate, 
            checkoutDate, 
            numberOfGuests, 
            totalPrice, 
            bookingStatus
        }
    });
    
    if( !updatedBooking || updatedBooking.count === 0 ) {
        console.log(`Booking with id ${id} was not found`);
    }

    return {
        message: `Booking with id ${id} has been updated`
    }
};

export default updateBookingById;