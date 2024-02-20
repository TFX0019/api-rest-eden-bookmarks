import { Elysia } from "elysia";
import { createFolderController, deleteFolderController, getFoldersController, renameFolderController } from "./controller";

export const folderRoutes = new Elysia()
.post("/", createFolderController)
.get("/", getFoldersController)
.delete("/:id", deleteFolderController)
.get("/:id", () => "Get a folder")
.put("/:id", renameFolderController)