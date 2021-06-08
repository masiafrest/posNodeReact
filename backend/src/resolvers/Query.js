/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function items(parent, args, ctx, info) {
  console.log("item resolver");
  return ctx.prisma.item.findMany({
    include: {
      categorias: true,
      precio: true,
      ubicacion: true,
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

function ubicaciones(parent, args, ctx, info) {
  return ctx.prisma.ubicacion.findMany();
}

module.exports = {
  items,
  categorias,
  ubicaciones,
};
