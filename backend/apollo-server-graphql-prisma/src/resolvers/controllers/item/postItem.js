const { saveImg, errorHandler } = require("../../../utils");
const { connectOrCreateFactory, connectOrCreateArr } = require("./utils");

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
    precio,
    precioMin,
    ubicacion,
    qty,
    images,
    marca,
    modelos,
    color,
    caracteristicas,
  } = args;
  console.log("args post item: ", args);
  // console.log("save item");

  const getDescription = `${marca} ${modelos?.join(
    " "
  )} ${color} ${caracteristicas?.join(" ")} ${categorias?.join(" ")}`;
  try {
    const itemCreated = await ctx.prisma.item.create({
      data: {
        marca: {
          connectOrCreate: connectOrCreateFactory(marca),
        },
        modelos: {
          connectOrCreate: connectOrCreateArr(modelos),
        },
        caracteristicas: {
          connectOrCreate: connectOrCreateArr(caracteristicas),
        },
        color: {
          connectOrCreate: connectOrCreateFactory(color),
        },
        barcode,
        qty,
        descripcion: getDescription,
        search_text: getDescription,
        ubicacion: {
          connect: ubicacion,
        },
        categorias: {
          connectOrCreate: connectOrCreateArr(categorias),
        },
        precio: {
          create: {
            precio,
            precioMin,
          },
        },
      },
      include: {
        marca: true,
        modelos: true,
        caracteristicas: true,
        color: true,
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
