import express, { Request, Response, NextFunction } from "express";
import productService from "../5-services/product-service";
import ProductModel from "../3-models/product-model";
import StatusCode from "../3-models/status-codes";
import { fileSaver } from "uploaded-file-saver";
import verifyToken from "../4-middleware/verifyToken";
import verifyAdmin from "../4-middleware/verifyAdmin";
const router = express.Router();


// GET https://localhost:4000/api/products
router.get("/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await productService.getAllProducts();
        response.json(products);
    } catch (err: any) {
        next(err);
    }
})
// GET https://localhost:4000/api/products/:id
router.get("/products/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const product = await productService.getOneProduct(id);
        response.json(product);
    } catch (err: any) {
        next(err);
    }
})
// POST https://localhost:4000/api/products
router.post("/products",verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const product = new ProductModel(request.body);
        const addedProduct = await productService.addProduct(product);
        response.status(StatusCode.Created).json(addedProduct);
    } catch (err: any) {
        next(err);
    }
})
// PUT https://localhost:4000/api/products/:id
router.put("/products/:id([0-9]+)",verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.id = +request.params.id
        request.body.image = request.files?.image
        const product = new ProductModel(request.body);
        const updatedProduct = await productService.editProduct(product);
        response.json(updatedProduct);

    } catch (err: any) {
        next(err);
    }
})
// DELETE  https://localhost:4000/api/products/:id
router.delete("/products/:id([0-9]+)",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await productService.deleteProduct(id);
        // response.json(`deleted item ${id}`)
        // or
        response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
        next(err);
    }
})
// GET https://localhost:4000/api/products-by-price/:min/:max
router.get("/products-by-price/:min/:max", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const min = +request.params.min;
        const max = +request.params.max;
        const products = await productService.getProductsByPrice(min, max);
        response.json(products);
    } catch (err: any) {
        next(err);
    }
})
// GET https://localhost:4000/api/products-by-price2/?min&?:max
router.get("/products-by-price2", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const min = +request.query.min;
        const max = +request.query.max;
        const products = await productService.getProductsByPrice(min, max);
        response.json(products);
    } catch (err: any) {
        next(err);
    }
})
// GET https://localhost:4000/api/products-by-category?id=
router.get("/products-by-category", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.query.id;
        const products = await productService.getProductsByCategoryId(id);
        response.json(products);
    } catch (err: any) {
        next(err);
    }
})
// GET https://localhost:4000/api/add-product-by-procedure
router.post("/add-product-by-procedure",verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const product = new ProductModel(request.body);
        const addedProduct = await productService.addProductByProcedure(product);
        response.status(StatusCode.Created).json(addedProduct);
    } catch (err: any) {
        next(err);
    }
})
// GET https://localhost:4000/api/products-by-category?id=
router.get("/products/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = fileSaver.getFilePath(imageName);
        response.sendFile(absolutePath);

    } catch (err: any) {
        next(err);
    }
})





export default router;