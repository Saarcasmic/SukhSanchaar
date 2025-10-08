import { Request, Response } from 'express';
export declare class ProductController {
    static getAllProducts(req: Request, res: Response): Promise<void>;
    static getProductById(req: Request, res: Response): Promise<void>;
    static createProduct(req: Request, res: Response): Promise<void>;
    static updateProduct(req: Request, res: Response): Promise<void>;
    static deleteProduct(req: Request, res: Response): Promise<void>;
    static getProductsByCategory(req: Request, res: Response): Promise<void>;
    static searchProducts(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=productController.d.ts.map