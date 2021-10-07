const {
  saveImg,
  delImg,
  errorHandler,
  toTsQueryAnd,
} = require("../../../utils");

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function items(parent, args, ctx, info) {
  const { filter, skip, take, lte } = args;

  const qty = {};
  if (lte) {
    qty.lte = lte;
  }

  const trimWord = filter.trim();
  const splitWord = trimWord.split(" ");
  const noSpaceInWords = splitWord.filter((word) => word !== "");
  const text = noSpaceInWords.join(" ");
  const wordLength = noSpaceInWords.length;

  let tsquery;
  let where = {
    OR: [
      {
        categorias: { some: { nombre: { contains: filter } } },
      },
    ],
    qty,
  };

  if (wordLength > 1) {
    tsquery = toTsQueryAnd(text);
    console.log("tsquery:", tsquery);
    where.OR.push(
      {
        descripcion: { search: tsquery },
      },
      {
        sku: { search: tsquery },
      }
    );
  }

  where.OR.push(
    {
      descripcion: { contains: text },
    },
    {
      sku: { contains: text },
    }
  );

  // lte && (where.qty.lte = lte);
  // gte && (where.qty.gte = gte);

  console.log("args: ", args);
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
    query.map((e) => e.descripcion + " " + e.sku)
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
    sku,
    categorias,
    descripcion,
    precio,
    precioMin,
    ubicacion,
    qty,
    images,
  } = args;

  console.log("args post item: ", args);

  let imagesPath = "";
  if (images) {
    console.log("save image");
    imagesPath = await saveImg(images);
  }

  console.log("save item");
  try {
    return await ctx.prisma.item.create({
      data: {
        image_url: imagesPath,
        barcode,
        sku,
        qty,
        descripcion,
        ubicacion: {
          connect: ubicacion,
        },
        categorias: {
          connect: categorias,
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
    sku,
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
        sku,
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
    item.image_url && (await delImg(item.image_url));
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
