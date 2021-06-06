const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const sonia = await prisma.usuario.create({
    data: {
      rol: "ADMIN",
      nombre: "sonia",
      password: "celloo",
    },
  });

  const ubicacion = await prisma.ubicacion.create({
    data: {
      dirrecion: "dorado",
      tipo: "tienda",
    },
  });

  const categoriaLcd = await prisma.categoria.create({
    data: {
      nombre: "Lcd",
    },
  });

  const item = await prisma.item.create({
    data: {
      marca: "huawei",
      modelo: "y9p",
      barcode: 000,
      sku: "1111",
      image_url: "abc",
      qty: 30,
      descripcion: "negro cop",
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
  });
  console.log(item);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
