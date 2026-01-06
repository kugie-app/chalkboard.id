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
ALTER TABLE "table_sessions" ADD COLUMN "pricing_package_id" uuid;--> statement-breakpoint
ALTER TABLE "tables" ADD COLUMN "pricing_package_id" uuid;--> statement-breakpoint
ALTER TABLE "table_sessions" ADD CONSTRAINT "table_sessions_pricing_package_id_pricing_packages_id_fk" FOREIGN KEY ("pricing_package_id") REFERENCES "public"."pricing_packages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tables" ADD CONSTRAINT "tables_pricing_package_id_pricing_packages_id_fk" FOREIGN KEY ("pricing_package_id") REFERENCES "public"."pricing_packages"("id") ON DELETE no action ON UPDATE no action;