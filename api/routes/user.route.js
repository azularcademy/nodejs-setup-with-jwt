import express from "express";
import { register, login, getUsersList, logout  } from "../controllers/user-controller";
import isAuthorized from "../utilities/is-authorized";


const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/userlist", isAuthorized, getUsersList);


export default router;





