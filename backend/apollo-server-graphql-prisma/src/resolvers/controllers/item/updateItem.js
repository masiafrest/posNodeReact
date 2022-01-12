//TODO updateItem
/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function updateItem(parent, args, ctx, info) {
  const {
    id,
    barcode,
    qty,
    precio,
    precioMin,
    categorias,
    images,
    marca,
    modelos = [],
    color,
    caracteristicas = [],
  } = args;
  console.log("update item args:", args);
  console.log("buscnado item ....");
  const search_text = `${marca} ${modelos.join(" ")} ${
    color ? color : ""
  } ${caracteristicas.join(" ")} ${categorias.join(" ")}`;
  const item = await ctx.prisma.item.findUnique({
    where: { id },
    include: {
      categorias: true,
      modelos: true,
      caracteristicas: true,
      marca: true,
      color: true,
    },
  });
  console.log("item encontrado: ", item);

  let imagesPath = "";
  if (images) {
    const filenames = await Promise.all(images).then((e) => {
      return e.map((e) => e.filename);
    });

    //del img_url and save new
    if (filenames.join(", ") !== item.image_url) {
      console.log("update imgs", images);
      try {
        console.log("deleting image........");
        delImg(item.image_url);

        console.log("done deleting image........");
        //save img
        console.log("saving image........");
        imagesPath = await saveImg(images);
        console.log("done saving image........");
      } catch (e) {
        console.log(e);
        return e;
      }
    }
  }

  //update categorias disconnect and connect
  const updateConnDisc = require("./updateConnDisc");
  let updateCategorias = updateConnDisc(categorias, item.categorias);
  let updModelos = updateConnDisc(modelos, item.modelos);
  let updCaracteristicas = updateConnDisc(
    caracteristicas,
    item.caracteristicas
  );
  console.log("done categoriaConnDisconn", updateCategorias.connectOrCreate);
  console.log("done modelosConnDisconn", updModelos);

  try {
    const [updTrx] = await ctx.prisma.$transaction([
      ctx.prisma.item.update({
        where: {
          id,
        },
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
          color: color
            ? {
                connectOrCreate: {
                  where: {
                    nombre: color,
                  },
                  create: {
                    nombre: color,
                  },
                },
              }
            : undefined,
          modelos: updModelos,
          caracteristicas: updCaracteristicas,
          image_url: imagesPath,
          barcode,
          qty,
          descripcion: search_text,
          search_text,
          categorias: updateCategorias,
          precio: {
            update: {
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
      }),
    ]);
    return updTrx;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

module.exports = updateItem;
