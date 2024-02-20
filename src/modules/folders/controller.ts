import { safeParse } from "valibot";
import { CreateFolderSchema, DeleteFolderSchema, RenameFolderSchema } from "../../schemas/folder";
import { createFolder, deleteFolder, getFolderById, getFolderByName, getFolders, renameFolder } from "../../models/folder";
import { responseError } from "../../libs/response";

interface CreateFolderController {
    body: {
        name: string;
    },
    jwt: any,
    set: any,
    cookie: {
        auth: any
    },
    params: {
        id: string
    }
}

// create
const createFolderController = async ({body, jwt, set, cookie: {auth}}: CreateFolderController) => {
    try {
        const user = await jwt.verify(auth.value);
        console.log({auth, body});
        if(!user) {
            set.status = 401;
            return "Unauthorized";
        };
        
        const schemaValidation = safeParse(CreateFolderSchema, body);
        if (!schemaValidation.success) throw new Error(schemaValidation.issues[0].message);
        
        const existingFolder = await getFolderByName(body.name);
        if(existingFolder) throw new Error("Folder already exists");
        
        const folder = await createFolder({...body, userId: user.id, notes: []});
        return responseError({
            data: folder,
            ok: true,
            message: "Folder created"
        });
        
    } catch (error: any) {
        return responseError({
            message: error.message || "Error creating folder",
            ok: false,
            error: error.message || "Error creating folder"
        });
    }
}

// get all
const getFoldersController = async ({jwt, set, cookie: {auth}}: CreateFolderController) => {
    try {
        const jwtPayload = await jwt.verify(auth.value);
        if(!jwtPayload) {
            set.status = 401;
            return "Unauthorized";
        };

        const folders = await getFolders();
        return responseError({
            data: folders,
            ok: true
        });
        
    } catch (error: any) {
        return responseError({
            message: error.message || "Error getting folders",
            ok: false,
            error: error.message || "Error getting folders"
        });
    }
}

//rename folder
const renameFolderController = async ({body, jwt, set, cookie: {auth}, params}: CreateFolderController) => {
    try {
        const user = await jwt.verify(auth.value);
        if(!user) {
            set.status = 401;
            return "Unauthorized";
        };
        
        const schemaValidation = safeParse(RenameFolderSchema, {body, params});
        if (!schemaValidation.success) throw new Error(schemaValidation.issues[0].message);
        
        const folderFound = await getFolderById(params.id);
        if(!folderFound) throw new Error("Folder not found");

        const existingFolder = await getFolderByName(body.name);
        if(existingFolder) throw new Error("Folder already exists");

        const folder = await renameFolder(params.id, body.name);
        return responseError({
            data: folder,
            message: "folder renamed",
            ok: true
        });
        
    } catch (error: any) {
        return responseError({
            message: error.message || "Error renaming folder",
            ok: true,
            error: error.message || "Error renaming folder"
        });
    }
}

//delete folder
const deleteFolderController = async ({jwt, set, cookie: {auth}, params}: CreateFolderController) => {
    try {
        const user = await jwt.verify(auth.value);
        if(!user) {
            set.status = 401;
            return "Unauthorized";
        };
        
        const schemaValidation = safeParse(DeleteFolderSchema, params);
        if (!schemaValidation.success) throw new Error(schemaValidation.issues[0].message);

        await deleteFolder(params.id);
        return responseError({
            message: "folder deleted",
            ok: true
        });
        
    } catch (error: any) {
        return responseError({
            message: error.message || "Error deleting folder",
            ok: false,
            error: error.message || "Error deleting folder"
        });
    }
}

export {
    createFolderController,
    getFoldersController,
    renameFolderController,
    deleteFolderController
}