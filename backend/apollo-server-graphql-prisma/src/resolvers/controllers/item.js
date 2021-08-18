const { splitArrBySpace, delImg } = require("./utils");

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
  }

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
    where
  })

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
  console.log('post item images: ', images)
  const storeUpload = async ({ stream, filename, mimetype }) => {
    const { createWriteStream, mkdir } = require("fs");
    await mkdir("public/images/items", { recursive: true }, (err) => {
      if (err) throw err;
    });
    const newFileName = `${Date.now()}${filename}`;
    const path = `public/images/items/${newFileName}`;
    // Creates an images folder in the root directory
    // (createWriteStream) writes our file to the images directory
    return new Promise((resolve, reject) =>
      stream
        .pipe(createWriteStream(path))
        .on("finish", () => resolve(newFileName))
        .on("error", reject)
    );
  };
  const processUpload = async (upload) => {
    const { createReadStream, filename, mimetype } = await upload;
    const stream = createReadStream();
    const file = await storeUpload({ stream, filename, mimetype });
    return file;
  };

  const imagesPromises = images.map(async (image) => {
    const newImage = await processUpload(image);
    return newImage;
  });

  let imagesPath = await Promise.all(imagesPromises).then((res) => res);

  return await ctx.prisma.item.create({
    data: {
      image_url: imagesPath.join(", "),
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
  } = args;
  console.log("categorias ", categorias);
  //update categorias disconnect and connect
  let categoriasConnDisconn = { connect: [], disconnect: [] };
  if (categorias) {
    //get item categorias to compare to newCategorias
    const item = await ctx.prisma.item.findUnique({
      where: { id },
      include: { categorias: true },
    });
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
    //if itemCategorias.id false, newCategorias.id true, connect
    //if itemCategorias.id and newCategorias.id true or false ,do nothing
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
function delItem(parent, { id, paths }, ctx, info) {
  delImg(paths);
  return ctx.prisma.item.delete({
    where: {
      id,
    },
  });
}

module.exports = {
  items,
  item,
  postItem,
  updateItem,
  delItem,
};
