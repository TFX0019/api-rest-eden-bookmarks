import { Input, minLength, object, string } from "valibot";

const CreateFolderSchema = object({
    name: string([minLength(1), minLength(3)]),
})

const RenameFolderSchema = object({
    body: object({
        name: string([minLength(1), minLength(3)]),
    }),
    params: object({
        id: string('id folder is required', [minLength(1, 'id folder is required')]),
    })
})

const DeleteFolderSchema = object({
    id: string('id folder is required', [minLength(1, 'id folder is required')]),
})

type FolderInput = Input<typeof CreateFolderSchema>;
export {
    CreateFolderSchema,
    FolderInput,
    RenameFolderSchema,
    DeleteFolderSchema
}