import { safeParse } from "valibot";
import { CreateNoteSchema, DeleteNoteSchema, NoteInput } from "../../schemas/notes";
import { addNoteToFolder, deleteNoteFromFolder, getNoteById } from "../../models/folder";
import { responseError } from "../../libs/response";

interface NoteController {
    body: NoteInput,
    jwt: any,
    set: any,
    cookie: {
        auth: any
    }

}

interface DeleteNoteController {
    params: {
        folderId: string,
        NoteId: string
    },
    jwt: any,
    set: any,
    cookie: {
        auth: any
    }

}

const createNote = async ({body, set, jwt, cookie: {auth}}: NoteController) => {
    try {
        const {folderId, ...note} = body;
        const user = await jwt.verify(auth.value);
        if(!user) {
            set.status = 401;
            return "Unauthorized";
        };
        
        const schemaValidation = safeParse(CreateNoteSchema, body);
        if (!schemaValidation.success) throw new Error(schemaValidation.issues[0].message);
        
        const resultFolder = await addNoteToFolder(folderId, note)
        const result = resultFolder?.notes[resultFolder.notes.length - 1]
        return responseError({
            data: result,
            message: "note created",
            ok: true
        });
    } catch (error: any) {
        return responseError({
            message: error.message || "Error creating note",
            ok: false,
            error: error.message || "Error creating note"
        });
    }
}

const deleteNoteController = async ({jwt, set, cookie: {auth}, params}: DeleteNoteController) => {
    try {
        const user = await jwt.verify(auth.value);
        if(!user) {
            set.status = 401;
            return "Unauthorized";
        };
        
        const schemaValidation = safeParse(DeleteNoteSchema, params);
        if (!schemaValidation.success) throw new Error(schemaValidation.issues[0].message);
        console.log({params});
        await deleteNoteFromFolder(params.folderId, params.NoteId);
        return responseError({
            message: "note deleted",
            ok: true
        });
        
    } catch (error: any) {
        return responseError({
            message: error.message || "Error deleting note",
            ok: false,
            error: error.message || "Error deleting note"
        });
    }
}

export {
    createNote,
    deleteNoteController
}