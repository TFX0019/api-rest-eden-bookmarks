import { Input, email, minLength, object, string } from "valibot";

const CreateUser = object({
    name: string([minLength(1), minLength(3)]),
    email: string([minLength(1), email()]),
    password: string([minLength(1), minLength(6)]),
})

const LoginSchema = object({
    email: string([minLength(1), email()]),
    password: string([minLength(1), minLength(6)]),
})



// types
type UserInput = Input<typeof CreateUser>;
type LoginInput = Input<typeof LoginSchema>;

export {
    CreateUser,
    UserInput,
    LoginInput,
    LoginSchema
}