import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        userId: true,
        username: true,
        firstName: true,
        middleName: true,
        lastName: true,
        suffix: true,
        role: true,
        position: true,
        isActive: true,
        createdAt: true,
      },
    });

    const formattedUsers = users.map((u) => {
      const fullName = [u.firstName, u.middleName, u.lastName, u.suffix]
        .filter(Boolean)
        .join(" ");
      return {
        ...u,
        name: fullName,
      };
    });

    return NextResponse.json(formattedUsers);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      username,
      password,
      firstName,
      middleName,
      lastName,
      suffix,
      role = "USER",
      position = "Staff",
      isActive = true,
    } = body;

    if (!username || !password || !firstName || !lastName) {
      return NextResponse.json(
        {
          error: "Username, password, first name, and last name are required.",
        },
        { status: 400 },
      );
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        firstName,
        middleName: middleName || null,
        lastName,
        suffix: suffix || null,
        role,
        position,
        isActive,
      },
    });

    const fullName = [
      newUser.firstName,
      newUser.middleName,
      newUser.lastName,
      newUser.suffix,
    ]
      .filter(Boolean)
      .join(" ");

    return NextResponse.json({
      success: true,
      user: {
        ...newUser,
        name: fullName,
      },
    });
  } catch (error: unknown) {
    console.error("Error creating user:", error);
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "A user with this username already exists." },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "Failed to create user." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      username,
      password,
      firstName,
      middleName,
      lastName,
      suffix,
      role,
      position,
      isActive,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required for update." },
        { status: 400 },
      );
    }

    const updateData: {
      firstName?: string | null;
      middleName?: string | null;
      lastName?: string | null;
      suffix?: string | null;
      role?: string;
      position?: string;
      isActive?: boolean;
      username?: string;
      password?: string;
    } = {
      firstName: firstName || null,
      middleName: middleName || null,
      lastName: lastName || null,
      suffix: suffix || null,
      role: role || undefined,
      position: position || undefined,
      isActive: typeof isActive === "boolean" ? isActive : undefined,
    };

    if (username) {
      updateData.username = username;
    }

    if (password && password.trim() !== "") {
      updateData.password = password;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    const fullName = [
      updatedUser.firstName,
      updatedUser.middleName,
      updatedUser.lastName,
      updatedUser.suffix,
    ]
      .filter(Boolean)
      .join(" ");

    return NextResponse.json({
      success: true,
      user: {
        ...updatedUser,
        name: fullName,
      },
    });
  } catch (error: unknown) {
    console.error("Error updating user:", error);
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Username already taken." },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "Failed to update user." },
      { status: 500 },
    );
  }
}
