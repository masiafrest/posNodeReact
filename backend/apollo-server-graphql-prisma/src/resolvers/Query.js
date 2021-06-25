/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function items(parent, args, ctx, info) {
  const { filter, skip, take } = args;
  let where = {};

  if (filter) {
    const searchArr = filter.split(" ").map((e) => `%${e}%`.replace("'", ""));
    console.log(searchArr);
    console.log(searchArr.join("|"));
    const itemSearch = await ctx.prisma
      .$queryRaw`SELECT id FROM "Item" where tsvector @@ to_tsquery('spanish',${searchArr.join(
      "|"
    )})`;
    where = {
      id: {
        in: itemSearch.map((e) => e.id),
      },
    };
  }

  // where = filter
  //   ? {
  //       OR: [
  //         { marca: { contains: filter } },
  //         { modelo: { contains: filter } },
  //         { descripcion: { contains: filter } },
  //         { sku: { contains: filter } },
  //       ],
  //     }
  //   : {};
  return ctx.prisma.item.findMany({
    where,
    include: {
      categorias: true,
      precio: true,
      ubicacion: true,
    },
    skip,
    take,
  });
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function categorias(parent, args, ctx, info) {
  return ctx.prisma.categoria.findMany();
}

function ubicaciones(parent, args, ctx, info) {
  return ctx.prisma.ubicacion.findMany();
}

module.exports = {
  items,
  categorias,
  ubicaciones,
};
