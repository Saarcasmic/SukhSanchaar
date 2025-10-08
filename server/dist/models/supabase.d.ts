import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from './database.types';
export declare const supabase: SupabaseClient<Database>;
export declare const supabaseAnon: SupabaseClient<Database, "public", "public", never, {
    PostgrestVersion: "12";
}>;
export declare const TABLES: {
    readonly PRODUCTS: "products";
    readonly ORDERS: "orders";
    readonly ORDER_ITEMS: "order_items";
    readonly USERS: "users";
    readonly ADMINS: "admins";
};
export declare const handleSupabaseError: (error: any, operation: string) => never;
export declare const isSupabaseSuccess: (response: any) => boolean;
//# sourceMappingURL=supabase.d.ts.map