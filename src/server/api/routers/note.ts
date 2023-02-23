import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "y/server/api/trpc";

export const noteRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ topicId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.note.findMany({
        where: {
          topicId: input.topicId,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({ topicId: z.string(), title: z.string(), content: z.string() })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.create({
        data: {
          title: input.title,
          content: input.content,
          topicId: input.topicId,
        },
      });
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), title: z.string(), content: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          content: input.content,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
