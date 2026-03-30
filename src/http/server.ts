import "../@types/fastify-jwt.d";
import "dotenv/config";
import fastify from "fastify";
import { appRoutes } from "./routes";
import jwt from "@fastify/jwt";

const app = fastify();

await app.register(jwt, {
  secret: process.env.JWT_SECRET as string,
});

app.register(appRoutes);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server running on port 3333");
  });
