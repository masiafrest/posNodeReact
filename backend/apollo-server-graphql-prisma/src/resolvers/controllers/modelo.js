/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function postModelo(parent, { nombre }, ctx, info) {
  return ctx.prisma.categoria.create({
    data: {
      nombre,
    },
  });
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function modelos(parent, args, ctx, info) {
  const { filter, skip, take } = args;
  console.log("args: ", args);

  const where = {
    AND: filter
      ?.trim()
      .split(" ")
      .filter((w) => w !== "")
      .map((e) => ({
        nombre: {
          contains: e,
        },
      })),
  };

  const query = await ctx.prisma.modelo.findMany({
    where,
    skip: skip || 0,
    take: take || undefined,
  });

  const count = await ctx.prisma.modelo.count({
    where,
  });

  return {
    query,
    count,
  };
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function updateModelo(parent, { id, nombre }, ctx, info) {
  return ctx.prisma.modelo.update({
    where: { id },
    data: {
      nombre,
    },
  });
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function delModelo(parent, { id }, ctx, info) {
  return ctx.prisma.modelo.delete({ where: { id } });
}

module.exports = {
  modelos,
  postModelo,
  updateModelo,
  delModelo,
};
