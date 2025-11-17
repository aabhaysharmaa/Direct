import bcrypt from "bcrypt";

import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const {
			name,
			email,
			password
		} = body;
		if (!email || !password || !name) {
			return new NextResponse("Missing info ", { status: 400 })
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		const newUser = await prisma.user.create({
			data: {
				email,
				name,
				hashedPassword
			}
		});
		return NextResponse.json(newUser);
	} catch (error) {
		console.log("POST ERROR ", error.message);
		return new NextResponse("Internal Error", { status: 500 })
	}

}
