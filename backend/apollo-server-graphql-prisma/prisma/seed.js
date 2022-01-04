const { PrismaClient } = require("@prisma/client");
const { item } = require("../src/resolvers/controllers/item");
const prisma = new PrismaClient();

const env = process.env.NODE_ENV;

// async function main() {
//   const sonia = {
//     data: {
//       rol: "ADMIN",
//       nombre: "sonia",
//       password: "celloo",
//     },
//   };

//   const julio = {
//     data: {
//       rol: "ADMIN",
//       nombre: "julio",
//       password: "celloo",
//     },
//   };

//   const ubicacion = {
//     data: {
//       dirrecion: "DORADO",
//       tipo: "TIENDA",
//     },
//   };

//   const categoriaLcd = {
//     data: {
//       nombre: "lcd",
//     },
//   };

//   const item = {
//     data: {
//       barcode: 000,
//       image_url: "abc",
//       qty: 30,
//       descripcion: "HUAWEI Y9P NEGRO COP",
//       search_text: "HUAWEI Y9P 11111 NEGRO COP",
//       ubicacion: { connect: { id: ubicacion.id } },
//       categorias: { connect: [{ id: categoriaLcd.id }] },
//       precio: {
//         create: {
//           precio: 10.1,
//           precioMin: 10.0,
//         },
//       },
//     },
//     include: {
//       categorias: true,
//       precio: true,
//       ubicacion: true,
//     },
//   };

//   const cliente = {
//     data: {
//       nombre: "PANACELL",
//       telefono: "555-5555",
//       dirrecion: "DORADO",
//     },
//   };

//   await prisma.usuario.create(sonia);
//   await prisma.usuario.create(julio);
//   await prisma.ubicacion.create(ubicacion);
//   env === "dev" && (await prisma.cliente.create(cliente));
//   env === "dev" && (await prisma.categoria.create(categoriaLcd));
//   env === "dev" && (await prisma.item.create(item));
// }

const getItems = async (contains) => {
  return await prisma.item.findMany({
    where: {
      AND: [
        {
          // id: 227,
          descripcion: {
            contains,
          },
        },
        {
          descripcion: {
            contains,
          },
        },
      ],
    },
    // include: {
    //   caracteristicas: true,
    // },
  });
};

const getItem = async (contains) => {
  return await prisma.item.findMany({
    where: {
      descripcion: {
        contains,
      },
    },
    include: {
      caracteristicas: true,
    },
  });
};

const execAllPromiseDisconnect = async (items, contains, table) => {
  Promise.all(
    items.map(async (item) => {
      await prisma.item.update({
        where: { id: item.id },
        data: {
          modelos: {
            disconnect: {
              nombre: contains.trim(),
            },
          },
        },
      });
    })
  );
};
const execAllPromiseConnect = async (items, contains, table) => {
  const data = {};
  data[table] = {
    connectOrCreate: {
      create: {
        nombre: contains.trim(),
      },
      where: {
        nombre: contains.trim(),
      },
    },
  };
  return Promise.all(
    items.map(async (item) => {
      // console.log("updating item id: ", item.id);
      await prisma.item.update({
        where: { id: item.id },
        data,
      });
    })
  ).then(() => {
    console.log("...........finish........................");
  });
};
/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} prisma
 */
async function main() {
  const containArr = ["mix 2s"];
  await Promise.all(
    containArr.map(async (contain) => {
      const contains = contain.toUpperCase();
      console.log(contains);
      // const items = await getItems(contains);
      // console.log(items);
      console.log("-----------------------------");
      const item = await getItem(contains);
      console.log(item);
      await execAllPromiseConnect(item, contains, "modelos");
      // await execAllPromiseDisconnect(item, contains);
    })
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
