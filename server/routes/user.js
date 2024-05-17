import express from "express"
import {updateUser} from "../controllers/user.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.patch("/:id", verifyToken, updateUser)

export default router