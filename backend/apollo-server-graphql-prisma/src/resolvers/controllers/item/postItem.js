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
    marca,
    modelos,
    color,
    caracteristicas,
  } = args;
  console.log("args post item: ", args);
  // console.log("save item");

  try {
    const itemCreated = await ctx.prisma.item.create({
      data: {
        marca: {
          connectOrCreate: {
            where: {
              nombre: marca,
            },
            create: {
              nombre: marca,
            },
          },
        },
        modelos: {
          connectOrCreate: modelos?.map((nombre) => ({
            where: {
              nombre,
            },
            create: {
              nombre,
            },
          })),
        },
        caracteristicas: {
          connectOrCreate: caracteristicas?.map((nombre) => ({
            where: {
              nombre,
            },
            create: {
              nombre,
            },
          })),
        },
        color: {
          connectOrCreate: {
            where: {
              nombre: color,
            },
            create: {
              nombre: color,
            },
          },
        },
        barcode,
        qty,
        descripcion: `${marca} ${modelos?.join(
          " "
        )} ${color} ${caracteristicas?.join(" ")} ${categorias?.join(" ")}`,
        search_text: `${marca} ${modelos?.join(
          " "
        )} ${color} ${caracteristicas?.join(" ")} ${categorias?.join(" ")}`,
        ubicacion: {
          connect: ubicacion,
        },
        categorias: {
          connectOrCreate: categorias?.map((nombre) => ({
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
