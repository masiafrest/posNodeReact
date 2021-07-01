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
  return ctx.prisma.categoria.findMany();
}

module.exports = {
  categorias,
  postCategoria,
};
