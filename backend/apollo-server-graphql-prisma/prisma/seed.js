const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
      modelos: true,
      caracteristicas: true,
      categorias: true,
      color: true,
      marca: true,
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
        include: {
          modelos: true,
          caracteristicas: true,
          categorias: true,
          color: true,
          marca: true,
        },
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
  const containArr = ["mate 8"];
  const strToAdd = "";
  await Promise.all(
    containArr.map(async (contain) => {
      const containUpperCase = contain.toUpperCase();
      // const items = await getItems(contains);
      // console.log(items);
      console.log("-----------------------------");
      const item = await getItem(containUpperCase);
      console.log(item);
      await execAllPromiseConnect(
        item,
        strToAdd ? strToAdd.toUpperCase() : containUpperCase,
        "modelos"
      );
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
