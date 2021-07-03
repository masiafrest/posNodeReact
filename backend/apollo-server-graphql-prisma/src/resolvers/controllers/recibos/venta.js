/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function postVenta(parent, args, ctx, info) {
  const { usuarioId, clienteId, credito, subTotal, tax, total, lineas } = args;
  return ctx.prisma.venta.create({
    data: {
      usuario: { connect: { id: usuarioId } },
      cliente: { connect: { id: clienteId } },
      credito,
      subTotal,
      tax,
      total,
      lineas: {
        // map a new array from the lineas
        create: [],
      },
    },
  });
}
/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function venta(parent, args, ctx, info) {
  return ctx.prisma.venta.findMany();
}

module.exports = {
  categorias,
  postCategoria,
};
