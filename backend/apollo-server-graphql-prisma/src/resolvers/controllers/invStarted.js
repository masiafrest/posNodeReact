/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function invStarteds(_, { filter, skip, take }, ctx, __) {
  const query = ctx.prisma.invStarted.findMany({ skip, take });
  const count = ctx.prisma.invStarted.count();

  return { query, count };
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function postInvStarted(_, args, ctx, __) {
  const { marcaId, categoriaId, itemSkiped, usuarioId, completed, deleted } =
    args;
  const res = ctx.prisma.invStarted.create({
    data: {
      itemSkiped,
      marca: { connect: { id: marcaId * 1 } },
      completed,
      deleted,
      usuario: { connect: { id: usuarioId * 1 } },
      categoria: { connect: { id: categoriaId * 1 } },
    },
  });

  return res;
}

module.exports = { postInvStarted, invStarteds };
