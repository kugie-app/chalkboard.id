import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { pricingPackages, type NewPricingPackage } from "@/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

const createPackageSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(500).optional(),
  category: z.enum(["hourly", "per_minute"]),
  hourlyRate: z.string().optional(),
  perMinuteRate: z.string().optional(),
  isDefault: z.boolean().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get("category");
    const isActive = searchParams.get("isActive");

    let whereClause;
    if (category && isActive === "true") {
      whereClause = and(eq(pricingPackages.category, category), eq(pricingPackages.isActive, true));
    } else if (category) {
      whereClause = eq(pricingPackages.category, category);
    } else if (isActive === "true") {
      whereClause = eq(pricingPackages.isActive, true);
    }

    let packages;
    if (whereClause) {
      packages = await db
        .select()
        .from(pricingPackages)
        .where(whereClause)
        .orderBy(pricingPackages.sortOrder);
    } else {
      packages = await db
        .select()
        .from(pricingPackages)
        .orderBy(pricingPackages.sortOrder);
    }
    
    return NextResponse.json(packages);
  } catch (error) {
    console.error("Error fetching pricing packages:", error);
    return NextResponse.json(
      { error: "Failed to fetch pricing packages" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = createPackageSchema.parse(body);

    // Validate that rates are provided based on category
    if (validatedData.category === "hourly" && !validatedData.hourlyRate) {
      return NextResponse.json(
        { error: "Hourly rate is required for hourly packages" },
        { status: 400 }
      );
    }
    if (validatedData.category === "per_minute" && !validatedData.perMinuteRate) {
      return NextResponse.json(
        { error: "Per minute rate is required for per minute packages" },
        { status: 400 }
      );
    }

    // If this is set as default, unset other defaults in the same category
    if (validatedData.isDefault) {
      await db
        .update(pricingPackages)
        .set({ isDefault: false })
        .where(eq(pricingPackages.category, validatedData.category));
    }

    const newPackage: NewPricingPackage = {
      name: validatedData.name,
      description: validatedData.description,
      category: validatedData.category,
      hourlyRate: validatedData.hourlyRate,
      perMinuteRate: validatedData.perMinuteRate,
      isDefault: validatedData.isDefault ?? false,
      isActive: validatedData.isActive ?? true,
      sortOrder: validatedData.sortOrder,
    };

    const [created] = await db
      .insert(pricingPackages)
      .values(newPackage)
      .returning();

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error creating pricing package:", error);
    return NextResponse.json(
      { error: "Failed to create pricing package" },
      { status: 500 }
    );
  }
}