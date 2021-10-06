const { Prisma } = require("@prisma/client");

module.exports = function errorHandler(e) {
  console.log("error creating item: ", e.message);
  // console.log("error constructor name: ", e.constructor.name);
  if (e instanceof Prisma.PrismaClientValidationError) {
    return new Error("algunos campos estan vacios");
  }
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    console.log("error code: ", e.code);
    console.log("error meta: ", e.meta);
    const target = e.meta.target.join(", ");
    if (e.code === "P2002") {
      return new Error(`${target} ya existe, elegir otro`);
    }
  }

  return e;
};
