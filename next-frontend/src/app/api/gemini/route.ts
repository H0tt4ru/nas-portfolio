import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
	const body = await req.json();
	const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

	try {
		const response = await axios.post(
			`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
			body,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		return NextResponse.json({
			text:
				response.data.candidates[0]?.content?.parts[0]?.text ??
				"No response from Gemini.",
		});
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			console.error("Gemini API error:", error.response?.data || error.message);
		} else if (error instanceof Error) {
			console.error("Gemini API error:", error.message);
		} else {
			console.error("Gemini API error:", error);
		}
		return NextResponse.json(
			{ error: "Failed to hit Gemini API" },
			{ status: 500 }
		);
	}
}
