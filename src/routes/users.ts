import { Router } from "express";
import getListUser from "../controllers/users/list";
import getDetailUser from "../controllers/users/detail";
import createUser from "../controllers/users/create";
const router = Router();

router.get("/", getListUser);
router.get("/:id", getDetailUser);
router.post("/", createUser);

export default router;
