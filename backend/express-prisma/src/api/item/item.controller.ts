import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const controller = {
    get:  async() => {
    console.log('item get')
    const items = await prisma.item.findMany() 
    console.log(items)
    return items
}
}

export default controller