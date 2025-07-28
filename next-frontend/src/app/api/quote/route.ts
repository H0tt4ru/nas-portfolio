// /app/api/quote/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
	try {
		const response = await axios.get("https://zenquotes.io/api/random");
		const quote = response.data?.[0];
		return NextResponse.json({ quote: quote.q, author: quote.a });
	} catch (error) {
		console.error("Quote API error:", error);
		return NextResponse.json({ error });
	}
}
