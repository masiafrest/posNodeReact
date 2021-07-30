/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function postVenta(parent, args, ctx, info) {
  const { usuarioId, clienteId, credito, subTotal, tax, total, lineas } = args;

  const newLines = lineas.map((linea) => {
    const { id, descripcion, precio, qty } = linea;
    return {
      itemId: id,
      descripcion: `${descripcion}`,
      qty,
      precio,
    };
  });
  console.log("venta");
  return ctx.prisma.venta.create({
    data: {
      usuario: { connect: { id: usuarioId } },
      cliente: { connect: { id: clienteId } },
      credito,
      subTotal,
      tax,
      total,
      lineas: {
        create: newLines,
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
function ventas(parent, args, ctx, info) {
  return ctx.prisma.venta.findMany();
}

module.exports = {
  ventas,
  postVenta,
};
