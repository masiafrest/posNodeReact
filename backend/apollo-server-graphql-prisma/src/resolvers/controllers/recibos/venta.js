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
    console.log("maping lineas to decrement");
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
    console.log("decrementItem: ", decrementItems);

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
async function ventas(parent, args, ctx, info) {
  const { filter, skip, take } = args;
  const clienteNombre = splitArrBySpace(filter, "clienteNombre");
  const descriptionArr = splitArrBySpace(filter, "descripcion");

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

  const where = {
    OR: {
      OR: clienteNombre,
      lineas: hasLineas ? { some: { OR: descriptionArr } } : {},
    },
  };

  console.log("find ventas");
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
};
