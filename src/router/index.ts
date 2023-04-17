import express from "express";
import { getAllUsers, getUserDetails, deleteUserById, updateUser } from "../services/index";
import { login, register } from "../services/authentication";
import { isAuthenticate } from "../middleware";

const router = express.Router();

router.get("/users", isAuthenticate, getAllUsers);
router.get("/user/:id", isAuthenticate, getUserDetails);
router.post("/user", isAuthenticate, updateUser);

router.delete("/user", isAuthenticate, deleteUserById);
router.post("/register", register);
router.post("/login", login);

export default router;
