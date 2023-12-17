import express from "express";
import formidable from "express-formidable";
const router = express.Router();
import checkId from '../middlewares/checkId.js';
import {authenticate , authorizeAdmin} from "../middlewares/authMiddleware.js";
import { addProduct , updateProductDetails } from "../controllers/productController.js";

router.route("/").post(authenticate , authorizeAdmin , formidable() , addProduct);
router.route("/:id").put(authenticate , authorizeAdmin , formidable() , updateProductDetails);
export default router;