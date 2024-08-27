import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const deleteBookingById = async ( id ) => {
    const deletedBooking = await prisma.booking.deleteMany({
        where: {
            id
        }
    });

    if(!deletedBooking || deletedBooking.count === 0 ) {
        console.log(`Booking with id ${id} was not deleted`);
    }

    return id;
}

export default deleteBookingById;