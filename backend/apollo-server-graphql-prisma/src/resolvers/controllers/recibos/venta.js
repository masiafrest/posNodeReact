/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function postVenta(parent, {}, ctx, info) {
  return ctx.prisma.venta.create({
    data: {
      usuario: { connect: { id: usuarioId } },
      cliente: { connect: { id: clienteId } },
      credito,
      subTotal,
      tax,
      total,
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
