const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("./utils");

const getToken = (userId) => {
  return jwt.sign({ userId }, APP_SECRET);
};

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function signup(parent, { nombre, password, rol }, ctx, info) {
  const user = await ctx.prisma.usuario.create({
    data: {
      nombre,
      password,
      rol,
    },
  });
  console.log(user);
  const token = getToken(user.id);
  return { token, usuario: user };
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function login(parent, { nombre, password, rol }, ctx, info) {
  const user = ctx.prisma.usuario.findUnique({
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

  const token = getToken(user.id);
  return { token, usuario: user };
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function usuarios(parent, args, ctx, info) {
  return ctx.prisma.usuario.findMany();
}

module.exports = {
  usuarios,
  signup,
  login,
};
