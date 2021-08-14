/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function postUbicacion(parent, { dirrecion, tipo }, ctx, info) {
  return ctx.prisma.ubicacion.create({
    data: {
      dirrecion,
      tipo,
    },
  });
}

function ubicaciones(parent, args, ctx, info) {
  const query = ctx.prisma.ubicacion.findMany();
  const count = ctx.prisma.ubicacion.count()
  return { query, count }
}

module.exports = {
  ubicaciones,
  postUbicacion,
};
