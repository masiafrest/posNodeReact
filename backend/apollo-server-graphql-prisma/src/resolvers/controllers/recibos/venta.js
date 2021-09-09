const { splitArrBySpace } = require("../../../utils");

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

  console.log("ventas post");
  const cliente = await ctx.prisma.cliente.findUnique({
    where: { id: clienteId * 1 },
  });

  try {
    const decrementItems = lineas.map((linea) => {
      return ctx.prisma.item.update({
        where: { id: linea.id * 1 },
        data: {
          qty: {
            decrement: 1,
          },
        },
      });
    });

    const createVenta = ctx.prisma.venta.create({
      data: {
        usuarioNombre: ctx.currentUser.nombre,
        clienteNombre: cliente.nombre,
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

    const [venta] = await ctx.prisma.$transaction([
      createVenta,
      ...decrementItems,
    ]);

    return venta;
  } catch (e) {
    console.log("error transaction:", e);
    return e;
  }
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function updateVenta(_, args, ctx, __) {
  const { id, credito } = args;

  return await ctx.prisma.$transaction([
    ctx.prisma.venta.update({
      where: { id },
      data: {
        credito,
      },
    }),
  ]);
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function ventas(parent, args, ctx, info) {
  const { filter, skip, take } = args;

  const where = {
    OR: {
      OR: [
        {
          lineas: {
            some: {
              descripcion: { contains: filter },
            },
          },
        },
        {
          clienteNombre: {
            contains: filter,
          },
        },
      ],
    },
  };
  const query = await ctx.prisma.venta.findMany({
    where,
    include: {
      lineas: {
        include: {
          item: true,
        },
      },
    },
    skip,
    take,
    orderBy: {
      fecha: "desc",
    },
  });

  const count = await ctx.prisma.venta.count({
    where,
  });

  return { query, count };
}

module.exports = {
  ventas,
  postVenta,
  updateVenta,
};
