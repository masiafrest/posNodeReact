const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const env = process.env.NODE_ENV;

async function main() {
  const sonia = {
    data: {
      rol: "ADMIN",
      nombre: "sonia",
      password: "celloo",
    },
  };

  const julio = {
    data: {
      rol: "ADMIN",
      nombre: "julio",
      password: "celloo",
    },
  };

  const ubicacion = {
    data: {
      dirrecion: "DORADO",
      tipo: "TIENDA",
    },
  };

  const categoriaLcd = {
    data: {
      nombre: "lcd",
    },
  };

  const item = {
    data: {
      barcode: 000,
      sku: "1111",
      image_url: "abc",
      qty: 30,
      descripcion: "HUAWEI Y9P NEGRO COP",
      search_text: "HUAWEI Y9P 11111 NEGRO COP",
      ubicacion: { connect: { id: ubicacion.id } },
      categorias: { connect: [{ id: categoriaLcd.id }] },
      precio: {
        create: {
          precio: 10.1,
          precioMin: 10.0,
        },
      },
    },
    include: {
      categorias: true,
      precio: true,
      ubicacion: true,
    },
  };

  const cliente = {
    data: {
      nombre: "PANACELL",
      telefono: "555-5555",
      dirrecion: "DORADO",
    },
  };

  await prisma.usuario.create(sonia);
  await prisma.usuario.create(julio);
  await prisma.ubicacion.create(ubicacion);
  env === "dev" && (await prisma.cliente.create(cliente));
  env === "dev" && (await prisma.categoria.create(categoriaLcd));
  env === "dev" && (await prisma.item.create(item));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
