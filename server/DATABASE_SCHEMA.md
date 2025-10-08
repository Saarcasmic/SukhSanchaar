# SukhSanchaar Database Schema

**Generated on:** 2025-01-08  
**Source:** Live Supabase Database  
**Status:** Current Production Schema

## Overview

This document contains the complete database schema for the SukhSanchaar Ayurvedic e-commerce platform. The schema includes 4 main tables: `products`, `orders`, `order_items`, and `Poster`.

## Tables

### 1. Products Table

**Purpose:** Stores information about Ayurvedic products

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `gen_random_uuid()` | Primary Key |
| `name` | VARCHAR(255) | No | - | Product name |
| `description` | TEXT | No | - | Product description |
| `price` | NUMERIC | No | - | Current price |
| `original_price` | NUMERIC | Yes | - | Original price (for discounts) |
| `category` | VARCHAR(100) | No | - | Product category |
| `image_url` | TEXT | No | - | Main product image URL |
| `images` | TEXT[] | Yes | - | Array of additional image URLs |
| `ingredients` | TEXT[] | No | - | Array of ingredients |
| `benefits` | TEXT[] | No | - | Array of product benefits |
| `usage_instructions` | TEXT | No | - | How to use the product |
| `weight` | VARCHAR(50) | No | - | Weight of single unit |
| `expiry_date` | DATE | Yes | - | Product expiry date |
| `is_active` | BOOLEAN | No | `true` | Whether product is active |
| `rating` | NUMERIC | Yes | - | Product rating |
| `review_count` | INTEGER | No | `0` | Number of reviews |
| `created_at` | TIMESTAMPTZ | No | `now()` | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | No | `now()` | Last update timestamp |
| `image_onZoom` | TEXT | Yes | - | Zoom image for hover effect |
| `pack_details` | ENUM | No | `'1'` | Number of units in a pack |
| `image_product_info` | TEXT[] | Yes | - | Images for product info modal |

**Enums:**
- `pack_type`: '1', '2', '3', '4', '5', '6', '7'

**Current Records:** 2

### 2. Orders Table

**Purpose:** Stores customer order information

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `gen_random_uuid()` | Primary Key |
| `order_number` | VARCHAR(50) | No | - | Unique order number |
| `customer_name` | VARCHAR(255) | No | - | Customer name |
| `customer_email` | VARCHAR(255) | No | - | Customer email |
| `customer_phone` | VARCHAR(20) | No | - | Customer phone |
| `shipping_address` | JSONB | No | - | Shipping address (flexible structure) |
| `billing_address` | JSONB | Yes | - | Billing address (flexible structure) |
| `subtotal` | NUMERIC | No | - | Subtotal amount |
| `tax_amount` | NUMERIC | No | - | Tax amount |
| `shipping_amount` | NUMERIC | No | - | Shipping cost |
| `total_amount` | NUMERIC | No | - | Total order amount |
| `payment_status` | VARCHAR(20) | No | `'pending'` | Payment status |
| `order_status` | VARCHAR(20) | No | `'pending'` | Order status |
| `payment_method` | VARCHAR(50) | No | - | Payment method used |
| `razorpay_order_id` | VARCHAR(255) | Yes | - | Razorpay order ID |
| `razorpay_payment_id` | VARCHAR(255) | Yes | - | Razorpay payment ID |
| `razorpay_signature` | TEXT | Yes | - | Razorpay signature |
| `notes` | TEXT | Yes | - | Additional notes |
| `created_at` | TIMESTAMPTZ | No | `now()` | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | No | `now()` | Last update timestamp |

**Current Records:** 10

### 3. Order Items Table

**Purpose:** Stores individual items within each order

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `gen_random_uuid()` | Primary Key |
| `order_id` | UUID | No | - | Foreign Key to orders.id |
| `product_id` | UUID | No | - | Foreign Key to products.id |
| `product_name` | VARCHAR(255) | No | - | Product name (snapshot) |
| `product_image` | TEXT | No | - | Product image URL (snapshot) |
| `quantity` | INTEGER | No | - | Quantity ordered |
| `unit_price` | NUMERIC | No | - | Price per unit |
| `total_price` | NUMERIC | No | - | Total price for this item |
| `created_at` | TIMESTAMPTZ | No | `now()` | Creation timestamp |

**Foreign Keys:**
- `order_id` → `orders.id`
- `product_id` → `products.id`

**Current Records:** 14

### 4. Poster Table

**Purpose:** Stores promotional poster information

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | BIGINT | No | - | Primary Key |
| `created_at` | TIMESTAMPTZ | No | `now()` | Creation timestamp |
| `image_url` | TEXT | Yes | - | Poster image URL |
| `redirecting_url` | TEXT | Yes | - | URL to redirect to when clicked |

**Current Records:** 2

## Schema Changes from Previous Version

### Products Table Changes:
1. **Removed:** `stock_quantity` column (not present in live schema)
2. **Added:** `image_onZoom` column for hover zoom effect
3. **Added:** `pack_details` column with enum constraint
4. **Added:** `image_product_info` column for product info modal images
5. **Updated:** `review_count` is now non-nullable with default 0

### Orders Table Changes:
1. **Updated:** `shipping_address` and `billing_address` are now JSONB (flexible structure)
2. **Updated:** `payment_status` and `order_status` are now generic strings instead of enums

### New Tables:
1. **Added:** `Poster` table for promotional content

## Database Statistics

- **Total Tables:** 4
- **Total Records:** 28 (2 products + 10 orders + 14 order_items + 2 posters)
- **Database:** Supabase PostgreSQL
- **Schema:** Public

## API Endpoints Available

Based on the schema, the following REST API endpoints are available:

### Products
- `GET /products` - List all products
- `POST /products` - Create new product
- `GET /products/:id` - Get specific product
- `PATCH /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Orders
- `GET /orders` - List all orders
- `POST /orders` - Create new order
- `GET /orders/:id` - Get specific order
- `PATCH /orders/:id` - Update order
- `DELETE /orders/:id` - Delete order

### Order Items
- `GET /order_items` - List all order items
- `POST /order_items` - Create new order item
- `GET /order_items/:id` - Get specific order item
- `PATCH /order_items/:id` - Update order item
- `DELETE /order_items/:id` - Delete order item

### Posters
- `GET /Poster` - List all posters
- `POST /Poster` - Create new poster
- `GET /Poster/:id` - Get specific poster
- `PATCH /Poster/:id` - Update poster
- `DELETE /Poster/:id` - Delete poster

## Notes

1. **JSONB Fields:** The `shipping_address` and `billing_address` fields in the orders table use JSONB for flexibility, allowing different address structures.

2. **Enum Constraints:** The `pack_details` field in products uses an enum with values 1-7.

3. **Foreign Key Relationships:** Order items are linked to both orders and products via foreign keys.

4. **Timestamps:** All tables use `TIMESTAMPTZ` for timezone-aware timestamps.

5. **UUIDs:** Most primary keys use UUIDs for better distributed system compatibility.

6. **Arrays:** Several fields use PostgreSQL arrays for storing multiple values (images, ingredients, benefits).

This schema is now synchronized with your live Supabase database and ready for use in your application.
