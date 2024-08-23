import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const deleteUserById = async ( id ) => {
    const deletedUser = await prisma.user.deleteMany({
        where: {
            id
        }
    });

    if(!deletedUser || deletedUser.count === 0 ) {
        console.log(`User with id ${id} was not deleted`);
    }

    return id;
}

export default deleteUserById;