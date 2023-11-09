import { PrismaClient } from "@prisma/client";

const createReview = async (
    userId,
    propertyId,
    rating,
    comment,
) => {
    const prisma = new PrismaClient();
    const review = await prisma.review.create({
        data: {
            userId,
            propertyId,
            rating,
            comment,
        }
    })


    // I get an error when trying to connect to 'user' and 'review'

    // const newreview = {
    //     userId: {
    //         connect: { id: userId }
    //     },
    //     reviewId: {
    //         connect: { id: reviewId }
    //     },
    //     checkinDate,
    //     checkoutDate,
    //     numberOfGuests,
    //     totalPrice,
    //     reviewStatus
    // };

    // const review = await prisma.review.create({
    //     data: newreview,
    // });

    return review;
};

export default createReview;