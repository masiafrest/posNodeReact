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
        color,
        sku,
        categorias,
        precio,
        precioMin,
        ubicacion
    }
    return ctx.prisma.item.create({
        data: {
            marca,
            modelo,
            barcode,
            color,
            sku,
            categorias: {
                connect: categorias
            },
            inventarios: {
                create: {
                    color,
                    qty,
                    precio: {
                        create: {
                            precio,
                            precioMin
                        }
                    },
                    ubicacion: {
                        connect: {
                            id: ubicacion.id
                        }
                    }
                }
            }

        }
    })
}

module.exports = {
    postItem
}