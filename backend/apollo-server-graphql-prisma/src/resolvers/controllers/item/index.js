const postItem = require("./postItem");
const delItem = require("./delItem");
const updateItem = require("./updateItem");

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function items(parent, args, ctx, info) {
  const { filter, skip, take, lte, categoria, deleted } = args;
  console.log("args: ", args);

  const trimWord = filter?.trim();
  const splitWord = trimWord.split(" ");
  const noSpaceInWords = splitWord.filter((word) => word !== "");

  const where = {
    deleted: deleted ? true : false,
    AND: noSpaceInWords.map((e) => ({
      descripcion: {
        contains: e,
      },
    })),
    categorias: {
      some: {
        nombre: { contains: categoria === "TODOS" ? "" : categoria.trim() },
      },
    },
    qty: {
      lte: lte ? lte : undefined,
    },
  };

  const query = await ctx.prisma.item.findMany({
    orderBy: {
      descripcion: "asc",
    },
    where,
    include: {
      categorias: true,
      precio: true,
      ubicacion: true,
      lineaVenta: true,
      marca: true,
      modelos: true,
      caracteristicas: true,
      color: true,
    },
    skip: skip || 0,
    take: take || undefined,
  });
  console.log(
    "query:",
    query.map((e) => e.descripcion)
  );

  const count = await ctx.prisma.item.count({
    where,
  });

  return { query, count };
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function item(_, { id }, ctx, __) {
  return await ctx.prisma.item.findUnique({
    where: {
      id,
    },
    include: {
      categorias: true,
      precio: true,
      ubicacion: true,
    },
  });
}

module.exports = {
  items,
  item,
  postItem,
  updateItem,
  delItem,
};
