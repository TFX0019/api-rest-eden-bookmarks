import { Elysia } from "elysia";
import { createNote, deleteNoteController } from "./controller";

export const notesRoutes = new Elysia()
.post("/", createNote)
.get("/", () => "get a folder")
.delete("/:folderId/:noteId", deleteNoteController)
.get("/:id", () => "Get a folder")
.put("/:id", () => "Update a folder")