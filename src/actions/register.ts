"use server";

import db from "@/lib/prisma";
import { RegisterSchemaType } from "@/schemas/register";
import bcrypt from "bcryptjs";

export async function registerUser(data: RegisterSchemaType) {
  const { name, email, password } = data;
  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    return { error: "Email already registered." };
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "USER",
        name,
      },
    });
    return { success: true };
  } catch (err) {
    return { error: "Registration failed. Please try again." };
  }
}
