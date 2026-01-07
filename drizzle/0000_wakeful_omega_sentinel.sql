CREATE TABLE "accounts" (
	"userId" integer NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "accounts_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"password" varchar(255),
	"role" varchar(50) DEFAULT 'staff',
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verificationTokens" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationTokens_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE "fnb_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "fnb_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"price" numeric(10, 2) NOT NULL,
	"cost" numeric(10, 2),
	"stock_quantity" integer DEFAULT 0,
	"min_stock_level" integer DEFAULT 0,
	"unit" varchar(20) DEFAULT 'pcs',
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "fnb_order_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"item_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"unit_price" numeric(10, 2) NOT NULL,
	"subtotal" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fnb_orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_number" varchar(50) NOT NULL,
	"table_id" integer,
	"customer_name" varchar(100),
	"customer_phone" varchar(20),
	"subtotal" numeric(10, 2) NOT NULL,
	"tax" numeric(10, 2) DEFAULT '0',
	"total" numeric(10, 2) NOT NULL,
	"status" varchar(20) DEFAULT 'pending',
	"payment_id" integer,
	"staff_id" integer,
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "fnb_orders_order_number_unique" UNIQUE("order_number")
);
--> statement-breakpoint
CREATE TABLE "order_analytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"order_date" timestamp NOT NULL,
	"day_of_week" integer NOT NULL,
	"hour_of_day" integer NOT NULL,
	"order_value" numeric(10, 2) NOT NULL,
	"item_count" integer NOT NULL,
	"processing_time" integer
);
--> statement-breakpoint
CREATE TABLE "staff" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"role" varchar(50) NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "table_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"table_id" integer NOT NULL,
	"customer_name" varchar(100) NOT NULL,
	"customer_phone" varchar(20),
	"start_time" timestamp NOT NULL,
	"end_time" timestamp,
	"planned_duration" integer NOT NULL,
	"actual_duration" integer,
	"original_duration" integer,
	"duration_type" varchar(20) DEFAULT 'hourly',
	"pricing_package_id" uuid,
	"total_cost" numeric(10, 2),
	"status" varchar(20) DEFAULT 'active',
	"payment_id" integer,
	"staff_id" integer,
	"session_rating" integer,
	"fnb_order_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "tables" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"status" varchar(20) DEFAULT 'available',
	"hourly_rate" numeric(10, 2) NOT NULL,
	"per_minute_rate" numeric(10, 4),
	"pricing_package_id" uuid,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"transaction_number" varchar(50) NOT NULL,
	"customer_name" varchar(100),
	"customer_phone" varchar(20),
	"table_amount" numeric(10, 2) DEFAULT '0',
	"fnb_amount" numeric(10, 2) DEFAULT '0',
	"discount_amount" numeric(10, 2) DEFAULT '0',
	"tax_amount" numeric(10, 2) DEFAULT '0',
	"total_amount" numeric(10, 2) NOT NULL,
	"payment_methods" text,
	"staff_id" integer,
	"status" varchar(20) DEFAULT 'pending',
	"transaction_id" varchar(100),
	"midtrans_order_id" varchar(100),
	"amount" numeric(10, 2),
	"currency" varchar(3) DEFAULT 'IDR',
	"payment_method" varchar(50),
	"midtrans_response" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "payments_transaction_number_unique" UNIQUE("transaction_number"),
	CONSTRAINT "payments_transaction_id_unique" UNIQUE("transaction_id"),
	CONSTRAINT "payments_midtrans_order_id_unique" UNIQUE("midtrans_order_id")
);
--> statement-breakpoint
CREATE TABLE "system_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(100) NOT NULL,
	"value" text NOT NULL,
	"description" varchar(255),
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "system_settings_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "pricing_packages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(500),
	"category" varchar(50) NOT NULL,
	"hourly_rate" numeric(10, 2),
	"per_minute_rate" numeric(10, 2),
	"is_default" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"sort_order" numeric(10, 0) DEFAULT '0',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fnb_items" ADD CONSTRAINT "fnb_items_category_id_fnb_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."fnb_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fnb_order_items" ADD CONSTRAINT "fnb_order_items_order_id_fnb_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."fnb_orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fnb_order_items" ADD CONSTRAINT "fnb_order_items_item_id_fnb_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."fnb_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fnb_orders" ADD CONSTRAINT "fnb_orders_table_id_tables_id_fk" FOREIGN KEY ("table_id") REFERENCES "public"."tables"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fnb_orders" ADD CONSTRAINT "fnb_orders_staff_id_staff_id_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."staff"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_analytics" ADD CONSTRAINT "order_analytics_order_id_fnb_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."fnb_orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "table_sessions" ADD CONSTRAINT "table_sessions_table_id_tables_id_fk" FOREIGN KEY ("table_id") REFERENCES "public"."tables"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "table_sessions" ADD CONSTRAINT "table_sessions_pricing_package_id_pricing_packages_id_fk" FOREIGN KEY ("pricing_package_id") REFERENCES "public"."pricing_packages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tables" ADD CONSTRAINT "tables_pricing_package_id_pricing_packages_id_fk" FOREIGN KEY ("pricing_package_id") REFERENCES "public"."pricing_packages"("id") ON DELETE no action ON UPDATE no action;