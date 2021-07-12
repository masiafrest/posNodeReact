const { splitArrBySpace } = require("./utils");
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
  const { filter, skip, take } = args;

  const searchArr = splitArrBySpace(filter, "item");
  console.log(searchArr);
  //maybe add sorting, para q aparezcan lo mas vendido primero

  const items = await ctx.prisma.item.findMany({
    where: {
      OR: searchArr,
    },
    include: {
      categorias: true,
      precio: true,
      ubicacion: true,
    },
    skip,
    take,
  });

  // console.log("items: ", items);
  return items;
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function postItem(parent, args, ctx, info) {
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
  } = args;
  const search_text = [marca, modelo, sku, descripcion, barcode].join(" ");
  return ctx.prisma.item.create({
    data: {
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
function delItem(parent, { id }, ctx, info) {
  return ctx.prisma.item.delete({
    where: {
      id,
    },
  });
}

module.exports = {
  items,
  postItem,
  updateItem,
  delItem,
};
