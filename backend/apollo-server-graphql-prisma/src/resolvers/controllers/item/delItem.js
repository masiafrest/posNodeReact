/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
async function delItem(parent, { id }, ctx, info) {
  //soft delete
  try {
    return await ctx.prisma.item.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });
  } catch (e) {
    console.log(e);
    return e;
  }

  //hard delete

  // const item = await ctx.prisma.item.findUnique({
  //   where: { id },
  // });

  // try {
  //   item.image_url && (await delImg(item.image_url, "items"));
  //   return await ctx.prisma.item.delete({
  //     where: {
  //       id,
  //     },
  //   });
  // } catch (e) {
  //   console.log(e);
  //   return e;
  // }
}

module.exports = delItem;
