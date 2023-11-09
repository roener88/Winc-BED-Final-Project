import { PrismaClient } from "@prisma/client";

const updateReviewById = async (id, updatedreview) => {
    const prisma = new PrismaClient();
    const review = await prisma.review.updateMany({
        where: { id },
        data: updatedreview,
    });

    return review.count > 0 ? id : null;
};

export default updateReviewById;