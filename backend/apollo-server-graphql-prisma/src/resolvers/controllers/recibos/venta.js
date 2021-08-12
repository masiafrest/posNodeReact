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
  console.log("filter venta:", args);
  const { splitArrBySpace } = require("../utils");
  const { filter, skip, take } = args;
  const nombreArr = splitArrBySpace(filter, "nombre");
  const descriptionArr = splitArrBySpace(filter, "descripcion");
  console.log("nombreArr:", nombreArr);
  console.log("descriArr:", descriptionArr);

  const hasClient =
    (await ctx.prisma.venta.count({
      where: {
        OR: {
          cliente: {
            OR: nombreArr,
          },
        },
      },
    })) > 0;

  const hasLineas =
    (await ctx.prisma.venta.count({
      where: {
        OR: {
          lineas: {
            some: {
              OR: descriptionArr,
            },
          },
        },
      },
    })) > 0;

  const ventas = await ctx.prisma.venta.findMany({
    where: {
      OR: {
        cliente: hasClient ? { OR: nombreArr } : {},
        lineas: hasLineas ? { some: { OR: descriptionArr } } : {},
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
