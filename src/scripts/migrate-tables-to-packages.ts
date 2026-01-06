import { db } from "../lib/db";
import { tables, pricingPackages } from "../schema";
import { eq, and, isNull, count } from "drizzle-orm";

async function migrateTablesToPricingPackages() {
  try {
    console.log("Starting migration of tables to pricing packages...");
    
    // First, ensure we have default packages
    const packages = await db.select().from(pricingPackages);
    
    let defaultHourlyPackage = packages.find(p => p.category === 'hourly' && p.isDefault);
    let defaultMinutePackage = packages.find(p => p.category === 'per_minute' && p.isDefault);
    
    // If no default packages exist, create them from existing table rates
    if (!defaultHourlyPackage || !defaultMinutePackage) {
      console.log("Creating default packages from existing table rates...");
      
      // Get a sample table to determine rates
      const [sampleTable] = await db.select().from(tables).limit(1);
      
      if (!defaultHourlyPackage && sampleTable) {
        const [created] = await db.insert(pricingPackages).values({
          name: "STANDARD HOURLY",
          description: "Default hourly rate migrated from tables",
          category: "hourly",
          hourlyRate: sampleTable.hourlyRate,
          perMinuteRate: null,
          isDefault: true,
          isActive: true,
          sortOrder: "1"
        }).returning();
        defaultHourlyPackage = created;
      }
      
      if (!defaultMinutePackage && sampleTable?.perMinuteRate) {
        const [created] = await db.insert(pricingPackages).values({
          name: "STANDARD MINUTE",
          description: "Default per-minute rate migrated from tables",
          category: "per_minute",
          hourlyRate: null,
          perMinuteRate: sampleTable.perMinuteRate,
          isDefault: true,
          isActive: true,
          sortOrder: "2"
        }).returning();
        defaultMinutePackage = created;
      }
    }
    
    // Get all tables without pricing packages
    const tablesToMigrate = await db
      .select()
      .from(tables)
      .where(isNull(tables.pricingPackageId));
    
    console.log(`Found ${tablesToMigrate.length} tables to migrate`);
    
    // Group tables by their rates to potentially create custom packages
    const rateGroups = new Map<string, typeof tablesToMigrate>();
    
    tablesToMigrate.forEach(table => {
      const key = `${table.hourlyRate}_${table.perMinuteRate || 'null'}`;
      if (!rateGroups.has(key)) {
        rateGroups.set(key, []);
      }
      rateGroups.get(key)!.push(table);
    });
    
    // Migrate tables
    for (const [rateKey, tablesInGroup] of rateGroups) {
      const firstTable = tablesInGroup[0];
      
      // Check if a package already exists with these rates
      let matchingPackage = packages.find(p => {
        if (p.category === 'hourly' && firstTable.hourlyRate) {
          return p.hourlyRate === firstTable.hourlyRate;
        }
        return false;
      });
      
      // If no matching package, use the default
      if (!matchingPackage) {
        matchingPackage = defaultHourlyPackage;
      }
      
      if (matchingPackage) {
        // Update all tables in this group
        const tableIds = tablesInGroup.map(t => t.id);
        await db
          .update(tables)
          .set({ pricingPackageId: matchingPackage.id })
          .where(and(...tableIds.map(id => eq(tables.id, id))));
        
        console.log(`Migrated ${tablesInGroup.length} tables to package: ${matchingPackage.name}`);
      }
    }
    
    console.log("Migration completed successfully!");
    
    // Print summary
    const summary = await db.select({
      packageName: pricingPackages.name,
      tableCount: count(tables.id)
    })
    .from(tables)
    .leftJoin(pricingPackages, eq(tables.pricingPackageId, pricingPackages.id))
    .groupBy(pricingPackages.name);
    
    console.log("\nMigration Summary:");
    summary.forEach(row => {
      console.log(`- ${row.packageName || 'No Package'}: ${row.tableCount} tables`);
    });
    
  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    process.exit(0);
  }
}

migrateTablesToPricingPackages();