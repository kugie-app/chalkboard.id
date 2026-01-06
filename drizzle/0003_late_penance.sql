ALTER TABLE "table_sessions" ADD COLUMN "original_duration" integer;--> statement-breakpoint
ALTER TABLE "table_sessions" ADD COLUMN "duration_type" varchar(20) DEFAULT 'hourly';