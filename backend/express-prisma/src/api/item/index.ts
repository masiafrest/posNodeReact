import express from 'express'
import item from "./item.routes";

const router = express()

router.use('/', item)

export default router