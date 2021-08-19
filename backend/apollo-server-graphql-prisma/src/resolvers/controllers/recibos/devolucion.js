/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function postDevolucion(parent, args, ctx, info) {
  const { clienteId, lineas } = args;

  const newLines = lineas.map((linea) => {
    const {
      id,
      razon,
      qty,
      descripcion,
      qtyDevuelto,
      descripcionDevuelto,
      itemDevueltoId,
    } = linea;
    return {
      item: { connect: { id: id * 1 } },
      descripcion,
      qty,
      itemDevueltoId: {
        connect: {
          id: itemDevueltoId * 1,
        },
      },
      qtyDevuelto,
      descripcionDevuelto,
      razon,
    };
  });

  const devolucion = await ctx.prisma.devolucion.create({
    data: {
      usuario: { connect: { id: ctx.currentUser.id } },
      cliente: { connect: { id: clienteId * 1 } },
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

  return devolucion;
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function devoluciones(parent, args, ctx, info) {
  const { splitArrBySpace } = require("../utils");
  const { filter, skip, take } = args;
  const nombreArr = splitArrBySpace(filter, "nombre");
  const descriptionArr = splitArrBySpace(filter, "descripcion");

  const hasClient =
    (await ctx.prisma.devolucion.count({
      where: {
        OR: {
          cliente: {
            OR: nombreArr,
          },
        },
      },
    })) > 0;

  const hasLineas =
    (await ctx.prisma.devolucion.count({
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
      cliente: hasClient ? { OR: nombreArr } : {},
      lineas: hasLineas ? { some: { OR: descriptionArr } } : {},
    },
  };

  const query = await ctx.prisma.devolucion.findMany({
    where,
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
    orderBy: {
      fecha: "desc",
    },
  });

  const count = await ctx.prisma.devolucion.count({
    where,
  });

  return { query, count };
}

module.exports = {
  devoluciones,
  postDevolucion,
};
