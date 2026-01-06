import { db } from "../lib/db";
import { pricingPackages } from "../schema";

async function seedPricingPackages() {
  try {
    console.log("Seeding pricing packages...");
    
    // Check if packages already exist
    const existing = await db.select().from(pricingPackages);
    if (existing.length > 0) {
      console.log("Pricing packages already exist, skipping seed");
      return;
    }

    // Insert default packages
    await db.insert(pricingPackages).values([
      {
        name: "STANDARD",
        description: "Standard hourly rate for regular hours",
        category: "hourly",
        hourlyRate: "50000",
        perMinuteRate: null,
        isDefault: true,
        isActive: true,
        sortOrder: "1"
      },
      {
        name: "WEEKEND",
        description: "Weekend hourly rate with premium pricing",
        category: "hourly",
        hourlyRate: "75000",
        perMinuteRate: null,
        isDefault: false,
        isActive: true,
        sortOrder: "2"
      },
      {
        name: "MALAM",
        description: "Night time hourly rate (after 9 PM)",
        category: "hourly",
        hourlyRate: "65000",
        perMinuteRate: null,
        isDefault: false,
        isActive: true,
        sortOrder: "3"
      },
      {
        name: "STANDARD MENIT",
        description: "Standard per-minute rate",
        category: "per_minute",
        hourlyRate: null,
        perMinuteRate: "1000",
        isDefault: true,
        isActive: true,
        sortOrder: "4"
      },
      {
        name: "PREMIUM MENIT",
        description: "Premium per-minute rate for peak hours",
        category: "per_minute",
        hourlyRate: null,
        perMinuteRate: "1500",
        isDefault: false,
        isActive: true,
        sortOrder: "5"
      }
    ]);

    console.log("Pricing packages seeded successfully!");
  } catch (error) {
    console.error("Error seeding pricing packages:", error);
  } finally {
    process.exit(0);
  }
}

seedPricingPackages();