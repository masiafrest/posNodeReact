/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function items(parent, args, ctx, info) {
  const { filter, skip, take } = args;

  const searchArr = filter.split(" ").map((e) => {
    return {
      search_text: {
        contains: `${e}`.replace("'", ""),
      },
    };
  });

  //maybe add sorting, para q aparezcan lo mas vendido primero

  const items = await ctx.prisma.item.findMany({
    where: {
      OR: searchArr,
    },
    include: {
      categorias: true,
      precio: true,
      ubicacion: true,
    },
    skip,
    take,
  });

  // console.log("items: ", items);
  return items;
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

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function clientes(_, args, ctx) {
  return ctx.prisma.cliente.findMany();
}

module.exports = {
  items,
  categorias,
  ubicaciones,
  clientes,
};
