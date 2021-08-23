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
      dirrecion: "dorado",
      tipo: "tienda",
    },
  };

  const categoriaLcd = {
    data: {
      nombre: "lcd",
    },
  };

  const item = {
    data: {
      marca: "huawei",
      modelo: "y9p",
      barcode: 000,
      sku: "1111",
      image_url: "abc",
      qty: 30,
      descripcion: "negro cop",
      search_text: "huawei y9p 11111 negro cop",
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
      nombre: "panacell",
      telefono: "555-5555",
      dirrecion: "dorado",
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
