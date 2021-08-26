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
  console.log("get items", args);
  const { filter, skip, take } = args;

  const searchArr = splitArrBySpace(filter, "search_text");
  //maybe add sorting, para q aparezcan lo mas vendido primero

  const where = {
    OR: searchArr,
  };

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
  console.log("find item by id", id);
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
    marca,
    modelo,
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
  const search_text = [marca, modelo, sku, descripcion, barcode].join(" ");

  const imagesPath = await saveImg(images);

  return await ctx.prisma.item.create({
    data: {
      image_url: imagesPath,
      marca,
      modelo,
      barcode,
      sku,
      qty,
      descripcion,
      search_text,
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
    marca,
    modelo,
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
  });

  //del img_url and save new
  let imagesPath;
  if (images) {
    console.log("update imgs", images);
    try {
      delImg(item.image_url);
      //save img
      imagesPath = await saveImg(images);
      console.log("update imgsPath", imagesPath);
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  //update categorias disconnect and connect
  let categoriasConnDisconn = { connect: [], disconnect: [] };
  if (categorias) {
    //get item categorias to compare to newCategorias
    //if itemCategorias.id true, newCategorias.id false, disconnect
    const currCatIds = item.categorias.map((e) => e.id);
    categorias.forEach((obj) => {
      if (!currCatIds.includes(obj.id)) {
        categoriasConnDisconn.connect.push({ id: obj.id });
      }
    });
    currCatIds.forEach((id) => {
      categorias.forEach((obj) => {
        if (!currCatIds.includes(obj.id)) {
          categoriasConnDisconn.connect.push({ id: obj.id });
        } else if (id !== obj.id) {
          categoriasConnDisconn.disconnect.push({ id });
        }
      });
    });
    console.log(categoriasConnDisconn);
  }

  return ctx.prisma.item.update({
    where: {
      id,
    },
    data: {
      marca,
      modelo,
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
      image_url: imagesPath,
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
  const { image_url } = await ctx.prisma.item.findUnique({
    where: { id },
    select: {
      image_url: true,
    },
  });

  try {
    await delImg(image_url);
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
