import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateHostById = async ( id, username, password, name, email, phoneNumber, profilePicture, aboutMe ) => {

    const updatedHost = await prisma.host.updateMany({
        where: {
            id
        },
        data: {
            username, 
            password, 
            name, 
            email, 
            phoneNumber, 
            profilePicture, 
            aboutMe
        }
    });
    
    if( !updatedHost || updatedHost.count === 0 ) {
        return -1
    }

    return {
        message: `Host with id ${id} has been updated`
    }
};

export default updateHostById;