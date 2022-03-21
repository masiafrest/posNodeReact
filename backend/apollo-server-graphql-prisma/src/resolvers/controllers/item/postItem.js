const { saveImg, errorHandler } = require("../../../utils");
const { connectOrCreateFactory, connectOrCreateArr } = require("./utils");

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function postItem(parent, args, ctx, info) {
  const { barcode, precio, precioMin, ubicacion, qty, images, marca, color } =
    args;
  console.log("args post item: ", args);
  // console.log("save item");
  const sortedArr = (arr) => [...arr].sort();
  const caracteristicas = sortedArr(args.caracteristicas);
  const modelos = sortedArr(args.modelos);
  const categorias = sortedArr(args.categorias);

  const getDescription = `${marca} ${modelos?.join(
    " "
  )} ${color} ${caracteristicas?.join(" ")} ${categorias?.join(" ")}`;

  console.log(getDescription);
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
        modelos: { orderBy: { nombre: "asc" } },
        caracteristicas: { orderBy: { nombre: "asc" } },
        categorias: { orderBy: { nombre: "asc" } },
        color: true,
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
