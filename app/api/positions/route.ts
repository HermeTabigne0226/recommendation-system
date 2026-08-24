import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const positions = await prisma.positions.findMany({
      orderBy: { position: "asc" },
    });
    return NextResponse.json(positions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch positions" },
      { status: 500 },
    );
  }
}
