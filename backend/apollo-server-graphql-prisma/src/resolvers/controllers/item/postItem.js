const { saveImg, errorHandler } = require("../../../utils");

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function postItem(parent, args, ctx, info) {
  const {
    barcode,
    categorias,
    descripcion,
    precio,
    precioMin,
    ubicacion,
    qty,
    images,
  } = args;

  console.log("args post item: ", args);

  console.log("save item");
  try {
    const itemCreated = await ctx.prisma.item.create({
      data: {
        barcode,
        qty,
        descripcion,
        search_text: `${descripcion} ${categorias.join(" ")}`,
        ubicacion: {
          connect: ubicacion,
        },
        categorias: {
          connectOrCreate: categorias.map((nombre) => ({
            where: { nombre },
            create: { nombre },
          })),
        },
        precio: {
          create: {
            precio,
            precioMin,
          },
        },
      },
      include: {
        categorias: true,
        precio: true,
        ubicacion: true,
      },
    });

    console.log("item created: ", itemCreated);
    let imagesPath = "";

    if (images) {
      console.log("save image");
      imagesPath = await saveImg(images, "items", itemCreated.id);
    }

    await ctx.prisma.item.update({
      where: {
        id: itemCreated.id,
      },
      data: {
        image_url: imagesPath,
      },
    });

    return itemCreated;
  } catch (error) {
    return errorHandler(error);
  }
}

module.exports = postItem;
