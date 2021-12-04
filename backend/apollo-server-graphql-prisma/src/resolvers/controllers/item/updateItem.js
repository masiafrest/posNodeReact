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
    descripcion,
    precio,
    precioMin,
    categorias,
    images,
  } = args;
  console.log("update item args:", args);
  console.log("buscnado item ....");
  const item = await ctx.prisma.item.findUnique({
    where: { id },
    include: {
      categorias: true,
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

  console.log("updating categoria........", categorias);
  //update categorias disconnect and connect
  const updCategorias = require("./updateCategorias");
  let updateCategorias = updCategorias(categorias, item.categorias);
  console.log("done categoriaConnDisconn", updateCategorias);

  try {
    return await ctx.prisma.item.update({
      where: {
        id,
      },
      data: {
        image_url: imagesPath,
        barcode,
        qty,
        descripcion,
        search_text: `${
          descripcion ? descripcion : item.descripcion
        } ${categorias.join(" ")}`,
        categorias: updateCategorias,
        precio: {
          update: {
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
  } catch (error) {
    return errorHandler(error);
  }
}

module.exports = updateItem;
