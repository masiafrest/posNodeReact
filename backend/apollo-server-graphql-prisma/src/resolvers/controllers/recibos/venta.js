const { splitArrBySpace } = require("../utils");

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
async function ventas(parent, args, ctx, info) {
  console.log("ventas");
  const { filter, skip, take } = args;
  const nombreArr = splitArrBySpace(filter);
  const descriptionArr = splitArrBySpace(filter, "venta");
  console.log("filter venta:", filter);
  console.log("Arr:", descriptionArr);

  const ventas = await ctx.prisma.venta.findMany({
    where: {
      OR: {
        cliente: {
          OR: nombreArr,
        },
        lineas: {
          some: {
            OR: descriptionArr,
          },
        },
      },
    },
    include: {
      cliente: true,
      usuario: true,
      lineas: {
        include: {
          item: true,
        },
      },
    },
    skip,
    take,
  });

  return ventas;
}

module.exports = {
  ventas,
  postVenta,
};
