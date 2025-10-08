"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSupabaseSuccess = exports.handleSupabaseError = exports.TABLES = exports.supabaseAnon = exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase configuration. Please check your environment variables.');
}
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
exports.supabaseAnon = (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey || supabaseServiceKey);
exports.TABLES = {
    PRODUCTS: 'products',
    ORDERS: 'orders',
    ORDER_ITEMS: 'order_items',
    USERS: 'users',
    ADMINS: 'admins'
};
const handleSupabaseError = (error, operation) => {
    console.error(`Supabase error during ${operation}:`, error);
    if (error?.code) {
        throw new Error(`Database error (${error.code}): ${error.message}`);
    }
    throw new Error(`Database error during ${operation}: ${error.message || 'Unknown error'}`);
};
exports.handleSupabaseError = handleSupabaseError;
const isSupabaseSuccess = (response) => {
    return response && !response.error;
};
exports.isSupabaseSuccess = isSupabaseSuccess;
//# sourceMappingURL=supabase.js.map