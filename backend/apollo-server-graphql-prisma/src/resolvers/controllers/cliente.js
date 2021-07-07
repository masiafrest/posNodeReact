const { splitArrBySpace } = require("./utils");

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function postCliente(_, { nombre, telefono, email, dirrecion }, ctx) {
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
function clientes(_, args, ctx) {
  const { filter, skip, take } = args;
  const searchArr = splitArrBySpace(filter);
  console.log(searchArr);
  return ctx.prisma.cliente.findMany({
    where: {
      OR: searchArr,
    },
    skip,
    take,
  });
}

module.exports = {
  postCliente,
  clientes,
};
