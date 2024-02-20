import cors from "@elysiajs/cors";
import jwt from "@elysiajs/jwt";
import { Elysia } from "elysia";
import { initDB } from "./config/db";
import { setupRoutes } from "./modules";

const runServer = async () => {
  await initDB();
  const app = new Elysia()
      .use(jwt({
      name: 'jwt',
      secret: process.env.SECRET_KEY as string,
    }))
    .use(cors())
    .use(setupRoutes)
    .get("/", async ({jwt, set, cookie: {auth}}) => {
      const user = await jwt.verify(auth.value);
      if(!user) {
          set.status = 401;
          return "Unauthorized";
      };
      return "Hello, Elysia!";
    }).listen(3000);

  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
}

runServer()