import { Database } from './database.types';
import { ProductQueryParams, PaginatedResponse } from '../types';
type Product = Database['public']['Tables']['products']['Row'];
type CreateProductRequest = Omit<Database['public']['Tables']['products']['Insert'], 'id' | 'created_at' | 'updated_at'>;
type UpdateProductRequest = Partial<Database['public']['Tables']['products']['Update']>;
export declare class ProductModel {
    static getAll(queryParams?: ProductQueryParams): Promise<PaginatedResponse<Product>>;
    static getById(id: string): Promise<Product | null>;
    static create(productData: CreateProductRequest): Promise<Product>;
    static update(id: string, updateData: UpdateProductRequest): Promise<Product>;
    static delete(id: string): Promise<boolean>;
    static updateStock(id: string, quantity: number): Promise<Product>;
    static getByCategory(category: string, limit?: number): Promise<Product[]>;
    static search(searchTerm: string, limit?: number): Promise<Product[]>;
}
export {};
//# sourceMappingURL=Product.d.ts.map