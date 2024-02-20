import {compare, genSalt, hash} from 'bcryptjs';

const encript = async (password: string) => {
    const salt = await genSalt(10);
    return hash(password, salt);
}

const verify = async (password: string, receivedPassword: string) => {
    return compare(password, receivedPassword);
}

export {
    encript,
    verify
}