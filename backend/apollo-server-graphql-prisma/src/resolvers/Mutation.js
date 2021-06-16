const include = 
{
      categorias: true,
      precio: true,
      ubicacion: true,
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
    precio,
    precioMin,
    ubicacion,
    qty,
  } = args;
  return ctx.prisma.item.create({
    data: {
      marca,
      modelo,
      barcode,
      sku,
      qty,
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
    include ,
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
  const {id, marca, modelo, barcode, sku, qty, descripcion,
     precio, precioMin, categorias} = args
  console.log(args.categorias)
  //update categorias disconnect and connect
  let categoriasConnDisconn = {connect:[], disconnect:[]}
  //get item categorias to compare to newCategorias
  const item= await ctx.prisma.item.findUnique({where:{id}, include:{categorias: true}})
  //if itemCategorias.id true, newCategorias.id false, disconnect 
  const currCatIds = item.categorias.map(e => e.id)
  categorias.forEach(obj => {
    if (!currCatIds.includes(obj.id)){
      categoriasConnDisconn.connect.push({id: obj.id})
    }
  })
  currCatIds.forEach(id => {
    categorias.forEach(obj => {
    if (!currCatIds.includes(obj.id)){
      categoriasConnDisconn.connect.push({id: obj.id})
    } else if (id !== obj.id){
      categoriasConnDisconn.disconnect.push({id})
    }
    })
  })
  console.log(categoriasConnDisconn)
  //if itemCategorias.id false, newCategorias.id true, connect 
  //if itemCategorias.id and newCategorias.id true or false ,do nothing 
  return ctx.prisma.item.update({
    where: {
      id,
    },
    data:{
      marca, modelo, barcode, sku, qty,descripcion,
      categorias:categoriasConnDisconn,
      precio: {
        update:{
          precio, precioMin
        }
      }
    },
   include 
  });
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function softDelItem(parent, { id }, ctx, info) {
  return ctx.prisma.item.update({
    where: {
      id,
    },
    data: {
      deleted: true,
    },
    select: {
      deleted: true,
    },
  });
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function postCategoria(parent, { nombre }, ctx, info) {
  return ctx.prisma.categoria.create({
    data: {
      nombre,
    },
  });
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function postUbicacion(parent, { dirrecion, tipo }, ctx, info) {
  return ctx.prisma.ubicacion.create({
    data: {
      dirrecion,
      tipo,
    },
  });
}


module.exports = {
  postItem,
  postCategoria,
  postUbicacion,
  updateItem,
  softDelItem,
};
