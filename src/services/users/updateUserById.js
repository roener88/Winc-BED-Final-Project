import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateUserById = async ( id, username, password, name, email, phoneNumber, profilePicture ) => {

    const updatedUser = await prisma.user.updateMany({
        where: {
            id
        },
        data: {
            username, 
            password, 
            name, 
            email, 
            phoneNumber, 
            profilePicture
        }
    });
    
    if( !updatedUser || updatedUser.count === 0 ) {
        console.log(`User with id ${id} was not found`);
        return -1;
    }

    return {
        message: `User with id ${id} has been updated`
    }
};

export default updateUserById;