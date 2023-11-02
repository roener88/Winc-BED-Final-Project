import { PrismaClient } from "@prisma/client";

const createUser = async (name) => {
    const prisma = new PrismaClient();
    const newUser = {
        name,
    };

    const user = await prisma.user.create({
        data: newUser,
    });

    return user;
};

export default createUser;