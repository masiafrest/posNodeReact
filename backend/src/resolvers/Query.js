/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function items(parent, args, ctx, info) {
  return ctx.prisma.item.findMany({
    include: {
      categorias: true,
      inventarios: { include: { precio: true, ubicacion: true } },
    },
  });
}

module.exports = {
  items,
};
