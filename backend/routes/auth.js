import express from "express";
import {login,register} from "../controllers/auth.js";
import { payment } from "../controllers/payment.js";

const router=express.Router();
router.post("/login",login);
router.post("/register",register);
router.post("/payment",payment);
export default router;
