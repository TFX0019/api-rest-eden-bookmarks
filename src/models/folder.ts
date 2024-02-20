import { model } from "mongoose";
import { Schema } from "mongoose";
import { NoteSchema } from "./note";
import { NoteInput } from "../schemas/notes";

const FolderSchema = new Schema({
    name: String,
    userId: String,
    notes: [NoteSchema]
}, {
    timestamps: true,
    versionKey: false
});

export const Folder = model("Folder", FolderSchema);

export const getFoldersByUserId = (userId: string) => Folder.find({userId})
export const createFolder = (folder: any) => Folder.create(folder);
export const deleteFolder = (id: string) => Folder.findByIdAndDelete(id);
export const getFolderById = (id: string) => Folder.findById(id);
export const getFolderByName = (name: string) => Folder.findOne({name});
export const getFolders = () => Folder.find({}).sort({createdAt: -1});
export const renameFolder = (id: string, name: string) => Folder.findByIdAndUpdate(id, {name}, {new: true, projection: {notes: 0}});

export const addNoteToFolder = (folderId: string, note: any) => Folder.findByIdAndUpdate(folderId, {$push: {notes: note}}, {new: true, projection: {notes: 1}});
export const deleteNoteFromFolder = (folderId: string, noteId: string) => Folder.findByIdAndUpdate(folderId, {$pull: {notes: {_id: noteId}}}, {new: true});
export const getNoteById = (folder: any, noteId: string) => folder.notes.find((note: any) => note._id === noteId);