import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      sub: string;
      role: "CUSTOMER" | "PROFESSIONAL";
    };
  }
}
<<<<<<< HEAD

//types
=======
>>>>>>> 7ab52bd7bb221caa91375d2e64a1a31b27804347
