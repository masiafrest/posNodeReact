/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function conteoInvs(_, { filter, skip, take }, ctx, __) {
  const query = ctx.prisma.conteoInv.findMany({ skip, take });
  const count = ctx.prisma.conteoInv.count();

  return { query, count };
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function postConteoInv(_, args, ctx, __) {
  const { marcaId, categoriaId, itemSkiped, usuarioId, completed, deleted } =
    args;

  const res = ctx.prisma.conteoInv.create({
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

module.exports = { postConteoInv, conteoInvs };
