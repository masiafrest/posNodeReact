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
  console.log('ventas')
  const { filter, skip, take } = args;
  console.log("filter venta:", filter);
  const searchArr = splitArrBySpace(filter, 'venta')
  console.log('nombre: ', nombre)
  console.log('search text: ', search_text)

  return await ctx.prisma.venta.findMany({
    where: {
      OR: {
        cliente: {
          OR: splitArrBySpace(filter)
        },
        // lineas: 
        //   some: {
        //     item: {
        //       OR: splitArrBySpace(filter, 'item')
        //     }
        //   }
        // }
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
}

module.exports = {
  ventas,
  postVenta,
};
