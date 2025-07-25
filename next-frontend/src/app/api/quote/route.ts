import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
	try {
		const response = await axios.get("https://zenquotes.io/api/random");
		const quote = response.data?.[0];

		return NextResponse.json({
			q: quote.q,
			a: quote.a,
		});
	} catch (error) {
		console.error("Quote API error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch quote." },
			{ status: 500 }
		);
	}
}
