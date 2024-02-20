import { Input, minLength, object, string } from "valibot";

const CreateNoteSchema = object({
    title: string([minLength(1), minLength(3)]),
    content: string([minLength(1)]),
    folderId: string([minLength(1)]),
})

const DeleteNoteSchema = object({
    folderId: string('id folder is required', [minLength(1, 'id folder is required')]),
    noteId: string('id note is required', [minLength(1, 'id note is required')]),
})


type NoteInput = Input<typeof CreateNoteSchema>;

export {
    CreateNoteSchema,
    NoteInput,
    DeleteNoteSchema
}