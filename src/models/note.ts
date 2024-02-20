import { model } from "mongoose";
import { Schema } from "mongoose";

const NoteSchema = new Schema({
    title: String,
    content: String,
}, {
    timestamps: true,
    versionKey: false
});

export {NoteSchema}
export const Note = model("Note", NoteSchema);