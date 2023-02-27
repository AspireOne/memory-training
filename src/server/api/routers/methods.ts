import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env.mjs";
import { Methods } from "~/utils/methods";
import Method from "~/server/models/Method";
import { TRPCError } from "@trpc/server";

export const methodsRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        method: z.enum([Methods.PA]),
      })
    )
    .output(z.string().nullable())
    .query(async ({ input, ctx }) => {
      await ctx.connectMongoose(env.MONGODB_URI);

      const method = await Method.findOne({ name: input.method }).exec();
      return method?.value ?? null;
    }),

  update: publicProcedure
    .input(
      z.object({
        method: z.enum([Methods.PA]),
        value: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.connectMongoose(env.MONGODB_URI);

      const method = await Method.findOne({name: input.method});

      if (!method) {
        void Method.create(
          {name: input.method, value: input.value},
          function (error, result) {
            if (error) throwError(error.cause);
          });
        return;
      }

      void Method.updateOne(
        { name: input.method },
        { value: input.value },
        { upsert: false},
        function (error, result) {
          if (error) throwError(error.cause);
        });

      function throwError(cause?: unknown) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Něco se pokazilo při aktualizování dat.",
          cause: cause
        });
      }
    }),
});
