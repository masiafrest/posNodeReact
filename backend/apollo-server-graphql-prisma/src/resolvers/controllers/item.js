const { splitArrBySpace, saveImg, delImg } = require("../../utils");

const include = {
  categorias: true,
  precio: true,
  ubicacion: true,
};

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function items(parent, args, ctx, info) {
  const { filter, skip, take, lte } = args;
  const { toTsQueryAnd } = require("../../utils");

  const qty = {};
  if (lte) {
    qty.lte = lte;
  }
  const tsquery = toTsQueryAnd(filter);
  console.log("tsquery:", tsquery);

  const where = {
    OR: [
      {
        descripcion: tsquery ? { search: tsquery } : { contains: filter },
      },
      {
        sku: tsquery ? { search: tsquery } : { contains: filter },
      },
      {
        // categorias: { some: { nombre: { contains: filter } } },
      },
    ],
    qty,
  };
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

  const imagesPath = await saveImg(images);

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
    include,
  });
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
  const item = await ctx.prisma.item.findUnique({
    where: { id },
    include: {
      categorias: true,
    },
  });

  const filenames = await Promise.all(images).then((e) => {
    return e.map((e) => e.filename);
  });

  //del img_url and save new
  let imagesPath;
  if (filenames.join(", ") !== item.image_url) {
    if (images) {
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

  console.log("updating categoria........");
  //update categorias disconnect and connect
  let categoriasConnDisconn = { connect: [], disconnect: [] };
  [].length;
  if (categorias.length !== 0) {
    console.log("categorias: ", categorias);

    //get item categorias to compare to newCategorias
    //if itemCategorias.id true, newCategorias.id false, disconnect
    console.log("map: ", item);
    const currCatIds = item.categorias.map((e) => e.id);
    categorias.forEach((obj) => {
      if (!currCatIds.includes(obj.id)) {
        categoriasConnDisconn.connect.push({ id: obj.id });
      }
    });

    console.log("forEach");
    currCatIds.forEach((id) => {
      categorias.forEach((obj) => {
        if (!currCatIds.includes(obj.id)) {
          categoriasConnDisconn.connect.push({ id: obj.id });
        } else if (id !== obj.id) {
          categoriasConnDisconn.disconnect.push({ id });
        }
      });
    });
    console.log("done categoriaConnDisconn", categoriasConnDisconn);
  }
  console.log("done updating cateoria........");

  console.log("update imgsPath", imagesPath);
  return ctx.prisma.item.update({
    where: {
      id,
    },
    data: {
      image_url: imagesPath,
      barcode,
      sku,
      qty,
      descripcion,
      categorias: categoriasConnDisconn,
      precio: {
        update: {
          precio,
          precioMin,
        },
      },
    },
    include,
  });
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
