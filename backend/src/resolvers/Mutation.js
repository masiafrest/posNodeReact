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
            //categorias se supone q es un array 
            //esta conexion como esta mal
            categorias: {
                connect: {
                    id: categorias.id
                }
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