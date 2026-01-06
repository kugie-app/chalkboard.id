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
ALTER TABLE "payments" DROP CONSTRAINT "payments_order_id_fnb_orders_id_fk";
--> statement-breakpoint
ALTER TABLE "payments" DROP CONSTRAINT "payments_session_id_table_sessions_id_fk";
--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "amount" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "fnb_orders" ADD COLUMN "customer_phone" varchar(20);--> statement-breakpoint
ALTER TABLE "fnb_orders" ADD COLUMN "payment_id" integer;--> statement-breakpoint
ALTER TABLE "fnb_orders" ADD COLUMN "staff_id" integer;--> statement-breakpoint
ALTER TABLE "fnb_orders" ADD COLUMN "notes" text;--> statement-breakpoint
ALTER TABLE "table_sessions" ADD COLUMN "customer_phone" varchar(20);--> statement-breakpoint
ALTER TABLE "table_sessions" ADD COLUMN "payment_id" integer;--> statement-breakpoint
ALTER TABLE "table_sessions" ADD COLUMN "staff_id" integer;--> statement-breakpoint
ALTER TABLE "table_sessions" ADD COLUMN "session_rating" integer;--> statement-breakpoint
ALTER TABLE "table_sessions" ADD COLUMN "fnb_order_count" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "transaction_number" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "customer_name" varchar(100);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "customer_phone" varchar(20);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "table_amount" numeric(10, 2) DEFAULT '0';--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "fnb_amount" numeric(10, 2) DEFAULT '0';--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "discount_amount" numeric(10, 2) DEFAULT '0';--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "tax_amount" numeric(10, 2) DEFAULT '0';--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "total_amount" numeric(10, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "payment_methods" text;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "staff_id" integer;--> statement-breakpoint
ALTER TABLE "order_analytics" ADD CONSTRAINT "order_analytics_order_id_fnb_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."fnb_orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fnb_orders" ADD CONSTRAINT "fnb_orders_staff_id_staff_id_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."staff"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" DROP COLUMN "order_id";--> statement-breakpoint
ALTER TABLE "payments" DROP COLUMN "session_id";--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_transaction_number_unique" UNIQUE("transaction_number");