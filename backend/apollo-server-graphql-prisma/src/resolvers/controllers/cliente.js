/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function postCliente(_, { nombre, telefono, email, dirrecion }, ctx) {
  console.log("postcliente");
  return ctx.prisma.cliente.create({
    data: { nombre, telefono, email, dirrecion },
  });
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function clientes(_, args, ctx) {
  console.log("get clientes", args);
  const { filter, skip, take } = args;
  const where = {
    // AND: filter
    //   .trim()
    //   .split(" ")
    //   .filter((w) => w !== "")
    //   .map((e) => ({
    //     nombre: {
    //       contains: e,
    //     },
    //   })),
    nombre: {
      contains: filter,
    },
  };

  const query = await ctx.prisma.cliente.findMany({
    where,
    skip: skip || 0,
    take: take || undefined,
  });
  const count = await ctx.prisma.cliente.count({
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
function updateCliente(_, { id, nombre, telefono, dirrecion }, ctx, __) {
  console.log("updatecliente", id, nombre);
  return ctx.prisma.cliente.update({
    where: {
      id,
    },
    data: {
      nombre,
      telefono,
      dirrecion,
    },
  });
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function delCliente(_, { id }, ctx, __) {
  return ctx.prisma.cliente.delete({
    where: {
      id,
    },
  });
}

module.exports = {
  delCliente,
  postCliente,
  updateCliente,
  clientes,
};
