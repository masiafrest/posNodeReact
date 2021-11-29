const { saveImg, delImg, errorHandler } = require("../../../utils");

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function items(parent, args, ctx, info) {
  const { filter, skip, take, lte, categoria } = args;

  const qty = {};
  if (lte) {
    qty.lte = lte;
  }

  const trimWord = filter.trim();
  const splitWord = trimWord.split(" ");
  const noSpaceInWords = splitWord.filter((word) => word !== "");

  let where = {
    qty,
  };

  console.log("query items categoria:", categoria);
  if (categoria !== undefined) {
    if (categoria !== "todos") {
      where.categorias = {
        some: { nombre: { contains: categoria.trim() } },
      };
    }
  }

  where.AND = noSpaceInWords.map((e) => ({
    descripcion: {
      contains: e,
    },
  }));

  // lte && (where.qty.lte = lte);
  // gte && (where.qty.gte = gte);

  console.log("args: ", args);
  console.log("where: ", where);
  const query = await ctx.prisma.item.findMany({
    where,
    include: {
      categorias: true,
      precio: true,
      ubicacion: true,
      lineaVenta: true,
    },
    skip,
    take,
  });
  console.log(
    "query:",
    query.map((e) => e.descripcion)
  );

  const count = await ctx.prisma.item.count({
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
async function item(_, { id }, ctx, __) {
  return await ctx.prisma.item.findUnique({
    where: {
      id,
    },
    include: {
      categorias: true,
      precio: true,
      ubicacion: true,
    },
  });
}

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

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function delItem(parent, { id }, ctx, info) {
  const item = await ctx.prisma.item.findUnique({
    where: { id },
  });

  try {
    item.image_url && (await delImg(item.image_url, "items"));
    return await ctx.prisma.item.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    console.log(e);
    return e;
  }
}

module.exports = {
  items,
  item,
  postItem,
  updateItem,
  delItem,
};
