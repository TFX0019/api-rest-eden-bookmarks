import { Elysia } from "elysia";
import { login, register } from "./controller";

export const authRoutes = new Elysia()
.post("/register", register)
.post("/login", login)