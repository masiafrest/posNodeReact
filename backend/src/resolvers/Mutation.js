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

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function postCategoria(parent, {
    nombre
}, ctx, info) {
    return ctx.prisma.categoria.create({
        data: {
            nombre
        }
    })
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function postUbicacion(parent, {
    dirrecion,
    tipo
}, ctx, info) {
    return ctx.prisma.ubicacion.create({
        data: {
            dirrecion,
            tipo,
        }
    })
}

/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
function delItem(parent, {
    id
}, ctx, info) {
    return ctx.prisma.item.delete({
        where: {
            id
        }
    })
}

module.exports = {
    postItem,
    postCategoria,
    postUbicacion,
    delItem
}