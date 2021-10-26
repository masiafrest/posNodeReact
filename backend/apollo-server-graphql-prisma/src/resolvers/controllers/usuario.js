const { APP_SECRET, getToken } = require("../../utils");

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function postUsuario(parent, { nombre, password, rol }, ctx, info) {
  console.log("postUsuario:", nombre, password, rol);
  const user = await ctx.prisma.usuario.create({
    data: {
      nombre,
      password,
      rol,
    },
  });
  console.log(user);
  return user;
  // const token = getToken(user);
  // return { token, usuario: user };
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function login(parent, { nombre, password }, ctx, info) {
  const user = await ctx.prisma.usuario.findUnique({
    where: {
      nombre,
    },
  });
  if (!user) {
    throw new Error("usuario no existe");
  }
  const validPassword = password === user.password;
  if (!validPassword) {
    throw new Error("contraseña incorrecta");
  }

  const token = getToken(user);
  return { token, usuario: user };
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function usuarios(parent, args, ctx, info) {
  console.log("get usuarios", args);
  const { filter, skip, take } = args;
  const where = {
    OR: [{ nombre: { contains: filter.trim() } }],
  };

  const query = await ctx.prisma.usuario.findMany({
    where,
    skip,
    take,
  });
  const count = await ctx.prisma.usuario.count({
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
function updateUsuario(_, { id, nombre, password, rol }, ctx, __) {
  console.log("updateUsuario", id, nombre);
  return ctx.prisma.usuario.update({
    where: {
      id: id * 1,
    },
    data: {
      nombre,
      password,
      rol,
    },
  });
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function delUsuario(_, { id }, ctx, __) {
  return ctx.prisma.usuario.delete({
    where: {
      id: id * 1,
    },
  });
}

module.exports = {
  usuarios,
  updateUsuario,
  postUsuario,
  login,
  delUsuario,
};
