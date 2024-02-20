import { safeParse } from "valibot";
import { CreateUser, LoginSchema, UserInput } from "../../schemas/user";
import { encript, verify } from "../../libs/bcrypt";
import { createuser, getUserByEmail } from "../../models/user";
import { responseError } from "../../libs/response";

interface RegisterRequest {
    body: {
        name: string;
        email: string;
        password: string;
    },
    jwt: any,
    cookie: {
        auth: any
    
    }
}

const register = async ({body, jwt, cookie: {auth}}: RegisterRequest) => {
    try {
        const schemaValidation = safeParse(CreateUser, body);
        if (!schemaValidation.success) throw new Error(schemaValidation.issues[0].message);
        
        
        const existingUser = await getUserByEmail(body.email);
        if(existingUser) throw new Error("User already exists");
        
        const hasPassword = await encript(body.password);
        
        const {password, ...user} = (await createuser({...body, password: hasPassword} as UserInput)).toJSON();
        
        auth.set({
            value: await jwt.sign({id: user._id}),
            httpOnly: true,
            path: "/",
            maxAge: 7 * 86400
        })
        
        return responseError({
            data: user,
            message: "User registered",
            ok: true
        });
    } catch (error: any) {
        console.log(error);
        return responseError({
            message: error.message,
            ok: false,
            error: error.message
        });
    }
}


const login = async ({body, jwt, cookie: {auth}}: RegisterRequest) => {
    try {
        const schemaValidation = safeParse(LoginSchema, body);
        if (!schemaValidation.success) throw new Error(schemaValidation.issues[0].message);
        
        const existingUser = await getUserByEmail(body.email);
        if(!existingUser) throw new Error("User or password invalid");
        
        const isValid = await verify(body.password, existingUser.password || '');
        if(!isValid) throw new Error("User or password invalid");
        
        auth.set({
            value: await jwt.sign({id: existingUser._id}),
            httpOnly: true,
            path: "/",
            maxAge: 7 * 86400
        })
        const {password, ...user} = existingUser.toJSON();
        return responseError({
            data: user,
            message: "User logged",
            ok: true
        });
    } catch (error: any) {
        console.log(error);
        return responseError({
            message: error.message,
            ok: false,
            error: error.message
        });
    }
}

export {
    register,
    login
}