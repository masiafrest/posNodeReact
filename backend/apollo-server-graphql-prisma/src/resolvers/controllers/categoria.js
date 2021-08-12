const { splitArrBySpace } = require("./utils");
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
function categorias(parent, args, ctx, info) {
  const { filter, skip, take } = args;
  const searchArr = splitArrBySpace(filter, "nombre");
  console.log(searchArr);
  return ctx.prisma.categoria.findMany({
    where: {
      OR: searchArr,
    },
    skip,
    take,
  });
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
