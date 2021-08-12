const { splitArrBySpace } = require("./utils");

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
function clientes(_, args, ctx) {
  const { filter, skip, take } = args;
  const searchArr = splitArrBySpace(filter, "nombre");
  console.log(searchArr);
  return ctx.prisma.cliente.findMany({
    where: {
      OR: searchArr,
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
