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
  return ctx.prisma.cliente.findMany();
}

module.exports = {
  postCliente,
  clientes,
};
