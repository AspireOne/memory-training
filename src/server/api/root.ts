import { createTRPCRouter } from "~/server/api/trpc";
import { methodsRouter } from "~/server/api/routers/methods";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  methods: methodsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
