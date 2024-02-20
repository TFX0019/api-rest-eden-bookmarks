import { ValiError } from "valibot"

export interface ResponseData {
    data?: any,
    message?: any,
    ok: boolean,
    error?: string | undefined
}

export const responseError = ({
    message,
    ...rest
}: ResponseData) => {
    return {
        ...rest,
        message: message instanceof ValiError ? `${message.issues.map(inssue => inssue.message)}` : message,
    }
}