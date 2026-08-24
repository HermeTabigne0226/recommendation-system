import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seeding...");

  // ==========================================
  // 1. SEED POSITIONS (tbl_positions)
  // ==========================================
  console.log("\n📌 Seeding Positions (tbl_positions)...");
  const initialPositions = [
    { position: "Computer Technician", createdBy: "ADMIN", userId: 1 },
    { position: "MIS Technical Staff", createdBy: "ADMIN", userId: 1 },
    { position: "Computer Programmer", createdBy: "ADMIN", userId: 1 },
    { position: "MIS Head", createdBy: "ADMIN", userId: 1 },
    { position: "Graphic Designer", createdBy: "ADMIN", userId: 1 },
    { position: "Network Administrator", createdBy: "ADMIN", userId: 1 },
    { position: "MIS Technical Supervisor", createdBy: "ADMIN", userId: 1 },
    { position: "CCTV Operator", createdBy: "ADMIN", userId: 1 },
    { position: "Assistant Network Administrator", createdBy: "ADMIN", userId: 1 },
    { position: "Web Developer", createdBy: "ADMIN", userId: 1 },
    { position: "Systems Developer", createdBy: "ADMIN", userId: 1 },
    { position: "Programmer", createdBy: "ADMIN", userId: 1 },
    { position: "Network Associate", createdBy: "ADMIN", userId: 1 },
  ];

  for (const pos of initialPositions) {
    const upsertedPos = await prisma.positions.upsert({
      where: { position: pos.position },
      update: {
        createdBy: pos.createdBy,
        userId: pos.userId,
      },
      create: {
        position: pos.position,
        createdBy: pos.createdBy,
        userId: pos.userId,
      },
    });
    console.log(`  ✅ Position: ${upsertedPos.position} (ID: ${upsertedPos.id}, User ID: ${upsertedPos.userId})`);
  }

  // ==========================================
  // 2. SEED USERS (tbl_users)
  // ==========================================
  console.log("\n👤 Seeding Users (tbl_users)...");
  const initialUsers = [
    {
      username: "admin",
      password: "adminpassword123",
      firstName: "Admin",
      middleName: "",
      lastName: "User",
      suffix: "",
      role: "ADMIN",
      position: "System Administrator",
      isActive: true,
    },
    {
      username: "josh_daborbor",
      password: "password123",
      firstName: "Josh",
      middleName: "Z.",
      lastName: "Daborbor",
      suffix: "",
      role: "USER",
      position: "IT Specialist",
      isActive: true,
    },
    {
      username: "jose_sanico",
      password: "password123",
      firstName: "Jose",
      middleName: "D.",
      lastName: "Sanico",
      suffix: "II",
      role: "USER",
      position: "IT Support",
      isActive: true,
    },
    {
      username: "eugene_elmido",
      password: "password123",
      firstName: "Eugene Chris",
      middleName: "C.",
      lastName: "Elmido",
      suffix: "",
      role: "USER",
      position: "IT Technician",
      isActive: true,
    },
    {
      username: "juellier_andaya",
      password: "password123",
      firstName: "Juellier",
      middleName: "D.",
      lastName: "Andaya",
      suffix: "",
      role: "USER",
      position: "Network Engineer",
      isActive: true,
    },
  ];

  for (const user of initialUsers) {
    const upsertedUser = await prisma.user.upsert({
      where: { username: user.username },
      update: {
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        suffix: user.suffix,
        position: user.position,
        role: user.role,
        isActive: user.isActive,
      },
      create: {
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        suffix: user.suffix,
        role: user.role,
        position: user.position,
        isActive: user.isActive,
      },
    });
    console.log(`  ✅ User: ${upsertedUser.username} (User ID: ${upsertedUser.userId})`);
  }

  console.log("\n🎉 All database seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
