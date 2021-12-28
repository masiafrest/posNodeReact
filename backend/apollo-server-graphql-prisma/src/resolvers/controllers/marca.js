/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function postMarca(parent, { nombre }, ctx, info) {
  return ctx.prisma.marca.create({
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
async function marcas(parent, args, ctx, info) {
  const { filter, skip, take } = args;
  console.log("filter: ", filter);

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

  const query = await ctx.prisma.marca.findMany({
    where,
    skip: skip || 0,
    take: take || undefined,
  });

  const count = await ctx.prisma.marca.count({
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
function updateCategoria(parent, { id, nombre }, ctx, info) {
  return ctx.prisma.marca.update({
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
function delCategoria(parent, { id }, ctx, info) {
  return ctx.prisma.marca.delete({ where: { id } });
}

module.exports = {
  marcas,
  postMarca,
  updateCategoria,
  delCategoria,
};
