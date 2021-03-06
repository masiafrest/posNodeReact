/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function postVenta(parent, args, ctx, info) {
  const { cliente, credito, subTotal, tax, total, lineas } = args;
  console.log("ventas post args: ", args);

  const newLines = lineas.map((linea) => {
    const { id, descripcion, precio, qty } = linea;
    return {
      item: id * 1 ? { connect: { id: id * 1 } } : undefined,
      // itemd: id,
      descripcion: `${descripcion}`,
      qty,
      precio,
    };
  });

  console.log("ventas post newlines: ", newLines);

  console.log("restar item");
  try {
    console.log("crear venta");
    const ItemDecrementOnDB = lineas
      .map((linea) => {
        // no hay item con id 0, 0 es falty
        if (linea.id * 1) {
          return ctx.prisma.item.update({
            where: { id: linea.id * 1 },
            data: {
              qty: {
                decrement: 1,
              },
            },
          });
        }
        return;
      })
      .filter((e) => e !== undefined);
    const [ventasTrx] = await ctx.prisma.$transaction([
      ctx.prisma.venta.create({
        data: {
          usuarioNombre: ctx.currentUser.nombre,
          clienteNombre: cliente,
          credito,
          subTotal,
          tax,
          total,
          lineas: {
            create: newLines,
          },
        },
        include: {
          lineas: true,
        },
      }),
      ...ItemDecrementOnDB,
    ]);

    console.log("ventasTrx", ventasTrx);
    return ventasTrx;
    // return await ctx.prisma.venta.create({
    //   data: {
    //     usuarioNombre: ctx.currentUser.nombre,
    //     clienteNombre: cliente,
    //     credito,
    //     subTotal,
    //     tax,
    //     total,
    //     lineas: {
    //       create: newLines,
    //     },
    //   },
    //   include: {
    //     lineas: true,
    //   },
    // });
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

  const venta = await ctx.prisma.venta.update({
    where: { id: id * 1 },
    data: {
      credito,
    },
    include: {
      lineas: true,
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
  const { filter, skip, take, isCredito } = args;
  console.log("get ventas args: ", args);

  const where = {
    // OR: filter
    //   .trim()
    //   .split(" ")
    //   .filter((w) => w !== "")
    //   .map((e) => ({
    //     lineas: {
    //       some: {
    //         descripcion: {
    //           contains: e,
    //         },
    //       },
    //     },
    //     clienteNombre: { contains: e },
    //   })),
    OR: [
      {
        lineas: {
          some: {
            descripcion: { contains: filter },
          },
        },
      },
      {
        clienteNombre: { contains: filter },
      },
    ],
    credito: { equals: isCredito },
  };

  const query = await ctx.prisma.venta.findMany({
    where,
    include: {
      lineas: true,
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

  console.log("venta get data where:", where);
  return { query, count };
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function delVenta(parent, { id }, ctx, info) {
  const venta = await ctx.prisma.venta.findFirst({
    where: { id: id * 1 },
    include: {
      lineas: true,
    },
  });

  if (!venta) {
    console.log("recibo de venta no existe");
    throw new Error("recibo de venta no existe");
  }

  // update item qty
  console.log("updateItem .........");
  for (const itemLinea of venta.lineas) {
    if (itemLinea.itemId) {
      const { qty } = await ctx.prisma.item.findFirst({
        where: { id: itemLinea.itemId },
      });
      await ctx.prisma.item.update({
        where: { id: itemLinea.itemId },
        data: { qty: qty + itemLinea.qty },
      });
    }
  }

  //del venta recibo
  const delVenta = await ctx.prisma.venta.delete({ where: { id: id * 1 } });
  return delVenta;
}

module.exports = {
  ventas,
  postVenta,
  updateVenta,
  delVenta,
};
