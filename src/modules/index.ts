import { Elysia } from "elysia";
import { authRoutes } from "./auth";
import { folderRoutes } from "./folders";
import { notesRoutes } from "./notes";

export const setupRoutes = new Elysia()
.group("/auth", (app) =>
    app.use(authRoutes))
.group("/folders", (app) =>
    app.use(folderRoutes))
.group("/notes", (app) =>
    app.use(notesRoutes))