const { splitArrBySpace } = require("../../utils");
/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function postCategoria(parent, { nombre }, ctx, info) {
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
async function categorias(parent, args, ctx, info) {
  const { filter, skip, take } = args;
  console.log("filter: ", filter);
  const searchArr = splitArrBySpace(filter, "nombre");

  const where = {
    OR: searchArr,
  };

  const query = await ctx.prisma.categoria.findMany({
    where,
    skip,
    take,
  });

  const count = await ctx.prisma.categoria.count({
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
  return ctx.prisma.categoria.update({
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
  return ctx.prisma.categoria.delete({ where: { id } });
}

module.exports = {
  categorias,
  postCategoria,
  updateCategoria,
  delCategoria,
};
