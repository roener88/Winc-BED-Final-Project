import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateReviewById = async ( id, userId, propertyId, rating, comment ) => {

    const updatedReview = await prisma.review.updateMany({
        where: {
            id
        },
        data: {
            userId, 
            propertyId, 
            rating, 
            comment
        }
    });
    
    if( !updatedReview || updatedReview.count === 0 ) {
        console.log(`Review with id ${id} was not found`);
        return -1;
    }

    return {
        message: `Review with id ${id} has been updated`
    }
};

export default updateReviewById;