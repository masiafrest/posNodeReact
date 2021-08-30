const { splitArrBySpace } = require("../../../utils");

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function postVenta(parent, args, ctx, info) {
  const { clienteId, credito, subTotal, tax, total, lineas } = args;
  console.log("post venta");

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

  console.log("post venta args:", args);
  const cliente = await ctx.prisma.cliente.findUnique({
    where: { id: clienteId * 1 },
  });
  console.log("cliente:", cliente);

  console.log("currentUser: ", ctx.currentUser);

  const venta = await ctx.prisma.venta.create({
    data: {
      // usuario: { connect: { nombre: ctx.currentUser.nombre } },
      // cliente: { connect: { nombre: cliente.nombre } },
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

  console.log("venta:", venta);
  return venta;
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

  // console.log("check client");
  // const hasClient =
  //   (await ctx.prisma.venta.count({
  //     where: {
  //       OR: {
  //         cliente: {
  //           OR: nombreArr,
  //         },
  //       },
  //     },
  //   })) > 0;
  // console.log("clienet check:", hasClient);

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
