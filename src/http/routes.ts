import { FastifyInstance } from "fastify";
import { create } from "./controllers/appointments/create";
import { get } from "./controllers/appointments/get";
import { getById } from "./controllers/appointments/get-by-id";
import { deleteAppointment } from "./controllers/appointments/delete";
import { jwtAuthMiddleware } from "./controllers/auth/middleware";
import { loginUser } from "./controllers/auth/login-user";
import { registerUser } from "./controllers/auth/register-user";

export async function appRoutes(app: FastifyInstance) {
  app.post("/register", registerUser);
  app.post("/login", loginUser);

  app.post("/appointments", { onRequest: jwtAuthMiddleware }, create);
  app.get("/appointments", { onRequest: jwtAuthMiddleware }, get);
  app.get("/appointments/:id", { onRequest: jwtAuthMiddleware }, getById);
  app.delete(
    "/appointments/:id",
    { onRequest: jwtAuthMiddleware },
    deleteAppointment,
  );
}
