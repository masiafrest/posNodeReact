/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function postVenta(parent, args, ctx, info) {
  const { clienteId, credito, subTotal, tax, total, lineas } = args;

  const newLines = lineas.map((linea) => {
    const { id, descripcion, precio, qty } = linea;
    return {
      item: { connect: { id: id * 1 } },
      // itemd: id,
      descripcion: `${descripcion}`,
      qty,
      precio,
    };
  });

  const venta = await ctx.prisma.venta.create({
    data: {
      usuario: { connect: { id: ctx.currentUser.id } },
      cliente: { connect: { id: clienteId * 1 } },
      credito,
      subTotal,
      tax,
      total,
      lineas: {
        create: newLines,
      },
    },
    include: {
      lineas: {
        include: {
          item: true,
        },
      },
    },
  });
  return venta;
}
/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function ventas(parent, args, ctx, info) {
  return ctx.prisma.venta.findMany({
    include: {
      cliente: true,
      usuario: true,
      lineas: {
        include: {
          item: true,
        },
      },
    },
  });
}

module.exports = {
  ventas,
  postVenta,
};
