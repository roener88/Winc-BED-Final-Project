import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const deleteReviewById = async ( id ) => {
    const deletedReview = await prisma.review.deleteMany({
        where: {
            id
        }
    });

    if(!deletedReview || deletedReview.count === 0 ) {
        console.log(`User with id ${id} was not deleted`);
        return -1;
    }

    return id;
}

export default deleteReviewById;